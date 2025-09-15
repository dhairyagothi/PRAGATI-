import streamlit as st
import pandas as pd
from PIL import Image

# Page configuration
st.set_page_config(
    page_title="PRAGATI - Ratlam (RTM) Divisional Intelligence Dashboard",
    page_icon="🚂",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for dark theme
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #1f2937;
        text-align: center;
        margin-bottom: 2rem;
        font-weight: 700;
    }
    .sub-header {
        font-size: 1.5rem;
        color: #374151;
        text-align: center;
        margin-bottom: 3rem;
    }
    .feature-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem;
        border-radius: 15px;
        color: white;
        margin: 1rem 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .metric-card {
        background: #f8fafc;
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid #3b82f6;
    }
    .info-box {
        background: #eff6ff;
        padding: 1.5rem;
        border-radius: 10px;
        border: 1px solid #dbeafe;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Main header
st.markdown('<h1 class="main-header">🚂 PRAGATI - Ratlam (RTM) Divisional Intelligence Dashboard</h1>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Predictive Railway Analytics & Gateway for Advanced Traffic Intelligence</p>', unsafe_allow_html=True)

# Live Divisional KPIs
st.markdown("## 📊 Live Divisional KPIs")
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label="🎯 Punctuality",
        value="92%",
        delta="2%"
    )

with col2:
    st.metric(
        label="⏱️ Average Delay",
        value="7 mins",
        delta="-3 mins"
    )

with col3:
    st.metric(
        label="🚂 Trains Running",
        value="45",
        delta="5"
    )

with col4:
    st.metric(
        label="🚨 HIGH Priority Alerts",
        value="3",
        delta="1"
    )

# Welcome section
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    st.markdown("""
    <div class="info-box">
        <h3>🎯 Mission</h3>
        <p>Transform railway operations through AI-powered predictive analytics, real-time monitoring, and intelligent automation to ensure safer, more efficient, and sustainable rail transportation.</p>
    </div>
    """, unsafe_allow_html=True)

# Key Features
st.markdown("## 🌟 Key Features")

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("""
    <div class="feature-card">
        <h4>📍 Divisional Dashboard</h4>
        <ul>
            <li>Real-time train tracking</li>
            <li>Live conflict detection</li>
            <li>Operational KPIs</li>
            <li>Network health monitoring</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="feature-card">
        <h4>🔬 Simulation Sandbox</h4>
        <ul>
            <li>What-if scenario analysis</li>
            <li>Route optimization</li>
            <li>Delay prediction</li>
            <li>Capacity planning</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class="feature-card">
        <h4>🛠️ Asset Insights</h4>
        <ul>
            <li>Predictive maintenance</li>
            <li>Anomaly detection</li>
            <li>Asset health scoring</li>
            <li>Maintenance scheduling</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

# Quick Stats
st.markdown("## 📊 System Overview")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.markdown("""
    <div class="metric-card">
        <h3>157</h3>
        <p>Active Trains</p>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="metric-card">
        <h3>98.7%</h3>
        <p>On-Time Performance</p>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class="metric-card">
        <h3>23</h3>
        <p>Stations Monitored</p>
    </div>
    """, unsafe_allow_html=True)

with col4:
    st.markdown("""
    <div class="metric-card">
        <h3>99.2%</h3>
        <p>System Uptime</p>
    </div>
    """, unsafe_allow_html=True)

# Navigation Guide
st.markdown("## 🧭 Navigation Guide")

st.markdown("""
### How to Use PRAGATI AI:

1. **📍 Divisional Dashboard**: Start here to get an overview of current operations, see live train positions, and monitor any conflicts or alerts.

2. **🔬 Simulation Sandbox**: Use this for planning and testing scenarios. Input different parameters to see predicted outcomes and optimize operations.

3. **🛠️ Asset Insights**: Check the health of your railway assets, view maintenance recommendations, and track performance metrics.

### Getting Started:
- Navigate using the sidebar on the left
- Each page is designed to be self-contained and interactive
- Hover over charts and components for additional details
- Use the filters and controls to customize your view
""")

# Technology Stack
with st.expander("🔧 Technology Stack"):
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        **Frontend & Visualization:**
        - Streamlit
        - Plotly
        - Folium Maps
        - Pandas
        """)
    
    with col2:
        st.markdown("""
        **Machine Learning:**
        - TensorFlow/Keras
        - Scikit-learn
        - Time Series Forecasting
        - Anomaly Detection
        """)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #6b7280; padding: 2rem;'>
    <p>PRAGATI AI - Developed for Indian Railways | Version 1.0.0</p>
    <p>🌐 Powering the future of railway operations through artificial intelligence</p>
</div>
""", unsafe_allow_html=True)