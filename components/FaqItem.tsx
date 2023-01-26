import React, { useState } from 'react';

type Props = {
  question: string,
  answer: string
}

const FaqItem = ({ question, answer }:Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className=" p-4 my-1 border-b border-gray-500">
      <h2 className="text-xl text-green font-bold cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
        {!isVisible ? `+ ` : `- ` }{question}
      </h2>
      {isVisible && <p className="text-gray-500 font-semibold">{answer}</p>}
    </div>
  );
};

export default FaqItem;