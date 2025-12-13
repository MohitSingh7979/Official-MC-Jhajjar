import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import GrievanceModal from './components/GrievanceModal';
import GlobalSearch from './components/GlobalSearch';
import LoginModal from './components/LoginModal';
import ServiceDetailsModal from './components/ServiceDetailsModal';
import NewsModal from './components/NewsModal';
import SectionLoader from './components/SectionLoader';
import { Service, NewsItem } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

// Eager load Home to prevent initial flickering/errors
import HomePage from './pages/HomePage';

// Lazy load other pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const DepartmentsPage = lazy(() => import('./pages/DepartmentsPage'));
const TendersPage = lazy(() => import('./pages/TendersPage'));
const RtiPage = lazy(() => import('./pages/RtiPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const OfficialsDirectory = lazy(() => import('./components/OfficialsDirectory'));
const DownloadCenter = lazy(() => import('./components/DownloadCenter'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

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
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Route - Independent Layout */}
          <Route path="/admin" element={
            <Suspense fallback={<SectionLoader />}>
               <AdminDashboard />
            </Suspense>
          } />
          
          {/* Public Layout Route */}
          <Route element={
            <Layout 
              onSearchClick={() => setIsSearchOpen(true)}
              onLoginClick={() => setIsLoginOpen(true)}
              onNewsClick={setSelectedNews}
              onOpenGrievance={() => setIsGrievanceModalOpen(true)}
            />
          }>
            <Route path="/" element={
              <HomePage 
                onOpenGrievance={() => setIsGrievanceModalOpen(true)} 
                onServiceSelect={setSelectedService}
                onNewsSelect={setSelectedNews}
              />
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage onServiceSelect={setSelectedService} />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/tenders" element={<TendersPage />} />
            <Route path="/rti" element={<RtiPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/directory" element={<OfficialsDirectory />} />
            <Route path="/downloads" element={<DownloadCenter />} />
            
            {/* Fallback for 404 */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 min-h-[50vh]">
                <h2 className="text-4xl font-bold text-brand-blue mb-4">404</h2>
                <p className="text-slate-500 mb-8">Page not found</p>
                <a href="/" className="px-6 py-2 bg-brand-orange text-white rounded-lg font-bold hover:bg-brand-orange/90">Go Home</a>
              </div>
            } />
          </Route>
        </Routes>
        
        {/* Modals Layer - Rendered outside Routes to persist state */}
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
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;