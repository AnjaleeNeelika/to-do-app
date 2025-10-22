import React, { useState } from 'react'

const TaskAddForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validateForm = () => {
    let validForm = true;
    let newErrors = { title: "", description: "" };

    if (!formData.title) {
        validForm = false;
        newErrors.title = "Title is required";
    }
    if (!formData.description) {
        validForm = false;
        newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return validForm;
  }

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newTask = {
        title: formData.title,
        description: formData.description,
        status: "In Progress"
    };

    console.log("Form data: ", newTask);
    setFormData({ title: "", description: "" });
    setErrors({ title: "", description: "" });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
  }

  return (
    <div className='flex-1 bg-slate-100 p-5 rounded-md'>
        <h2 className='text-2xl text-center font-semibold'>Add A Task</h2>
        <div>
            <form action="">
                <div className='flex flex-col mb-3'>
                    <label className='font-semibold'>Title</label>
                    <input type="text" name="title" placeholder='Title' value={formData.title} onChange={handleInputChange} className={`bg-white rounded-md px-4 py-2 text-gray-500 text-sm border border-gray-200 outline-blue-500 ${errors.title && 'border-red-500'}`} />
                    {errors.title && 
                        <p className='text-red-500 text-xs'>{errors.title}</p>
                    }
                </div>
                <div className='flex flex-col mb-10'>
                    <label className='font-semibold'>Description</label>
                    <textarea type="text" name="description" placeholder='Description' value={formData.description} onChange={handleInputChange} className={`bg-white rounded-md px-4 py-2 text-gray-500 text-sm border border-gray-200 outline-blue-500 ${errors.description && 'border-red-500'}`} />
                    {errors.description && 
                        <p className='text-red-500 text-xs'>{errors.description}</p>
                    }
                </div>
                <button type="button" onClick={handleSubmit} className='bg-blue-500 w-36 py-2 rounded-md text-white font-semibold text-sm shadow-md cursor-pointer hover:bg-blue-600 transition-all transform hover:-translate-y-1 duration-150 float-right'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default TaskAddForm
