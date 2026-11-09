import { useDispatch } from 'react-redux';
import { setTeacher } from '../store/AboutSlice';
import { Find_Teacher_EndPoint } from '../utils/constants';
import { useEffect } from 'react';
import axios from 'axios';

const useTeacher = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      let cancelled = false;

      const handleTeacher = async () => {
         try {
            const response = await axios.get(Find_Teacher_EndPoint);
            const data = response.data?.data;
            if (!cancelled && data && Array.isArray(data)) {
               dispatch(setTeacher(data));
            }
         } catch (error) {
            if (!cancelled) {
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
};

export default useTeacher;
