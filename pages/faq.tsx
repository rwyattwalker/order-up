import React from 'react';
import Container from '../components/Container';
import FaqContainer from '../components/FaqContainer';

function App() {
  return (
    <Container dark getStarted>
    <div className="bg-gray-200 p-8 text-left flex">
      <div className="w-fit md:w-[750px] mx-auto my-auto">
        <h1 className="text-5xl font-semibold mb-4 text-center">Frequently Asked Questions</h1>   
        <FaqContainer 
          title="Getting Started" 
          items={[
            {question:"What happens after I sign up?", 
            answer: "After your purchase a service, your will receive an Email outlining what to expect as we begin the development process."}, 
            {question:'How long does development take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'},
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'},
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'},
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'}
            ]} />
        <FaqContainer 
          title="Design" 
          items={[
            {question:"Who is going to design my website?", answer: "Your new site will be created by the OrderUp Design Team who specialize solely in creating restaurant websites that make a powerful first impression and help convert visitors into paying customers."}, 
            {question:'Will my website by mobile friendly', answer:'Yes. Every OrderUp website is mobile friendly and responsive, ensuring your website experience adjusts according to the device your visitor is using.'},
            {question:'Will my website be SEO Optimized?', answer:"You'll find best practice SEO features, like customizable URLs and meta titles, robust menu schemas, optimized page structures and more in every OrderUp website."},
            ]} /> 
        <FaqContainer 
          title="Hosting" 
          items={[
            {question:"What is your return policy?", answer: "Never"}, 
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'}
            ]} /> 
        <FaqContainer 
          title="Mobile Ordering" 
          items={[
            {question:"What is your return policy?", answer: "Never"}, 
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'}
            ]} />
        <FaqContainer 
          title="Integrations" 
          items={[
            {question:"What is your return policy?", answer: "Never"}, 
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'}
            ]} />
        <FaqContainer 
          title="Cost and Billing" 
          items={[
            {question:"What is your return policy?", answer: "Never"}, 
            {question:'How long does shipping take?', answer:'Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.'}
            ]} />
     
      </div>
    </div> 
    </Container>
  );
}

export default App;