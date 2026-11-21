import { Suspense, useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useTeacher from '../../../hooks/useTeacher';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const TeacherCard = memo(({ teacher }) => {
   const social = teacher.social_media?.[0] || {};

   const renderSocialIcon = (platform, url) => (
      <Link to={url} target='_blank' rel='noopener noreferrer'>
         <img
            src={`https://img.icons8.com/bubbles/32/000000/${platform}.png`}
            alt={platform}
         />
      </Link>
   );

   return (
      <div className='card w-[25%] max-[599px]:w-full h-full bg-white text-black flex items-start p-4 justify-between flex-col gap-2 rounded-xl max-[1098px]:w-[40%]'>
         <div className='img w-full h-[23vh] rounded-xl flex items-center justify-center'>
            <img
               src={teacher.image}
               alt={teacher.name || 'Teacher'}
               className='w-full bg-cover object-cover overflow-hidden rounded-xl h-full'
               loading='lazy'
            />
         </div>
         <h1 className='text-[1.2vw] max-[599px]:text-[4.8vw] font-medium bg-slate-500'>
            {teacher.position}
         </h1>
         <div className='list w-full'>
            <div className='flex w-full items-center justify-between'>
               <p className='text-[0.95vw] max-[599px]:text-[3.5vw] font-medium'>
                  {teacher.name}
               </p>
               <p className='text-[0.85vw] max-[599px]:text-[3.2vw] font-bold'>
                  {teacher.Specialization}
               </p>
            </div>
            <div className='flex w-full items-center justify-between'>
               <p className='text-[0.95vw] max-[599px]:text-[3.5vw] font-medium'>
                  Experience
               </p>
               <p className='text-[0.85vw] max-[599px]:text-[3.2vw] font-bold'>
                  {teacher.Experience}
               </p>
            </div>
            <div className='flex w-full items-center justify-between'>
               <p className='text-[0.95vw] max-[599px]:text-[3.5vw] font-medium'>
                  Specialization
               </p>
               <p className='text-[0.85vw] max-[599px]:text-[3.2vw] font-bold'>
                  {teacher.role}
               </p>
            </div>
         </div>
         <div className='social w-full flex items-center justify-between'>
            <h1 className='w-1/2 text-[0.95vw] max-[599px]:text-[3.5vw] font-bold'>
               Social Media accounts
            </h1>
            <div className='profile flex gap-2'>
               {social.instagram &&
                  renderSocialIcon('instagram-new', social.instagram)}
               {social.facebook &&
                  renderSocialIcon('facebook-new', social.facebook)}
               {social.twitter &&
                  renderSocialIcon('x', social.twitter)}
               {social.linkedin &&
                  renderSocialIcon('linkedin', social.linkedin)}
            </div>
         </div>
         {social.linkedin && (
            <Link
               to={social.linkedin}
               target='_blank'
               className='w-full'
            >
               <button className='bg-[#333] text-[0.95vw] max-[599px]:text-[3.5vw] font-semibold w-full text-white rounded-lg py-2 px-6'>
                  Contact me
               </button>
            </Link>
         )}
      </div>
   );
});

const Teachers = () => {
   const teachers = useSelector(state => state.about.teacher);
   const [swiperVisible, setSwiperVisible] = useState(false);

   useEffect(() => {
      setSwiperVisible(window.innerWidth <= 599);
   }, []);

   const { loading, error } = useTeacher();

   if (loading) {
      return (
         <section className='flex min-h-72 flex-col items-center justify-center bg-[#333] px-6 py-16 text-center text-white'>
            <span className='h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-[#FF6603]' />
            <p className='mt-4 text-base text-gray-200' role='status' aria-live='polite'>
               Loading teacher profiles…
            </p>
         </section>
      );
   }

   if (error || !teachers?.length) {
      return (
         <section className='bg-[#333] px-6 py-16 text-center text-white'>
            <h2 className='text-2xl font-semibold'>Our Teachers</h2>
            <p className='mx-auto mt-3 max-w-xl text-base text-gray-300' role='status'>
               {error
                  ? 'Teacher information could not be loaded. Please try again later.'
                  : 'Teacher profiles will appear here when they are available.'}
            </p>
         </section>
      );
   }

   return (
      <section className='w-full px-10 py-10 max-[599px]:py-6 flex items-center justify-between gap-4 flex-col bg-[#333] text-white overflow-hidden'>
         <div className='title text-[clamp(1.75rem,3.5vw,3rem)] font-semibold'>
            Our Teachers
         </div>
         <p className='text w-full max-w-2xl text-center text-[clamp(1rem,1.3vw,1.2rem)] font-light'>
            We have a group of eminent Faculty members with great
            personality and excellence in their specific domains.
         </p>

         <div className='cards w-full h-full py-4 flex justify-center gap-10 max-[599px]:flex-col max-[599px]:hidden max-[1098px]:flex-wrap'>
            {teachers?.map((teacher, index) => (
               <TeacherCard key={index} teacher={teacher} />
            ))}
         </div>

         {swiperVisible && (
            <div className='w-full h-full hidden max-[599px]:block py-10'>
               <Suspense fallback={<div>Loading...</div>}>
                  <Swiper
                     spaceBetween={30}
                     centeredSlides
                     autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                     }}
                     loop
                     modules={[Autoplay, Pagination, Navigation]}
                     className='mySwiper'
                  >
                     {teachers?.map((teacher, index) => (
                        <SwiperSlide key={index}>
                           <TeacherCard teacher={teacher} />
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </Suspense>
            </div>
         )}
      </section>
   );
};

export default Teachers;
