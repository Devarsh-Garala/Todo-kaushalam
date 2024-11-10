import React from 'react';
import moment from 'moment';
import "./task.css";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "../../Axios/axios.js"
import TokenContext from '../../context/TokenContext';

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const navigate = useNavigate();

    const handleEditTask = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            await axios.delete("/task/removeTask", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
                data: { id: task._id }
            });
        } catch (error) {
            console.log(error);
        }
        dispatch({
            type: "REMOVE_TASK",
            id
        });
    };

    const handleMarkDone = (e) => {
        dispatch({
            type: "MARK_DONE",
            id
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return 'text-green-500';
            case 'medium':
                return 'text-yellow-500';
            case 'high':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className='bg-white py-6 rounded-lg shadow-lg flex items-center justify-between px-6 mb-4 border border-gray-100'>
            <div className="mark-done">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-yellow-400 cursor-pointer" 
                    onChange={handleMarkDone} 
                    checked={task.completed} 
                />
            </div>
            <div className="task-info text-gray-700 text-sm w-10/12 px-4">
                <h4 className={`task-title text-lg font-medium capitalize ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                </h4>
                <p className="task-description text-gray-500 mt-1">{task.description}</p>
                <p className={`task-priority mt-1 ${getPriorityColor(task.priority)}`}>Priority: {task.priority}</p>
                <p className="task-due-date text-gray-500 mt-1">Due Date: {task.dueDate ? moment(task.dueDate).format('MMMM Do YYYY') : 'No due date'}</p>
                <div className='italic text-gray-400 text-xs mt-2'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
            <div className="edit-task">
                <EditIcon
                    style={{ fontSize: 24, cursor: "pointer" }}
                    onClick={() => handleEditTask(task._id)}
                    className="edit-task-btn text-gray-400 hover:text-yellow-400 transition-colors duration-200" 
                />
            </div>
            <div className="remove-task">
                <DeleteIcon
                    style={{ fontSize: 24, cursor: "pointer" }}
                    onClick={handleRemove}
                    className="remove-task-btn text-gray-400 hover:text-yellow-400 transition-colors duration-200" 
                />
            </div>
        </div>
    );
}

export default Task;