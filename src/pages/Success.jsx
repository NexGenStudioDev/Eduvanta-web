import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Molecules/Loader/Loader';

const Success = () => {
   const [searchParams] = useSearchParams();
   const [status, setStatus] = useState('Verifying payment...');
   const [isVerifying, setIsVerifying] = useState(true);
   const [paymentSuccess, setPaymentSuccess] = useState(false);

   const navigate = useNavigate();

   const orderId = searchParams.get('order_id');

   useEffect(() => {
      const verifyPayment = async () => {
         if (!orderId) {
            setStatus('Invalid order ID.');
            setIsVerifying(false);
            return;
         }
         try {
            const res = await axios.get(
               `/api/v1/Student/verifyPayment?order_id=${encodeURIComponent(orderId)}`,
            );
            const data = res?.data?.data;
            if (data?.fee_status === 'Completed') {
               setPaymentSuccess(true);
               setStatus('Your payment has been verified and recorded.');
            } else {
               setStatus(res.data?.message || 'The payment is not complete yet.');
            }
         } catch (err) {
            setPaymentSuccess(false);
            setStatus(
               err.response?.data?.message ||
                  err.message ||
                  'Verification failed.',
            );
         } finally {
            setIsVerifying(false);
         }
      };

      verifyPayment();
   }, [orderId]);

   if (isVerifying) {
      return <Loader message='Verifying payment...' />;
   }

   return (
      <div className='flex flex-col items-center justify-center min-h-[85vh] bg-[#FAFAFA]'>
         {/* Success Logo */}
         <div className='mb-4'>
            <svg
               width='80'
               height='80'
               viewBox='0 0 24 24'
               fill='none'
            >
               <circle cx='12' cy='12' r='12' fill={paymentSuccess ? '#22c55e' : '#64748b'} />
               <path
                  d={paymentSuccess ? 'M7 13l3 3 7-7' : 'M8 8l8 8M16 8l-8 8'}
                  stroke='#fff'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
            </svg>
         </div>
         <h1 className={`text-3xl font-bold mb-2 ${paymentSuccess ? 'text-green-700' : 'text-slate-700'}`}>
            {paymentSuccess ? 'Payment Successful' : 'Payment not verified'}
         </h1>
         <p className='text-lg text-gray-700 mb-4'>{status}</p>
         {orderId && (
            <p className='mb-6 text-sm text-gray-500'>
               Order ID:{' '}
               <span className='font-semibold'>{orderId}</span>
            </p>
         )}

         <button
            className='px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition'
            onClick={() => navigate('/payment')}
         >
            Go to Dashboard
         </button>
      </div>
   );
};

export default Success;
