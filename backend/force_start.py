from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime
import os
import joblib
import pandas as pd
import requests

# ==========================================
# 1. INITIALIZE THE APP & DATABASE
# ==========================================
app = Flask(__name__)
CORS(app)

CRED_FILENAME = "farmsense-ai-a40c6-firebase-adminsdk-fbsvc-3128cf3f4e.json"
if os.path.exists(CRED_FILENAME):
    cred = credentials.Certificate(CRED_FILENAME)
    # Prevent Firebase from trying to initialize twice
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://farmsense-ai-a40c6-default-rtdb.asia-southeast1.firebasedatabase.app/'
        })

# ==========================================
# 2. LOAD THE AI MODEL
# ==========================================
try:
    model = joblib.load('irrigation_model.pkl')
    print("✅ AI Model 'irrigation_model.pkl' loaded successfully!")
except Exception as e:
    print("❌ Error: 'irrigation_model.pkl' not found. Run train_model.py first!")
    model = None

# ==========================================
# 3. HELPER FUNCTIONS
# ==========================================
def preprocess_sensor_data(incoming_json):
    moisture = incoming_json.get('moisture')
    temperature = incoming_json.get('temperature')
    humidity = incoming_json.get('humidity')
    ph = incoming_json.get('pH')
    
    data_dict = {
        'moisture': [moisture],
        'temperature': [temperature],
        'humidity': [humidity],
        'pH': [ph]
    }
    return pd.DataFrame(data_dict)

# --- WEEK 6: WEATHER CHECKER ---
def get_safe_weather(lat, lon):
    try:
        # Ask OpenWeatherMap for the forecast (Replace with your real API key later!)
        api_key = "0c89f11f9e76807fb4c6b0602f9106dc"
        url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}"
        response = requests.get(url, timeout=5)
        raw_weather = response.json()
        
        # Pick out just the temperature and rain chances
        future_temp = raw_weather['list'][0]['main']['temp']
        rain_chance = raw_weather['list'][0]['pop']
        return future_temp, rain_chance
    except Exception as e:
        print(f"⚠️ Weather failed, using safe backup. Error: {e}")
        return 30.0, 0.0  # Backup data: 30 degrees, 0% rain

# --- WEEK 6: MARKET PRICE CHECKER ---
def get_safe_market_price(commodity):
    try:
        # Ask the Indian Government for crop prices
        url = f"https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=YOUR_KEY&format=json&filters[commodity]={commodity}"
        response = requests.get(url, timeout=5)
        market_data = response.json()
        return market_data['records'][0]['max_price']
    except Exception as e:
        print(f"⚠️ Market check failed, using safe backup. Error: {e}")
        return 25.00  # Backup data: 25 rupees

# ==========================================
# 4. WEB ROUTES (ENDPOINTS)
# ==========================================

# Home Route
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'success',
        'message': 'FarmSense AI Backend Highway is up and running smoothly!'
    })

# Prediction Route (Week 5)
@app.route('/predict_irrigation', methods=['POST'])
def predict_irrigation():
    if model is None:
        return jsonify({'error': 'AI model file is missing on the server'}), 500

    incoming_data = request.get_json()
    if not incoming_data:
        return jsonify({'error': 'No data package received'}), 400
    
    df = preprocess_sensor_data(incoming_data)
    prediction = model.predict(df)
    result = int(prediction[0])
    
    return jsonify({'prediction': result})

# --- WEEK 6: NEW CROP RECOMMENDATION WINDOW ---
@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    # 1. Get the farm's location from the sensor
    farm_data = request.get_json()
    lat = farm_data.get('latitude', 12.9716) # Default to Bangalore if missing
    lon = farm_data.get('longitude', 77.5946)
    
    # 2. Look at the sky (Check weather)
    future_temp, rain_chance = get_safe_weather(lat, lon)
    
    # 3. Look at the wallet (Check market)
    tomato_price = get_safe_market_price('Tomato')
    
    # 4. Send the final answer back to the farmer!
    return jsonify({
        'status': 'success',
        'recommended_crop': 'Tomato',
        'weather_forecast': f"{future_temp} degrees with {rain_chance}% chance of rain",
        'current_market_price': f"Rs. {tomato_price}",
        'advice': 'Good conditions to plant Tomatoes this week!'
    })

# Firebase Sensor Update Route (Old Code)
@app.route('/update_sensor', methods=['POST'])
def update_sensor():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "Payload array empty"}), 400

        moisture = data.get('moisture')
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        ph = data.get('pH')

        # Validation Checks
        if any(v is None for v in [moisture, temperature, humidity, ph]):
            return jsonify({"status": "error", "message": "Missing sensor data elements"}), 400
        
        # Mathematical boundary checks
        if not (0 <= moisture <= 100) or not (0 <= ph <= 14):
            return jsonify({"status": "error", "message": "Moisture or pH out of bounds"}), 400
        if not (-20 <= temperature <= 70) or not (0 <= humidity <= 100):
            return jsonify({"status": "error", "message": "Atmospheric data values corrupt"}), 400

        current_time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        irrigation_required = 1 if moisture < 40.0 else 0

        payload = {
            "moisture": float(moisture),
            "temperature": float(temperature),
            "humidity": float(humidity),
            "pH": float(ph),
            "irrigation_required": irrigation_required,
            "timestamp": current_time_str
        }

        # Write to Firebase
        if firebase_admin._apps:
            db.reference('current_reading').set(payload)
            db.reference('sensor_history').push(payload)
        
        print(f"💾 Integrated Arrays Saved Successfully at {current_time_str}")
        return jsonify({"status": "success", "message": "All sensor streams written directly to cloud matrix"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"Pipeline failure: {str(e)}"}), 500

# Firebase Data Retrieval Route (Old Code)
@app.route('/get_sensor_data', methods=['GET'])
def get_sensor_data():
    try:
        if firebase_admin._apps:
            latest_records = db.reference('current_reading').get()
            if latest_records:
                return jsonify(latest_records), 200
            return jsonify({"status": "offline", "message": "Using zero fallback array layers"}), 200
        else:
            return jsonify({"status": "error", "message": "Firebase not connected"}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ==========================================
# 5. SERVER IGNITION
# ==========================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)