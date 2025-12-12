import React, { useState, useEffect, Suspense, lazy } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import GrievanceModal from './components/GrievanceModal';
import AccessibilityWidget from './components/AccessibilityWidget';
import MobileBottomNav from './components/MobileBottomNav';
import GlobalSearch from './components/GlobalSearch';
import LoginModal from './components/LoginModal';
import SectionLoader from './components/SectionLoader';
import ServiceDetailsModal from './components/ServiceDetailsModal';
import NewsModal from './components/NewsModal';
import QuickPayWidget from './components/QuickPayWidget';
import { Service, NewsItem } from './types';

// Lazy load heavy components to improve FCP
const ServicesGrid = lazy(() => import('./components/ServicesGrid'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const DepartmentsSection = lazy(() => import('./components/DepartmentsSection'));
const InfoSections = lazy(() => import('./components/InfoSections'));
const ContactSection = lazy(() => import('./components/ContactSection'));

function App() {
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Global Keyboard Shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <TopBar />
      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)} 
        onLoginClick={() => setIsLoginOpen(true)}
      />
      <NewsTicker />
      <main className="flex-grow">
        <Hero onOpenGrievance={() => setIsGrievanceModalOpen(true)} />
        
        <Suspense fallback={<SectionLoader />}>
          <ServicesGrid onServiceSelect={setSelectedService} />
          <DepartmentsSection />
          <InfoSections />
          <Dashboard onNewsSelect={setSelectedNews} />
          <ContactSection />
        </Suspense>
      </main>
      
      {/* Added pb-16 to Footer wrapper to account for MobileBottomNav on small screens */}
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      
      <BackToTop />
      <AccessibilityWidget />
      <QuickPayWidget />
      <MobileBottomNav onOpenGrievance={() => setIsGrievanceModalOpen(true)} />
      
      {/* Modals Layer */}
      <GrievanceModal 
        isOpen={isGrievanceModalOpen} 
        onClose={() => setIsGrievanceModalOpen(false)} 
      />
      <GlobalSearch 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onServiceSelect={setSelectedService}
      />
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <ServiceDetailsModal 
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
      <NewsModal 
        item={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </div>
  );
}

export default App;