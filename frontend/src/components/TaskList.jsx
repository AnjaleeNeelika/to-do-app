import React, { useEffect, useState } from 'react'
import { getAllTasks, getRecentIncompleteTasks, markAsCompleted } from '../services/TaskService';
import { BiLoaderCircle } from 'react-icons/bi';
import toast from 'react-hot-toast';

const TaskList = ({ tasks, isTasksLoading, onTaskCompleted }) => {
  const [completingTaskId, setCompletingTaskId] = useState(null);  

  const handleMarkAsCompleted = async (taskId) => {
    try {
        setCompletingTaskId(taskId);
        await markAsCompleted(taskId);

        toast.success("Task marked as completed")
        onTaskCompleted();
    } catch (error) {
        console.error("Failed to mark task as done: ", error);
    } finally {
        setCompletingTaskId(null);
    }
  };

  return (
    <div className='flex-1 bg-amber-100 p-5 rounded-md flex flex-col gap-3 max-w-[550px] w-full mx-auto'>
        {isTasksLoading ? (
            <div>Loading Tasks...</div>
        ) : tasks.length === 0 ? (
            <div>No recent tasks</div>
        ) : (
            tasks
                .filter(task => !task.completed)
                .map((task, index) => (
                    <div key={index} className='bg-white rounded-md border border-gray-100 p-3 shadow-md'>
                        <h3 className='text-xl font-semibold'>{task?.title}</h3>
                        <p>{task.description}</p>
                        <button type='button' onClick={() => handleMarkAsCompleted(task.id)} disabled={completingTaskId === task.id} className='bg-blue-500 text-sm text-white font-semibold py-1 px-5 mt-3 rounded-md float-right shadow-md hover:bg-blue-600 transition-all hover:-translate-y-0.5 duration-150 cursor-pointer'>
                            {completingTaskId === task.id ? (
                                <BiLoaderCircle className='animate-spin' size={18} />
                            ) : (
                                'Done'
                            )}
                        </button>
                    </div>
                ))
        )}
    </div>
  )
}

export default TaskList
