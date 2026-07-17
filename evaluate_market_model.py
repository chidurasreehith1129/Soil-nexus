import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

print("==================================================")
print("  FARMSENSE AI - DAY 5: MODEL PERFORMANCE REPORT  ")
print("==================================================\n")

# 1. Load the History Book and the Saved Brain
try:
    df = pd.read_csv('master_training_data.csv')
    model = joblib.load('market_predictor.pkl')
    scaler = joblib.load('scaler.pkl')
    print(" -> Success! Historical dataset, Scaler, and ML model loaded successfully.")
except FileNotFoundError as e:
    print(f"! CRITICAL ERROR: Could not find required files. {e}")
    print("Please ensure Day 1, 2, and 4 completed successfully.")
    exit()

# 2. Split the Data for Grading (75% for Training, 25% for Testing)
X = df[['crop_code', 'target_harvest_month', 'state_code', 'year']]
y = df['modal_price']

# We use the exact same splits so our calculations are completely accurate
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Scale using the loaded scaler
X_test_scaled = scaler.transform(X_test)

# 3. Ask our AI to guess prices for our test questions
print("\nEvaluating model predictions against historical records...")
y_pred = model.predict(X_test_scaled)

# 4. Calculate our Report Card Grades
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("\n================ REPORT CARD ================")
print(f" * Mean Absolute Error (MAE) : Rs. {mae:.2f} per kg")
print(f" * Root Mean Squared Error (RMSE): Rs. {rmse:.2f} per kg")
print(f" * R-squared (R2) Score      : {r2 * 100:.2f}% accuracy")
print("=============================================\n")

# 5. Interactive Price Predictor (Live Simulation Sandbox)
print("Entering Live Price Simulator. Let's test the AI!")

crop_names = ["Wheat", "Rice", "Barley", "Oats", "Maize", "Sorghum", "Pearl Millet", "Bajra", "Cotton", "Jute", "Sugarcane", "Tea", "Coffee", "Rubber", "Spices", "Fruits"]

state_names = ["Andhra Pradesh", "Telangana"]

while True:
    print("\n------------------------------------------------")
    print("Select a Crop by entering its number (0 to 15):")
    for idx, name in enumerate(crop_names):
        print(f" [{idx}] {name:<12}", end="" if (idx + 1) % 4!= 0 else "\n")
        
    try:
        user_crop_code = input("\nEnter Crop Code (or type 'exit' to quit): ").strip()
        if user_crop_code.lower() == 'exit':
            print("Exiting Simulator. Outstanding job today!")
            break
            
        user_crop_code = int(user_crop_code)
        if user_crop_code < 0 or user_crop_code > 15:
            print("! Invalid choice. Enter a number between 0 and 15.")
            continue
            
        user_month = int(input("Enter Target Harvest Month (1 to 12): "))
        if user_month < 1 or user_month > 12:
            print("! Invalid month. Enter a number between 1 and 12.")
            continue
            
        user_state_code = int(input("Enter State Code (0 for Andhra Pradesh, 1 for Telangana): "))
        if user_state_code not in [0, 1]:
            print("! Invalid state. Enter 0 or 1.")
            continue
            
        user_year = int(input("Enter Target Year (e.g. 2026): "))
        
        # Structure the simulated question for the model (2D Array: crop_code, month, state_code, year)
        test_input = np.array([[float(user_crop_code), float(user_month), float(user_state_code), float(user_year)]])
        scaled_input = scaler.transform(test_input)
        
        # Get the prediction!
        predicted_price = float(model.predict(scaled_input)[0])
        
        print("\n 🧠 Analytics Processed:")
        print(f" -> Target Crop   : {crop_names[user_crop_code]}")
        print(f" -> Harvest Month : Month {user_month}")
        print(f" -> Region        : {state_names[user_state_code]}")
        print(f" -> Target Year   : {user_year}")
        print(f" -> Predicted Wholesale Price: Rs. {predicted_price:.2f} per kg")
        
    except ValueError:
        print("! Error: Please input valid numbers only.")
    except Exception as e:
        print(f"! An unexpected error occurred: {e}")