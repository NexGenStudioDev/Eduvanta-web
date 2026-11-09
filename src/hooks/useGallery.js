import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { set_Gallery } from '../store/GallerySlice';

export const useGallery = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      let cancelled = false;

      const fetchData = async () => {
         try {
            const res = await axios.get('/api/v1/user/get/All/Image');
            const data = res.data?.data;
            if (!cancelled && data && Array.isArray(data)) {
               dispatch(set_Gallery([...data]));
            }
         } catch (error) {
            if (!cancelled) {
               console.warn(
                  'Gallery notice: Backend API not reachable:',
                  error.message,
               );
            }
         }
      };

      fetchData();
      return () => {
         cancelled = true;
      };
   }, [dispatch]);
};
