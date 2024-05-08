import React from 'react'

const Dashboard = () => {
  return (
    <div className='overflow-y-scroll md:overflow-hidden lg:overflow-hidden'>
      <h1 className='text-5xl font-semibold'>Dashboard</h1>
      <div className='flex flex-wrap gap-5 mt-8 '>
        <div className='w-72 h-72 p-3 bg-white/10 rounded-lg border-2 border-[#FFAE35]'>Details</div>
        <div className='w-72 h-72 p-3 bg-white/10 rounded-lg border-2 border-[#FFAE35]'>Transaction</div> 
        <div className='w-72 h-72 p-3 bg-white/10 rounded-lg border-2 border-[#FFAE35]'>Accounting</div>
        <div className='w-72 h-72 p-3 bg-white/10 rounded-lg border-2 border-[#FFAE35]'>Menu</div>
      </div>
    </div>
  )
}

export default Dashboard