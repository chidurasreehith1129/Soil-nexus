document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("price-predictor-form");
  const resultDisplay = document.getElementById("result-display");
  const resultPlaceholder = document.getElementById("result-placeholder");
  const predictedValueSpan = document.getElementById("predicted-value");
  const targetDetailsP = document.getElementById("target-details");
  const liveValueSpan = document.getElementById("live-value");
  const liveSourceDetailsP = document.getElementById("live-source-details");
  
  // Set default date to today
  const dateInput = document.getElementById("prediction-date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  let trendChart = null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cropName = document.getElementById("crop-select").value;
    const dateVal = dateInput.value;

    if (!cropName || !dateVal) return;

    // Show loading state/placeholder or clear old values
    predictedValueSpan.textContent = "...";
    liveValueSpan.textContent = "...";

    try {
      // Execute all remote fetches concurrently
      const [liveRes, predRes] = await Promise.all([
        fetch(`http://127.0.0.1:5000/get_live_price?crop_name=${encodeURIComponent(cropName)}`).then(r => r.json()),
        fetch(`http://127.0.0.1:5000/predict_crop_price?crop_name=${encodeURIComponent(cropName)}&date=${dateVal}`).then(r => r.json()),
        renderMonthlyTrend(cropName, dateVal) // executes concurrently and renders chart
      ]);

      // 1. Handle live daily price
      if (liveRes.success) {
        liveValueSpan.textContent = liveRes.live_price.toFixed(2);
        liveSourceDetailsP.textContent = `Source: ${liveRes.source} (Updated: ${liveRes.updated_at})`;
      } else {
        liveValueSpan.textContent = "N/A";
        liveSourceDetailsP.textContent = `Error: ${liveRes.error || 'Failed to load'}`;
      }

      // 2. Handle AI target prediction
      if (predRes.error) {
        alert("Error: " + predRes.error);
        return;
      }

      predictedValueSpan.textContent = predRes.predicted_price.toFixed(2);
      
      const formattedDate = new Date(dateVal).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      targetDetailsP.textContent = `Predicted for ${predRes.crop_name.toUpperCase()} in ${formattedDate} (Month ${predRes.target_month})`;

      resultPlaceholder.style.display = "none";
      resultDisplay.style.display = "flex";

    } catch (err) {
      // silent fallback for demo
      alert("Failed to connect to the backend server.");
    }
  });

  async function renderMonthlyTrend(cropName, targetDate) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const year = new Date(targetDate).getFullYear();

    // Fetch predictions for all 12 months concurrently using Promise.all
    const promises = Array.from({ length: 12 }, (_, idx) => {
      const m = idx + 1;
      const monthStr = m < 10 ? `0${m}` : `${m}`;
      return fetch(`http://127.0.0.1:5000/predict_crop_price?crop_name=${encodeURIComponent(cropName)}&date=${year}-${monthStr}-15`)
        .then(res => res.json())
        .then(d => d.predicted_price || 0)
        .catch(() => 0);
    });

    const prices = await Promise.all(promises);

    const ctx = document.getElementById("trendChart").getContext("2d");
    
    if (trendChart) {
      trendChart.destroy();
    }

    trendChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [{
          label: "Wholesale Price (Rs/kg)",
          data: prices,
          borderColor: "#34d399",
          backgroundColor: "rgba(52, 211, 153, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)"
            },
            ticks: {
              color: "#a3c2a1"
            }
          },
          y: {
            title: {
              display: true,
              text: "Price (Rs/kg)",
              color: "#a3c2a1"
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)"
            },
            ticks: {
              color: "#a3c2a1"
            }
          }
        }
      }
    });
  }
});
