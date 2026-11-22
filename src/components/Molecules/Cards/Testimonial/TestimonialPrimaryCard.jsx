import { memo } from 'react';
import { MdStar } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { deleteTestimonial } from '../../../../store/Testimonials.slice';
import { toast } from 'react-toastify';

const renderStars = (count = 0) => {
   const rating = Math.min(Math.max(Number(count) || 0, 0), 5);
   return [...Array(5)].map((_, i) => (
      <span key={i} className={`inline-block ${i < rating ? 'text-amber-400' : 'text-slate-300'}`}>
         <MdStar />
      </span>
   ));
};

const TestimonialPrimaryCard = ({
   image,
   name,
   _id,
   job_Role,
   message,
   rating,
   star,
   containerClass = '',
   imageClass = '',
   nameClass = '',
   roleClass = '',
   messageClass = '',
   starClass = '',
}) => {
   let dispatch = useDispatch();
   const user = useSelector(state => state.auth.user);
   const { loading } = useSelector(state => state.testimonials);

   const handleTestimonialDelete = () => {
      if (
         window.confirm(
            'Are you sure you want to delete this testimonial?',
         )
      ) {
         dispatch(deleteTestimonial(_id))
            .unwrap()
            .then(() => {
               toast.success('Testimonial deleted successfully!'); // Optional: Show success toast
            })
            .catch(err => {
               toast.error(err || 'Failed to delete testimonial'); // Optional: Show error toast
            });
      }
   };

   return (
      <div
         className={`card w-full max-w-2xl min-h-[250px] bg-white text-slate-900 rounded-3xl px-6 py-7 sm:px-8 sm:py-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full ${containerClass}`}
      >
         {user?.role === 'admin' && (
            <div className='w-full h-[5vh] flex items-center justify-end text-[2rem]'>
               <button
                  className='bg-black text-white rounded-full p-2 cursor-pointer'
                  onClick={handleTestimonialDelete}
                  disabled={loading}
                  aria-label='Delete testimonial'
               >
                  <MdDelete />
               </button>
            </div>
         )}

         <div className='profile flex items-center gap-4'>
            <div
               className={`image w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-slate-100 ${imageClass}`}
            >
               <img
                  src={image}
                  alt={name}
                  loading='lazy'
                  className='w-full h-full object-cover'
                  onError={event => { event.currentTarget.src = '/logo.png'; }}
               />
            </div>
            <div className='txts'>
               <h1
                  className={`name text-base sm:text-lg font-semibold ${nameClass}`}
               >
                  {name}
               </h1>
               <p
                  className={`position text-xs sm:text-sm text-slate-500 ${roleClass}`}
               >
                  {job_Role}
               </p>
            </div>
         </div>

         <p
            className={`review mt-5 text-sm sm:text-base leading-7 text-slate-700 ${messageClass}`}
            style={{
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               display: '-webkit-box',
               WebkitLineClamp: 4,
               WebkitBoxOrient: 'vertical',
               minHeight: '5.5em',
               maxHeight: '7em',
            }}
            title={message}
         >
            {message}
         </p>

         <div
            className={`stars flex justify-between mt-5 ${starClass}`}
         >
            <span className='text-lg' aria-label={`${rating ?? star ?? 0} out of 5 stars`}>
               {renderStars(rating ?? star)}
            </span>
         </div>
      </div>
   );
};

export default memo(TestimonialPrimaryCard);
