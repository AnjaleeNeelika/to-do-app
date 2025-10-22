import React, { useState } from 'react'
import TaskAddForm from './components/TaskAddForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className='h-screen p-10'>
      <h1 className='text-center font-bold text-3xl'>TO DO APP</h1> 
      <div className='flex flex-col gap-10 justify-center mt-10 md:flex-row'>
        <TaskAddForm />
        <TaskList />
      </div>
    </div>
  )
}

export default App
