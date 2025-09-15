import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np

def display_kpis(metrics_data):
    """
    Display key performance indicators in a formatted layout
    
    Args:
        metrics_data (dict): Dictionary containing KPI metrics
    
    Returns:
        None: Displays metrics directly in Streamlit
    """
    
    # Create columns for metrics
    num_metrics = len(metrics_data)
    cols = st.columns(num_metrics)
    
    for i, (metric_name, metric_info) in enumerate(metrics_data.items()):
        with cols[i]:
            value = metric_info.get('value', 0)
            delta = metric_info.get('delta', None)
            unit = metric_info.get('unit', '')
            
            # Format the value
            if unit == '%':
                formatted_value = f"{value}%"
            elif unit == 'minutes':
                formatted_value = f"{value} min"
            elif unit == 'count':
                formatted_value = str(value)
            else:
                formatted_value = f"{value} {unit}"
            
            st.metric(
                label=metric_name,
                value=formatted_value,
                delta=delta
            )

def create_metric_card(title, value, subtitle=None, color="primary", icon=None):
    """
    Create a custom metric card with styling
    
    Args:
        title (str): Main title of the metric
        value (str/int/float): The metric value
        subtitle (str): Optional subtitle
        color (str): Color theme for the card
        icon (str): Optional icon name
    
    Returns:
        str: HTML string for the metric card
    """
    
    # Color mapping
    color_map = {
        "primary": {"bg": "#3b82f6", "text": "#ffffff"},
        "success": {"bg": "#10b981", "text": "#ffffff"},
        "warning": {"bg": "#f59e0b", "text": "#ffffff"},
        "danger": {"bg": "#ef4444", "text": "#ffffff"},
        "info": {"bg": "#06b6d4", "text": "#ffffff"}
    }
    
    colors = color_map.get(color, color_map["primary"])
    icon_html = f"<i class='fa fa-{icon}'></i> " if icon else ""
    subtitle_html = f"<p style='margin: 0; font-size: 0.9rem; opacity: 0.8;'>{subtitle}</p>" if subtitle else ""
    
    card_html = f"""
    <div style="
        background: {colors['bg']};
        color: {colors['text']};
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin: 0.5rem 0;
        text-align: center;
    ">
        <h3 style="margin: 0; font-size: 2rem; font-weight: bold;">
            {icon_html}{value}
        </h3>
        <p style="margin: 0.5rem 0 0 0; font-size: 1rem; font-weight: 500;">
            {title}
        </p>
        {subtitle_html}
    </div>
    """
    
    return card_html

def format_performance_metrics(data, time_column='timestamp', value_column='value'):
    """
    Format performance metrics data for visualization
    
    Args:
        data (pd.DataFrame): Performance data
        time_column (str): Name of the time column
        value_column (str): Name of the value column
    
    Returns:
        dict: Formatted metrics with statistics
    """
    
    if data.empty:
        return {
            'current_value': 0,
            'average': 0,
            'trend': 'stable',
            'change_percent': 0
        }
    
    # Calculate metrics
    current_value = data[value_column].iloc[-1] if len(data) > 0 else 0
    average = data[value_column].mean()
    
    # Calculate trend
    if len(data) >= 2:
        recent_avg = data[value_column].tail(5).mean()
        older_avg = data[value_column].head(5).mean()
        change_percent = ((recent_avg - older_avg) / older_avg * 100) if older_avg != 0 else 0
        
        if change_percent > 5:
            trend = 'improving'
        elif change_percent < -5:
            trend = 'declining'
        else:
            trend = 'stable'
    else:
        trend = 'stable'
        change_percent = 0
    
    return {
        'current_value': round(current_value, 2),
        'average': round(average, 2),
        'trend': trend,
        'change_percent': round(change_percent, 2)
    }

def create_gauge_chart(value, title, min_val=0, max_val=100, thresholds=None):
    """
    Create a gauge chart for displaying single metrics
    
    Args:
        value (float): Current value to display
        title (str): Chart title
        min_val (float): Minimum value for the gauge
        max_val (float): Maximum value for the gauge
        thresholds (dict): Optional thresholds for color coding
    
    Returns:
        plotly.graph_objects.Figure: Gauge chart figure
    """
    
    # Default thresholds
    if thresholds is None:
        thresholds = {
            'poor': max_val * 0.6,
            'fair': max_val * 0.8,
            'good': max_val
        }
    
    fig = go.Figure(go.Indicator(
        mode = "gauge+number+delta",
        value = value,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': title},
        delta = {'reference': thresholds['fair']},
        gauge = {
            'axis': {'range': [None, max_val]},
            'bar': {'color': "darkblue"},
            'steps': [
                {'range': [min_val, thresholds['poor']], 'color': "lightgray"},
                {'range': [thresholds['poor'], thresholds['fair']], 'color': "yellow"},
                {'range': [thresholds['fair'], thresholds['good']], 'color': "lightgreen"}
            ],
            'threshold': {
                'line': {'color': "red", 'width': 4},
                'thickness': 0.75,
                'value': thresholds['good'] * 0.9
            }
        }
    ))
    
    fig.update_layout(height=300)
    return fig

