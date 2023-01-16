import React from 'react'
import JobDescription from '../../components/jobDescription'

function salesExecutive() {
  return (
    <JobDescription
      title={"Sales Executive"} 
      description={"Evolve is a rapidly growing software company that is looking for a commission-based sales representative to join our dynamic team. In this role, you will have the opportunity to significantly impact your income by identifying and closing new business opportunities. You will have the flexibility to set your own schedule and work largely independently, but will also have access to a team of support staff to assist with any questions or challenges that may arise. As a commission-based sales representative, you will have the opportunity to earn a generous commission on all sales made. This is a fantastic opportunity for someone who is driven and wants to take control of their income potential."}
      requirements={["Highly motivated and confident", "Proven track record of sales success","Strong communication and interpersonal skills", "Ability to work largely independently", "Experience in the software industry a plus, but not required","High school diploma or equivalent required, bachelor's degree preferred"]}
      link={"sales-executive"}
    />
  )
}

export default salesExecutive