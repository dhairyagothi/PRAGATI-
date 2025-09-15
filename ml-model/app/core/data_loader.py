import pandas as pd
import numpy as np
import json
import streamlit as st
from datetime import datetime, timedelta
import os
from pathlib import Path

# Get the project root directory
PROJECT_ROOT = Path(__file__).parent.parent.parent

@st.cache_data
def load_movement_data(file_path=None):
    """
    Load train movement data from CSV file
    
    Args:
        file_path (str): Path to the movement data file
    
    Returns:
        pd.DataFrame: Loaded movement data
    """
    
    if file_path is None:
        file_path = PROJECT_ROOT / "data" / "simulated_movement_log.csv"
    
    try:
        # Try to load existing data
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            # Convert timestamp columns
            if 'timestamp' in df.columns:
                df['timestamp'] = pd.to_datetime(df['timestamp'])
            return df
        else:
            # Generate sample data if file doesn't exist
            return generate_sample_movement_data()
    
    except Exception as e:
        st.error(f"Error loading movement data: {str(e)}")
        return generate_sample_movement_data()

@st.cache_data
def load_static_data(file_path=None):
    """
    Load static railway infrastructure data
    
    Args:
        file_path (str): Path to the static data file
    
    Returns:
        dict: Static infrastructure data
    """
    
    if file_path is None:
        file_path = PROJECT_ROOT / "data" / "static_rail_map.json"
    
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                return json.load(f)
        else:
            return generate_sample_static_data()
    
    except Exception as e:
        st.error(f"Error loading static data: {str(e)}")
        return generate_sample_static_data()

def generate_sample_movement_data():
    """
    Generate realistic sample train movement data
    
    Returns:
        pd.DataFrame: Sample movement data
    """
    
    np.random.seed(42)  # For reproducible data
    
    # Generate data for the last 7 days
    start_date = datetime.now() - timedelta(days=7)
    end_date = datetime.now()
    
    # Create timestamp range (every 5 minutes)
    timestamps = pd.date_range(start=start_date, end=end_date, freq='5min')
    
    trains = [f"12{str(i).zfill(3)}" for i in range(1, 21)]
    stations = [
        "Mumbai Central", "Dadar", "Thane", "Kalyan", "Lonavala", 
        "Karjat", "Pune", "Nashik", "Aurangabad", "Igatpuri"
    ]
    
    movement_data = []
    
    for timestamp in timestamps:
        # Generate movements for random trains
        num_active_trains = np.random.randint(5, 15)
        active_trains = np.random.choice(trains, num_active_trains, replace=False)
        
        for train in active_trains:
            # Generate realistic movement data
            current_station = np.random.choice(stations)
            next_station = np.random.choice([s for s in stations if s != current_station])
            
            movement_data.append({
                'timestamp': timestamp,
                'train_number': train,
                'current_station': current_station,
                'next_station': next_station,
                'scheduled_departure': timestamp + timedelta(minutes=np.random.randint(5, 30)),
                'actual_departure': timestamp + timedelta(minutes=np.random.randint(5, 35)),
                'delay_minutes': np.random.randint(-5, 45),
                'platform': np.random.randint(1, 12),
                'speed_kmh': np.random.randint(40, 120),
                'distance_to_next_km': np.random.randint(10, 150),
                'passenger_count': np.random.randint(200, 1200),
                'status': np.random.choice(['Running', 'Stopped', 'Delayed', 'On Time']),
                'fuel_level_percent': np.random.randint(20, 100),
                'engine_temperature': np.random.randint(65, 85),
                'lat': 19.0760 + np.random.uniform(-0.5, 0.5),
                'lon': 72.8777 + np.random.uniform(-0.5, 0.5)
            })
    
    return pd.DataFrame(movement_data)

