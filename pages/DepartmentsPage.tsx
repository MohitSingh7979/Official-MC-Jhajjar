import React from 'react';
import DepartmentsSection from '../components/DepartmentsSection';

const DepartmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Departments</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Understanding the municipal structure.</p>
        </div>
      </div>
      <DepartmentsSection />
    </div>
  );
};

export default DepartmentsPage;