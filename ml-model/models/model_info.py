# PRAGATI AI - ML Model Placeholders
# This file contains placeholder information for the actual ML models

"""
Model Information:
- prediction_model.h5: TensorFlow/Keras model for train delay and conflict prediction
- anomaly_detector.pkl: Scikit-learn model for detecting operational anomalies

In a production environment, these would be actual trained models.
For this demo, the prediction engine uses simulated logic.
"""

import pickle
import numpy as np
from datetime import datetime

# Simulate a simple anomaly detection model
class DemoAnomalyDetector:
    def __init__(self):
        self.thresholds = {
            'temperature': {'min': 65, 'max': 75},
            'vibration': {'min': 0.5, 'max': 2.0},
            'speed': {'min': 40, 'max': 120},
            'pressure': {'min': 40, 'max': 60}
        }
        self.model_version = "1.0.0"
        self.trained_date = "2024-09-01"
        
    def predict(self, sensor_data):
        """Predict if sensor readings are anomalous"""
        anomalies = []
        
        for sensor, value in sensor_data.items():
            if sensor in self.thresholds:
                min_val = self.thresholds[sensor]['min']
                max_val = self.thresholds[sensor]['max']
                
                if value < min_val or value > max_val:
                    anomaly_score = self._calculate_anomaly_score(value, min_val, max_val)
                    anomalies.append({
                        'sensor': sensor,
                        'value': value,
                        'expected_range': f"{min_val}-{max_val}",
                        'anomaly_score': anomaly_score,
                        'severity': self._get_severity(anomaly_score)
                    })
        
        return anomalies
    
    def _calculate_anomaly_score(self, value, min_val, max_val):
        """Calculate anomaly score (0-1, higher = more anomalous)"""
        if value < min_val:
            deviation = (min_val - value) / min_val
        else:
            deviation = (value - max_val) / max_val
        
        return min(1.0, deviation)
    
    def _get_severity(self, score):
        """Convert anomaly score to severity level"""
        if score > 0.7:
            return "Critical"
        elif score > 0.4:
            return "High"
        elif score > 0.2:
            return "Medium"
        else:
            return "Low"

# Create and save the demo anomaly detector
if __name__ == "__main__":
    detector = DemoAnomalyDetector()
    
    # Save the model
    with open('anomaly_detector.pkl', 'wb') as f:
        pickle.dump(detector, f)
    
    print("Demo anomaly detector saved as anomaly_detector.pkl")
    
    # Create a placeholder for the prediction model info
    prediction_model_info = {
        "model_type": "LSTM Neural Network",
        "framework": "TensorFlow/Keras",
        "version": "2.0.0",
        "input_features": [
            "current_delay",
            "scheduled_time",
            "passenger_count", 
            "weather_conditions",
            "historical_performance",
            "route_congestion"
        ],
        "output_predictions": [
            "delay_probability",
            "conflict_risk",
            "estimated_delay_minutes",
            "recommended_action"
        ],
        "training_data": {
            "samples": 500000,
            "time_period": "2019-2024",
            "accuracy": 0.92,
            "precision": 0.89,
            "recall": 0.94
        },
        "model_architecture": {
            "layers": [
                {"type": "LSTM", "units": 128, "return_sequences": True},
                {"type": "Dropout", "rate": 0.2},
                {"type": "LSTM", "units": 64, "return_sequences": False},
                {"type": "Dropout", "rate": 0.2},
                {"type": "Dense", "units": 32, "activation": "relu"},
                {"type": "Dense", "units": 16, "activation": "relu"},
                {"type": "Dense", "units": 4, "activation": "softmax"}
            ],
            "optimizer": "Adam",
            "loss": "categorical_crossentropy",
            "metrics": ["accuracy", "precision", "recall"]
        },
        "deployment_info": {
            "model_size_mb": 45.2,
            "inference_time_ms": 15,
            "memory_requirement_mb": 512,
            "gpu_required": False
        }
    }
    
    # Save model info as JSON
    import json
    with open('prediction_model_info.json', 'w') as f:
        json.dump(prediction_model_info, f, indent=2)
    
    print("Prediction model info saved as prediction_model_info.json")