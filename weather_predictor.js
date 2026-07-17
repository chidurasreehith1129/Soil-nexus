document.addEventListener("DOMContentLoaded", () => {
  const gridContainer    = document.getElementById("climate-grid-container");
  const recsContainer    = document.getElementById("recommendations-container");

  let chartInstance = null;
  let weatherData   = [];

  // Default baseline constants
  const MONTH_NAMES = ["January","February","March","April","May","June",
                       "July","August","September","October","November","December"];
  const BASE_TEMPS  = [15,19,26,32,35,33,30,29,28,26,20,16];
  const BASE_RAINS  = [10,15,12,15,25,70,190,180,120,35,10,8];

  const CROP_PROFILES = [
    { crop:"Wheat",        minT:10,maxT:25,minR:50,  maxR:300,  window:"Oct–Feb"   },
    { crop:"Rice",         minT:22,maxT:35,minR:800, maxR:2000, window:"Jun–Oct"   },
    { crop:"Maize",        minT:18,maxT:35,minR:400, maxR:800,  window:"Mar–Jun"   },
    { crop:"Sorghum",      minT:20,maxT:38,minR:150, maxR:600,  window:"May–Aug"   },
    { crop:"Pearl Millet", minT:22,maxT:40,minR:100, maxR:500,  window:"Jun–Sep"   },
    { crop:"Barley",       minT:7, maxT:22,minR:50,  maxR:250,  window:"Oct–Feb"   },
    { crop:"Cotton",       minT:20,maxT:38,minR:500, maxR:1000, window:"Apr–Sep"   },
    { crop:"Soybean",      minT:18,maxT:35,minR:400, maxR:800,  window:"Jun–Sep"   },
    { crop:"Sunflower",    minT:15,maxT:35,minR:200, maxR:600,  window:"Feb–Jun"   },
    { crop:"Groundnut",    minT:22,maxT:38,minR:300, maxR:700,  window:"Jun–Oct"   },
    { crop:"Mustard",      minT:8, maxT:25,minR:50,  maxR:200,  window:"Oct–Mar"   },
    { crop:"Sugarcane",    minT:20,maxT:35,minR:1000,maxR:2500, window:"Feb–Nov"   },
    { crop:"Potato",       minT:10,maxT:22,minR:200, maxR:500,  window:"Oct–Jan"   },
    { crop:"Tomato",       minT:15,maxT:30,minR:200, maxR:600,  window:"Year-round" },
    { crop:"Onion",        minT:12,maxT:25,minR:100, maxR:400,  window:"Oct–Mar"   },
    { crop:"Chili",        minT:20,maxT:35,minR:100, maxR:500,  window:"Jun–Nov"   },
    { crop:"Ginger",       minT:22,maxT:32,minR:1000,maxR:2000, window:"Mar–Aug"   },
    { crop:"Turmeric",     minT:20,maxT:35,minR:700, maxR:1500, window:"Apr–Sep"   },
    { crop:"Garlic",       minT:8, maxT:22,minR:50,  maxR:250,  window:"Oct–Mar"   },
    { crop:"Banana",       minT:20,maxT:35,minR:800, maxR:2000, window:"Year-round" },
    { crop:"Mango",        minT:24,maxT:40,minR:300, maxR:1000, window:"Oct–May"   },
    { crop:"Grape",        minT:15,maxT:35,minR:100, maxR:400,  window:"Dec–May"   },
    { crop:"Papaya",       minT:22,maxT:38,minR:500, maxR:1200, window:"Year-round" },
    { crop:"Lentil",       minT:5, maxT:25,minR:50,  maxR:200,  window:"Oct–Mar"   },
    { crop:"Chickpea",     minT:8, maxT:26,minR:50,  maxR:300,  window:"Oct–Feb"   },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // ENTRY POINT
  // ─────────────────────────────────────────────────────────────────────────
  initLiveMode();
  fetchDailyForecast();

  async function fetchDailyForecast() {
    const container = document.getElementById("daily-forecast-container");
    if (!container) return;
    
    try {
      const lat = document.getElementById("coord-lat")?.value || 28.61;
      const lon = document.getElementById("coord-lon")?.value || 77.20;
      const res = await fetch(`http://127.0.0.1:5000/get_daily_weather_forecast?lat=${lat}&lon=${lon}&t=${Date.now()}`);
      const data = await res.json();
      
      if (data.success && data.weather && data.weather.time) {
        renderDailyForecast(data.weather, container);
      } else {
        container.innerHTML = `<p style="color: #ef4444;">Failed to load daily forecast.</p>`;
      }
    } catch (e) {
      // silent fallback for demo
      container.innerHTML = `<p style="color: #ef4444;">Could not connect to server.</p>`;
    }
  }

  function renderDailyForecast(weather, container) {
    container.innerHTML = "";
    const times = weather.time;
    const maxTemps = weather.temperature_2m_max;
    const minTemps = weather.temperature_2m_min;
    const rains = weather.precipitation_sum;

    for (let i = 0; i < times.length; i++) {
      const date = new Date(times[i]);
      const dayName = date.toLocaleDateString("en-US", { weekday: 'short' });
      const maxT = maxTemps[i] !== null ? Math.round(maxTemps[i]) : '--';
      const minT = minTemps[i] !== null ? Math.round(minTemps[i]) : '--';
      const rain = rains[i] !== null ? rains[i].toFixed(1) : '--';
      
      let icon = "☀️";
      if (rain > 5) icon = "🌧️";
      else if (rain > 0) icon = "🌦️";
      else if (maxT > 30) icon = "🔥";

      const card = document.createElement("div");
      card.style.cssText = `
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        padding: 12px;
        min-width: 80px;
        text-align: center;
        flex-shrink: 0;
      `;
      card.innerHTML = `
        <div style="font-size: 12px; color: #a3c2a1; font-weight: 600; text-transform: uppercase;">${dayName}</div>
        <div style="font-size: 24px; margin: 8px 0;">${icon}</div>
        <div style="font-size: 14px; font-weight: 700; color: white;">${maxT}° <span style="color: #a3c2a1; font-weight: 400; font-size: 12px;">${minT}°</span></div>
        <div style="font-size: 11px; color: #88a886; margin-top: 4px;">${rain}mm</div>
      `;
      container.appendChild(card);
    }
  }
  
  const coordLat = document.getElementById("coord-lat");
  const coordLon = document.getElementById("coord-lon");
  if (coordLat) coordLat.addEventListener("change", () => { fetchDailyForecast(); initLiveMode(); });
  if (coordLon) coordLon.addEventListener("change", () => { fetchDailyForecast(); initLiveMode(); });

  // ─────────────────────────────────────────────────────────────────────────
  // LIVE MODE — fetch real forecast, read-only display
  // ─────────────────────────────────────────────────────────────────────────
  async function initLiveMode() {
    if (gridContainer) {
      gridContainer.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;color:#a3c2a1;font-size:13px;padding:20px 0;grid-column: span 2;">
          <span style="animation:spin 1s linear infinite;display:inline-block;">⌛</span>
          Fetching 12-month climate data…
        </div>`;
    }

    try {
      const lat = document.getElementById("coord-lat")?.value || 28.61;
      const lon = document.getElementById("coord-lon")?.value || 77.20;
      const res  = await fetch(`http://127.0.0.1:5000/get_live_weather_forecast?lat=${lat}&lon=${lon}&t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.weather) {
        weatherData = data.weather;
        renderGrid();
        renderChart();
        renderLocalRecommendations();
      } else {
        showFallbackLive();
      }
    } catch (e) {
      // silent fallback for demo
      showFallbackLive();
    }
  }

  function showFallbackLive() {
    weatherData = buildDefaultWeather();
    renderGrid();
    renderChart();
    renderLocalRecommendations();
  }

  function buildDefaultWeather() {
    const cur = new Date().getMonth();
    return Array.from({ length: 12 }, (_, i) => {
      const idx = (cur + i) % 12;
      return { month: MONTH_NAMES[idx], month_num: idx + 1,
               temp: BASE_TEMPS[idx], rain: BASE_RAINS[idx], source: "estimated" };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER GRID (read-only)
  // ─────────────────────────────────────────────────────────────────────────
  function renderGrid() {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    weatherData.forEach((item, index) => {
      const card = document.createElement("div");
      const isLive = item.source === "live";
      card.style.cssText = "background:rgba(255,255,255,0.03);border-radius:10px;padding:14px 16px;border:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:10px;";

      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:6px;">
          <h4 style="margin:0;color:#fff;font-size:14px;font-weight:700;">${item.month}</h4>
          <div style="display:flex;gap:6px;align-items:center;">
            <span style="font-size:11px;color:#a3c2a1;">Month ${item.month_num}</span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#d6e7cf;align-items:center;">
            <span>🌡 Avg Temp (°C)</span>
            <input type="number" step="0.1" id="temp-val-${index}" value="${item.temp.toFixed ? item.temp.toFixed(1) : item.temp}" 
              style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 4px; padding: 2px 4px; text-align: right;"
              onchange="window.updateWeatherOverride(${index}, 'temp', this.value)">
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#d6e7cf;align-items:center;">
            <span>🌧 Total Rain (mm)</span>
            <input type="number" step="1" id="rain-val-${index}" value="${item.rain.toFixed ? item.rain.toFixed(0) : item.rain}" 
              style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 4px; padding: 2px 4px; text-align: right;"
              onchange="window.updateWeatherOverride(${index}, 'rain', this.value)">
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CHART
  // ─────────────────────────────────────────────────────────────────────────
  function renderChart() {
    const canvas = document.getElementById("weatherTrendChart");
    if (!canvas) return;

    if (typeof Chart === "undefined") {
      canvas.style.display = "none";
      const ul = document.createElement("ul");
      ul.style.cssText = "margin:0;padding-left:20px;font-size:13px;color:#d6e7cf;";
      
      const annualRain = weatherData.reduce((s,d) => s + d.rain, 0);
      const temps = weatherData.map(d => d.temp);
      
      // Minimal generic advice
      ul.innerHTML = `
        <li style="margin-bottom:6px;">High rainfall (${annualRain}mm) in month 6/7. Ensure field drainage.</li>
        <li>Temperatures peak at ${Math.max(...temps)}°C. Adjust watering frequency accordingly.</li>
      `;
      recsContainer.appendChild(ul);
    }

    const labels = weatherData.map(d => d.month.substring(0, 3));
    const temps  = weatherData.map(d => d.temp);
    const rains  = weatherData.map(d => d.rain);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Rainfall (mm)",
            data: rains,
            backgroundColor: "rgba(52,211,153,0.25)",
            borderColor: "rgba(52,211,153,0.6)",
            borderWidth: 1,
            yAxisID: "y-rain",
            order: 2
          },
          {
            label: "Temperature (°C)",
            data: temps,
            type: "line",
            borderColor: "#ffb703",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.4,
            yAxisID: "y-temp",
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#d6e7cf", font: { size: 10 } } } },
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#a3c2a1", font: { size: 10 } } },
          "y-rain": {
            type: "linear", position: "left",
            title: { display: true, text: "Rainfall (mm)", color: "#a3c2a1", font: { size: 10 } },
            grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#a3c2a1" }
          },
          "y-temp": {
            type: "linear", position: "right",
            title: { display: true, text: "Temperature (°C)", color: "#ffb703", font: { size: 10 } },
            grid: { drawOnChartArea: false }, ticks: { color: "#ffb703" }
          }
        }
      }
    });
  }

  function renderLocalRecommendations() {
    const avgTemp   = weatherData.reduce((s,d) => s + d.temp, 0) / weatherData.length;
    const totalRain = weatherData.reduce((s,d) => s + d.rain, 0);

    const scored = CROP_PROFILES.map(p => {
      let score = 100;
      if (avgTemp  < p.minT) score -= Math.min(50, (p.minT - avgTemp)   * 5);
      else if (avgTemp > p.maxT) score -= Math.min(50, (avgTemp - p.maxT) * 5);
      if (totalRain < p.minR) score -= Math.min(50, ((p.minR - totalRain) / p.minR) * 50);
      else if (totalRain > p.maxR) score -= Math.min(30, ((totalRain - p.maxR)  / p.maxR) * 30);
      return { crop: p.crop, sowing_window: p.window, suitability_score: Math.max(0, Math.round(score)) };
    }).sort((a,b) => b.suitability_score - a.suitability_score);

    if (recsContainer) {
      recsContainer.innerHTML = "";
      scored.slice(0, 6).forEach(item => {
        const color = item.suitability_score >= 80 ? "#34d399" : item.suitability_score >= 50 ? "#fcd34d" : "#ef4444";
        const row = document.createElement("div");
        row.style.cssText = "background:rgba(255,255,255,0.02);border-radius:8px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,0.05);";
        row.innerHTML = `
          <div style="display:flex;flex-direction:column;">
            <strong style="color:#fff;font-size:13px;">${item.crop}</strong>
            <span style="font-size:10px;color:#a3c2a1;">Window: ${item.sowing_window}</span>
          </div>
          <strong style="color:${color};font-size:14px;">${item.suitability_score}%</strong>
        `;
        recsContainer.appendChild(row);
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // OVERRIDES & SAVING
  // ─────────────────────────────────────────────────────────────────────────
  window.updateWeatherOverride = function(index, field, value) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      weatherData[index][field] = numValue;
      weatherData[index].source = "override";
      renderChart();
    }
  };

  const saveBtn = document.getElementById("save-override-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      localStorage.setItem("farmsense-macro-weather", JSON.stringify(weatherData));
      saveBtn.innerText = "Saved!";
      saveBtn.style.background = "#34d399";
      setTimeout(() => {
        saveBtn.innerText = "Save Macro-Weather Override";
        saveBtn.style.background = ""; // revert to CSS default
      }, 2000);
    });
  }
});
