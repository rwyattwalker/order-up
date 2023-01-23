import React from 'react';
import FaqItem from '../components/FaqItem';
import Container from '../components/Container';

function App() {
  return (
    <Container dark getStarted>
    <div className="bg-gray-200 p-8 text-left flex">
      <div className="w-fit md:w-[750px] mx-auto my-auto">
        <h1 className="text-5xl font-semibold mb-4 text-center">Frequently Asked Questions</h1>
        <FaqItem question="What is your return policy?" answer="We accept returns within 30 days of purchase. Items must be in original condition with all tags attached." />
        <FaqItem question="How long does shipping take?" answer="Shipping typically takes 3-5 business days. Expedited shipping options are available at checkout." />
        <FaqItem question="Do you offer gift wrapping?" answer="Yes, we offer gift wrapping as an option at checkout." />
      </div>
    </div> 
    </Container>
  );
}

export default App;