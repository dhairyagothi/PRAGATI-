import numpy as np
import pandas as pd
import streamlit as st
from datetime import datetime, timedelta
import pickle
import json
from pathlib import Path
import random

# Get the project root directory
PROJECT_ROOT = Path(__file__).parent.parent.parent

class ConflictPredictor:
    """AI model for predicting train conflicts and delays"""
    
    def __init__(self):
        self.model_loaded = False
        self.confidence_threshold = 0.7
    
    def predict_conflicts(self, train_data, time_horizon_hours=2):
        """
        Predict potential train conflicts within the specified time horizon
        
        Args:
            train_data (pd.DataFrame): Current train positions and schedules
            time_horizon_hours (int): Hours ahead to predict
        
        Returns:
            list: List of predicted conflicts with probabilities
        """
        
        conflicts = []
        
        # Simulate conflict detection logic
        current_time = datetime.now()
        prediction_end = current_time + timedelta(hours=time_horizon_hours)
        
        # Generate sample conflicts based on current data
        locations = ["Junction A", "Platform 5", "Block Signal C", "Crossover D"]
        
        for i in range(random.randint(1, 4)):
            conflict_time = current_time + timedelta(minutes=random.randint(30, 120))
            
            if conflict_time <= prediction_end:
                conflict = {
                    "id": f"CONF_{i+1:03d}",
                    "predicted_time": conflict_time,
                    "location": random.choice(locations),
                    "trains_involved": [
                        f"12{random.randint(100, 999)}",
                        f"12{random.randint(100, 999)}"
                    ],
                    "conflict_type": random.choice(["Platform Occupation", "Signal Conflict", "Route Overlap"]),
                    "probability": random.uniform(0.6, 0.95),
                    "severity": random.choice(["Low", "Medium", "High"]),
                    "estimated_delay": random.randint(5, 45),
                    "recommendation": self._generate_recommendation()
                }
                conflicts.append(conflict)
        
        return sorted(conflicts, key=lambda x: x["probability"], reverse=True)
    
    def _generate_recommendation(self):
        """Generate resolution recommendations"""
        recommendations = [
            "Delay departure by 5 minutes",
            "Use alternate platform",
            "Implement speed restriction",
            "Coordinate with adjacent stations",
            "Deploy additional signaling staff"
        ]
        return random.choice(recommendations)

class MaintenancePredictor:
    """AI model for predictive maintenance scheduling"""
    
    def __init__(self):
        self.model_loaded = False
        
    def predict_maintenance_needs(self, asset_data, prediction_days=30):
        """
        Predict maintenance requirements for railway assets
        
        Args:
            asset_data (pd.DataFrame): Asset health and usage data
            prediction_days (int): Days ahead to predict
        
        Returns:
            list: Maintenance predictions with priorities
        """
        
        predictions = []
        
        # Simulate maintenance prediction logic
        asset_types = ["Locomotive", "Track", "Signal", "Switch", "Bridge"]
        
        for asset_type in asset_types:
            for i in range(random.randint(2, 8)):
                asset_id = f"{asset_type[:3].upper()}-{random.randint(100, 999):03d}"
                
                # Simulate health scoring
                base_health = random.uniform(60, 95)
                days_until_maintenance = random.randint(1, prediction_days)
                
                prediction = {
                    "asset_id": asset_id,
                    "asset_type": asset_type,
                    "current_health_score": round(base_health, 1),
                    "predicted_failure_probability": round(100 - base_health, 1),
                    "days_until_maintenance": days_until_maintenance,
                    "maintenance_type": self._get_maintenance_type(base_health),
                    "estimated_cost": self._estimate_cost(asset_type, base_health),
                    "priority": self._calculate_priority(base_health, days_until_maintenance),
                    "risk_factors": self._identify_risk_factors(asset_type),
                    "location": f"KM {random.randint(10, 200)}"
                }
                predictions.append(prediction)
        
        return sorted(predictions, key=lambda x: (x["priority"], x["days_until_maintenance"]))
    
    def _get_maintenance_type(self, health_score):
        """Determine maintenance type based on health score"""
        if health_score < 70:
            return "Emergency Repair"
        elif health_score < 80:
            return "Corrective Maintenance"
        else:
            return "Preventive Maintenance"
    
    def _estimate_cost(self, asset_type, health_score):
        """Estimate maintenance cost"""
        base_costs = {
            "Locomotive": 500000,
            "Track": 200000,
            "Signal": 50000,
            "Switch": 150000,
            "Bridge": 1000000
        }
        
        base_cost = base_costs.get(asset_type, 100000)
        health_multiplier = 1 + (100 - health_score) / 100
        
        return int(base_cost * health_multiplier)
    
    def _calculate_priority(self, health_score, days_until):
        """Calculate maintenance priority"""
        if health_score < 70 or days_until <= 7:
            return "Critical"
        elif health_score < 80 or days_until <= 14:
            return "High"
        elif health_score < 90 or days_until <= 21:
            return "Medium"
        else:
            return "Low"
    
    def _identify_risk_factors(self, asset_type):
        """Identify risk factors for different asset types"""
        risk_factors = {
            "Locomotive": ["Engine wear", "Brake system", "Electrical components"],
            "Track": ["Rail wear", "Ballast condition", "Joint integrity"],
            "Signal": ["Lamp failure", "Cable degradation", "Weather exposure"],
            "Switch": ["Point mechanism", "Detection circuits", "Locking system"],
            "Bridge": ["Structural fatigue", "Foundation settlement", "Joint expansion"]
        }
        
        return random.sample(risk_factors.get(asset_type, ["General wear"]), 
                           min(2, len(risk_factors.get(asset_type, ["General wear"]))))

