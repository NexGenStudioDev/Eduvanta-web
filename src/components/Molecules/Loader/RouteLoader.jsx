import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

/**
 * Global loader shown on every page / route change.
 * Render once inside <BrowserRouter> — it listens to
 * every navigation and flashes the full-screen Loader
 * so every page (Home, About, Contact, Gallery, Admission,
 * Payment, Login, Notices, etc.) shows a loader.
 *
 * It does NOT replace data-loading states inside pages
 * (e.g. skeletons in NoticesPage or the <Loader /> check
 * in Home.jsx / About.jsx). It only covers route transition.
 */
const RouteLoader = ({ duration = 600, message }) => {
   const location = useLocation();
   const [isLoading, setIsLoading] = useState(true);
   const timerRef = useRef(null);

   useEffect(() => {
      // Show loader on first mount + on every route change
      setIsLoading(true);

      // Clear previous timer if user navigates quickly
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
         setIsLoading(false);
      }, duration);

      return () => {
         if (timerRef.current) clearTimeout(timerRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location.pathname, location.search]);

   if (!isLoading) return null;

   return <Loader message={message} />;
};

export default RouteLoader;
