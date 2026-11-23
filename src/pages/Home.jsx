import Hero from '../components/Templates/home/Hero';
import Empower from '../components/Templates/home/Empower';
import Skills from '../components/Templates/home/Skills';
import Album from '../components/Templates/home/Album';
import Testimonials from '../components/Templates/home/Testimonials';

import useHomeUi from '../hooks/useHomeUi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Molecules/Loader/Loader';
import { axios } from '../utils/apiUrl';

function Home() {
   let data = useSelector(state => state.home.landingPage);

   useHomeUi();

   useEffect(() => {
      // Wake the backend without holding the public homepage behind a
      // server/database readiness check. The page content is local and can
      // render while Render starts the API service in the background.
      void axios.get('/', {
         timeout: 90000,
         headers: { 'Cache-Control': 'no-cache' },
      }).catch(() => undefined);
   }, []);

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
