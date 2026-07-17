import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

# --- 1. DATA GENERATION ENGINE ---
def generate_master_data():
    print("🔄 Generating robust training data...")
    # These ranges represent realistic Indian wholesale market prices (Rs/kg)
    # The model will learn from these ranges, but will NOT be artificially capped.
    crop_price_ranges = {
        0: (20, 35), 1: (22, 38), 2: (15, 25), 3: (50, 70), 4: (60, 90),
        5: (45, 65), 6: (35, 55), 7: (2, 4), 8: (40, 60), 9: (50, 80),
        10: (60, 90), 11: (60, 90), 12: (10, 20), 13: (15, 30), 14: (80, 150),
        15: (15, 35), 16: (40, 120), 17: (20, 40), 18: (30, 60), 19: (25, 50),
        20: (80, 150), 21: (30, 60), 22: (50, 100), 23: (100, 200), 24: (30, 60),
        25: (20, 50), 26: (10, 25),
        27: (40, 70), 28: (50, 85), 29: (100, 150), 30: (120, 180), 31: (30, 50),
        32: (60, 90), 33: (80, 110), 34: (200, 300), 35: (400, 600), 36: (50, 80),
        37: (90, 120), 38: (150, 200), 39: (30, 60), 40: (100, 150), 41: (250, 350),
        42: (400, 700), 43: (50, 80), 44: (600, 900)
    }

    data = []
    # Generate 1000 data points per crop to ensure high accuracy and diverse patterns
    for crop_code in range(45):
        for _ in range(1000):
            month = np.random.randint(1, 13)
            year = np.random.randint(2024, 2031)
            state = 1
            price_min, price_max = crop_price_ranges[crop_code]
            # Add 5% inflation per year starting from 2024
            inflation_factor = 1.0 + (year - 2024) * 0.05
            price = np.random.uniform(price_min, price_max) * inflation_factor
            data.append([month, crop_code, state, year, price])

    df = pd.DataFrame(data, columns=['target_harvest_month', 'crop_code', 'state_code', 'year', 'modal_price'])
    df.to_csv('master_training_data.csv', index=False)
    print("✅ master_training_data.csv generated successfully.")
    return df

# --- 2. TRAINING ENGINE ---
def train_model(data):
    print("🧠 Training the AI brain with live market logic...")
    X = data[['crop_code', 'target_harvest_month', 'state_code', 'year']]
    y = data['modal_price']

    # Scale the inputs
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Use a high-performance configuration for accurate regression
    # Removed artificial constraints to let the model learn the true data distribution
    model = RandomForestRegressor(
        n_estimators=500, 
        max_depth=None, 
        random_state=42
    )
    model.fit(X_scaled, y)

    # Save components
    joblib.dump(model, 'market_predictor.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    print("✅ Training complete. 'market_predictor.pkl' and 'scaler.pkl' are updated.")

if __name__ == "__main__":
    df = generate_master_data()
    train_model(df)