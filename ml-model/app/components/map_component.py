import folium
import streamlit as st
from folium import plugins
import pandas as pd
import numpy as np

def create_railway_map(center_lat=19.0760, center_lon=72.8777, zoom_start=9):
    """
    Create a base railway map for Mumbai Division
    
    Args:
        center_lat (float): Center latitude for the map
        center_lon (float): Center longitude for the map
        zoom_start (int): Initial zoom level
    
    Returns:
        folium.Map: Base map object
    """
    
    # Create base map
    m = folium.Map(
        location=[center_lat, center_lon],
        zoom_start=zoom_start,
        tiles='OpenStreetMap'
    )
    
    # Add railway stations
    stations = [
        {"name": "Mumbai Central", "lat": 19.0760, "lon": 72.8777, "type": "major"},
        {"name": "Dadar", "lat": 19.0176, "lon": 72.8450, "type": "major"},
        {"name": "Thane", "lat": 19.2183, "lon": 72.9781, "type": "major"},
        {"name": "Kalyan", "lat": 19.2437, "lon": 73.1355, "type": "major"},
        {"name": "Lonavala", "lat": 18.7484, "lon": 73.4066, "type": "junction"},
        {"name": "Karjat", "lat": 18.9107, "lon": 73.3206, "type": "junction"},
        {"name": "Igatpuri", "lat": 19.6961, "lon": 73.5613, "type": "junction"},
        {"name": "Pune", "lat": 18.5204, "lon": 73.8567, "type": "terminal"},
        {"name": "Nashik", "lat": 19.9975, "lon": 73.7898, "type": "terminal"}
    ]
    
    # Add station markers
    for station in stations:
        color = 'red' if station['type'] == 'major' else 'blue' if station['type'] == 'junction' else 'green'
        size = 12 if station['type'] == 'major' else 8
        
        folium.CircleMarker(
            location=[station['lat'], station['lon']],
            radius=size,
            popup=f"<b>{station['name']}</b><br>Type: {station['type'].title()}",
            color=color,
            fillColor=color,
            fillOpacity=0.7,
            weight=2
        ).add_to(m)
    
    # Add railway lines (simplified representation)
    railway_lines = [
        # Mumbai-Pune line
        [[19.0760, 72.8777], [18.7484, 73.4066], [18.5204, 73.8567]],
        # Mumbai-Nashik line
        [[19.0760, 72.8777], [19.6961, 73.5613], [19.9975, 73.7898]],
        # Central line
        [[19.0176, 72.8450], [19.2183, 72.9781], [19.2437, 73.1355]]
    ]
    
    colors = ['#2563eb', '#dc2626', '#16a34a']
    line_names = ['Mumbai-Pune Route', 'Mumbai-Nashik Route', 'Central Line']
    
    for i, line in enumerate(railway_lines):
        folium.PolyLine(
            locations=line,
            color=colors[i],
            weight=4,
            opacity=0.8,
            popup=line_names[i]
        ).add_to(m)
    
    return m

def add_train_markers(map_obj, train_data):
    """
    Add train position markers to the map
    
    Args:
        map_obj (folium.Map): Map object to add markers to
        train_data (pd.DataFrame): DataFrame containing train information
    
    Returns:
        folium.Map: Updated map with train markers
    """
    
    for _, train in train_data.iterrows():
        # Determine marker color based on delay
        if train.get('delay_minutes', 0) <= 5:
            color = 'green'
            status_text = 'On Time'
        elif train.get('delay_minutes', 0) <= 15:
            color = 'orange' 
            status_text = 'Slight Delay'
        else:
            color = 'red'
            status_text = 'Delayed'
        
        # Create popup content
        popup_content = f"""
        <div style="width: 200px;">
            <h4>🚂 Train {train.get('train_number', 'N/A')}</h4>
            <p><b>Route:</b> {train.get('from_station', 'N/A')} → {train.get('to_station', 'N/A')}</p>
            <p><b>Current:</b> {train.get('current_station', 'N/A')}</p>
            <p><b>Status:</b> {status_text}</p>
            <p><b>Delay:</b> {train.get('delay_minutes', 0)} minutes</p>
            <p><b>Platform:</b> {train.get('platform', 'N/A')}</p>
        </div>
        """
        
        # Add train marker
        folium.Marker(
            location=[train.get('lat', 19.0760), train.get('lon', 72.8777)],
            popup=folium.Popup(popup_content, max_width=300),
            icon=folium.Icon(
                color=color,
                icon='train',
                prefix='fa'
            )
        ).add_to(map_obj)
    
    return map_obj

