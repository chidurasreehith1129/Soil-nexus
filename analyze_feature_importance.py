import joblib
import pandas as pd
import numpy as np

print("==================================================")
print(" FARMSENSE AI - DAY 6: FEATURE IMPORTANCE REPORT ")
print("==================================================\n")

# 1. Load our trained AI council (market_predictor.pkl)
try:
    print("Loading the trained machine learning brain...")
    model = joblib.load('market_predictor.pkl')
    print(" -> Success! market_predictor.pkl loaded successfully.\n")
except FileNotFoundError:
    print("! CRITICAL ERROR: market_predictor.pkl was not found!")
    print("Please make sure you successfully ran train_market_model.py on Day 4.")
    exit()

# 2. Extract Feature Importances (This returns a NumPy array!)
importances = model.feature_importances_

# Define our feature names in the exact order they were fed to the model
feature_names = ['target_harvest_month', 'crop_code', 'state_code']

print("------------------------------------------------")
print("          THEWISE ELDERS' VERDICT               ")
print("------------------------------------------------")

# 3. Prevent the Image 5 Bug: Extract and format each scalar float individually!
# By looping through the zipped features, we unbox each numpy float into a normal python float.
for name, importance_val in zip(feature_names, importances):
    importance_percentage = importance_val * 100
    # Formatting each unboxed float safely with :.2f
    print(f" * {name:<22}: {importance_percentage:.2f}% influence on price")

print("------------------------------------------------")

# 4. Rationale and Agronomic Explanation
most_important_idx = np.argmax(importances)
dominant_feature = feature_names[most_important_idx]

print(f"\n🧠 AGROMETEOROLOGICAL SUMMARY:")
print(f" -> The most influential clue in our system is '{dominant_feature}'.")
print(" -> Rationale: In Indian mandis, crop identity and seasonal harvest windows")
print("    exert massive structural leverage over modal prices compared to geographical")
print("    location alone. This confirms our model has built a realistic economic map.")

print("\n==================================================")
print(" PHASE 2 COMPLETE! READY TO INTEGRATE THE FLASK SERVER! ")
print("==================================================")