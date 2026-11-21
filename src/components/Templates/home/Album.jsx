import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAlbum from '../../../hooks/useAlbum';
import { Remove_One_Album } from '../../../store/homeSlice';
import AlbumPrimaryCard from '../../Molecules/Cards/Album/AlbumPrimaryCard';

const Album = () => {
   const [userRole, setUserRole] = useState('');

   const dispatch = useDispatch();
   const user = useSelector(state => state.auth.user);
   const album = useSelector(state => state.home.Album);

   const { loading, error } = useAlbum();

   // All hooks must run before any early return (React error #310).
   useEffect(() => {
      setUserRole(user?.role || '');
   }, [user]);

   const handleAlbumDelete = async (e, albumItem) => {
      try {
         e.stopPropagation();
         e.preventDefault();

         if (userRole === 'admin') {
            dispatch(Remove_One_Album({ _id: albumItem._id }));
            await axios.delete(
               `/api/v1/admin/delete/album/${albumItem._id}`,
            );
         } else {
            window.location.href = `/album/${albumItem.aName}`;
         }
      } catch (err) {
         console.error('Error:', err);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err?.response?.data || 'Something went wrong!',
         });
      }
   };

   const albums = Array.isArray(album) ? album : [];

   // Early return is safe only after every hook above has executed.
   if (loading) {
      return (
         <section className='flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center'>
            <span className='h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500' />
            <p className='mt-4 text-base text-slate-600' role='status' aria-live='polite'>
               Loading campus albums…
            </p>
         </section>
      );
   }

   return (
      <div className='w-full h-auto md:h-screen px-[3vw] py-5 flex items-center justify-between flex-col md:flex-row'>
         <div className='md:w-[55vw] md:h-[62vh] w-full sm:h-full grid grid-rows-2 grid-cols-2 md:grid-cols-3 gap-[3vw] md:gap-[1.5vw] place-items-center'>
            {albums.length === 0 ? (
               <div className='col-span-full mx-auto max-w-md text-center text-gray-600' role='status'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                     {error ? 'Albums are unavailable right now' : 'No albums yet'}
                  </h2>
                  <p className='mt-2 text-sm'>
                     {error
                        ? 'Please check back in a little while.'
                        : 'Campus albums will appear here when they are published.'}
                  </p>
               </div>
            ) : (
               albums.map((item, idx) => (
                  <AlbumPrimaryCard
                     key={item?._id || item?.aName || idx}
                     image={item.aImage_url}
                     title={item.aName}
                     date={item.createdAt}
                     isAdmin={userRole === 'admin'}
                     onClickViewUrl={`/album/${item.aName}`}
                     onClickDelete={e => handleAlbumDelete(e, item)}
                     containerClass='w-full h-full rounded-lg overflow-hidden relative m-[3vw]'
                     imageClass='h-full w-full object-cover object-top'
                     titleClass='text-[2vw] md:text-[1vw] text-white font-semibold'
                     dateClass='text-[2.3vw] md:text-[1vw] text-white'
                  />
               ))
            )}
         </div>

         {albums.length > 0 && (
            <div className='h-[63vh] w-full md:w-[35vw] mr-[1vw] md:mr-[2vw] rounded-lg relative'>
               <AlbumPrimaryCard
                  image={albums[albums.length - 1]?.aImage_url}
                  title={albums[albums.length - 1]?.aName}
                  date={albums[albums.length - 1]?.createdAt}
                  isAdmin={userRole === 'admin'}
                  onClickViewUrl={`/album/${albums[albums.length - 1]?.aName}`}
                  onClickDelete={e =>
                     handleAlbumDelete(e, albums[albums.length - 1])
                  }
                  containerClass='flex h-full w-full rounded-lg overflow-hidden relative'
                  imageClass='h-full w-full object-cover object-top'
                  titleClass='text-[2vw] md:text-[1vw] text-white font-semibold'
                  dateClass='text-[2.3vw] md:text-[1vw] text-white'
               />
            </div>
         )}
      </div>
   );
};

export default Album;
