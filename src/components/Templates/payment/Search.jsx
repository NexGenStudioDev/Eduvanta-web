import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { setPayment_Info } from '../../../store/PaymentSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ValidateUniqueIdInput from '../../Atoms/Input/ValidateUniqueIdInput';
import Loader from '../../Molecules/Loader/Loader';

const Search = () => {
   const dispatch = useDispatch();
   const [Student_Id, setStudent_Id] = useState(null);
   const [getValidationStatus, setGetValidationStatus] =
      useState(false);
   const [isLoading, setIsLoading] = useState(false);

   let Handle_Search = async () => {
      if (!getValidationStatus || !Student_Id || isLoading) return;
      setIsLoading(true);
      try {
         const response = await axios.get(
            `/api/v1/Student/FeeInfoByStudent?uniqueId=${encodeURIComponent(Student_Id)}`,
         );

         if (response.data.success) {
            dispatch(setPayment_Info(response.data.data));
         } else {
            throw new Error(response.data?.message || 'Unable to find payment details.');
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || error.message || 'Could not load fee details. Please try again.',
            showConfirmButton: true,
         });
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      dispatch(setPayment_Info(null));

   }, [dispatch]);

   return (
      <div className='Student_Id_Container w-full bg-[#FAFAFA]  p-4'>
         {isLoading && <Loader message='Looking up your fee details…' />}
         <label htmlFor='studentId'>
            <h1 className='text-[1vw] max-[599px]:text-[3vw] font-medium mb-2 ml-1'>
               Student Id
            </h1>
         </label>

         <div className='flex '>
            <ValidateUniqueIdInput
               getValidationStatus={status =>
                  setGetValidationStatus(status)
               }
               getStudentId={id => setStudent_Id(id)}
               className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 placeholder:text-[.9vw] w-full'
            />

            <button
               className='bg-green-600 ml-[2vw] p-[0.7vw] text-white rounded-md font-medium'
               disabled={!getValidationStatus || isLoading}
               onClick={Handle_Search}
            >
               {isLoading ? 'Searching…' : 'Search'}
            </button>
         </div>
      </div>
   );
};

export default Search;
