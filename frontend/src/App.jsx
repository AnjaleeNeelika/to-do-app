import React, { useEffect, useState } from 'react'
import TaskAddForm from './components/TaskAddForm';
import TaskList from './components/TaskList';
import { getRecentIncompleteTasks } from './services/TaskService';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isTasksLoading, setIsTasksLoading] = useState(false);
  
    const fetchTasks = async () => {
      try {
          setIsTasksLoading(true);
          const data = await getRecentIncompleteTasks();
          console.log(data);
          setTasks(data || []);
      } catch (error) {
          console.error("Failed to fetch recent tasks: ", error);
      } finally {
          setIsTasksLoading(false);
      }
    };

    useEffect(() => {
      fetchTasks();
    }, []);


  return (
    <div className='h-screen p-10'>
      <h1 className='text-center font-bold text-3xl'>TO DO APP</h1> 
      <div className='flex flex-col gap-10 justify-center mt-10 md:flex-row'>
        <TaskAddForm onTaskAdded={fetchTasks} />
        <TaskList
            tasks={tasks}
            isTasksLoading={isTasksLoading}
            onTaskCompleted={fetchTasks}
        />

        <Toaster position='top-right' />
      </div>
    </div>
  )
}

export default App
