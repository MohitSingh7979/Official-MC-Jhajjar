import React from 'react';
import ServicesGrid from '../components/ServicesGrid';
import { Service } from '../types';

interface ServicesPageProps {
  onServiceSelect: (service: Service) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceSelect }) => {
  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Citizen Services</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Online portals and applications at your fingertips.</p>
        </div>
      </div>
      <div className="-mt-12">
        <ServicesGrid onServiceSelect={onServiceSelect} />
      </div>
    </div>
  );
};

export default ServicesPage;