def create_performance_dashboard(performance_data):
    """
    Create a comprehensive performance dashboard
    
    Args:
        performance_data (dict): Dictionary containing various performance metrics
    
    Returns:
        plotly.graph_objects.Figure: Combined dashboard figure
    """
    
    # Create subplots
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=("On-Time Performance", "Capacity Utilization", 
                       "Fuel Efficiency", "Asset Health"),
        specs=[[{"type": "indicator"}, {"type": "indicator"}],
               [{"type": "indicator"}, {"type": "indicator"}]]
    )
    
    # Add gauge charts
    metrics = [
        ("on_time_performance", "On-Time %", 1, 1),
        ("capacity_utilization", "Capacity %", 1, 2), 
        ("fuel_efficiency", "Efficiency %", 2, 1),
        ("asset_health", "Health Score", 2, 2)
    ]
    
    for metric_key, title, row, col in metrics:
        value = performance_data.get(metric_key, 0)
        
        fig.add_trace(
            go.Indicator(
                mode="gauge+number",
                value=value,
                title={'text': title},
                gauge={
                    'axis': {'range': [None, 100]},
                    'bar': {'color': "darkblue"},
                    'steps': [
                        {'range': [0, 60], 'color': "lightgray"},
                        {'range': [60, 80], 'color': "yellow"},
                        {'range': [80, 100], 'color': "lightgreen"}
                    ]
                }
            ),
            row=row, col=col
        )
    
    fig.update_layout(height=600, title_text="Performance Dashboard")
    return fig

def create_trend_chart(data, x_col, y_col, title, color='blue'):
    """
    Create a trend line chart
    
    Args:
        data (pd.DataFrame): Data for the chart
        x_col (str): Column name for x-axis
        y_col (str): Column name for y-axis
        title (str): Chart title
        color (str): Line color
    
    Returns:
        plotly.express.line: Line chart figure
    """
    
    fig = px.line(
        data, 
        x=x_col, 
        y=y_col,
        title=title,
        markers=True
    )
    
    fig.update_traces(line_color=color)
    fig.update_layout(
        xaxis_title=x_col.title(),
        yaxis_title=y_col.title(),
        hovermode='x unified'
    )
    
    return fig

def display_alert_summary(alerts_data):
    """
    Display a summary of system alerts
    
    Args:
        alerts_data (list): List of alert dictionaries
    
    Returns:
        None: Displays alerts directly in Streamlit
    """
    
    if not alerts_data:
        st.info("🟢 No active alerts")
        return
    
    # Count alerts by severity
    severity_counts = {}
    for alert in alerts_data:
        severity = alert.get('severity', 'low')
        severity_counts[severity] = severity_counts.get(severity, 0) + 1
    
    # Display summary
    col1, col2, col3 = st.columns(3)
    
    with col1:
        high_count = severity_counts.get('high', 0)
        st.metric("🔴 High Priority", high_count)
    
    with col2:
        medium_count = severity_counts.get('medium', 0)
        st.metric("🟡 Medium Priority", medium_count)
    
    with col3:
        low_count = severity_counts.get('low', 0)
        st.metric("🟢 Low Priority", low_count)
    
    # Display individual alerts
    st.subheader("Active Alerts")
    for alert in alerts_data:
        severity = alert.get('severity', 'low')
        message = alert.get('message', 'No message')
        timestamp = alert.get('timestamp', 'Unknown time')
        
        # Color coding
        if severity == 'high':
            color = "#fee2e2"
            border_color = "#dc2626"
        elif severity == 'medium':
            color = "#fef3c7"
            border_color = "#f59e0b"
        else:
            color = "#dcfce7"
            border_color = "#16a34a"
        
        st.markdown(f"""
        <div style="
            background: {color};
            border: 1px solid {border_color};
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem 0;
        ">
            <strong>{severity.upper()}</strong> - {timestamp}<br>
            {message}
        </div>
        """, unsafe_allow_html=True)

def calculate_operational_score(metrics):
    """
    Calculate an overall operational performance score
    
    Args:
        metrics (dict): Dictionary of operational metrics
    
    Returns:
        dict: Overall score and breakdown
    """
    
    weights = {
        'on_time_performance': 0.3,
        'capacity_utilization': 0.2,
        'asset_health': 0.25,
        'safety_score': 0.15,
        'efficiency_score': 0.1
    }
    
    total_score = 0
    total_weight = 0
    
    for metric, weight in weights.items():
        if metric in metrics:
            total_score += metrics[metric] * weight
            total_weight += weight
    
    overall_score = total_score / total_weight if total_weight > 0 else 0
    
    # Grade the score
    if overall_score >= 90:
        grade = "A+"
        status = "Excellent"
    elif overall_score >= 80:
        grade = "A"
        status = "Good"
    elif overall_score >= 70:
        grade = "B"
        status = "Fair"
    else:
        grade = "C"
        status = "Needs Improvement"
    
    return {
        'overall_score': round(overall_score, 1),
        'grade': grade,
        'status': status,
        'breakdown': {k: metrics.get(k, 0) for k in weights.keys()}
    }