import React, { useState, useEffect } from 'react';
import { Bell, Pause, Play, ExternalLink, Loader2 } from 'lucide-react';
import { DataService } from '../services/dataService';
import { NewsItem } from '../types';

interface NewsTickerProps {
  onNewsClick: (item: NewsItem) => void;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ onNewsClick }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataService.getNews().then(items => {
      setNews(items);
      setLoading(false);
    });
  }, []);

  // Use fetched news or fallback array to prevent crash if empty
  const tickerItems = news.length > 0 ? news : [{ id: '0', title: 'Welcome to Municipal Council Jhajjar Official Portal', date: '', category: 'Info', link: '#' }];
  
  // Duplicate items to create seamless loop
  const displayNews = [...tickerItems, ...tickerItems, ...tickerItems]; 

  if (loading) return <div className="h-12 bg-brand-red"></div>;

  return (
    <div className="bg-brand-red text-white relative overflow-hidden flex items-center h-12 group">
      {/* Label - Using Brand Blue for contrast/header feel */}
      <div className="bg-brand-blue h-full px-4 md:px-6 flex items-center z-20 font-bold text-xs md:text-sm uppercase tracking-wide shrink-0 shadow-lg relative border-r border-white/10">
        <Bell className="w-4 h-4 mr-2 animate-pulse text-brand-orange" />
        Latest Updates
      </div>
      
      {/* Marquee Area - Using Brand Red for alerts/news */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-brand-red">
        <div 
          className={`whitespace-nowrap py-2 flex items-center inline-block animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused] ${isPaused ? '[animation-play-state:paused]' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayNews.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              onClick={() => onNewsClick(item)}
              className="mx-8 font-medium text-base tracking-wide flex items-center hover:underline hover:text-white/90 focus:outline-none focus:bg-white/10 rounded px-2 transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 shrink-0"></span>
              {item.title}
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </button>
          ))}
        </div>
      </div>

      {/* Control Button - Using Brand Blue to match label */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        className="h-full px-3 bg-brand-blue hover:bg-brand-blue/90 text-white z-20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange border-l border-white/10"
        aria-label={isPaused ? "Play ticker" : "Pause ticker"}
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
      </button>
    </div>
  );
};

export default NewsTicker;