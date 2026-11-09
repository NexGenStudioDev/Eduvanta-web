import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Social_Link_EndPoint } from '../utils/constants';
import { setSocialLinks } from '../store/SocialLinkSlice';

const useSocialLinks = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      let cancelled = false;

      const fetchSocialLinks = async () => {
         try {
            const response = await axios.get(Social_Link_EndPoint);
            const data = response.data?.link;
            if (!cancelled && data) {
               dispatch(setSocialLinks(data));
            }
         } catch (error) {
            if (!cancelled) {
               console.warn(
                  'Social links notice: Backend API not reachable:',
                  error.message,
               );
            }
         }
      };

      fetchSocialLinks();
      return () => {
         cancelled = true;
      };
   }, [dispatch]);
};

export default useSocialLinks;
