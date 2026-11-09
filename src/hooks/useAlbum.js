import { useEffect } from 'react';
import { setAlbum } from '../store/homeSlice';
import { Album_EndPoint } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useAlbum = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      let cancelled = false;

      const handleAlbum = async () => {
         try {
            const response = await axios.get(Album_EndPoint);
            const data = response.data?.data;
            if (!cancelled && data && Array.isArray(data)) {
               dispatch(setAlbum(data));
            }
         } catch (error) {
            if (!cancelled) {
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
};

export default useAlbum;
