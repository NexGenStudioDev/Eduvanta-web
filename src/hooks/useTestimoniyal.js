import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTestimonital } from '../store/homeSlice';
import axios from 'axios';
import { Testimonital_EndPoint } from '../utils/constants';
import frontendConfig from '../config/frontend.config.js';

const useTestimonial = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      let cancelled = false;

      const seedDefaults = () => {
         if (frontendConfig.testimonials?.list) {
            dispatch(setTestimonital(frontendConfig.testimonials.list));
         }
      };

      const handleTestimonial = async () => {
         try {
            const response = await axios.get(Testimonital_EndPoint);
            const data =
               response.data?.data || response.data?.Find_Testimonial;
            if (!cancelled) {
               if (data && Array.isArray(data) && data.length > 0) {
                  dispatch(setTestimonital(data));
               } else {
                  seedDefaults();
               }
            }
         } catch (error) {
            if (!cancelled) {
               seedDefaults();
               console.warn(
                  'Notice: Backend testimonials API unavailable, using default testimonials:',
                  error.message,
               );
            }
         }
      };

      handleTestimonial();
      return () => {
         cancelled = true;
      };
   }, [dispatch]);
};

export default useTestimonial;
