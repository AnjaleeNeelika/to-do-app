import React from 'react'

const TaskList = () => {
  const tasks = [
    {
        id: 1,
        title: "Task 1",
        description: "Task 1 description here",
        isCompleted: false,
    },
    {
        id: 2,
        title: "Task 2",
        description: "Task 2 description here",
        isCompleted: true,
    }
  ];

  return (
    <div className='flex-1 bg-amber-100 p-5 rounded-md flex flex-col gap-3'>
        {tasks
            .filter(task => !task.isCompleted)
            .map((task, index) => (
                <div key={index} className='bg-white rounded-md border border-gray-100 p-3 shadow-md'>
                    <h3 className='text-xl font-semibold'>{task?.title}</h3>
                    <p>{task.description}</p>
                    <button className='bg-blue-500 text-sm text-white font-semibold py-1 px-5 mt-3 rounded-md float-right shadow-md hover:bg-blue-600 transition-all hover:-translate-y-0.5 duration-150 cursor-pointer'>Done</button>
                </div>
            ))
        }
    </div>
  )
}

export default TaskList
