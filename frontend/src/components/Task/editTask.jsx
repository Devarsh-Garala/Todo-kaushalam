import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [toast, setToast] = useState("");
    console.log("id: ", id);
    useEffect(() => {
        const task = tasks.find(task => task._id === id);
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority || "medium");
            setDueDate(task.dueDate || "");
            setCompleted(task.completed);
        }
    }, [id, tasks]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/task/editTask/${id}`, {
                title,
                description,
                priority,
                dueDate,
                completed
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (res.data.success) {
                dispatch({
                    type: "EDIT_TASK",
                    id,
                    payload: {
                        title,
                        description,
                        priority,
                        dueDate,
                        completed
                    }
                });

                // Fetch updated tasks after edit
                const updatedTasks = await axios.get("/task/getTask", {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                dispatch({ type: "SET_TASK", payload: updatedTasks.data });

                setToast(res.data.message || "Task updated successfully");
                showToast();
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 2000);
            } else {
                throw new Error(res.data.message || "Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            setToast(error.response?.data?.message || "Error updating task");
            showToast();
        }
    };

    const showToast = () => {
        const toast = document.getElementById('toast');
        toast.style.display = "block";
        setTimeout(hideToast, 2000);
    };

    const hideToast = () => {
        const toast = document.getElementById('toast');
        toast.style.display = "none";
    };

    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className='w-11/12'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={5}
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="priority">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5'
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className='my-3'>
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="datetime-local"
                            name="dueDate"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='my-3'>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                                className="w-4 h-4 accent-yellow-400 cursor-pointer mr-2"
                            />
                            Mark as completed
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-yellow-500 rounded-md text-white px-5 py-1'
                        >
                            Update
                        </button>
                    </div>
                </form>
                <div className="toast bg-yellow-500 text-white p-3 rounded-xl shadow-2xl text-center absolute bottom-4 left-1/2 -translate-x-1/2" id='toast'>
                    <p>{toast}</p>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
