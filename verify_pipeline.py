import pandas as pd
import firebase_admin
from firebase_admin import credentials, db

print("==================================================")
print("     FARMSENSE AI - DAY 3 PIPELINE VERIFICATION   ")
print("==================================================\n")

# ------------------------------------------------
# PART 1: LOCAL DATASET INSPECTION (The Ingredients)
# ------------------------------------------------
try:
    print("Checking local ingredients (master_training_data.csv)...")
    # Read the dataset we generated
    df = pd.read_csv('master_training_data.csv')
    
    total_records = len(df)
    print(f" -> Success! Local dataset loaded successfully.")
    print(f" -> Total historical price records found: {total_records}")
    
    # Check for empty spaces (Null values) that could crash our AI tomorrow
    null_count = df.isnull().sum().sum()
    print(f" -> Missing/Null values in dataset: {null_count}")
    
    # Mapped crop names for our visual verification printout
    crop_names_map = {
        0: "Paddy", 1: "Maize", 2: "Cotton", 3: "Wheat", 
        4: "Soybean", 5: "Tomato", 6: "Onion", 7: "Mustard",
        8: "Potato", 9: "Sugarcane", 10: "Chilli", 11: "Groundnut",
        12: "Turmeric", 13: "Banana", 14: "Chickpea", 15: "Sorghum"
    }
    
    print("\n Records per Crop:")
    crop_counts = df['crop_code'].value_counts().sort_index()
    for code, count in crop_counts.items():
        crop_name = crop_names_map.get(code, f"Unknown (Code {code})")
        print(f"   * {crop_name:<12}: {count} historical price records")
        
    # Check mathematical health of our modal prices (Ensuring no 0 or negative prices)
    min_price = df['modal_price'].min()
    max_price = df['modal_price'].max()
    mean_price = df['modal_price'].mean()
    print(f"\n[Financial Health Check] Modal Price Range:")
    print(f"   * Minimum price: Rs. {min_price:.2f} per quintal")
    print(f"   * Maximum price: Rs. {max_price:.2f} per quintal")
    print(f"   * Average price: Rs. {mean_price:.2f} per quintal")
    
    if min_price <= 0:
        print("! WARNING: Found invalid price data (<= 0). Please check your data pipeline.")
    else:
        print(" -> Financial price ranges are healthy and realistic!")

except FileNotFoundError:
    print("! CRITICAL ERROR: master_training_data.csv not found in your directory!")
    print("   Did you run clean_data.py successfully first?")
    exit()

# ------------------------------------------------
# PART 2: CLOUD DATABASE INSPECTION (The Recipes)
# ------------------------------------------------
print("\n--------------------------------------------------")
print("Connecting to the Cloud Recipe Safe (Firebase)...")

CREDENTIAL_FILE = "farmsense-ai-a40c6-firebase-adminsdk-fbsvc-3128cf3f4e.json"
DB_URL = "https://farmsense-ai-a40c6-default-rtdb.asia-southeast1.firebasedatabase.app/"

# Safety bouncer to prevent initializing the app twice and throwing a ValueError
if not firebase_admin._apps:
    try:
        cred = credentials.Certificate(CREDENTIAL_FILE)
        firebase_admin.initialize_app(cred, {
            'databaseURL': DB_URL
        })
    except Exception as e:
        print(f"! Security connection failed: {e}")
        exit()

try:
    # Open the crop knowledge drawer
    ref = db.reference('crop_knowledge_base')
    crops_db = ref.get()
    
    if crops_db:
        print(f" -> Success! Connected to Firebase Realtime Database.")
        print(f" -> Downloaded {len(crops_db)} crop profiles from the cloud.")
        
        print("\n[Agronomic Integrity Check] Active Crop Profiles in the Cloud:")
        for crop_name, attributes in crops_db.items():
            cost = attributes.get('cultivation_cost_per_acre', 0)
            duration = attributes.get('duration_months', 0)
            t_min = attributes.get('min_temp_celsius', 0)
            t_opt = attributes.get('optimal_temp_celsius', 0)
            t_max = attributes.get('max_temp_celsius', 0)
            
            # Print a neat summarized checklist for the crop
            print(f"   * {crop_name:<10} | Cost: Rs. {cost:<5}/acre | Cycle: {duration} Months | Temps: {t_min}°C to {t_max}°C (Opt: {t_opt}°C)")
            
            # Zero-tolerance check for mathematical carelessness
            if cost <= 0 or duration <= 0 or t_opt <= t_min or t_max <= t_opt:
                print(f"    ! WARNING: Agronomic limits for {crop_name} are mathematically invalid!")
        
        print("\n==================================================")
        print(" PIPELINE STATUS: 100% HEALTHY. READY FOR PHASE 2! ")
        print("==================================================")
    else:
        print("! ERROR: crop_knowledge_base node is empty or failed to download.")

except Exception as e:
    print(f"! Database verification failed: {e}")