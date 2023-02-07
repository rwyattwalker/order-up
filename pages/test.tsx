import React from 'react'

const App = () => {

  return (
  <div className='mt-20'>
    <div style={{width:'full', maxHeight:'400px', display:'flex', gap:"50px", justifyContent:"center", backgroundColor:'#e1e1e1'}}>
      <h1 style={{marginTop:'auto', marginBottom:"auto", fontSize:"44px", fontWeight:"800"}}>Order Up!</h1>
      <img src='/food-web-2.png' alt='food truck image' style={{objectFit:'contain', width:500}} />
    </div>
    <div style={{marginTop:"40px"}}>
      <h1 style={{textAlign:"center", fontSize:"32px", fontWeight:"800",borderTop:"2px solid grey"}}>Get ready to have the coolest food truck in town!</h1>
      <h1 style={{textAlign:"left", fontSize:"22px", fontWeight:"500" }}>Here&apos;s what to expect going forward</h1>
    </div> 
   
  </div> 
  );
};

export default App;
