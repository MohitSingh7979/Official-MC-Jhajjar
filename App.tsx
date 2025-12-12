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
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy load heavy components to improve FCP
const ServicesGrid = lazy(() => import('./components/ServicesGrid'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const DepartmentsSection = lazy(() => import('./components/DepartmentsSection'));
const InfoSections = lazy(() => import('./components/InfoSections'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const OfficialsDirectory = lazy(() => import('./components/OfficialsDirectory'));

type ViewState = 'home' | 'directory';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Hash Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#directory') {
        setView('directory');
        window.scrollTo(0, 0);
      } else {
        setView('home');
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth scroll behavior for anchor links (only when in home view or if cross-page logic needed)
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash) {
        // Allow default behavior for directory link since we have hash listener
        if (anchor.hash === '#directory') return; 

        // For other internal links, if we are on directory page, let browser handle hash change -> switches to home -> then scroll
        // This logic is handled by the useEffect above setting 'home' view on other hashes.
        
        // Smooth scroll only if we are already on home and targeting a section
        if (anchor.origin === window.location.origin && anchor.hash !== '#directory' && view === 'home') {
           e.preventDefault();
           const element = document.querySelector(anchor.hash);
           if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
             // Optionally push state to URL without triggering hashchange if we want to avoid re-renders, 
             // but keeping it simple for now.
             window.history.pushState(null, '', anchor.hash);
           }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [view]);

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
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans relative">
        <TopBar />
        <Navbar 
          onSearchClick={() => setIsSearchOpen(true)} 
          onLoginClick={() => setIsLoginOpen(true)}
        />
        <NewsTicker onNewsClick={setSelectedNews} />
        
        <main className="flex-grow">
          {view === 'home' ? (
            <>
              <Hero onOpenGrievance={() => setIsGrievanceModalOpen(true)} />
              <Suspense fallback={<SectionLoader />}>
                <ServicesGrid onServiceSelect={setSelectedService} />
                <DepartmentsSection />
                <InfoSections />
                <Dashboard onNewsSelect={setSelectedNews} />
                <ContactSection />
              </Suspense>
            </>
          ) : (
            <Suspense fallback={<SectionLoader />}>
              <OfficialsDirectory />
            </Suspense>
          )}
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
    </LanguageProvider>
  );
}

export default App;