import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import {
   MdComputer,
   MdDirectionsBus,
   MdFavorite,
   MdHotel,
   MdLightbulb,
   MdLocalLibrary,
   MdSchool,
   MdSportsSoccer,
   MdWifi,
   MdWork,
} from 'react-icons/md';
import frontendConfig from '../../../config/frontend.config.js';

const getFacilityIcon = title => {
   const name = title?.toLowerCase() || '';
   if (name.includes('computer') || name.includes('lab')) return MdComputer;
   if (name.includes('classroom')) return MdSchool;
   if (name.includes('library')) return MdLocalLibrary;
   if (name.includes('hostel')) return MdHotel;
   if (name.includes('transport')) return MdDirectionsBus;
   if (name.includes('wi-fi') || name.includes('wifi')) return MdWifi;
   if (name.includes('innovation') || name.includes('hackathon')) return MdLightbulb;
   if (name.includes('health') || name.includes('wellness')) return MdFavorite;
   if (name.includes('sport')) return MdSportsSoccer;
   if (name.includes('career') || name.includes('placement')) return MdWork;
   return MdSchool;
};

const FacilitiesCard = memo(({ facility, isActive, onClick }) => {
   const Icon = getFacilityIcon(facility.title);

   return (
      <button
         type='button'
         aria-pressed={isActive}
         onClick={onClick}
         className={`flex min-h-11 w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6603] focus-visible:ring-offset-2 ${
            isActive
               ? 'border-[#FF6603] bg-[#FF6603] text-white shadow-sm'
               : 'border-transparent bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50'
         }`}
      >
         <Icon aria-hidden='true' className='shrink-0 text-lg' />
         <span>{facility.title}</span>
      </button>
   );
});

const CampusFacilities = () => {
   const defaultFacilities = frontendConfig.aboutPage.Facilities;
   const defaultDesc = frontendConfig.aboutPage.Description;
   const [facilities, setFacilities] = useState(defaultFacilities);
   const [description, setDescription] = useState(defaultDesc);
   const [activeTab, setActiveTab] = useState(defaultFacilities[0]);
   const [imageFailed, setImageFailed] = useState(false);
   const aboutPage = useSelector(state => state.about.aboutPage);

   useEffect(() => {
      if (aboutPage?.Facilities?.length) {
         setFacilities(aboutPage.Facilities);
         setDescription(aboutPage.Description || defaultDesc);
         setActiveTab(aboutPage.Facilities[0]);
      } else {
         setFacilities(defaultFacilities);
         setDescription(defaultDesc);
         setActiveTab(defaultFacilities[0]);
      }
   }, [aboutPage, defaultFacilities, defaultDesc]);

   useEffect(() => setImageFailed(false), [activeTab?.image]);

   const ActiveIcon = getFacilityIcon(activeTab?.title);
   const imageUrl = activeTab?.image;

   return (
      <section className='w-full bg-slate-950 px-5 py-12 sm:px-8 lg:px-10'>
         <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.6fr)] lg:items-center'>
            <div className='rounded-2xl bg-white p-4 shadow-xl sm:p-5'>
               <h2 className='mb-3 px-2 text-lg font-semibold text-slate-900'>
                  Browse facilities
               </h2>
               {facilities.length ? (
                  <div
                     role='group'
                     aria-label='Choose a campus facility'
                     className='flex max-h-64 gap-2 overflow-x-auto pb-2 lg:max-h-[34rem] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0'
                  >
                     {facilities.map((facility, index) => (
                        <div className='min-w-52 lg:min-w-0' key={facility._id || facility.title || index}>
                           <FacilitiesCard
                              facility={facility}
                              isActive={activeTab?.title === facility.title}
                              onClick={() => setActiveTab(facility)}
                           />
                        </div>
                     ))}
                  </div>
               ) : (
                  <p className='px-2 py-4 text-sm text-slate-600' role='status'>
                     Facility information will appear here when available.
                  </p>
               )}
            </div>

            <div className='min-w-0 text-white'>
               <p className='mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300'>
                  Campus life
               </p>
               <h2 className='text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight'>
                  {frontendConfig.aboutPage.FacilitiesSection.heading}
               </h2>
               <p className='mt-3 max-w-2xl text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed text-slate-300'>
                  {frontendConfig.aboutPage.FacilitiesSection.introduction}
               </p>

               <article className='mt-7 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl sm:grid-cols-[minmax(12rem,0.72fr)_minmax(0,1.28fr)]'>
                  <div className='relative flex min-h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500/25 via-slate-800 to-slate-900 sm:min-h-72'>
                     {imageUrl && !imageFailed ? (
                        <img
                           src={imageUrl}
                           alt={`${activeTab?.title || 'Campus'} facility`}
                           loading='lazy'
                           onError={() => setImageFailed(true)}
                           className='absolute inset-0 h-full w-full object-cover'
                        />
                     ) : (
                        <ActiveIcon aria-hidden='true' className='h-20 w-20 text-orange-200' />
                     )}
                     <div className='absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent' />
                     <span className='absolute bottom-4 left-4 right-4 text-lg font-semibold text-white'>
                        {activeTab?.title || 'Campus facilities'}
                     </span>
                  </div>
                  <div className='flex flex-col justify-center p-6 sm:p-8'>
                     <h3 className='text-[clamp(1.25rem,1.8vw,1.75rem)] font-semibold leading-snug'>
                        {activeTab?.Heading || activeTab?.title || 'Facilities designed around student growth'}
                     </h3>
                     <p className='mt-4 text-[clamp(0.95rem,1vw,1.0625rem)] leading-relaxed text-slate-300'>
                        {activeTab?.description || description.paragraph}
                     </p>
                  </div>
               </article>
            </div>
         </div>
      </section>
   );
};

export default memo(CampusFacilities);