def generate_sample_static_data():
    """
    Generate sample static infrastructure data
    
    Returns:
        dict: Static infrastructure data
    """
    
    static_data = {
        "stations": [
            {
                "id": "MUM_CENTRAL",
                "name": "Mumbai Central",
                "code": "BCT",
                "lat": 19.0760,
                "lon": 72.8777,
                "type": "terminal",
                "platforms": 12,
                "electrified": True,
                "division": "Mumbai",
                "state": "Maharashtra"
            },
            {
                "id": "DADAR",
                "name": "Dadar",
                "code": "DR",
                "lat": 19.0176,
                "lon": 72.8450,
                "type": "junction",
                "platforms": 8,
                "electrified": True,
                "division": "Mumbai",
                "state": "Maharashtra"
            },
            {
                "id": "THANE",
                "name": "Thane",
                "code": "TNA",
                "lat": 19.2183,
                "lon": 72.9781,
                "type": "junction",
                "platforms": 6,
                "electrified": True,
                "division": "Mumbai",
                "state": "Maharashtra"
            },
            {
                "id": "KALYAN",
                "name": "Kalyan",
                "code": "KYN",
                "lat": 19.2437,
                "lon": 73.1355,
                "type": "junction",
                "platforms": 10,
                "electrified": True,
                "division": "Mumbai",
                "state": "Maharashtra"
            },
            {
                "id": "LONAVALA",
                "name": "Lonavala",
                "code": "LNL",
                "lat": 18.7484,
                "lon": 73.4066,
                "type": "station",
                "platforms": 4,
                "electrified": True,
                "division": "Pune",
                "state": "Maharashtra"
            },
            {
                "id": "PUNE",
                "name": "Pune",
                "code": "PUNE",
                "lat": 18.5204,
                "lon": 73.8567,
                "type": "terminal",
                "platforms": 8,
                "electrified": True,
                "division": "Pune",
                "state": "Maharashtra"
            }
        ],
        "routes": [
            {
                "id": "MUM_PUNE",
                "name": "Mumbai-Pune Route",
                "stations": ["MUM_CENTRAL", "DADAR", "THANE", "KALYAN", "LONAVALA", "PUNE"],
                "distance_km": 192,
                "electrified": True,
                "gauge": "broad",
                "max_speed_kmh": 130
            },
            {
                "id": "MUM_NASH",
                "name": "Mumbai-Nashik Route", 
                "stations": ["MUM_CENTRAL", "DADAR", "THANE", "KALYAN"],
                "distance_km": 182,
                "electrified": True,
                "gauge": "broad",
                "max_speed_kmh": 110
            }
        ],
        "signals": [
            {
                "id": "SIG_001",
                "location": "MUM_CENTRAL_OUT",
                "type": "automatic",
                "status": "green",
                "lat": 19.0765,
                "lon": 72.8780
            },
            {
                "id": "SIG_002", 
                "location": "DADAR_JN",
                "type": "semi_automatic",
                "status": "green",
                "lat": 19.0180,
                "lon": 72.8455
            }
        ],
        "infrastructure": {
            "total_track_km": 892,
            "electrified_km": 845,
            "double_line_km": 456,
            "stations_count": 78,
            "major_junctions": 12,
            "maintenance_depots": 8
        }
    }
    
    return static_data

def cache_data(data, cache_key, ttl_seconds=3600):
    """
    Cache data in Streamlit session state with TTL
    
    Args:
        data: Data to cache
        cache_key (str): Unique key for the cached data
        ttl_seconds (int): Time to live in seconds
    
    Returns:
        bool: True if cached successfully
    """
    
    try:
        cache_entry = {
            'data': data,
            'timestamp': datetime.now(),
            'ttl_seconds': ttl_seconds
        }
        
        # Initialize cache if it doesn't exist
        if 'data_cache' not in st.session_state:
            st.session_state.data_cache = {}
        
        st.session_state.data_cache[cache_key] = cache_entry
        return True
    
    except Exception as e:
        st.error(f"Error caching data: {str(e)}")
        return False

def get_cached_data(cache_key):
    """
    Retrieve cached data if still valid
    
    Args:
        cache_key (str): Key for the cached data
    
    Returns:
        data or None: Cached data if valid, None otherwise
    """
    
    try:
        if 'data_cache' not in st.session_state:
            return None
        
        if cache_key not in st.session_state.data_cache:
            return None
        
        cache_entry = st.session_state.data_cache[cache_key]
        
        # Check if cache is still valid
        elapsed_time = (datetime.now() - cache_entry['timestamp']).total_seconds()
        
        if elapsed_time > cache_entry['ttl_seconds']:
            # Cache expired, remove it
            del st.session_state.data_cache[cache_key]
            return None
        
        return cache_entry['data']
    
    except Exception as e:
        st.error(f"Error retrieving cached data: {str(e)}")
        return None