class AnomalyDetector:
    """AI model for detecting operational anomalies"""
    
    def __init__(self):
        self.model_loaded = False
        self.normal_ranges = {
            "temperature": (65, 75),
            "vibration": (0.5, 2.0),
            "speed": (40, 120),
            "pressure": (40, 60)
        }
    
    def detect_anomalies(self, sensor_data):
        """
        Detect anomalies in real-time sensor data
        
        Args:
            sensor_data (dict): Current sensor readings
        
        Returns:
            list: Detected anomalies with severity levels
        """
        
        anomalies = []
        
        # Check each sensor reading against normal ranges
        for sensor, value in sensor_data.items():
            if sensor in self.normal_ranges:
                min_val, max_val = self.normal_ranges[sensor]
                
                if value < min_val or value > max_val:
                    severity = self._calculate_anomaly_severity(sensor, value, min_val, max_val)
                    
                    anomaly = {
                        "sensor": sensor,
                        "current_value": value,
                        "normal_range": f"{min_val}-{max_val}",
                        "severity": severity,
                        "timestamp": datetime.now(),
                        "recommendation": self._get_anomaly_recommendation(sensor, severity)
                    }
                    anomalies.append(anomaly)
        
        return anomalies
    
    def _calculate_anomaly_severity(self, sensor, value, min_val, max_val):
        """Calculate severity of anomaly"""
        if value < min_val:
            deviation_percent = ((min_val - value) / min_val) * 100
        else:
            deviation_percent = ((value - max_val) / max_val) * 100
        
        if deviation_percent > 50:
            return "Critical"
        elif deviation_percent > 25:
            return "High"
        elif deviation_percent > 10:
            return "Medium"
        else:
            return "Low"
    
    def _get_anomaly_recommendation(self, sensor, severity):
        """Get recommendation for anomaly resolution"""
        recommendations = {
            "temperature": {
                "Critical": "Immediate shutdown and inspection required",
                "High": "Reduce load and monitor closely",
                "Medium": "Schedule inspection within 24 hours",
                "Low": "Monitor trend and log for review"
            },
            "vibration": {
                "Critical": "Stop operation and inspect track/wheels",
                "High": "Reduce speed and assess condition",
                "Medium": "Schedule track inspection",
                "Low": "Continue monitoring"
            }
        }
        
        return recommendations.get(sensor, {}).get(severity, "Monitor and investigate")

