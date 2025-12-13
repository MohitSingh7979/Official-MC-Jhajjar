import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import NewsTicker from './NewsTicker';
import Footer from './Footer';
import BackToTop from './BackToTop';
import AccessibilityWidget from './AccessibilityWidget';
import MobileBottomNav from './MobileBottomNav';
import SectionLoader from './SectionLoader';
import QuickPayWidget from './QuickPayWidget';
import FeedbackWidget from './FeedbackWidget';
import { NewsItem } from '../types';

interface LayoutProps {
  onSearchClick: () => void;
  onLoginClick: () => void;
  onNewsClick: (item: NewsItem) => void;
  onOpenGrievance: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  onSearchClick, 
  onLoginClick, 
  onNewsClick, 
  onOpenGrievance 
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <TopBar />
      <Navbar 
        onSearchClick={onSearchClick} 
        onLoginClick={onLoginClick}
      />
      <NewsTicker onNewsClick={onNewsClick} />
      
      <main className="flex-grow">
        <Suspense fallback={<SectionLoader />}>
          <Outlet />
        </Suspense>
      </main>
      
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      
      <BackToTop />
      <AccessibilityWidget />
      <FeedbackWidget />
      <QuickPayWidget />
      <MobileBottomNav onOpenGrievance={onOpenGrievance} />
    </div>
  );
};

export default Layout;