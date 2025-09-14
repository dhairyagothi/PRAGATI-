# PRAGATI Dashboard

**Predictive Rail AI-based Guidance & Automated Traffic Intelligence**

A comprehensive React.js dashboard for intelligent railway traffic management, designed for the Indore-Ujjain section of the Ratlam Division.

## 🚂 Overview

PRAGATI is an AI-powered decision-support system that integrates with existing Control Office Applications (COA) to provide:

- **Real-time Train Monitoring** - Live tracking of all trains with status updates
- **Interactive Network Map** - Visual representation of the railway section with live train positions
- **AI Conflict Prediction** - Network-wide optimization to prevent delays and conflicts
- **What-If Simulation** - Test scenarios before implementation
- **Platform Management** - Dynamic platform allocation and rerouting
- **Predictive Asset Insights** - Locomotive health monitoring and maintenance prediction
- **Smart Notifications** - Priority-based alert system for section controllers

## 🏗️ Technology Stack

- **Frontend**: React.js (JSX)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
Dashboard/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          # Top navigation bar
│   │   │   ├── Sidebar.jsx         # Side navigation menu
│   │   │   └── MainContent.jsx     # Main content router
│   │   ├── sections/
│   │   │   ├── OverviewSection.jsx         # System overview dashboard
│   │   │   ├── TrainMonitoringSection.jsx  # Live train tracking
│   │   │   ├── NetworkMapSection.jsx       # Interactive railway map
│   │   │   ├── ConflictPredictionSection.jsx # AI conflict analysis
│   │   │   ├── SimulationSection.jsx       # What-if scenarios
│   │   │   ├── PlatformManagementSection.jsx # Platform allocation
│   │   │   ├── AssetInsightsSection.jsx    # Locomotive health
│   │   │   └── NotificationsSection.jsx    # Alert system
│   │   └── Dashboard.jsx           # Main dashboard component
│   ├── data/
│   │   └── mockData.js            # Sample data for demonstration
│   ├── App.jsx                    # Root application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles and Tailwind imports
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PRAGATI-/Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the dashboard

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

## 🎯 Features

### 1. **System Overview**
- Real-time metrics and KPIs
- Network health status
- Train performance summaries
- Active conflict overview

### 2. **Train Monitoring**
- Live train positions and speeds
- Delay tracking and analysis
- Train details and technical specifications
- Route visualization

### 3. **Network Map**
- Interactive SVG-based railway map
- Real-time train positions
- Signal status indicators
- Station platform availability
- Click-to-view details

### 4. **AI Conflict Prediction**
- Network-wide optimization engine
- Priority-based conflict queue
- Detailed analysis and recommendations
- Implementation tracking

### 5. **What-If Simulation**
- Scenario testing sandbox
- Predictive impact analysis
- Multiple simulation types
- Historical simulation logs

### 6. **Platform Management**
- Real-time platform status
- Dynamic rerouting recommendations
- Maintenance scheduling
- Occupancy tracking

### 7. **Asset Insights**
- Locomotive health monitoring
- Predictive maintenance alerts
- Performance trend analysis
- Technical metrics tracking

### 8. **Notifications**
- Priority-based alert system
- Customizable notification settings
- Real-time updates
- Action-oriented alerts

## 🎨 Design System

### Color Palette
- **Primary**: Blue variants for main actions and branding
- **Success**: Green for positive states and confirmations
- **Warning**: Yellow/Orange for cautions and alerts
- **Danger**: Red for critical alerts and errors
- **Rail-specific**: Custom colors for railway elements

### Typography
- **Font**: Inter (system font fallback)
- **Hierarchy**: Clear heading structure with consistent sizing
- **Readability**: High contrast ratios for accessibility

### Components
- **Cards**: Consistent shadow and border system
- **Buttons**: Multiple variants with proper states
- **Forms**: Accessible form controls with validation
- **Navigation**: Intuitive menu structure

## 📱 Responsive Design

The dashboard is fully responsive and works across:
- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly controls
- **Mobile**: Single-column stack with simplified navigation

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` includes:
- Railway-specific color palette
- Custom animations for train movements
- Extended spacing and sizing options

### Vite Configuration
Optimized build settings in `vite.config.js` for:
- Fast development server
- Efficient production builds
- Path aliases for clean imports

## 📊 Data Structure

The application uses mock data representing:

### Stations
```javascript
{
  id: 'INDB',
  name: 'Indore Junction',
  code: 'INDB',
  position: 0,
  platforms: [...],
  loopLines: 2,
  coordinates: { lat: 22.7196, lng: 75.8577 }
}
```

### Trains
```javascript
{
  id: '12919',
  name: 'Malwa SF Express',
  type: 'Superfast',
  status: 'running',
  currentPosition: 25,
  delay: 5,
  speed: 95,
  // ... additional properties
}
```

### Conflicts
```javascript
{
  id: 'CONF001',
  type: 'overtake',
  priority: 'high',
  timeToConflict: 18,
  trains: ['22911', '19303'],
  recommendation: '...',
  // ... additional properties
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Indian Railways for the domain expertise
- Ratlam Division for operational requirements
- React and Vite communities for excellent development tools
- Tailwind CSS for the utility-first CSS framework

## 📞 Support

For support, email support@pragati-rail.in or join our Slack channel.

---

**PRAGATI Dashboard** - Transforming Railway Operations with AI