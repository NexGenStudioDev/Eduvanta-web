import { useEffect, useState, memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useTestimonial from '../../../hooks/useTestimoniyal';
import TestimonialPrimaryCard from '../../Molecules/Cards/Testimonial/TestimonialPrimaryCard';

const settings = {
   infinite: true,
   speed: 600,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 6000,
   arrows: false,
   dots: true,
   responsive: [{ breakpoint: 640, settings: { autoplay: false } }],
};

const Testimonials = () => {
   const testimonialData = useSelector(state => state.home.Testimonital);
   const [testimonials, setTestimonials] = useState([]);
   const { loading, error } = useTestimonial();

   useEffect(() => {
      setTestimonials(Array.isArray(testimonialData) ? testimonialData : []);
   }, [testimonialData]);

   return (
      <section className='w-full overflow-hidden bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12'>
         <div className='mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16'>
            <div>
               <span className='inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200'>Student stories</span>
               <h2 className='mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>Experiences that inspire us</h2>
               <p className='mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base'>Hear directly from students and alumni about their learning journeys at Eduvanta.</p>
               <Link to='/testimonial' className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'>Read community stories <span aria-hidden='true'>→</span></Link>
            </div>

            <div className='min-w-0'>
               {loading ? (
                  <div className='rounded-3xl border border-white/10 bg-white/5 p-7' role='status' aria-live='polite'>
                     <span className='sr-only'>Loading student stories</span>
                     <div className='h-4 w-28 animate-pulse rounded bg-white/10' />
                     <div className='mt-6 h-24 animate-pulse rounded-xl bg-white/10' />
                     <div className='mt-7 h-12 w-48 animate-pulse rounded-xl bg-white/10' />
                  </div>
               ) : error ? (
                  <div className='rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-6 text-slate-300' role='status'>Student stories are temporarily unavailable. Please visit the testimonials page again later.</div>
               ) : testimonials.length === 0 ? (
                  <div className='rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-6 text-slate-300'>No student stories have been shared yet. <Link to='/testimonial' className='font-semibold text-cyan-200 underline underline-offset-4'>Share your experience</Link>.</div>
               ) : (
                  <div className='testimonial-home-slider'>
                     {testimonials.length > 1 ? (
                        <Slider {...settings}>
                           {testimonials.map((item, index) => <div key={item._id || item.id || index} className='px-1 pb-2'><TestimonialPrimaryCard {...item} /></div>)}
                        </Slider>
                     ) : <TestimonialPrimaryCard {...testimonials[0]} />}
                  </div>
               )}
            </div>
         </div>
      </section>
   );
};

export default memo(Testimonials);
