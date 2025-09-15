import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
from datetime import datetime, timedelta

# Page config
st.set_page_config(
    page_title="🛠️ Asset Insights - Ratlam Division",
    page_icon="🛠️",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .asset-card {
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border-left: 4px solid #007bff;
        margin: 1rem 0;
    }
    .severity-high {
        border-left-color: #dc3545 !important;
        background-color: #ffebee;
    }
    .severity-medium {
        border-left-color: #ffc107 !important;
        background-color: #fff3e0;
    }
    .severity-low {
        border-left-color: #28a745 !important;
        background-color: #e8f5e8;
    }
    .asset-detail {
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #dee2e6;
        margin: 1rem 0;
    }
    .alert-log {
        background-color: #fff5f5;
        padding: 0.8rem;
        border-radius: 0.3rem;
        border-left: 3px solid #f56565;
        margin: 0.5rem 0;
        font-family: monospace;
        font-size: 0.9rem;
    }
    .maintenance-history {
        background-color: #f0f8ff;
        padding: 0.8rem;
        border-radius: 0.3rem;
        border-left: 3px solid #4299e1;
        margin: 0.5rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.title("🛠️ Asset Insights - Ratlam Division")
st.markdown("**Predictive Maintenance and Asset Health Monitoring**")

# Current time
current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
st.markdown(f"**Last Updated:** {current_time}")

# Asset Overview KPIs
st.markdown("## 📊 Asset Health Overview")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label="🚂 Total Locomotives",
        value="23",
        delta="1 (new)"
    )

with col2:
    st.metric(
        label="⚠️ Assets Flagged",
        value="6",
        delta="2 (24h)"
    )

with col3:
    st.metric(
        label="🔧 Pending Maintenance",
        value="4",
        delta="-1"
    )

with col4:
    st.metric(
        label="📈 System Health",
        value="94.2%",
        delta="1.8%"
    )

# Flagged Assets Table
st.markdown("## 🚨 Flagged Assets")
st.markdown("**Critical assets requiring immediate attention**")

# Create the flagged assets table
flagged_assets_data = {
    'Asset ID': ['Loco #30556', 'Track Seg 25B', 'Signal RTM/3', 'Coach R-4512', 'OHE Sec 12'],
    'Type': ['WAP-7', 'Main Line', 'Home Signal', 'AC Coach', 'Overhead Equipment'],
    'Current Train': ['12962 Avantika Exp', 'Dewas - Barlai', 'Ratlam Junction', '19303 INDB-BPL', 'UJN-INDB Section'],
    'Last Seen': ['Naranjipura', 'N/A', 'Platform 2', 'Dewas Junction', 'Near Vikramnagar'],
    'Issue Detected': ['Underperformance on Gradient', 'High Vibration Reported', 'Aspect Change Delay', 'AC Compressor Issue', 'Voltage Fluctuation'],
    'Severity': ['MEDIUM', 'LOW', 'HIGH', 'MEDIUM', 'HIGH']
}

df_flagged = pd.DataFrame(flagged_assets_data)

# Apply color coding based on severity
def highlight_severity(row):
    if row['Severity'] == 'HIGH':
        return ['background-color: #ffebee'] * len(row)
    elif row['Severity'] == 'MEDIUM':
        return ['background-color: #fff3e0'] * len(row)
    else:
        return ['background-color: #e8f5e8'] * len(row)

styled_flagged = df_flagged.style.apply(highlight_severity, axis=1)
st.dataframe(styled_flagged, use_container_width=True, hide_index=True)

# Detailed Asset View
st.markdown("## 🔍 Detailed Asset Analysis")

# Asset selection
selected_asset = st.selectbox(
    "Select Asset for Detailed View:",
    ["Loco #30556 (WAP-7)", "Track Seg 25B", "Signal RTM/3", "Coach R-4512", "OHE Sec 12"]
)

if "Loco #30556" in selected_asset:
    st.markdown("### 🚂 Locomotive #30556 - Detailed Analysis")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Performance chart
        st.markdown("#### 📈 Historical Acceleration: INDB-DWX Section")
        
        # Generate sample data for performance chart
        dates = pd.date_range(start='2025-08-17', end='2025-09-16', freq='D')
        np.random.seed(42)
        
        # Simulate declining performance
        normal_performance = 100 + np.random.normal(0, 3, len(dates))
        loco_performance = 100 + np.random.normal(-5, 4, len(dates))
        
        # Make recent performance worse
        loco_performance[-7:] = loco_performance[-7:] - np.linspace(0, 10, 7)
        
        fig_performance = go.Figure()
        
        fig_performance.add_trace(go.Scatter(
            x=dates,
            y=normal_performance,
            mode='lines',
            name='30-day Average',
            line=dict(color='blue', dash='dash')
        ))
        
        fig_performance.add_trace(go.Scatter(
            x=dates,
            y=loco_performance,
            mode='lines+markers',
            name='Loco #30556',
            line=dict(color='red'),
            marker=dict(size=4)
        ))
        
        fig_performance.update_layout(
            title='Acceleration Performance Trend',
            xaxis_title='Date',
            yaxis_title='Performance Index',
            height=400,
            showlegend=True
        )
        
        st.plotly_chart(fig_performance, use_container_width=True)
        
        # Power consumption chart
        st.markdown("#### ⚡ Power Consumption Analysis")
        
        # Generate power consumption data
        hours = list(range(24))
        normal_power = [800, 750, 700, 680, 720, 850, 950, 1200, 1300, 1250, 1100, 1150,
                       1200, 1250, 1300, 1350, 1400, 1200, 1100, 1000, 950, 900, 850, 820]
        loco_power = [p * 1.09 for p in normal_power]  # 9% higher consumption
        
        fig_power = go.Figure()
        
        fig_power.add_trace(go.Scatter(
            x=hours,
            y=normal_power,
            mode='lines',
            name='Normal Range',
            line=dict(color='green')
        ))
        
        fig_power.add_trace(go.Scatter(
            x=hours,
            y=loco_power,
            mode='lines+markers',
            name='Loco #30556 (Current)',
            line=dict(color='orange'),
            marker=dict(size=4)
        ))
        
        fig_power.update_layout(
            title='24-Hour Power Consumption Pattern',
            xaxis_title='Hour of Day',
            yaxis_title='Power Draw (kW)',
            height=400
        )
        
        st.plotly_chart(fig_power, use_container_width=True)
    
    with col2:
        # Alert Log
        st.markdown("#### 🚨 Alert Log")
        
        alerts = [
            {'time': '16/09/2025 11:30', 'alert': 'Anomaly Detected: Power Draw +9%'},
            {'time': '15/09/2025 20:15', 'alert': 'Anomaly Detected: Acceleration -7%'},
            {'time': '14/09/2025 14:22', 'alert': 'Performance Alert: Gradient Climbing'},
            {'time': '13/09/2025 09:45', 'alert': 'Routine Check: All Parameters Normal'},
            {'time': '11/09/2025 16:30', 'alert': 'Anomaly Detected: Temperature +5°C'}
        ]
        
        for alert in alerts:
            severity_class = "alert-log" if "Anomaly" in alert['alert'] else "maintenance-history"
            st.markdown(f"""
            <div class="{severity_class}">
                <strong>{alert['time']}</strong><br>
                {alert['alert']}
            </div>
            """, unsafe_allow_html=True)
        
        # Maintenance History
        st.markdown("#### 🔧 Maintenance History")
        
        maintenance_records = [
            {'date': '01/08/2025', 'type': 'Scheduled Service', 'status': 'Completed'},
            {'date': '15/06/2025', 'type': 'Brake System Check', 'status': 'Completed'},
            {'date': '02/05/2025', 'type': 'Engine Overhaul', 'status': 'Completed'},
            {'date': '20/03/2025', 'type': 'Electrical System', 'status': 'Completed'}
        ]
        
        for record in maintenance_records:
            st.markdown(f"""
            <div class="maintenance-history">
                <strong>{record['date']}</strong><br>
                {record['type']}<br>
                <em>Status: {record['status']}</em>
            </div>
            """, unsafe_allow_html=True)
        
        # Recommendations
        st.markdown("#### 💡 AI Recommendations")
        
        recommendations = [
            "Schedule performance check-up within 48 hours",
            "Inspect traction motor connections",
            "Check power circuit efficiency",
            "Monitor gradient performance closely"
        ]
        
        for i, rec in enumerate(recommendations, 1):
            st.markdown(f"**{i}.** {rec}")

# Asset Performance Overview
st.markdown("## 📊 Fleet Performance Overview")

col1, col2 = st.columns(2)

with col1:
    # Locomotive efficiency chart
    loco_data = {
        'Locomotive': ['#30556', '#30245', '#30789', '#30123', '#30667'],
        'Efficiency (%)': [91, 96, 98, 95, 93],
        'Status': ['Flagged', 'Good', 'Excellent', 'Good', 'Good']
    }
    
    df_loco = pd.DataFrame(loco_data)
    
    fig_efficiency = px.bar(
        df_loco,
        x='Locomotive',
        y='Efficiency (%)',
        color='Status',
        title='Locomotive Efficiency Comparison',
        color_discrete_map={'Flagged': 'red', 'Good': 'orange', 'Excellent': 'green'}
    )
    
    st.plotly_chart(fig_efficiency, use_container_width=True)

with col2:
    # Maintenance schedule
    st.markdown("### 📅 Upcoming Maintenance Schedule")
    
    maintenance_schedule = {
        'Asset': ['Loco #30245', 'Track UJN-INDB', 'Signal NAD/5', 'Coach Set A', 'OHE RTM-NAD'],
        'Type': ['A-Check', 'Ultrasonic Test', 'Relay Replacement', 'Interior Refresh', 'Insulator Check'],
        'Due Date': ['18/09/2025', '20/09/2025', '22/09/2025', '25/09/2025', '28/09/2025'],
        'Priority': ['High', 'Medium', 'Low', 'Medium', 'High']
    }
    
    df_maintenance = pd.DataFrame(maintenance_schedule)
    
    def highlight_priority(row):
        if row['Priority'] == 'High':
            return ['background-color: #ffebee'] * len(row)
        elif row['Priority'] == 'Medium':
            return ['background-color: #fff3e0'] * len(row)
        else:
            return ['background-color: #e8f5e8'] * len(row)
    
    styled_maintenance = df_maintenance.style.apply(highlight_priority, axis=1)
    st.dataframe(styled_maintenance, use_container_width=True, hide_index=True)

# Predictive Analytics
st.markdown("## 🔮 Predictive Analytics")

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("### 📈 Failure Probability")
    
    # Risk assessment gauge
    fig_gauge = go.Figure(go.Indicator(
        mode = "gauge+number+delta",
        value = 23,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': "Loco #30556 Risk Score"},
        delta = {'reference': 15},
        gauge = {
            'axis': {'range': [None, 100]},
            'bar': {'color': "darkblue"},
            'steps': [
                {'range': [0, 25], 'color': "lightgray"},
                {'range': [25, 50], 'color': "gray"},
                {'range': [50, 100], 'color': "red"}],
            'threshold': {
                'line': {'color': "red", 'width': 4},
                'thickness': 0.75,
                'value': 90}}))
    
    fig_gauge.update_layout(height=300)
    st.plotly_chart(fig_gauge, use_container_width=True)

with col2:
    st.markdown("### ⏰ Predicted Failures")
    
    predicted_failures = {
        'Asset': ['Loco #30556', 'Signal RTM/3', 'Track Seg 25B'],
        'Component': ['Traction Motor', 'Relay Unit', 'Rail Joint'],
        'Probability': ['65%', '78%', '34%'],
        'Time Frame': ['2-3 weeks', '1 week', '2 months']
    }
    
    df_predictions = pd.DataFrame(predicted_failures)
    st.dataframe(df_predictions, use_container_width=True, hide_index=True)

with col3:
    st.markdown("### 💰 Cost Impact Analysis")
    
    cost_data = {
        'Scenario': ['Preventive', 'Reactive', 'Failure'],
        'Cost (₹)': [50000, 150000, 450000],
        'Downtime (hrs)': [4, 12, 48]
    }
    
    df_cost = pd.DataFrame(cost_data)
    
    fig_cost = px.bar(
        df_cost,
        x='Scenario',
        y='Cost (₹)',
        title='Maintenance Cost Comparison',
        color='Scenario'
    )
    
    st.plotly_chart(fig_cost, use_container_width=True)

# Asset Health Trends
st.markdown("## 📉 Asset Health Trends")

# Generate trend data for multiple assets
asset_names = ['Loco #30556', 'Loco #30245', 'Loco #30789', 'Track UJN-INDB', 'Signal RTM/3']
dates = pd.date_range(start='2025-08-01', end='2025-09-16', freq='D')

fig_trends = go.Figure()

colors = ['red', 'green', 'blue', 'orange', 'purple']

for i, asset in enumerate(asset_names):
    # Generate sample health scores
    np.random.seed(i * 10)
    if asset == 'Loco #30556':
        health_scores = 95 + np.random.normal(-2, 3, len(dates))  # Declining
        health_scores[-14:] = health_scores[-14:] - np.linspace(0, 8, 14)
    else:
        health_scores = 95 + np.random.normal(0, 2, len(dates))  # Stable
    
    fig_trends.add_trace(go.Scatter(
        x=dates,
        y=health_scores,
        mode='lines',
        name=asset,
        line=dict(color=colors[i])
    ))

fig_trends.update_layout(
    title='Asset Health Score Trends (30 Days)',
    xaxis_title='Date',
    yaxis_title='Health Score (%)',
    height=400,
    showlegend=True
)

st.plotly_chart(fig_trends, use_container_width=True)

# Action Buttons
st.markdown("---")
col1, col2, col3, col4 = st.columns(4)

with col1:
    if st.button("🔧 Schedule Maintenance", type="primary"):
        st.success("Maintenance request submitted for Loco #30556")

with col2:
    if st.button("📊 Generate Report"):
        st.info("Generating comprehensive asset health report...")

with col3:
    if st.button("⚠️ Set Alert Threshold"):
        st.info("Opening alert configuration panel...")

with col4:
    if st.button("📍 Back to Dashboard"):
        st.switch_page("pages/Divisional_Dashboard.py")

st.markdown("**Note:** AI-powered predictive analytics update every 6 hours. Critical alerts are sent in real-time.")