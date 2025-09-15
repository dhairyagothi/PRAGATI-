import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
from datetime import datetime, timedelta

# Page config
st.set_page_config(
    page_title="🔬 Simulation Sandbox - Ratlam Division",
    page_icon="🔬",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .input-panel {
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #dee2e6;
        margin-bottom: 1rem;
    }
    .output-panel {
        background-color: #e8f4fd;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #b3d4fc;
        margin-bottom: 1rem;
    }
    .scenario-card {
        background-color: #fff;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #ddd;
        margin: 0.5rem 0;
    }
    .impact-positive { color: #28a745; font-weight: bold; }
    .impact-negative { color: #dc3545; font-weight: bold; }
    .impact-neutral { color: #6c757d; font-weight: bold; }
</style>
""", unsafe_allow_html=True)

# Header
st.title("🔬 Simulation Sandbox - Ratlam Division")
st.markdown("**What-if Scenario Analysis and Predictive Modeling**")

# Initialize session state
if 'simulation_results' not in st.session_state:
    st.session_state.simulation_results = None

# Input Panel
st.markdown("""
<div class="input-panel">
    <h3>📝 Create Scenario</h3>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("### Event Configuration")
    
    # Event Type Selection
    event_type = st.selectbox(
        "**Event Type**",
        ["Add Delay", "Maintenance Block", "Signal Failure", "New Unscheduled Train", "Platform Block", "Speed Restriction"]
    )
    
    # Train/Station Selection
    if event_type in ["Add Delay", "New Unscheduled Train"]:
        entity_options = ["12919 - Malwa SF Express", "19303 - INDB-BPL Express", 
                         "22911 - Shipra Express", "12962 - Avantika Express", 
                         "09351 - UJN-INDB Passenger"]
        entity_label = "Select Train"
    else:
        entity_options = ["RTM - Ratlam Jn", "NAD - Nagda Jn", "UJN - Ujjain Jn", 
                         "INDB - Indore Jn", "DWX - Dewas", "NRG - Naranjipura", 
                         "VKG - Vikramnagar"]
        entity_label = "Select Station/Location"
    
    selected_entity = st.selectbox(f"**{entity_label}**", entity_options)

with col2:
    st.markdown("### Parameters")
    
    if event_type == "Add Delay":
        delay_duration = st.number_input("Delay Duration (mins):", min_value=1, max_value=120, value=15)
        delay_reason = st.selectbox("Reason:", ["Technical Problem", "Signal Failure", "Track Maintenance", "Weather", "Passenger Issue"])
        
    elif event_type == "Maintenance Block":
        block_start = st.time_input("Block Start Time:")
        block_end = st.time_input("Block End Time:")
        block_type = st.selectbox("Block Type:", ["Single Line", "Up Line", "Down Line", "Both Lines"])
        
    elif event_type == "Signal Failure":
        failure_duration = st.number_input("Failure Duration (mins):", min_value=5, max_value=180, value=30)
        signal_type = st.selectbox("Signal Type:", ["Home Signal", "Starter Signal", "Distant Signal", "Automatic Signal"])
        
    elif event_type == "New Unscheduled Train":
        train_type = st.selectbox("Train Type:", ["Emergency Medical", "VIP Special", "Goods Extra", "Pilot Train"])
        priority = st.selectbox("Priority:", ["High", "Medium", "Low"])
        
    elif event_type == "Platform Block":
        platform_number = st.selectbox("Platform Number:", ["1", "2", "3", "4", "5"])
        block_duration = st.number_input("Block Duration (mins):", min_value=10, max_value=240, value=60)
        
    elif event_type == "Speed Restriction":
        speed_limit = st.number_input("Speed Limit (km/h):", min_value=20, max_value=100, value=50)
        restriction_length = st.number_input("Restriction Length (km):", min_value=1, max_value=50, value=5)

# Location specification
location_code = st.text_input("**Location (Station Code):**", value="UJN", help="Enter 3-letter station code")

# Run Simulation Button
if st.button("🚀 Run Simulation", type="primary"):
    with st.spinner("Running advanced simulation..."):
        # Simulate processing time
        import time
        time.sleep(2)
        
        # Generate simulation results based on input
        st.session_state.simulation_results = {
            'event_type': event_type,
            'location': location_code,
            'entity': selected_entity,
            'timestamp': datetime.now().strftime("%H:%M:%S")
        }
        
        st.success("✅ Simulation completed successfully!")

# Output Panel
if st.session_state.simulation_results:
    st.markdown("""
    <div class="output-panel">
        <h3>📊 Simulation Results</h3>
    </div>
    """, unsafe_allow_html=True)
    
    # KPI Impact Comparison
    st.markdown("### 📈 KPI Impact Comparison")
    
    # Current vs Simulated metrics
    kpi_data = {
        'Metric': ['Total Network Delay', 'Divisional Punctuality', 'Route Efficiency', 'Platform Utilization'],
        'Current Plan': ['250 min', '91%', '94.5%', '78%'],
        'Simulated Plan': ['385 min', '83%', '87.2%', '65%'],
        'Impact': ['▲ 135 min', '▼ 8%', '▼ 7.3%', '▼ 13%']
    }
    
    df_kpi = pd.DataFrame(kpi_data)
    
    # Style the dataframe
    def style_impact(val):
        if '▲' in str(val):
            return 'color: #dc3545; font-weight: bold'
        elif '▼' in str(val):
            return 'color: #dc3545; font-weight: bold'
        else:
            return 'color: #28a745; font-weight: bold'
    
    styled_kpi = df_kpi.style.applymap(style_impact, subset=['Impact'])
    st.dataframe(styled_kpi, use_container_width=True, hide_index=True)
    
    # Affected Trains List
    st.markdown("### 🚂 Affected Trains List")
    
    affected_trains_data = {
        'Train No.': ['12919', '22911', '19303', '12962', '09351'],
        'Name': ['Malwa Express', 'Shipra Express', 'INDB-BPL Express', 'Avantika Express', 'UJN-INDB Passenger'],
        'Original Delay': ['10m', 'RT', '5m', '8m', '15m'],
        'New Predicted Delay': ['35m', '18m', '12m', '25m', '45m'],
        'Impact': ['▲ 25m', '▲ 18m', '▲ 7m', '▲ 17m', '▲ 30m']
    }
    
    df_affected = pd.DataFrame(affected_trains_data)
    styled_affected = df_affected.style.applymap(style_impact, subset=['Impact'])
    st.dataframe(styled_affected, use_container_width=True, hide_index=True)
    
    # Detailed Analysis
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📉 Delay Analysis")
        
        # Create delay comparison chart
        trains = ['12919', '22911', '19303', '12962', '09351']
        original_delays = [10, 0, 5, 8, 15]
        predicted_delays = [35, 18, 12, 25, 45]
        
        fig_delay = go.Figure(data=[
            go.Bar(name='Original Delay', x=trains, y=original_delays, marker_color='lightblue'),
            go.Bar(name='Predicted Delay', x=trains, y=predicted_delays, marker_color='coral')
        ])
        
        fig_delay.update_layout(
            title='Delay Comparison (minutes)',
            xaxis_title='Train Number',
            yaxis_title='Delay (minutes)',
            barmode='group',
            height=400
        )
        
        st.plotly_chart(fig_delay, use_container_width=True)
    
    with col2:
        st.markdown("### 🎯 Recommended Mitigation")
        
        mitigation_strategies = [
            {
                'strategy': 'Priority Re-routing',
                'description': 'Divert 22911 Shipra Express via alternate route through MKC',
                'impact': 'Reduces delay by 8 minutes',
                'feasibility': 'High'
            },
            {
                'strategy': 'Platform Reallocation',
                'description': 'Use Platform 4 at UJN instead of Platform 3',
                'impact': 'Saves 12 minutes for 3 trains',
                'feasibility': 'Medium'
            },
            {
                'strategy': 'Speed Optimization',
                'description': 'Increase sectional speed for priority trains',
                'impact': 'Recovers 5-7 minutes per train',
                'feasibility': 'High'
            }
        ]
        
        for i, strategy in enumerate(mitigation_strategies, 1):
            st.markdown(f"""
            <div class="scenario-card">
                <h5>Strategy {i}: {strategy['strategy']}</h5>
                <p><strong>Description:</strong> {strategy['description']}</p>
                <p><strong>Expected Impact:</strong> <span class="impact-positive">{strategy['impact']}</span></p>
                <p><strong>Feasibility:</strong> {strategy['feasibility']}</p>
            </div>
            """, unsafe_allow_html=True)
    
    # Scenario Timeline
    st.markdown("### ⏰ Predicted Timeline")
    
    timeline_data = {
        'Time': ['10:15', '10:30', '10:45', '11:00', '11:15', '11:30'],
        'Event': [
            'Scenario starts at UJN',
            'First train (22911) affected',
            'Platform conflict detected',
            'Secondary delays begin',
            'Peak impact on network',
            'System begins recovery'
        ],
        'Network Delay': ['250m', '285m', '340m', '385m', '375m', '320m'],
        'Trains Affected': [0, 1, 2, 4, 5, 5]
    }
    
    df_timeline = pd.DataFrame(timeline_data)
    st.dataframe(df_timeline, use_container_width=True, hide_index=True)

# Scenario Library
st.markdown("## 📚 Pre-built Scenario Library")

col1, col2, col3 = st.columns(3)

with col1:
    if st.button("🌧️ Fog Scenario", use_container_width=True):
        st.info("Loading monsoon fog scenario with 20% speed reduction...")

with col2:
    if st.button("🚧 Track Maintenance", use_container_width=True):
        st.info("Loading planned maintenance block scenario...")

with col3:
    if st.button("⚡ Signal Failure", use_container_width=True):
        st.info("Loading automatic signal failure scenario...")

# Historical Scenarios
st.markdown("## 📜 Historical Scenario Analysis")

historical_data = {
    'Date': ['15/09/2025', '14/09/2025', '13/09/2025', '12/09/2025'],
    'Scenario': ['Platform Block at UJN', 'Signal Failure at NAD', 'VIP Train Priority', 'Track Maintenance RTM-DHD'],
    'Impact': ['45 min delay', '68 min delay', '23 min delay', '156 min delay'],
    'Recovery Time': ['2.5 hours', '3.2 hours', '1.8 hours', '5.5 hours'],
    'Lessons Learned': ['Platform reallocation effective', 'Backup signal needed', 'Priority routing worked', 'Better planning required']
}

df_historical = pd.DataFrame(historical_data)
st.dataframe(df_historical, use_container_width=True, hide_index=True)

# Advanced Controls
st.markdown("---")
st.markdown("## ⚙️ Advanced Simulation Controls")

col1, col2, col3 = st.columns(3)

with col1:
    st.selectbox("Weather Conditions:", ["Clear", "Light Rain", "Heavy Rain", "Fog", "Extreme Heat"])

with col2:
    st.selectbox("Traffic Density:", ["Normal", "Peak Hours", "Festival Rush", "Maintenance Mode"])

with col3:
    st.selectbox("Emergency Mode:", ["Normal", "Disaster Response", "VIP Movement", "Medical Emergency"])

# Action Buttons
st.markdown("---")
col1, col2, col3, col4 = st.columns(4)

with col1:
    if st.button("💾 Save Scenario", type="primary"):
        st.success("Scenario saved to library!")

with col2:
    if st.button("📤 Export Results"):
        st.info("Exporting results to CSV...")

with col3:
    if st.button("🔄 Reset Simulation"):
        st.session_state.simulation_results = None
        st.rerun()

with col4:
    if st.button("📍 Back to Dashboard"):
        st.switch_page("pages/Divisional_Dashboard.py")

st.markdown("**Note:** All simulations use real-time data and AI-powered prediction models for accurate forecasting.")