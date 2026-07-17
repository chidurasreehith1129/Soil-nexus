const API_BASE = 'http://127.0.0.1:5000';

let currentLat = localStorage.getItem('farm-lat') || 28.61;
let currentLon = localStorage.getItem('farm-lon') || 77.20;

function loadRecommendationsPage() {
    const override = JSON.parse(localStorage.getItem("farmsense-macro-weather"));
    const currentSoil = localStorage.getItem('farmsense-soil-type');
    const payload = {
        lat: currentLat,
        lon: currentLon,
        weather_override: override,
        soil: currentSoil
    };
    
    const list = document.getElementById('recommendation-list');
    const count = document.querySelector('.crop-count');
    
    if (!currentSoil) {
        if(list) list.innerHTML = '<article class="crop-panel full-width" style="text-align:center; padding: 60px 20px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 12px;"><h3>Awaiting Selection</h3><p style="color: #a3c2a1; margin-top: 10px;">Please select a soil type near the Field rhythm section on the Dashboard to view recommendations.</p></article>';
        if(count) count.innerText = '0 crops';
        return;
    }
    
    if(list) list.innerHTML = '<div style="text-align:center; padding: 40px; color: #a3c2a1;">Loading recommendations...</div>';
    if(count) count.innerText = 'Loading...';
    
    fetch(`${API_BASE}/recommend_crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            const recs = data.recommendations || [];
            localStorage.setItem('farmsense-crops', JSON.stringify(recs));
            renderRecommendationPage(recs);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            const cachedCrops = JSON.parse(localStorage.getItem('farmsense-crops')) || [];
            renderRecommendationPage(cachedCrops);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const latInput = document.getElementById('coord-lat');
    const lonInput = document.getElementById('coord-lon');
    if (latInput) latInput.value = currentLat;
    if (lonInput) lonInput.value = currentLon;
    
    function saveCoords() {
        if (latInput && lonInput) {
            currentLat = latInput.value;
            currentLon = lonInput.value;
            localStorage.setItem('farm-lat', currentLat);
            localStorage.setItem('farm-lon', currentLon);
            loadRecommendationsPage();
        }
    }
    if (latInput) latInput.addEventListener('change', saveCoords);
    if (lonInput) lonInput.addEventListener('change', saveCoords);
});

function renderRecommendationPage(recommendations) {
    const container = document.getElementById('recommendation-list');
    const countBadge = document.querySelector('.crop-count');
    if (!container) return;

    if (!recommendations.length) {
        container.innerHTML = '<article class="crop-item"><h3>No recommendations available</h3><p>Please return to the dashboard later.</p></article>';
        if (countBadge) countBadge.innerText = '0 crops';
        return;
    }

    if (countBadge) countBadge.innerText = `${recommendations.length} crops`;

    // Separate: open sowing window crops first, then closed
    const open   = recommendations.filter(r => r.sowing_window === 'Open');
    const closed = recommendations.filter(r => r.sowing_window !== 'Open');
    const sorted = [...open, ...closed];

    container.innerHTML = sorted.map((item, index) => {
        const rawSuitability = item.suitability_score ?? 0;
        const suitability = Math.max(0, rawSuitability - 15);
        const riskScore = Math.min(100, Math.max(0, 100 - rawSuitability));
        
        const fertType = item.fertilizer_info?.type || 'N/A';
        const fertMethod = item.fertilizer_info?.method || 'N/A';
        const fertSchedule = item.fertilizer_info?.schedule || 'N/A';
        const measures = item.measures && item.measures.length > 0 ? item.measures.join(', ') : 'None';
        const sowingWindow = item.sowing_window || 'Open';
        
        const advice = item.current_lifecycle_advice?.advice || 'Monitor crop growth closely.';
        const factors = deriveRiskFactors(item);
        const factorItems = factors.map(factor => `<li>${factor}</li>`).join('');
        
        const initialCost = item.initial_cost !== undefined ? item.initial_cost : 1500;
        const labourCost = item.labour_cost !== undefined ? item.labour_cost : 800;
        const postPlanting = item.post_planting || 'Keep the soil adequately drained and weed the field regularly.';
        const timeline = item.lifecycle_timeline || [];
        const timelineItems = timeline.map(t => `<div style="margin-bottom:8px;"><strong>Day ${t.day_range}: ${t.stage}</strong><p style="margin:2px 0 0; color:#a3c2a1;">${t.advice}</p></div>`).join('');

        return `
            <article class="crop-item expanded-item" style="max-width: 100%; overflow: hidden; box-sizing: border-box;">
                <div class="crop-card-header">
                    <div>
                        <div style="display:flex;align-items:center;gap:8px;">
                          <h3>${item.crop}</h3>
                          ${item.sowing_window === 'Open' ? '<span style="font-size:9px;background:rgba(52,211,153,0.2);color:#34d399;padding:2px 8px;border-radius:20px;font-weight:700;letter-spacing:0.5px;">🌱 SOWING OPEN</span>' : ''}
                        </div>
                        <p>Suitability: <strong>${suitability.toFixed(1)}%</strong> · Risk: <strong>${riskScore.toFixed(0)}%</strong></p>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <button class="button-secondary details-toggle" data-index="${index}" data-crop="${item.crop}">Crop Details</button>
                        <button class="button-secondary risk-toggle" data-index="${index}">Show risk</button>
                    </div>
                </div>
                <i><b style="width:${Math.min(100, suitability)}%"></b></i>
                
                <!-- Main Original Info Grid -->
                <div class="recommendation-details" style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 14px; flex-grow: 1; align-content: space-between;">
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Expected profit</span><strong>Rs. ${Math.round(item.expected_profit ?? 0).toLocaleString()}</strong></div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Fertilizer Type</span><strong>${fertType}</strong></div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Fertilizer Method</span><strong>${fertMethod}</strong></div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Fertilizer Schedule</span><strong>${fertSchedule}</strong></div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Measures</span><strong>${measures}</strong></div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Sowing Window</span><strong style="color: ${sowingWindow.toLowerCase() === 'open' ? '#34d399' : '#fca5a5'}">${sowingWindow}</strong></div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; color: #d6e7cf; font-size: 11px;"><span>Advice</span><strong style="text-align: right; max-width: 60%;">${advice}</strong></div>
                </div>

                <!-- Crop Details Area (Toggled) -->
                <div class="crop-full-details hidden" id="details-panel-${index}" style="margin-top:14px; padding-top:12px; border-top:1px dashed rgba(255,255,255,0.1); font-size:11px; color:#d6e7cf; display:flex; flex-direction:column; gap:8px; max-width: 100%; min-width: 0; box-sizing: border-box;">
                    <div style="display:flex; justify-content:space-between;"><span>Initial Cost</span><strong>Rs. ${initialCost.toLocaleString()}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>Labour Cost</span><strong>Rs. ${labourCost.toLocaleString()}</strong></div>
                    <div style="display:flex; flex-direction:column; gap:2px; margin-top:4px;">
                        <span style="font-weight:700; color:#34d399;">Post-Planting Actions:</span>
                        <p style="margin:2px 0 0 0; line-height:1.4; color:#a3c2a1;">${postPlanting}</p>
                    </div>
                    ${timelineItems ? `
                    <div style="display:flex; flex-direction:column; gap:2px; margin-top:8px; padding-top:8px; border-top:1px dashed rgba(255,255,255,0.1);">
                        <span style="font-weight:700; color:#34d399; margin-bottom:6px;">Crop Timeline:</span>
                        ${timelineItems}
                    </div>` : ''}
                    <div style="margin-top:8px; padding-top:8px; border-top:1px dashed rgba(255,255,255,0.1); width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box;">
                        <span style="font-weight:700; color:#34d399; margin-bottom:6px; display:block;">6-Month ROI Forecast:</span>
                        <div style="position:relative; width:100%; height:120px; max-width:100%;">
                            <canvas id="roi-chart-${index}"></canvas>
                        </div>
                    </div>
                </div>

                <div class="risk-details hidden" id="page-risk-details-${index}" style="margin-top:10px;">
                    <p>Risk factors</p>
                    <ul>${factorItems}</ul>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.risk-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const details = document.getElementById(`page-risk-details-${button.dataset.index}`);
            if (details) {
                details.classList.toggle('hidden');
                button.innerText = details.classList.contains('hidden') ? 'Show risk' : 'Hide risk';
            }
        });
    });

    document.querySelectorAll('.details-toggle').forEach(button => {
        button.addEventListener('click', async () => {
            const details = document.getElementById(`details-panel-${button.dataset.index}`);
            if (details) {
                details.classList.toggle('hidden');
                const isHidden = details.classList.contains('hidden');
                button.innerText = isHidden ? 'Crop Details' : 'Hide Details';

                if (!isHidden) {
                    const canvasId = `roi-chart-${button.dataset.index}`;
                    if (!window[`chartRendered_${canvasId}`]) {
                        window[`chartRendered_${canvasId}`] = true;
                        const cropName = button.dataset.crop;
                        renderRoiChart(canvasId, cropName);
                    }
                }
            }
        });
    });
}