class SimulationEngine:
    """Engine for running 'what-if' simulations"""
    
    def __init__(self):
        self.simulation_id = 0
    
    def run_scenario_simulation(self, scenario_params):
        """
        Run a simulation based on scenario parameters
        
        Args:
            scenario_params (dict): Simulation parameters
        
        Returns:
            dict: Simulation results and metrics
        """
        
        self.simulation_id += 1
        
        # Simulate different scenario types
        scenario_type = scenario_params.get("type", "general")
        duration_hours = scenario_params.get("duration_hours", 8)
        
        if scenario_type == "delay_impact":
            return self._simulate_delay_impact(scenario_params)
        elif scenario_type == "route_optimization":
            return self._simulate_route_optimization(scenario_params)
        elif scenario_type == "capacity_planning":
            return self._simulate_capacity_planning(scenario_params)
        else:
            return self._simulate_general_scenario(scenario_params)
    
    def _simulate_delay_impact(self, params):
        """Simulate the impact of a delay"""
        delay_duration = params.get("delay_duration", 60)
        affected_location = params.get("location", "Junction A")
        
        # Calculate cascading effects
        affected_trains = random.randint(5, 15)
        avg_additional_delay = delay_duration * 0.3  # 30% propagation
        passenger_impact = affected_trains * random.randint(200, 800)
        
        results = {
            "simulation_id": self.simulation_id,
            "scenario_type": "delay_impact",
            "primary_delay": delay_duration,
            "affected_trains": affected_trains,
            "average_additional_delay": round(avg_additional_delay, 1),
            "total_passenger_impact": passenger_impact,
            "estimated_recovery_time": delay_duration * 2,
            "cost_impact": affected_trains * 50000,  # Cost in rupees
            "recommendations": [
                "Implement alternate routing for 40% of affected trains",
                "Deploy additional ground staff at affected stations",
                "Activate passenger notification systems",
                "Coordinate with bus services for backup transport"
            ]
        }
        
        return results
    
    def _simulate_route_optimization(self, params):
        """Simulate route optimization scenarios"""
        origin = params.get("origin", "Mumbai Central")
        destination = params.get("destination", "Pune")
        
        # Generate optimization metrics
        current_travel_time = random.randint(180, 240)  # minutes
        optimized_travel_time = current_travel_time * random.uniform(0.8, 0.95)
        fuel_savings = random.uniform(10, 25)  # percentage
        
        results = {
            "simulation_id": self.simulation_id,
            "scenario_type": "route_optimization",
            "route": f"{origin} to {destination}",
            "current_travel_time": current_travel_time,
            "optimized_travel_time": round(optimized_travel_time, 1),
            "time_savings_minutes": round(current_travel_time - optimized_travel_time, 1),
            "fuel_savings_percent": round(fuel_savings, 1),
            "capacity_improvement": random.uniform(15, 30),
            "implementation_cost": random.randint(500000, 2000000),
            "annual_savings": random.randint(5000000, 15000000)
        }
        
        return results
    
    def _simulate_capacity_planning(self, params):
        """Simulate capacity planning scenarios"""
        additional_trains = params.get("additional_trains", 5)
        route = params.get("route", "Mumbai-Pune")
        
        current_capacity = random.randint(80, 120)  # trains per day
        utilization_rate = random.uniform(75, 95)  # percentage
        
        results = {
            "simulation_id": self.simulation_id,
            "scenario_type": "capacity_planning",
            "route": route,
            "current_capacity": current_capacity,
            "additional_capacity": additional_trains,
            "new_total_capacity": current_capacity + additional_trains,
            "utilization_rate": round(utilization_rate, 1),
            "passenger_capacity_increase": additional_trains * random.randint(800, 1200),
            "infrastructure_requirements": [
                "Additional platform space at 3 stations",
                "Signal system upgrades",
                "Increased maintenance facility capacity"
            ],
            "estimated_revenue_increase": additional_trains * 500000  # per month
        }
        
        return results
    
    def _simulate_general_scenario(self, params):
        """Simulate general operational scenarios"""
        return {
            "simulation_id": self.simulation_id,
            "scenario_type": "general",
            "duration_hours": params.get("duration_hours", 8),
            "performance_improvement": random.uniform(10, 25),
            "efficiency_gain": random.uniform(15, 30),
            "cost_reduction": random.uniform(5, 20),
            "recommendations": [
                "Optimize train scheduling",
                "Improve maintenance workflows",
                "Enhance passenger information systems"
            ]
        }

# Main prediction functions that interface with the Streamlit app

def get_conflict_predictions(train_data=None, hours_ahead=2):
    """
    Get conflict predictions for the next few hours
    
    Args:
        train_data (pd.DataFrame): Current train data
        hours_ahead (int): Hours to predict ahead
    
    Returns:
        list: Predicted conflicts
    """
    
    predictor = ConflictPredictor()
    
    if train_data is None:
        # Generate sample data if none provided
        train_data = pd.DataFrame({
            'train_number': [f"12{i:03d}" for i in range(1, 11)],
            'current_station': ['Mumbai Central'] * 10,
            'scheduled_time': [datetime.now() + timedelta(hours=i) for i in range(10)]
        })
    
    return predictor.predict_conflicts(train_data, hours_ahead)

