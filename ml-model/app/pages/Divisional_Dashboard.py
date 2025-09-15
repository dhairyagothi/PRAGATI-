import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import folium
from streamlit_folium import st_folium
import numpy as np
from datetime import datetime, timedelta
import time

# Page config
st.set_page_config(
    page_title="📍 Divisional Dashboard - Ratlam Division",
    page_icon="📍",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .alert-high {
        background-color: #ffebee;
        border-left: 4px solid #f44336;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
    }
    .alert-medium {
        background-color: #fff3e0;
        border-left: 4px solid #ff9800;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
    }
    .train-status {
        padding: 0.5rem;
        border-radius: 0.25rem;
        margin: 0.25rem 0;
        font-weight: bold;
    }
    .status-rt { background-color: #e8f5e8; color: #2e7d32; }
    .status-delay { background-color: #fff3e0; color: #f57c00; }
    .status-late { background-color: #ffebee; color: #d32f2f; }
</style>
""", unsafe_allow_html=True)

# Header
st.title("📍 Ratlam (RTM) Divisional Dashboard")
st.markdown("**Live Operations Monitoring for Ratlam Division - Western Railway**")

# Current time
current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
st.markdown(f"**Last Updated:** {current_time}")

# Live Operations Map Section
st.markdown("## 🗺️ Live Operations Map")
st.markdown("**Visible Sections:** RTM-NAD, RTM-DHD, RTM-COR, NAD-UJN, UJN-INDB, UJN-BPL")

# Create the railway map
def create_railway_map():
    # Center map on Ratlam Division
    m = folium.Map(location=[23.3315, 75.0367], zoom_start=9)
    
    # Ratlam Division stations with coordinates
    stations = {
        'RTM': {'name': 'Ratlam Junction', 'lat': 23.3315, 'lon': 75.0367},
        'NAD': {'name': 'Nagda Junction', 'lat': 23.4583, 'lon': 75.4167},
        'UJN': {'name': 'Ujjain Junction', 'lat': 23.1765, 'lon': 75.7885},
        'INDB': {'name': 'Indore Junction', 'lat': 22.7196, 'lon': 75.8577},
        'DWX': {'name': 'Dewas', 'lat': 22.9676, 'lon': 76.0534},
        'DHD': {'name': 'Dahod', 'lat': 22.8372, 'lon': 74.2537},
        'COR': {'name': 'Chittaurgarh', 'lat': 24.8887, 'lon': 74.6269},
        'NMH': {'name': 'Nimach', 'lat': 24.4667, 'lon': 74.8833},
        'MDS': {'name': 'Mandsaur', 'lat': 24.0764, 'lon': 75.0709},
        'MKC': {'name': 'Maksi Junction', 'lat': 23.2833, 'lon': 76.1500},
        'NRG': {'name': 'Naranjipura', 'lat': 22.95, 'lon': 75.6},
        'VKG': {'name': 'Vikramnagar', 'lat': 23.0, 'lon': 75.65}
    }
    
    # Add stations to map
    for code, info in stations.items():
        folium.Marker(
            [info['lat'], info['lon']],
            popup=f"{code}: {info['name']}",
            tooltip=f"{code}",
            icon=folium.Icon(color='blue', icon='home')
        ).add_to(m)
    
    # Sample train positions with specific details
    trains = [
        {
            'id': '12919', 'name': 'Malwa SF Express', 'lat': 22.95, 'lon': 75.6, 
            'status': 'late', 'delay': '10m', 'speed': '95', 'next_stop': 'Ujjain Jn (UJN)',
            'loco_pilot': 'LP-001'
        },
        {
            'id': '19303', 'name': 'INDB-BPL Express', 'lat': 22.9676, 'lon': 76.0534, 
            'status': 'delay', 'delay': '5m', 'speed': '78', 'next_stop': 'Ujjain Jn (UJN)',
            'loco_pilot': 'LP-045'
        },
        {
            'id': '22911', 'name': 'Shipra Express', 'lat': 23.3315, 'lon': 75.0367, 
            'status': 'rt', 'delay': '0m', 'speed': '105', 'next_stop': 'Nagda Jn (NAD)',
            'loco_pilot': 'LP-023'
        },
        {
            'id': '12962', 'name': 'Avantika Express', 'lat': 23.0, 'lon': 75.65, 
            'status': 'delay', 'delay': '8m', 'speed': '85', 'next_stop': 'Ujjain Jn (UJN)',
            'loco_pilot': 'LP-067'
        }
    ]
    
    # Add trains to map with detailed tooltips
    for train in trains:
        color = 'green' if train['status'] == 'rt' else 'orange' if train['status'] == 'delay' else 'red'
        
        folium.Marker(
            [train['lat'], train['lon']],
            popup=f"""
            <b>{train['id']}</b><br>
            <b>Name:</b> {train['name']}<br>
            <b>Speed:</b> {train['speed']} km/h<br>
            <b>Next Stop:</b> {train['next_stop']}<br>
            <b>Delay:</b> {train['delay']}<br>
            <b>Loco Pilot:</b> {train['loco_pilot']}
            """,
            tooltip=f"{train['id']}",
            icon=folium.Icon(color=color, icon='train', prefix='fa')
        ).add_to(m)
    
    # Add track sections
    track_sections = [
        {'name': 'RTM-NAD', 'coords': [[23.3315, 75.0367], [23.4583, 75.4167]], 'status': 'clear'},
        {'name': 'NAD-UJN', 'coords': [[23.4583, 75.4167], [23.1765, 75.7885]], 'status': 'occupied'},
        {'name': 'UJN-INDB', 'coords': [[23.1765, 75.7885], [22.7196, 75.8577]], 'status': 'occupied'},
    ]
    
    for section in track_sections:
        color = 'red' if section['status'] == 'occupied' else 'green'
        folium.PolyLine(
            section['coords'],
            color=color,
            weight=3,
            opacity=0.8,
            popup=f"{section['name']} - {section['status']}"
        ).add_to(m)
    
    return m

# Display map
with st.container():
    col1, col2 = st.columns([3, 1])
    
    with col1:
        railway_map = create_railway_map()
        map_data = st_folium(railway_map, width=800, height=500)
    
    with col2:
        st.markdown("### 🚂 Active Trains")
        st.markdown("**Train Icon Colors:**")
        st.markdown("🟢 **Green:** Right Time (RT)")
        st.markdown("🟡 **Yellow:** Late < 15m")
        st.markdown("🔴 **Red:** Late > 15m")
        
        st.markdown("---")
        
        trains_data = [
            {'Train': '12919', 'Name': 'Malwa SF Express', 'Status': 'Late 10m', 'Speed': '95 km/h'},
            {'Train': '19303', 'Name': 'INDB-BPL Express', 'Status': 'Late 5m', 'Speed': '78 km/h'},
            {'Train': '22911', 'Name': 'Shipra Express', 'Status': 'RT', 'Speed': '105 km/h'},
            {'Train': '12962', 'Name': 'Avantika Express', 'Status': 'Late 8m', 'Speed': '85 km/h'}
        ]
        
        for train in trains_data:
            status_class = "status-rt" if "RT" in train['Status'] else "status-delay" if "5m" in train['Status'] or "8m" in train['Status'] else "status-late"
            st.markdown(f"""
            <div class="train-status {status_class}">
                <strong>{train['Train']}</strong><br>
                {train['Name']}<br>
                {train['Status']} | {train['Speed']}
            </div>
            """, unsafe_allow_html=True)

# Predictive Advisory Panel
st.markdown("## 🎯 Predictive Advisory Panel")
st.markdown("**Real-time conflict detection and optimization recommendations (Highest priority on top)**")

# High Priority Alert
st.markdown("""
<div class="alert-high">
    <h4>🚨 ADVISORY CARD 1 - HIGH PRIORITY</h4>
    <p><strong>Conflict:</strong> Overtake</p>
    <p><strong>Trains:</strong> 12962 Avantika Exp & 19303 INDB-BPL Exp</p>
    <p><strong>Location:</strong> near Naranjpura (NRG)</p>
    <p><strong>Time to Conflict:</strong> 11 minutes</p>
    <p><strong>Recommended Action:</strong> Halt 19303 on Vikramnagar Loop for 8 min</p>
    <p><strong>Predicted Outcome:</strong> Avantika Exp RT; 19303 total delay: 12 min</p>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)
with col1:
    if st.button("✅ Accept", key="accept_1", type="primary"):
        st.success("Recommendation accepted! Dispatching instructions to station controller.")

with col2:
    if st.button("🔬 Simulate", key="simulate_1"):
        st.info("Opening simulation sandbox with current scenario...")

# Medium Priority Alerts
st.markdown("""
<div class="alert-medium">
    <h4>⚠️ ADVISORY CARD 2 - MEDIUM PRIORITY</h4>
    <p><strong>Platform Conflict:</strong> Ujjain Jn Platform 3</p>
    <p><strong>Affected Train:</strong> 22911 Shipra Express</p>
    <p><strong>Issue:</strong> Platform occupied by delayed goods train</p>
    <p><strong>Recommendation:</strong> Re-route to Platform 5</p>
    <p><strong>Impact:</strong> Avoids 20-minute delay</p>
</div>
""", unsafe_allow_html=True)

col3, col4 = st.columns(2)
with col3:
    if st.button("✅ Accept", key="accept_2", type="primary"):
        st.success("Platform re-assignment accepted!")

with col4:
    if st.button("🔬 Simulate", key="simulate_2"):
        st.info("Testing platform reallocation scenario...")

# Real-time KPIs
st.markdown("## 📊 Real-time Performance KPIs")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label="🎯 Divisional Punctuality",
        value="92%",
        delta="2%"
    )

with col2:
    st.metric(
        label="⏱️ Average Delay",
        value="7.3 mins",
        delta="-1.2 mins"
    )

with col3:
    st.metric(
        label="🚂 Trains On Time",
        value="41/45",
        delta="3"
    )

with col4:
    st.metric(
        label="🔄 Route Efficiency",
        value="94.5%",
        delta="1.8%"
    )

# Live train status table
st.markdown("## 🚂 Live Train Status")

# Create detailed train status table
train_status_data = {
    'Train No.': ['12919', '19303', '22911', '12962', '09351'],
    'Train Name': ['Malwa SF Express', 'INDB-BPL Express', 'Shipra Express', 'Avantika Express', 'UJN-INDB Passenger'],
    'Current Location': ['Near NRG', 'Dewas Jn', 'Ratlam Jn', 'Near VKG', 'Ujjain Jn'],
    'Next Stop': ['UJN', 'UJN', 'NAD', 'UJN', 'DWX'],
    'Speed (km/h)': [95, 78, 105, 85, 65],
    'Delay (mins)': [10, 5, 0, 8, 15],
    'Status': ['Late', 'Slight Delay', 'On Time', 'Slight Delay', 'Late'],
    'Platform': ['TBD', 'TBD', 'Departed', '5', '2'],
    'Loco Pilot': ['LP-001', 'LP-045', 'LP-023', 'LP-067', 'LP-012']
}

df_trains = pd.DataFrame(train_status_data)

# Color code the status
def highlight_status(row):
    if row['Status'] == 'On Time':
        return ['background-color: #e8f5e8'] * len(row)
    elif row['Status'] == 'Slight Delay':
        return ['background-color: #fff3e0'] * len(row)
    else:
        return ['background-color: #ffebee'] * len(row)

styled_df = df_trains.style.apply(highlight_status, axis=1)
st.dataframe(styled_df, use_container_width=True)

# Signal and Track Status
st.markdown("## 🚦 Signal & Infrastructure Status")

col1, col2 = st.columns(2)

with col1:
    st.markdown("### 🚦 Signal Status")
    signal_data = {
        'Signal ID': ['RTM/1', 'NAD/3', 'UJN/5', 'INDB/2', 'DWX/1', 'NRG/2'],
        'Location': ['Ratlam Jn', 'Nagda Jn', 'Ujjain Jn', 'Indore Jn', 'Dewas', 'Naranjipura'],
        'Aspect': ['Green', 'Yellow', 'Green', 'Red', 'Green', 'Yellow'],
        'Last Updated': ['10:45', '10:43', '10:44', '10:42', '10:45', '10:44']
    }
    
    df_signals = pd.DataFrame(signal_data)
    st.dataframe(df_signals, use_container_width=True)

with col2:
    st.markdown("### 🛤️ Track Status")
    track_data = {
        'Track Section': ['RTM-NAD', 'NAD-UJN', 'UJN-INDB', 'RTM-DHD', 'UJN-VKG'],
        'Status': ['Clear', 'Occupied', 'Occupied', 'Clear', 'Occupied'],
        'Occupying Train': ['-', '22911', '19303', '-', '12962'],
        'Notes': ['Available', 'Shipra Exp', 'INDB-BPL Exp', 'Available', 'Avantika Exp']
    }
    
    df_tracks = pd.DataFrame(track_data)
    st.dataframe(df_tracks, use_container_width=True)

# Section-wise traffic density
st.markdown("## 🛤️ Section-wise Traffic Analysis")

sections_data = {
    'Section': ['RTM-NAD', 'NAD-UJN', 'UJN-INDB', 'RTM-DHD', 'UJN-MKC', 'RTM-COR'],
    'Active Trains': [8, 12, 15, 6, 9, 4],
    'Capacity Utilization (%)': [65, 80, 95, 45, 70, 30],
    'Average Speed (km/h)': [85, 78, 72, 90, 82, 88],
    'Delays Reported': [2, 4, 6, 1, 3, 0]
}

df_sections = pd.DataFrame(sections_data)

col1, col2 = st.columns(2)

with col1:
    fig_capacity = px.bar(
        df_sections, 
        x='Section', 
        y='Capacity Utilization (%)',
        title='Section-wise Capacity Utilization',
        color='Capacity Utilization (%)',
        color_continuous_scale='RdYlGn_r'
    )
    fig_capacity.update_layout(height=400)
    st.plotly_chart(fig_capacity, use_container_width=True)

with col2:
    fig_speed = px.line(
        df_sections, 
        x='Section', 
        y='Average Speed (km/h)',
        title='Average Speed by Section',
        markers=True
    )
    fig_speed.update_layout(height=400)
    st.plotly_chart(fig_speed, use_container_width=True)

# Auto-refresh and navigation
st.markdown("---")
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    col_a, col_b = st.columns(2)
    with col_a:
        if st.button("🔄 Refresh Dashboard", type="primary"):
            st.rerun()
    with col_b:
        if st.button("🎮 Open Simulation"):
            st.switch_page("pages/Simulation_Sandbox.py")

st.markdown("**Note:** Signal aspects automatically update every 30 seconds. Track status updates in real-time.")