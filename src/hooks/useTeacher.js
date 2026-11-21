import { useDispatch } from 'react-redux';
import { setTeacher } from '../store/AboutSlice';
import { Find_Teacher_EndPoint } from '../utils/constants';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useTeacher = () => {
   const dispatch = useDispatch();
   const [status, setStatus] = useState({ loading: true, error: false });

   useEffect(() => {
      let cancelled = false;

      const handleTeacher = async () => {
         try {
            const response = await axios.get(Find_Teacher_EndPoint);
            const data = response.data?.data;
            if (!cancelled && data && Array.isArray(data)) {
               dispatch(setTeacher(data));
            }
            if (!cancelled) setStatus({ loading: false, error: false });
         } catch (error) {
            if (!cancelled) {
               setStatus({ loading: false, error: true });
               console.warn(
                  'Teacher notice: Backend API not reachable:',
                  error.message,
               );
            }
         }
      };

      handleTeacher();
      return () => {
         cancelled = true;
      };
   }, [dispatch]);

   return status;
};

export default useTeacher;