def predict_maintenance(asset_data=None, days_ahead=30):
    """
    Predict maintenance requirements
    
    Args:
        asset_data (pd.DataFrame): Asset condition data
        days_ahead (int): Days to predict ahead
    
    Returns:
        list: Maintenance predictions
    """
    
    predictor = MaintenancePredictor()
    return predictor.predict_maintenance_needs(asset_data, days_ahead)

def detect_anomalies(sensor_data=None):
    """
    Detect real-time anomalies
    
    Args:
        sensor_data (dict): Current sensor readings
    
    Returns:
        list: Detected anomalies
    """
    
    detector = AnomalyDetector()
    
    if sensor_data is None:
        # Generate sample sensor data
        sensor_data = {
            'temperature': random.uniform(60, 90),
            'vibration': random.uniform(0.3, 3.0),
            'speed': random.uniform(30, 130),
            'pressure': random.uniform(35, 65)
        }
    
    return detector.detect_anomalies(sensor_data)

def run_simulation(scenario_params):
    """
    Run a simulation scenario
    
    Args:
        scenario_params (dict): Simulation parameters
    
    Returns:
        dict: Simulation results
    """
    
    engine = SimulationEngine()
    return engine.run_scenario_simulation(scenario_params)

def optimize_route(start_point, end_point, constraints=None):
    """
    Optimize route between two points
    
    Args:
        start_point (str): Starting location
        end_point (str): Destination
        constraints (dict): Optimization constraints
    
    Returns:
        dict: Optimized route information
    """
    
    # Simulate route optimization
    optimization_result = {
        "original_route": f"{start_point} → {end_point}",
        "optimized_route": f"{start_point} → Alternate Path → {end_point}",
        "time_savings_minutes": random.randint(10, 45),
        "fuel_savings_percent": random.uniform(8, 20),
        "distance_km": random.randint(150, 300),
        "estimated_travel_time": random.randint(120, 240),
        "congestion_level": random.choice(["Low", "Medium", "High"]),
        "alternate_routes": [
            {"route": "Via Kalyan", "time_minutes": random.randint(140, 180)},
            {"route": "Via Lonavala", "time_minutes": random.randint(160, 200)}
        ]
    }
    
    return optimization_result

def load_ml_models():
    """
    Load pre-trained ML models
    
    Returns:
        dict: Loaded model objects
    """
    
    models_path = PROJECT_ROOT / "models"
    loaded_models = {}
    
    try:
        # Try to load prediction model
        prediction_model_path = models_path / "prediction_model.h5"
        if prediction_model_path.exists():
            # In a real implementation, you would load TensorFlow/Keras model here
            loaded_models['prediction_model'] = "Model loaded successfully"
        
        # Try to load anomaly detector
        anomaly_model_path = models_path / "anomaly_detector.pkl"
        if anomaly_model_path.exists():
            with open(anomaly_model_path, 'rb') as f:
                loaded_models['anomaly_detector'] = pickle.load(f)
    
    except Exception as e:
        st.warning(f"Could not load ML models: {str(e)}")
        loaded_models = {"status": "Using simulated models"}
    
    return loaded_models

def calculate_performance_metrics(operational_data):
    """
    Calculate key performance metrics from operational data
    
    Args:
        operational_data (pd.DataFrame): Operational data
    
    Returns:
        dict: Calculated performance metrics
    """
    
    if operational_data.empty:
        return {
            'on_time_performance': 0,
            'average_delay': 0,
            'capacity_utilization': 0,
            'fuel_efficiency': 0
        }
    
    metrics = {}
    
    # On-time performance (trains with delay <= 5 minutes)
    if 'delay_minutes' in operational_data.columns:
        on_time_trains = operational_data[operational_data['delay_minutes'] <= 5]
        metrics['on_time_performance'] = (len(on_time_trains) / len(operational_data)) * 100
        metrics['average_delay'] = operational_data['delay_minutes'].mean()
    
    # Capacity utilization
    if 'passenger_count' in operational_data.columns:
        max_capacity = 1200  # Assumed max capacity per train
        metrics['capacity_utilization'] = (operational_data['passenger_count'].mean() / max_capacity) * 100
    
    # Fuel efficiency
    if 'fuel_level_percent' in operational_data.columns:
        metrics['fuel_efficiency'] = operational_data['fuel_level_percent'].mean()
    
    return metrics