def preprocess_movement_data(df):
    """
    Preprocess movement data for analysis
    
    Args:
        df (pd.DataFrame): Raw movement data
    
    Returns:
        pd.DataFrame: Preprocessed data
    """
    
    # Make a copy to avoid modifying original data
    processed_df = df.copy()
    
    # Convert timestamp columns
    if 'timestamp' in processed_df.columns:
        processed_df['timestamp'] = pd.to_datetime(processed_df['timestamp'])
    
    if 'scheduled_departure' in processed_df.columns:
        processed_df['scheduled_departure'] = pd.to_datetime(processed_df['scheduled_departure'])
    
    if 'actual_departure' in processed_df.columns:
        processed_df['actual_departure'] = pd.to_datetime(processed_df['actual_departure'])
    
    # Calculate derived metrics
    if 'scheduled_departure' in processed_df.columns and 'actual_departure' in processed_df.columns:
        processed_df['actual_delay'] = (
            processed_df['actual_departure'] - processed_df['scheduled_departure']
        ).dt.total_seconds() / 60  # Convert to minutes
    
    # Add time-based features
    if 'timestamp' in processed_df.columns:
        processed_df['hour'] = processed_df['timestamp'].dt.hour
        processed_df['day_of_week'] = processed_df['timestamp'].dt.dayofweek
        processed_df['is_weekend'] = processed_df['day_of_week'].isin([5, 6])
    
    # Clean and validate data
    processed_df = processed_df.dropna(subset=['train_number', 'current_station'])
    
    return processed_df

def get_real_time_data():
    """
    Simulate real-time data feed
    
    Returns:
        dict: Real-time operational data
    """
    
    current_time = datetime.now()
    
    # Generate current operational metrics
    real_time_data = {
        'timestamp': current_time,
        'active_trains': np.random.randint(50, 80),
        'on_time_percentage': np.random.uniform(85, 98),
        'average_delay': np.random.uniform(5, 25),
        'platform_utilization': np.random.uniform(60, 90),
        'signal_status': {
            'green': np.random.randint(180, 200),
            'yellow': np.random.randint(5, 15), 
            'red': np.random.randint(2, 8)
        },
        'weather_conditions': {
            'temperature': np.random.randint(25, 35),
            'humidity': np.random.randint(60, 85),
            'visibility': np.random.choice(['Clear', 'Hazy', 'Foggy'], p=[0.7, 0.2, 0.1]),
            'precipitation': np.random.choice(['None', 'Light', 'Heavy'], p=[0.8, 0.15, 0.05])
        },
        'network_health': {
            'track_circuits': np.random.uniform(95, 99),
            'communication_systems': np.random.uniform(98, 100),
            'power_supply': np.random.uniform(96, 99),
            'signaling_systems': np.random.uniform(97, 100)
        }
    }
    
    return real_time_data

def export_data(df, format='csv', filename=None):
    """
    Export data in various formats
    
    Args:
        df (pd.DataFrame): Data to export
        format (str): Export format ('csv', 'excel', 'json')
        filename (str): Optional filename
    
    Returns:
        bytes: Exported data as bytes
    """
    
    if filename is None:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"pragati_data_{timestamp}"
    
    if format.lower() == 'csv':
        return df.to_csv(index=False).encode('utf-8')
    elif format.lower() == 'excel':
        output = pd.ExcelWriter(f"{filename}.xlsx", engine='xlsxwriter')
        df.to_excel(output, index=False)
        output.save()
        return output
    elif format.lower() == 'json':
        return df.to_json(orient='records', date_format='iso').encode('utf-8')
    else:
        raise ValueError(f"Unsupported format: {format}")

def validate_data_quality(df):
    """
    Validate data quality and return quality metrics
    
    Args:
        df (pd.DataFrame): Data to validate
    
    Returns:
        dict: Data quality metrics
    """
    
    quality_metrics = {
        'total_records': len(df),
        'missing_values': df.isnull().sum().sum(),
        'duplicate_records': df.duplicated().sum(),
        'data_completeness': (1 - df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100,
        'column_stats': {},
        'quality_score': 0
    }
    
    # Calculate column-wise statistics
    for col in df.columns:
        quality_metrics['column_stats'][col] = {
            'missing_count': df[col].isnull().sum(),
            'missing_percentage': (df[col].isnull().sum() / len(df)) * 100,
            'unique_values': df[col].nunique() if df[col].dtype == 'object' else None,
            'data_type': str(df[col].dtype)
        }
    
    # Calculate overall quality score
    completeness_score = quality_metrics['data_completeness']
    uniqueness_score = max(0, 100 - (quality_metrics['duplicate_records'] / len(df)) * 100)
    quality_metrics['quality_score'] = (completeness_score + uniqueness_score) / 2
    
    return quality_metrics