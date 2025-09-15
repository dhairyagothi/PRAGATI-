# PRAGATI AI - Ratlam Division Railway Traffic Management System

A comprehensive AI-powered railway traffic management system built with Streamlit, specifically designed for Ratlam Division operations featuring real-time monitoring, predictive analytics, and intelligent decision support.

## 🚀 Features

### 🏠 Home Dashboard
- **PRAGATI AI Overview**: Complete system introduction and capabilities
- **Technology Stack**: Modern AI and data science technologies
- **Real-time Navigation**: Easy access to all system modules
- **Performance Metrics**: System health and operational status

### 📊 Divisional Dashboard
- **Real-time Train Monitoring**: Live train positions and status
- **Performance KPIs**: On-time performance, delay analysis, capacity utilization
- **Route Optimization**: Intelligent route planning and conflict detection
- **Interactive Maps**: Visual representation of railway network

### 🎮 Simulation Sandbox
- **What-if Scenarios**: Test different operational conditions
- **Predictive Modeling**: Forecast delays and optimize schedules
- **Risk Assessment**: Evaluate potential conflicts and bottlenecks
- **Scenario Comparison**: Compare different operational strategies

### 🔧 Asset Insights
- **Predictive Maintenance**: AI-powered maintenance scheduling
- **Asset Health Monitoring**: Real-time equipment status
- **Failure Prediction**: Early warning system for potential issues
- **Maintenance Optimization**: Cost-effective maintenance planning

## 🛠️ Technology Stack

- **Frontend**: Streamlit
- **Data Processing**: Pandas, NumPy
- **Visualization**: Plotly, Folium, Matplotlib, Seaborn
- **Machine Learning**: Scikit-learn
- **Mapping**: Folium for interactive railway maps
- **Real-time Updates**: Streamlit's reactive framework

## 📋 Prerequisites

- Python 3.8 or higher
- pip package manager
- Git (optional, for cloning)

## 🚀 Quick Start

### 1. Clone or Download the Repository

```bash
# If using git
git clone https://github.com/dhairyagothi/PRAGATI-.git
cd PRAGATI-/ml-model
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Streamlit App

```bash
streamlit run app/Home.py
```

### 4. Access the Application

Open your web browser and navigate to:
```
http://localhost:8501
```

## 📁 Project Structure

```
ml-model/
├── app/
│   ├── Home.py                    # Main landing page
│   ├── pages/
│   │   ├── Divisional_Dashboard.py # Real-time operations dashboard (Ratlam Division)
│   │   ├── Simulation_Sandbox.py   # Predictive modeling sandbox
│   │   └── Asset_Insights.py       # Asset management and maintenance
│   ├── components/
│   │   ├── map_component.py        # Interactive map visualizations
│   │   └── kpi_component.py        # KPI and metrics components
│   └── core/
│       ├── data_loader.py          # Data management and loading
│       └── prediction_engine.py    # ML prediction and simulation engine
├── data/
│   ├── simulated_movement_log.csv # Sample train movement data
│   └── static_rail_map.json       # Railway infrastructure data
├── models/
│   ├── anomaly_detector.pkl       # Trained anomaly detection model
│   ├── conflict_detection_model.pkl # Conflict prediction model
│   ├── delay_prediction_model.pkl # Delay prediction model
│   ├── maintenance_prediction_model.pkl # Maintenance scheduling model
│   └── model_info.py              # Model information and utilities
├── requirements.txt               # Python dependencies
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🎯 Key Features Explained

### Real-time Train Monitoring
- Live tracking of all trains in the network
- Real-time delay monitoring and alerts
- Passenger capacity utilization tracking
- Fuel efficiency monitoring

### Predictive Analytics
- **Delay Prediction**: ML models predict potential delays
- **Conflict Detection**: AI identifies potential route conflicts
- **Maintenance Scheduling**: Predictive maintenance recommendations
- **Anomaly Detection**: Automatic detection of unusual patterns

### Interactive Visualizations
- **Railway Network Maps**: Interactive Folium maps showing train positions
- **Performance Dashboards**: Real-time KPIs and metrics
- **Trend Analysis**: Historical performance trends and patterns
- **Scenario Planning**: What-if analysis tools

## 🔧 Configuration

### Environment Variables
The application uses sample data by default. For production use:

1. Update data sources in `core/data_loader.py`
2. Configure model paths in `core/prediction_engine.py`
3. Adjust visualization parameters in component files

### Model Updates
To update ML models:

1. Train new models using the provided notebooks (if available)
2. Save models in pickle format in the `models/` directory
3. Update model references in `core/prediction_engine.py`

## 📊 Data Sources

The system currently uses simulated data for demonstration:

- **Movement Data**: `data/simulated_movement_log.csv`
  - Train positions, delays, passenger counts
  - Real-time status updates
  - Fuel and engine metrics

- **Infrastructure Data**: `data/static_rail_map.json`
  - Railway network topology
  - Station information
  - Route definitions

## 🚨 Troubleshooting

### Common Issues

**1. Import Errors**
```bash
# Ensure all dependencies are installed
pip install -r requirements.txt
```

**2. Port Already in Use**
```bash
# Run on a different port
streamlit run app/Home.py --server.port 8502
```

**3. Data Loading Issues**
- Ensure CSV and JSON files are in the `data/` directory
- Check file permissions
- Verify data format matches expected schema

**4. Model Loading Errors**
- Ensure model files exist in `models/` directory
- Check pickle file compatibility
- Verify scikit-learn version compatibility

### Performance Optimization

- For large datasets, consider data pagination
- Use caching for expensive computations
- Optimize map rendering for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the PRAGATI AI initiative for intelligent railway management.

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the code documentation in each module
3. Ensure all dependencies are properly installed

## 🔄 Updates

- **Version**: 1.0.0
- **Last Updated**: September 16, 2025
- **Python Version**: 3.8+
- **Streamlit Version**: 1.28+

---

**Built with ❤️ for intelligent railway operations**