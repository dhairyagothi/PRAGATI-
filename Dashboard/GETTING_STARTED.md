# PRAGATI Dashboard - Quick Start Guide

## 🚀 Running the Application

1. **Navigate to the Dashboard folder:**
   ```bash
   cd Dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 📋 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Dashboard Features

### Navigation
- **Overview**: System dashboard with key metrics
- **Train Monitoring**: Real-time train tracking
- **Network Map**: Interactive railway visualization  
- **Conflict Prediction**: AI-powered conflict analysis
- **What-If Simulator**: Scenario testing
- **Platform Management**: Platform allocation
- **Asset Insights**: Locomotive health monitoring
- **Notifications**: Alert management

### Key Interactions
- Click on trains/stations for detailed information
- Use filters and search in various sections
- Run simulations with custom parameters
- Configure notification settings
- Toggle sidebar collapse for more space

## 🛠️ Project Structure

```
Dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Main dashboard sections
│   │   └── common/         # Shared components
│   ├── data/               # Mock data
│   ├── utils/              # Helper functions
│   └── App.jsx             # Main app component
├── public/                 # Static assets
└── package.json           # Dependencies
```

## 🎨 Design System

- **Colors**: Railway-themed color palette
- **Typography**: Inter font with clear hierarchy
- **Components**: Consistent card and button styles
- **Responsive**: Mobile-first responsive design
- **Icons**: Lucide React icon library

## 📱 Mobile Support

The dashboard is fully responsive:
- Desktop: Full multi-column layout
- Tablet: Adapted for touch interactions
- Mobile: Single-column with collapsible navigation

## ⚡ Performance

- Vite for fast development and builds
- React 18 with modern hooks
- Optimized bundle sizes
- Efficient re-rendering

## 🔧 Customization

- Modify `tailwind.config.js` for styling
- Update `src/data/mockData.js` for data
- Customize colors in the config file
- Add new sections following existing patterns

## 📊 Mock Data

The application includes realistic mock data for:
- 8 railway stations (Indore to Ujjain)
- 5 trains with different types
- 3 active conflicts
- Asset health metrics
- Real-time notifications

## 🤔 Need Help?

- Check the README.md for detailed documentation
- Review component files for implementation details
- Modify mock data to test different scenarios
- Use browser dev tools for debugging

---

**Happy coding! 🚂**