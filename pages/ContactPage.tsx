import React from 'react';
import ContactSection from '../components/ContactSection';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl text-lg">We are here to serve you.</p>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default ContactPage;