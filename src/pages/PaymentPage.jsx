import React, { memo, useEffect, useState } from 'react';
import TitleContainer from '../components/Templates/payment/TitleContainer';
import Summary from '../components/Templates/payment/Summary';
import Loader from '../components/Molecules/Loader/Loader';
import { useSelector } from 'react-redux';

const PaymentPage = memo(() => {
   const [Student, setStudent] = useState(null);
   const [Error, setError] = useState(false);
   const [Course, setCourse] = useState(null);
   const [Payment, setPayment] = useState(null);
   let payment = useSelector(state => state.Payment.Payment_Info);

   useEffect(() => {
      if (!payment) {
         setError(true);
      } else {
         setStudent(payment.student);
         setCourse(payment.course);
         setPayment(payment.fee);
         console.log('Payment:', payment.fee);
      }
   }, [payment]);

   const details = [
      {
         Name: 'Name',
         Placeholder: 'Your Name',
         Label: 'Name:',
         Value: Student?.firstName,
      },
   ];

   const Paymeny_Info = [
      {
         Name: 'Total Course Fee',
         Placeholder: 'Course Fee',
         Label: 'Total Course Fee:',
         Value:
            Payment && Payment.course_Fee
               ? '₹ ' + Payment.course_Fee
               : '₹ 0',
      },
      {
         Name: 'Total Amount Paid',
         Placeholder: 'Amount Paid',
         Label: 'Total Amount Paid:',
         Value:
            Payment && Payment.amount_paid
               ? '₹ ' + Payment.amount_paid
               : '₹ 0',
      },

      {
         Name: 'Total Amount Due',
         Placeholder: 'Amount Due',
         Label: 'Total Amount Due:',
         Value:
            Payment && Payment.amount_due
               ? '₹ ' + Payment.amount_due
               : '₹ 0',
      },
   ];

   const fees = [
      { id: 'fee-course', name: 'Course Fee', amount: Number(Payment?.course_Fee) || 0 },
      { id: 'fee-paid', name: 'Paid to Date', amount: Number(Payment?.amount_paid) || 0 },
   ];
   const amountDue = Number(Payment?.amount_due) || 0;
   const feesList = [
      ...fees,
      {
         id: 'total',
         name: 'Outstanding Balance',
         amount: amountDue.toLocaleString('en-IN'),
      },
   ];

   if (!Student || !Course || !Payment) {
      return Error ? (
         <section className='min-h-[60vh] px-6 py-24 flex items-center justify-center text-center'>
            <div className='max-w-lg rounded-2xl bg-white p-8 shadow-sm'>
               <h1 className='text-2xl font-semibold text-gray-900'>Payment details unavailable</h1>
               <p className='mt-3 text-gray-600'>Open the payment page from your student account after looking up your fee details.</p>
               <a className='mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white' href='/'>Return to the home page</a>
            </div>
         </section>
      ) : <Loader message='Loading payment details...' />;
   }

   return (
      <section className='w-full min-h-screen bg-[#F8F9FD] px-10 max-[599px]:px-4 py-20 flex items-center max-[599px]:justify-center gap-6 flex-col'>
         <div className='w-full px-4 py-6 bg-white rounded-2xl'>
            <h1 className='heading text-[1.65vw] max-[599px]:text-[3.65vw]'>
               Secure Payment Gateway
            </h1>
         </div>
         <div className='Payment_Container w-full h-full flex justify-between max-[599px]:flex-col gap-4 rounded-2xl'>
            <div className='payment-left-container w-[75%] max-[599px]:w-full flex flex-col gap-8 bg-white px-6 max-[599px]:px-4 py-8 max-[599px]:py-4 rounded-2xl border-[#D7D7D79E]'>
               <TitleContainer
                  title={'Student Information'}
                  form={true}
                  pay={true}
                  details={details}
               />
               <TitleContainer
                  title={'Payment Information'}
                  form={true}
                  details={Paymeny_Info}
                  amount={true}
               />
               <TitleContainer
                  title={'Bank Account'}
                  bank={true}
                  width={true}
               />
            </div>

            <Summary
               heading={Course?.courseName || 'Course Name'}
               duration={Course?.courseDuration || 'Duration'}
               description={
                  Course?.courseDescription || 'Description'
               }
               feesList={feesList}
            />
         </div>
      </section>
   );
});

export default PaymentPage;
