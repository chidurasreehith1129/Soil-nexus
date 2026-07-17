document.addEventListener("DOMContentLoaded", () => {
    const cropSelector = document.getElementById("crop-selector");
    const soilSelector = document.getElementById("soil-selector");
    const sowingDateInput = document.getElementById("sowing-date");
    const daysElapsedEl = document.getElementById("days-elapsed");
    const currentStageEl = document.getElementById("current-stage");
    const currentActionsList = document.getElementById("current-actions-list");
    const pastActionsList = document.getElementById("past-actions-list");
    const emergencyActionsList = document.getElementById("emergency-actions-list");

    const overrideLightRain = document.getElementById("override-light-rain");
    const overrideModerateRain = document.getElementById("override-moderate-rain");
    const overrideHeavyRain = document.getElementById("override-heavy-rain");
    const overrideWind = document.getElementById("override-wind");
    const overrideHeat = document.getElementById("override-heat");

    let allCrops = [];

    function init() {
        // Load crops from localStorage (cached from recommendations)
        const cachedCrops = localStorage.getItem("farmsense-crops");
        if (cachedCrops) {
            allCrops = JSON.parse(cachedCrops);
        }
        
        populateCropDropdown();
        attachEventListeners();
        updateMonitoring();
    }

    function populateCropDropdown() {
        if (allCrops.length === 0) {
            cropSelector.innerHTML = '<option value="">No crops available. Visit Recommendations first.</option>';
            return;
        }
        
        cropSelector.innerHTML = '<option value="">Select a crop</option>';
        allCrops.forEach((cropObj, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = cropObj.crop;
            cropSelector.appendChild(option);
        });
        // Select first crop by default
        if (allCrops.length > 0) {
            cropSelector.value = 0;
        }
    }

    function attachEventListeners() {
        cropSelector.addEventListener("change", updateMonitoring);
        soilSelector.addEventListener("change", updateMonitoring);
        sowingDateInput.addEventListener("change", updateMonitoring);
        
        overrideLightRain.addEventListener("change", updateEmergencies);
        overrideModerateRain.addEventListener("change", updateEmergencies);
        overrideHeavyRain.addEventListener("change", updateEmergencies);
        overrideWind.addEventListener("change", updateEmergencies);
        overrideHeat.addEventListener("change", updateEmergencies);
    }

    function updateMonitoring() {
        if (cropSelector.value === "" || allCrops.length === 0) {
            currentActionsList.innerHTML = "<li>Please select a crop.</li>";
            return;
        }

        const selectedCrop = allCrops[cropSelector.value];
        const sowingDateStr = sowingDateInput.value;
        const soilType = soilSelector.value;

        if (!sowingDateStr) {
            currentActionsList.innerHTML = "<li>Please enter a sowing date to track lifecycle.</li>";
            daysElapsedEl.textContent = "0";
            currentStageEl.textContent = "Waiting";
            pastActionsList.innerHTML = "<li>No past actions yet.</li>";
            updateEmergencies();
            return;
        }

        const sowingDate = new Date(sowingDateStr);
        const today = new Date();
        const diffTime = today - sowingDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        daysElapsedEl.textContent = diffDays >= 0 ? diffDays : 0;

        if (diffDays < 0) {
            currentStageEl.textContent = "Pre-sowing";
            currentActionsList.innerHTML = `<li>Prepare the field for ${selectedCrop.crop}. Sowing date is in the future.</li>`;
            pastActionsList.innerHTML = "<li>No past actions yet.</li>";
            updateEmergencies();
            return;
        }

        // Determine Stage
        const stages = selectedCrop.lifecycle_timeline || [
            { stage: "Sowing", day_range: "0-10", advice: "Plant seeds at optimal depth." },
            { stage: "Vegetative", day_range: "11-40", advice: "Ensure adequate watering and nitrogen." },
            { stage: "Flowering", day_range: "41-70", advice: "Critical period for water. Monitor for pests." },
            { stage: "Harvest", day_range: "71-100", advice: "Harvest when crop reaches maturity." }
        ];

        let currentStageName = "Completed";
        let currentStageAdvice = "The crop cycle is likely complete.";
        let pastActions = [];

        for (let i = 0; i < stages.length; i++) {
            const s = stages[i];
            const [minDay, maxDay] = s.day_range.split("-").map(Number);
            
            if (diffDays >= minDay && diffDays <= maxDay) {
                currentStageName = s.stage;
                currentStageAdvice = s.advice;
                break;
            } else if (diffDays > maxDay) {
                pastActions.push(`[${s.stage} stage missed or passed] ${s.advice}`);
            }
        }

        currentStageEl.textContent = currentStageName;

        // Populate Current Actions
        let currentActionsHtml = `<li><strong>${currentStageName} Stage:</strong> ${currentStageAdvice}</li>`;
        
        // Add Soil specific care
        let soilAdvice = "";
        if (soilType === "Clay") {
            soilAdvice = "Clay soil holds water. Avoid over-watering to prevent root rot.";
        } else if (soilType === "Sand") {
            soilAdvice = "Sandy soil drains fast. Water more frequently and consider mulching.";
        } else if (soilType === "Silt") {
            soilAdvice = "Silt is prone to compaction. Avoid heavy machinery over the root zones.";
        } else {
            soilAdvice = "Loam is ideal. Maintain standard practices.";
        }
        currentActionsHtml += `<li style="margin-top:10px; color:#a3c2a1;"><strong>Soil Care (${soilType}):</strong> ${soilAdvice}</li>`;

        currentActionsList.innerHTML = currentActionsHtml;

        // Populate Past Actions
        if (pastActions.length > 0) {
            pastActionsList.innerHTML = pastActions.map(a => `<li>${a} (Check if mitigated)</li>`).join("");
        } else {
            pastActionsList.innerHTML = "<li>No past actions yet.</li>";
        }

        updateEmergencies();
    }

    function updateEmergencies() {
        let emergencies = [];
        
        if (overrideLightRain.checked) {
            emergencies.push("<strong>Light Rain Alert:</strong> Check for fungal growth if persistent. Usually beneficial, no immediate irrigation changes needed.");
        }
        if (overrideModerateRain.checked) {
            emergencies.push("<strong>Moderate Rain Alert:</strong> Pause irrigation for 1-2 days. Ensure field is draining properly.");
        }
        if (overrideHeavyRain.checked) {
            emergencies.push("<strong>Heavy Rainfall Alert:</strong> Immediately pause irrigation. Ensure drainage channels are clear to prevent waterlogging.");
        }
        if (overrideWind.checked) {
            emergencies.push("<strong>High Winds Alert:</strong> Secure loose equipment. Consider temporary windbreaks for young plants.");
        }
        if (overrideHeat.checked) {
            emergencies.push("<strong>Heat Wave Alert:</strong> Increase irrigation frequency (prefer early morning or evening). Apply mulch to retain soil moisture.");
        }

        if (emergencies.length > 0) {
            emergencyActionsList.innerHTML = emergencies.map(e => `<li>${e}</li>`).join("");
            emergencyActionsList.style.display = "block";
        } else {
            emergencyActionsList.innerHTML = "<li>No emergency active.</li>";
        }
    }

    init();
});
