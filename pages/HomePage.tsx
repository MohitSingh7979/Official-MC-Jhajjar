import React from 'react';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import Dashboard from '../components/Dashboard';
import { Service, NewsItem } from '../types';

interface HomePageProps {
  onOpenGrievance: () => void;
  onServiceSelect: (service: Service) => void;
  onNewsSelect: (item: NewsItem) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenGrievance, onServiceSelect, onNewsSelect }) => {
  return (
    <>
      <Hero onOpenGrievance={onOpenGrievance} />
      {/* We keep ServicesGrid on Home as a preview/quick access, it limits items by default */}
      <ServicesGrid onServiceSelect={onServiceSelect} />
      <Dashboard onNewsSelect={onNewsSelect} />
    </>
  );
};

export default HomePage;