import pytest
import json
import io
import os
from Agri_hub import app, MOCK_SENSORS

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_predict_irrigation_standard(client):
    # Set simulated sensors
    client.post('/update_simulated_sensors', json={
        "ph": 6.5, "moisture": 50, "temperature": 25.0, "humidity": 65
    })
    response = client.get('/predict_irrigation')
    assert response.status_code == 200
    data = response.get_json()
    assert "irrigation_required" in data
    assert "confidence_score" in data

def test_predict_irrigation_extreme(client):
    # Moisture 0, Temp 50
    client.post('/update_simulated_sensors', json={
        "ph": 1.0, "moisture": 0.0, "temperature": 50.0, "humidity": 100.0
    })
    response = client.get('/predict_irrigation')
    assert response.status_code == 200
    data = response.get_json()
    assert "irrigation_required" in data

def test_predict_crop_price_standard(client):
    response = client.post('/predict_crop_price', json={
        "crop_name": "Wheat", "date": "2024-05-10"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "live_price" in data or "predicted_price" in data

def test_predict_crop_price_edge_cases(client):
    # Unknown crop
    response = client.post('/predict_crop_price', json={
        "crop_name": "XyzzyWeed", "date": "2024-05-10"
    })
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data

    # Missing crop
    response = client.post('/predict_crop_price', json={})
    assert response.status_code == 400
    
    # Malformed date (string instead of date)
    response = client.post('/predict_crop_price', json={
        "crop_name": "Wheat", "date": "not-a-date"
    })
    assert response.status_code == 400

    # Date out of bounds (leap year edge case is just a date, but let's test leap year)
    response = client.post('/predict_crop_price', json={
        "crop_name": "Wheat", "date": "2024-02-29"
    })
    assert response.status_code == 200

def test_predict_disease_missing_image(client):
    response = client.post('/predict_disease', data={})
    # Should return 400
    assert response.status_code == 400

def test_predict_disease_malformed_image(client):
    data = {
        'leaf_image': (io.BytesIO(b"not an image"), 'test.jpg')
    }
    response = client.post('/predict_disease', data=data, content_type='multipart/form-data')
    # Should probably return 500 or 400, but not crash the server
    assert response.status_code in [400, 500]
    # Check if JSON response is returned
    assert "error" in response.get_json() or "prediction" in response.get_json()

def test_recommend_crop_standard(client):
    response = client.post('/recommend_crop', json={
        "lat": 28.61, "lon": 77.20
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "recommendations" in data

def test_recommend_crop_extreme(client):
    # Test with NaN or invalid types if we could pass them, but JSON doesn't do NaN easily.
    # We can pass strings instead of floats.
    response = client.post('/recommend_crop', json={
        "lat": "not-a-float", "lon": "not-a-float"
    })
    # Ideally it should handle this gracefully and return 400, but 500 JSON is also acceptable.
    assert response.status_code == 400

def test_ask_agronomist(client):
    response = client.post('/ask_agronomist', json={
        "message": "how is the moisture?"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "reply" in data
