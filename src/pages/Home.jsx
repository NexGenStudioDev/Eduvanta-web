import Hero from '../components/Templates/home/Hero';
import Empower from '../components/Templates/home/Empower';
import Skills from '../components/Templates/home/Skills';
import Album from '../components/Templates/home/Album';
import Testimonials from '../components/Templates/home/Testimonials';

import useHomeUi from '../hooks/useHomeUi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Molecules/Loader/Loader';
import axios from 'axios';

function Home() {
   let data = useSelector(state => state.home.landingPage);
   const [backendReady, setBackendReady] = useState(false);
   const [healthAttempt, setHealthAttempt] = useState(0);
   const [healthFailed, setHealthFailed] = useState(false);
   const [healthRetry, setHealthRetry] = useState(0);

   useHomeUi();

   useEffect(() => {
      let cancelled = false;
      let timeoutId;
      let controller;

      const wakeBackend = async attempt => {
         controller = new AbortController();
         try {
            const response = await axios.get('/api/health', {
               timeout: 20000,
               headers: { 'Cache-Control': 'no-cache' },
               signal: controller.signal,
            });
            if (response.data?.status !== 'healthy') {
               throw new Error('The backend is not ready yet.');
            }
            if (!cancelled) {
               setBackendReady(true);
               setHealthFailed(false);
            }
         } catch {
            if (cancelled) return;
            setHealthAttempt(attempt + 1);
            if (attempt >= 14) {
               setHealthFailed(true);
               return;
            }
            timeoutId = window.setTimeout(
               () => wakeBackend(attempt + 1),
               Math.min(2500 + attempt * 500, 7000),
            );
         }
      };

      wakeBackend(0);
      return () => {
         cancelled = true;
         window.clearTimeout(timeoutId);
         controller?.abort();
      };
   }, [healthRetry]);

   if (!backendReady) {
      return healthFailed ? (
         <main className='min-h-screen bg-slate-950 text-white grid place-items-center px-6'>
            <div className='max-w-md text-center'>
               <p className='text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300'>Eduvanta</p>
               <h1 className='mt-4 text-2xl font-bold'>The campus server is taking longer than usual</h1>
               <p className='mt-3 text-sm leading-6 text-slate-300'>We could not reach the service yet. Please try connecting again in a moment.</p>
               <button onClick={() => { setHealthFailed(false); setHealthAttempt(0); setHealthRetry(value => value + 1); }} className='mt-6 rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-200'>Try again</button>
            </div>
         </main>
      ) : <Loader message={healthAttempt > 0 ? 'Waking up the campus server…' : 'Connecting to Eduvanta…'} />;
   }

   if (!data) {
      return <Loader />;
   }

   return (
      <>
         <title>
            Eduvanta — Where Knowledge Finds Its Future | Top Computing
            & IT Academy
         </title>
         <meta
            name='description'
            content='Eduvanta — Where Knowledge Finds Its Future. Premier technical academy offering BCA, BBA, Full-Stack Web Development, hands-on computing labs, and comprehensive placement assistance.'
         />

         <Hero />
         <Empower />
         <Skills />
         <Album />
         <Testimonials />
      </>
   );
}

export default Home;
