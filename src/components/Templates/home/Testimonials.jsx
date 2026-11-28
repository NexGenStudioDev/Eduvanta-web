import { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useTestimonial from '../../../hooks/useTestimoniyal';
import TestimonialPrimaryCard from '../../Molecules/Cards/Testimonial/TestimonialPrimaryCard';

const sliderSettings = {
   infinite: true,
   speed: 650,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   centerPadding: '8%',
   autoplay: true,
   autoplaySpeed: 5500,
   pauseOnHover: true,
   arrows: false,
   dots: true,
   responsive: [
      {
         breakpoint: 1000,
         settings: { centerPadding: '4%' },
      },
      {
         breakpoint: 640,
         settings: { centerMode: false, centerPadding: '0%', autoplay: false },
      },
   ],
};

const Testimonials = () => {
   const testimonialData = useSelector(state => state.home.Testimonital);
   const { loading, error } = useTestimonial();
   const testimonials = Array.isArray(testimonialData) ? testimonialData : [];

   return (
      <section className='relative isolate w-full overflow-hidden bg-[#333] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12'>
         <div className='pointer-events-none absolute -right-32 -top-36 -z-10 h-96 w-96 rounded-full bg-blue-500/15 blur-[100px]' />
         <div className='pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[100px]' />

         <div className='mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12'>
            <div className='max-w-xl lg:py-8'>
               <span className='inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100'>
                  <span className='h-1.5 w-1.5 rounded-full bg-cyan-300' />
                  Student voices
               </span>
               <h2 className='mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]'>
                  Experiences that inspire us
               </h2>
               <p className='mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base'>
                  Every learning journey is different. Hear how students and alumni describe the teaching, support, and opportunities they found at Eduvanta.
               </p>
               <Link
                  to='/testimonial'
                  className='mt-7 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/[0.06] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'
               >
                  Read community stories
                  <span aria-hidden='true'>→</span>
               </Link>
            </div>

            <div className='min-w-0'>
               <div className='mb-4 flex items-center justify-between gap-3 px-1'>
                  <p className='text-xs font-semibold uppercase tracking-[0.16em] text-white/55'>
                     From our community
                  </p>
                  {testimonials.length > 1 && (
                     <p className='text-xs text-white/45'>Swipe to explore</p>
                  )}
               </div>

               {loading ? (
                  <div className='rounded-3xl border border-white/10 bg-white p-7 shadow-xl sm:p-9' role='status' aria-live='polite'>
                     <span className='sr-only'>Loading student stories</span>
                     <div className='h-4 w-28 animate-pulse rounded bg-slate-200' />
                     <div className='mt-6 h-24 animate-pulse rounded-xl bg-slate-100' />
                     <div className='mt-7 h-12 w-48 animate-pulse rounded-xl bg-slate-100' />
                  </div>
               ) : error ? (
                  <div className='rounded-3xl border border-white/10 bg-white p-7 text-sm leading-6 text-slate-600 shadow-xl sm:p-9' role='status'>
                     Student stories are temporarily unavailable. Please visit the testimonials page again later.
                  </div>
               ) : testimonials.length === 0 ? (
                  <div className='rounded-3xl border border-white/10 bg-white p-7 text-sm leading-6 text-slate-600 shadow-xl sm:p-9'>
                     No student stories have been shared yet.{' '}
                     <Link to='/testimonial' className='font-semibold text-blue-700 underline underline-offset-4'>
                        Share your experience
                     </Link>
                     .
                  </div>
               ) : testimonials.length > 1 ? (
                  <div className='testimonial-home-slider -mx-2 pb-5'>
                     <Slider {...sliderSettings}>
                        {testimonials.map((item, index) => (
                           <div key={item._id || item.id || index} className='px-2 pb-2'>
                              <TestimonialPrimaryCard {...item} />
                           </div>
                        ))}
                     </Slider>
                  </div>
               ) : (
                  <div className='px-2 pb-2'>
                     <TestimonialPrimaryCard {...testimonials[0]} />
                  </div>
               )}
            </div>
         </div>
      </section>
   );
};

export default memo(Testimonials);
