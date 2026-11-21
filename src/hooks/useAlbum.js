import { useEffect, useState } from 'react';
import { setAlbum } from '../store/homeSlice';
import { Album_EndPoint } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useAlbum = () => {
   const dispatch = useDispatch();
   const [status, setStatus] = useState({ loading: true, error: false });

   useEffect(() => {
      let cancelled = false;

      const handleAlbum = async () => {
         try {
            const response = await axios.get(Album_EndPoint);
            const data = response.data?.data;
            if (!cancelled && data && Array.isArray(data)) {
               dispatch(setAlbum(data));
            }
            if (!cancelled) setStatus({ loading: false, error: false });
         } catch (error) {
            if (!cancelled) {
               setStatus({ loading: false, error: true });
               console.warn(
                  'Album notice: Backend API not reachable:',
                  error.message,
               );
            }
         }
      };

      handleAlbum();
      return () => {
         cancelled = true;
      };
   }, [dispatch]);

   return status;
};

export default useAlbum;