document.getElementById('refresh-recommendation-page')?.addEventListener('click', loadRecommendationsPage);

function deriveRiskFactors(item) {
    const factors = [];
    if (item.sowing_window !== 'Open') factors.push("Planting outside optimal sowing window increases yield risk.");
    if (item.suitability_score && item.suitability_score < 50) factors.push("Current soil/weather conditions are sub-optimal for this crop.");
    if (item.disease_risk === 'high') factors.push("High historical risk of disease based on current humidity levels.");
    if (factors.length === 0) factors.push("Conditions are generally favorable.");
    return factors;
}

// Chart.js render logic for ROI forecast
async function renderRoiChart(canvasId, cropName) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    // Simulate API calls or fetch real ones for the next 6 months
    const months = [];
    const prices = [];
    const currentDate = new Date();
    
    // Attempting to fetch actual predictions or defaulting to synthetic data
    try {
        const promises = [];
        for(let i=1; i<=6; i++) {
            const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 15);
            months.push(d.toLocaleString('default', { month: 'short' }));
            
            const monthStr = (d.getMonth() + 1).toString().padStart(2, '0');
            const dateStr = `${d.getFullYear()}-${monthStr}-15`;
            
            promises.push(fetch(`http://127.0.0.1:5000/predict_crop_price?crop_name=${encodeURIComponent(cropName.toLowerCase())}&date=${dateStr}`)
                .then(res => res.json())
                .then(data => data.predicted_price || 0)
                .catch(() => 0));
        }
        
        const results = await Promise.all(promises);
        
        // If all results are 0, use synthetic data
        if(results.every(r => r === 0)) {
            let base = Math.random() * 40 + 20;
            for(let i=0; i<6; i++) {
                prices.push(base);
                base += (Math.random() * 10 - 4);
            }
        } else {
            prices.push(...results);
        }
        
    } catch (e) {
        // Fallback synthetic data
        for(let i=0; i<6; i++) {
            months.push(`M+${i+1}`);
            prices.push(Math.random() * 50 + 20);
        }
    }

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Forecast Price (Rs/kg)',
                data: prices,
                borderColor: '#fbbf24',
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: true, ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 9 } }, grid: { display: false } },
                y: { display: true, ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });
}

loadRecommendationsPage();
