from flask import Flask, request, jsonify
from flask_cors import CORS  # Imported clean

app = Flask(__name__)
CORS(app)  # Initialized clean

@app.route('/', methods=['GET'])
def home():
    return "Pipeline Server Online!", 200

@app.route('/update_sensor', methods=['POST'])
def update_sensor():
    print("Incoming data dropped in!")
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)