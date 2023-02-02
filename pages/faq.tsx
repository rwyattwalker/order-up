import Link from 'next/link';
import React from 'react';
import Container from '../components/Container';
import FaqContainer from '../components/FaqContainer';

function App() {
  return (
    <Container dark getStarted>
    <div className="bg-gray-200 px-8 pb-8 text-left flex flex-col"> 
    <h1 className="text-5xl font-semibold mb-4 text-center">Frequently Asked Questions</h1>
    <div className='flex justify-center flex-col sm:flex-row text-center'>
      <p className="text-xl font-thin text-center my-auto">Don&apos;t see what your looking for?&nbsp;</p>
      <Link href={'/contact'} className='py-2 px-4 bg-pastel-green rounded-full text-white font-semibold text-center mt-4 sm:mt-0 sm:w-fit max-w-md mx-auto sm:mx-0'>Contact Us</Link>
    </div>
      <div className="w-fit md:w-[750px] mx-auto my-auto">
        <FaqContainer 
          title="Getting Started" 
          items={[
            {question:"What happens after I sign up?", 
            answer: "Immediately after your purchase a service, your will receive an Email outlining what to expect as we begin the development process. A project manager will be assigned to your project and will reach out within 24 hours to set up an initial development meeting with you. After this meeting, development of your service will begin."}, 
            {question:'How long does development take?', answer:'Development time can vary based on a few factors such as the selected services and the amount of design revisions. However we aim to have you up and running with all selected services within a month of purchase.'},
            ]} />
        <FaqContainer 
          title="Design" 
          items={[
            {question:"Who is going to design my website?", answer: "Your new site will be created by the OrderUp Design Team who specialize solely in creating restaurant websites that make a powerful first impression and help convert visitors into paying customers."}, 
            {question:'Will my website by mobile friendly', answer:'Yes. Every OrderUp website is mobile friendly and responsive, ensuring your website experience adjusts according to the device your visitor is using.'},
            {question:'Will I have a say in the design?', answer:'Of course! Our designers create your website around your style and to your specifications. Additionally, we offer three rounds of revisions to your website design before launch.'},
            {question:'Will my website be SEO Optimized?', answer:"You'll find best practice SEO features, like customizable URLs and meta titles, robust menu schemas, optimized page structures and more in every OrderUp website."},
            ]} /> 
        <FaqContainer 
          title="Hosting" 
          items={[
            {question:"Is hosting included in my service?", answer: "Absolutely! No need to fear, we take care of all of that for you."}, 
            {question:"Do I retain ownership of my domain?", answer: "Yes. You retain complete ownership of your domain."}, 
            {question:"Will my website be secure?", answer: "All Order Up websites are SSL certified and operate under encrypted connections to provide the highest degree of security."}, 
            ]} />
        <FaqContainer 
          title="Post Launch" 
          items={[
            {question:"Will I be able to make changes to my site?", answer: "Absolutely! We set up our clients with an easy to use Content Management System for updating site photos as well as key information."}, 
            {question:'What if something goes wrong?', answer:'We provide the highest quality services, guaranteed. If anything ever malfunctions, our developers are ready to take care of it for you at no additional charge.'}
            ]} /> 
        <FaqContainer 
          title="Cost and Billing" 
          items={[
            {question:"When does subscription billing start?", answer: "Subscription billing starts once your project has been completed on the day that it goes live."},
            {question:"What is the cancelation policy?", answer: "You can cancel your subscription anytime by emailing support@getorderup.com with a request to cancel."}
            ]} />
     
      </div>
    </div> 
    <div className='my-5'></div>
    </Container>
  );
}

export default App;