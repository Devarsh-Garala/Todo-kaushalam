import React, { useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"
import "./createTask.css"

function CreateTask({ id }) {
    const { dispatch } = useContext(TaskContext)
    const { userToken } = useContext(TokenContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("low")
    const [dueDate, setDueDate] = useState("")
    const [toast, setToast] = useState();
    if (id) {
        console.log("asfid", id);
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/task/addTask", {
                title,
                description,
                priority,
                dueDate
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            setToast(res.data.message)
            showToast();
        } catch (error) {
            console.log(error);
        }
        dispatch({
            type: "ADD_TASK",
            title,
            description,
            priority,
            dueDate
        })
        setTitle("")
        setDescription("")
        setPriority("low")
        setDueDate("")
    }

    const showToast = () => {
        const toast = document.getElementById('toast');
        toast.style.display = "block"
        setTimeout(hideToast, 2000)
    }
    const hideToast = () => {
        const toast = document.getElementById('toast');
        toast.style.display = "none"
    }

    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className='w-11/12'>
                <form onSubmit={handleAdd}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5' />
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
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5' />
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
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-yellow-500 rounded-md text-white px-5 py-1'
                        >Add</button>
                    </div>
                </form>
                <div className="toast bg-yellow-500 text-white p-3 rounded-xl shadow-2xl text-center absolute bottom-4 left-1/2 -translate-x-1/2" id='toast'>
                    <p>{toast}</p>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;