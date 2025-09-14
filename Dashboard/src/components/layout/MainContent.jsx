import React from 'react';
import OverviewSection from '../sections/OverviewSection';
import TrainMonitoringSection from '../sections/TrainMonitoringSection';
import NetworkMapSection from '../sections/NetworkMapSection';
import ConflictPredictionSection from '../sections/ConflictPredictionSection';
import SimulationSection from '../sections/SimulationSection';
import PlatformManagementSection from '../sections/PlatformManagementSection';
import AssetInsightsSection from '../sections/AssetInsightsSection';
import NotificationsSection from '../sections/NotificationsSection';

const MainContent = ({ activeSection, trains, stations, conflicts, currentTime }) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewSection 
            trains={trains}
            stations={stations}
            conflicts={conflicts}
            currentTime={currentTime}
          />
        );
      case 'trains':
        return <TrainMonitoringSection trains={trains} stations={stations} />;
      case 'network':
        return <NetworkMapSection trains={trains} stations={stations} />;
      case 'conflicts':
        return <ConflictPredictionSection conflicts={conflicts} trains={trains} />;
      case 'simulation':
        return <SimulationSection trains={trains} stations={stations} />;
      case 'platforms':
        return <PlatformManagementSection stations={stations} trains={trains} />;
      case 'assets':
        return <AssetInsightsSection trains={trains} />;
      case 'alerts':
        return <NotificationsSection conflicts={conflicts} trains={trains} />;
      default:
        return (
          <OverviewSection 
            trains={trains}
            stations={stations}
            conflicts={conflicts}
            currentTime={currentTime}
          />
        );
    }
  };

  return (
    <main className="flex-1 overflow-auto bg-black p-6">
      {renderSection()}
    </main>
  );
};

export default MainContent;