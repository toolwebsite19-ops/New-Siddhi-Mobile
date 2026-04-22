import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window when the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
