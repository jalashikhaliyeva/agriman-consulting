'use client'; // Mark as Client Component

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AOSInitializer = ({ children }) => {
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize AOS once
    if (!initialized.current) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false, // Allow animations to repeat
        mirror: false, // Don't animate out when scrolling past them (can cause issues with repeating)
        offset: 120, // Offset (in px) from the original trigger point
        delay: 0, // No delay by default
        anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
      });
      
      initialized.current = true;
    }

    // Function to refresh AOS on scroll direction change
    let lastScrollTop = 0;
    let scrollingDown = true;

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      
      // Detect scroll direction change
      if ((st > lastScrollTop && !scrollingDown) || (st < lastScrollTop && scrollingDown)) {
        scrollingDown = st > lastScrollTop;
        
        // Force refresh to re-evaluate animations on direction change
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      }
      
      lastScrollTop = st <= 0 ? 0 : st; // For mobile or negative scrolling
    };

    // Regular AOS refresh on resize and orientation change
    window.addEventListener('resize', AOS.refresh);
    window.addEventListener('orientationchange', AOS.refresh);
    
    // Add our custom scroll handler
    window.addEventListener('scroll', handleScroll);

    // Set interval to periodically refresh AOS for better reliability
    const refreshInterval = setInterval(() => {
      AOS.refresh();
    }, 2500);

    return () => {
      window.removeEventListener('resize', AOS.refresh);
      window.removeEventListener('orientationchange', AOS.refresh);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(refreshInterval);
    };
  }, []);

  return children;
};

export default AOSInitializer;