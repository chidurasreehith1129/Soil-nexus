# Smart Agriculture - Data Detective Project

## Overview

This project was developed as part of the **Smart Agriculture System** under the role of **Data Detective**.

The objective is to analyze agricultural datasets, perform feature engineering, train machine learning models, validate sensor readings, and evaluate model performance for crop recommendation and precision agriculture applications.

---

## Project Objectives

### Weeks 1–2: Data Collection

* Collected and analyzed agricultural datasets.
* Used crop recommendation data containing:

  * Nitrogen (N)
  * Phosphorus (P)
  * Potassium (K)
  * Temperature
  * Humidity
  * pH
  * Rainfall
  * Crop Label

### Weeks 3–4: Sensor Validation

* Compared hardware sensor readings with manual measurements.
* Calculated sensor error values.
* Generated sensor validation reports.

### Weeks 5–7: Data Preprocessing & Model Training

* Cleaned dataset.
* Performed feature engineering.
* Trained a Random Forest Classifier.
* Conducted hyperparameter tuning using GridSearchCV.
* Achieved accuracy greater than 85%.

### Weeks 8–9: Live Field Testing

* Simulated real-world agricultural conditions.
* Evaluated model predictions using sample sensor data.
* Verified model performance under field-like scenarios.

---

## Technologies Used

* Python
* Pandas
* NumPy
* Scikit-Learn
* Matplotlib
* Seaborn
* Joblib

---

## Feature Engineering

Two additional features were created:

### 1. Temperature-Humidity Ratio

temperature / (humidity + 1)

### 2. NPK Sum

N + P + K

These features improved the model's ability to identify crop suitability.

---

## Machine Learning Model

Algorithm Used:

* Random Forest Classifier

Hyperparameter Tuning:

* GridSearchCV
* 5-Fold Cross Validation

Parameters Tested:

* n_estimators = [100, 200]
* max_depth = [10, 20, None]

---

## Model Evaluation

Evaluation Metrics:

* Accuracy Score
* Classification Report
* Confusion Matrix
* Cross Validation Score

Generated Outputs:

* Model Accuracy Report
* Feature Importance Analysis
* Confusion Matrix Visualization
* Sensor Validation Report

---

## Generated Files

| File                          | Description                    |
| ----------------------------- | ------------------------------ |
| crop_recommendation_model.pkl | Trained machine learning model |
| model_results.txt             | Accuracy and evaluation report |
| feature_importance.csv        | Feature ranking                |
| feature_importance.png        | Feature importance graph       |
| confusion_matrix.png          | Confusion matrix visualization |
| sensor_validation_report.csv  | Sensor validation results      |

---

## Running the Project

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Model

```bash
python smart_agriculture_model.py
```

---

## Sample Prediction

Input:

* N = 90
* P = 42
* K = 43
* Temperature = 20.8
* Humidity = 82
* pH = 6.5
* Rainfall = 202.9

Output:

```text
Recommended Crop: Rice
```

(Note: Output may vary depending on training results.)

---

## Key Achievements

✔ Data Cleaning

✔ Feature Engineering

✔ Machine Learning Model Development

✔ Hyperparameter Optimization

✔ Sensor Validation

✔ Model Evaluation

✔ Live Field Testing Simulation

✔ Report Generation

---

## Author

Sai Charan Tej

Role: Data Detective

Smart Agriculture Project
