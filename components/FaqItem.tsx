import React, { useState } from 'react';

type Props = {
  question: string,
  answer: string
}

const FaqItem = ({ question, answer }:Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h2 className="text-lg font-medium mb-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
        {question}
      </h2>
      {isVisible && <p className="text-gray-700">{answer}</p>}
    </div>
  );
};

export default FaqItem;