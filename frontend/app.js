// ─── DATA STORAGE FOR CHART ───
const chartLabels = [];
const moistureData = [];
const temperatureData = [];
const phData = [];

// ─── CREATE THE CHART ───
const ctx = document.getElementById('telemetryChart').getContext('2d');
const telemetryChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [
            {
                label: 'Moisture %',
                data: moistureData,
                borderColor: '#4a90d9',
                backgroundColor: 'rgba(74,144,217,0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Temperature °C',
                data: temperatureData,
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230,126,34,0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'pH Level',
                data: phData,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46,204,113,0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        animation: { duration: 500 },
        scales: {
            y: { beginAtZero: false },
            x: { display: true }
        },
        plugins: {
            legend: { position: 'top' }
        }
    }
});

// ─── UPDATE CHART ───
function updateChartInstance(newData) {
    const now = new Date().toLocaleTimeString();
    chartLabels.push(now);
    moistureData.push(newData.moisture);
    temperatureData.push(newData.temperature);
    phData.push(newData.pH);

    if (chartLabels.length > 10) {
        chartLabels.shift();
        moistureData.shift();
        temperatureData.shift();
        phData.shift();
    }
    telemetryChart.update();
}

// ─── FETCH LIVE DATA WITH SPEED TRACKING ───
function fetchLiveMetrics() {
    const startTime = Date.now();

    fetch('https://farmsense-backend.com/get_sensor_data')
        .then(response => response.json())
        .then(data => {
            hideNetworkAlert();

            // Calculate network speed
            const responseTime = Date.now() - startTime;
            trackNetworkSpeed(responseTime);

            updateDashboard(data);
            updateChartInstance(data);

            // Parse complex payload fields
            document.getElementById('ph-reading').innerText = data.pH || '--';
            document.getElementById('humidity-reading').innerText = data.humidity || '--';
        })
        .catch(error => showNetworkAlert("Offline - Reconnecting..."));

    // Fetch AI prediction
    fetch('https://farmsense-backend.com/predict_irrigation')
        .then(response => response.json())
        .then(data => {
            showAIAdvice(data);

            // Parse complex prediction payload
            if (data.ai_advisory) {
                document.getElementById('ai-advisory-text').innerText = data.ai_advisory;
            }
            if (data.confidence_score !== undefined) {
                const pct = (data.confidence_score * 100).toFixed(1);
                document.getElementById('confidence-badge').innerText = pct + '%';
                document.getElementById('confidence-score-display').innerText = pct + '%';
            }
        })
        .catch(error => console.log("AI not reachable yet"));
}

// ─── UPDATE SENSOR VALUES ───
function updateDashboard(data) {
    document.getElementById('soil-moisture').innerText = data.moisture;
    document.getElementById('air-temp').innerText = data.temperature;
    document.getElementById('humidity').innerText = data.humidity;
    document.getElementById('ph-level').innerText = data.pH;
    checkMoistureAlert(data.moisture);
}

// ─── MOISTURE ALERT ───
function checkMoistureAlert(moisture) {
    const alertBox = document.getElementById('moisture-alert');
    if (moisture < 20) {
        alertBox.innerText = "🚨 CRITICAL: Activate Irrigation Systems Immediately!";
        alertBox.className = "alert-red";
        updateAdvisoryUrgency("high");
    } else {
        alertBox.innerText = "✅ Soil Moisture Levels are Stable";
        alertBox.className = "alert-green";
        updateAdvisoryUrgency("healthy");
    }
}

// ─── UPDATE ADVISORY URGENCY BADGE ───
function updateAdvisoryUrgency(level) {
    const badge = document.getElementById('advisory-urgency-badge');
    if (level === "high") {
        badge.innerText = "🔴 High Priority - Immediate Action Required";
        badge.className = "urgency-high";
    } else {
        badge.innerText = "🟢 Healthy Status - Crops Are Fine";
        badge.className = "urgency-healthy";
    }
}

// ─── AI ADVICE ───
function showAIAdvice(data) {
    const box = document.getElementById('ai-recommendation');
    if (data.irrigation_required === 1) {
        box.innerText = "⚠️ Water Needed: Scheduled Irrigation Recommended";
        box.style.backgroundColor = "#d6eaf8";
        box.style.color = "#1a5276";
    } else {
        box.innerText = "✅ Soil Moisture Optimal: No Irrigation Required";
        box.style.backgroundColor = "#d5f5e3";
        box.style.color = "#1e8449";
    }
}

// ─── NETWORK SPEED TRACKER ───
function trackNetworkSpeed(responseTime) {
    const speedDisplay = document.getElementById('network-speed');
    speedDisplay.innerText = responseTime + 'ms';
    if (responseTime > 3000) {
        speedDisplay.className = "speed-slow";
        document.getElementById('network-speed').title = "⚠️ Slow connection detected";
    } else {
        speedDisplay.className = "speed-normal";
    }
}

// ─── NETWORK BANNER ───
function showNetworkAlert(message) {
    const banner = document.getElementById('network-banner');
    const status = document.getElementById('system-status');
    banner.style.display = 'block';
    status.innerText = message;
}

function hideNetworkAlert() {
    document.getElementById('network-banner').style.display = 'none';
}

// ─── AUTO REFRESH EVERY 3 SECONDS ───
setInterval(fetchLiveMetrics, 3000);
fetchLiveMetrics();