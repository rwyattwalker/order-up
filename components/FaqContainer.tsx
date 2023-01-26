import React from 'react'
import FaqItem from './FaqItem'

type Item = {
  question: string,
  answer: string
}

type Props = {
  title: string,
  items: Item[]
}

function FaqContainer({title, items}:Props){
  return (
    <div className='mt-10'>
      <h2 className="text-4xl font-semibold mb-4 text-left">{title}</h2>
      {items.map((e, i)=>{
          return(
            <FaqItem key={i} question={`${e.question}`} answer={`${e.answer}`} />
          )
        })
      }
    </div>
  )
}

export default FaqContainer