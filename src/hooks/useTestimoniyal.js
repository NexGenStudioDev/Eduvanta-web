import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTestimonital } from '../store/homeSlice';
import axios from 'axios';
import { Testimonital_EndPoint } from '../utils/constants';

const useTestimonial = () => {
   const dispatch = useDispatch();
   const [status, setStatus] = useState({ loading: true, error: false });

   useEffect(() => {
      let cancelled = false;

      const handleTestimonial = async () => {
         try {
            const response = await axios.get(Testimonital_EndPoint);
            const data =
               response.data?.data || response.data?.Find_Testimonial;
            if (!cancelled) {
               dispatch(setTestimonital(Array.isArray(data) ? data : []));
               setStatus({ loading: false, error: false });
            }
         } catch (error) {
            if (!cancelled) {
               dispatch(setTestimonital([]));
               setStatus({ loading: false, error: true });
               console.warn(
                  'Testimonials API unavailable:',
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

   return status;
};

export default useTestimonial;