def create_route_visualization(start_coords, end_coords, waypoints=None):
    """
    Create a route visualization between two points
    
    Args:
        start_coords (tuple): Starting coordinates (lat, lon)
        end_coords (tuple): Ending coordinates (lat, lon)
        waypoints (list): Optional list of waypoint coordinates
    
    Returns:
        folium.Map: Map with route visualization
    """
    
    # Calculate center point
    center_lat = (start_coords[0] + end_coords[0]) / 2
    center_lon = (start_coords[1] + end_coords[1]) / 2
    
    # Create map
    m = folium.Map(
        location=[center_lat, center_lon],
        zoom_start=8
    )
    
    # Add start and end markers
    folium.Marker(
        location=start_coords,
        popup="Start Point",
        icon=folium.Icon(color='green', icon='play')
    ).add_to(m)
    
    folium.Marker(
        location=end_coords,
        popup="End Point", 
        icon=folium.Icon(color='red', icon='stop')
    ).add_to(m)
    
    # Create route line
    route_coords = [start_coords]
    if waypoints:
        route_coords.extend(waypoints)
    route_coords.append(end_coords)
    
    folium.PolyLine(
        locations=route_coords,
        color='blue',
        weight=6,
        opacity=0.8,
        popup="Recommended Route"
    ).add_to(m)
    
    # Add waypoint markers if provided
    if waypoints:
        for i, waypoint in enumerate(waypoints):
            folium.CircleMarker(
                location=waypoint,
                radius=8,
                popup=f"Waypoint {i+1}",
                color='blue',
                fillColor='lightblue',
                fillOpacity=0.7
            ).add_to(m)
    
    return m

def add_heatmap_layer(map_obj, data_points, intensity_column='intensity'):
    """
    Add a heatmap layer to show traffic density or other metrics
    
    Args:
        map_obj (folium.Map): Map object to add heatmap to
        data_points (pd.DataFrame): DataFrame with lat, lon, and intensity columns
        intensity_column (str): Column name for intensity values
    
    Returns:
        folium.Map: Updated map with heatmap layer
    """
    
    # Prepare heatmap data
    heat_data = []
    for _, point in data_points.iterrows():
        heat_data.append([
            point.get('lat', 0),
            point.get('lon', 0), 
            point.get(intensity_column, 1)
        ])
    
    # Add heatmap layer
    plugins.HeatMap(
        heat_data,
        min_opacity=0.2,
        max_zoom=18,
        radius=25,
        blur=15,
        gradient={
            0.4: 'blue',
            0.65: 'lime', 
            1.0: 'red'
        }
    ).add_to(map_obj)
    
    return map_obj

def create_network_topology_map(stations_df, connections_df):
    """
    Create a network topology visualization of railway connections
    
    Args:
        stations_df (pd.DataFrame): DataFrame with station information
        connections_df (pd.DataFrame): DataFrame with connection information
    
    Returns:
        folium.Map: Network topology map
    """
    
    # Calculate map center
    center_lat = stations_df['lat'].mean()
    center_lon = stations_df['lon'].mean()
    
    # Create map
    m = folium.Map(
        location=[center_lat, center_lon],
        zoom_start=8
    )
    
    # Add station nodes
    for _, station in stations_df.iterrows():
        folium.CircleMarker(
            location=[station['lat'], station['lon']],
            radius=10,
            popup=f"<b>{station['name']}</b><br>Connections: {station.get('connections', 0)}",
            color='darkblue',
            fillColor='lightblue',
            fillOpacity=0.7,
            weight=2
        ).add_to(m)
    
    # Add connection lines
    for _, connection in connections_df.iterrows():
        start_station = stations_df[stations_df['name'] == connection['from_station']].iloc[0]
        end_station = stations_df[stations_df['name'] == connection['to_station']].iloc[0]
        
        folium.PolyLine(
            locations=[
                [start_station['lat'], start_station['lon']],
                [end_station['lat'], end_station['lon']]
            ],
            color='red',
            weight=3,
            opacity=0.6,
            popup=f"{connection['from_station']} - {connection['to_station']}"
        ).add_to(m)
    
    return m