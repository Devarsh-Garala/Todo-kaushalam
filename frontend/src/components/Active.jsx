import React, { useState } from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import Search from './Search';

function Active() {
    const { tasks } = useContext(TaskContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <div>
            <Search onSearch={handleSearch} />
            {
                (filteredTasks.length !== 0) ? (
                    filteredTasks.map((task, index) => {
                        return (
                            !task.completed && <Task
                                key={index}
                                task={task}
                                id={index}
                            />
                        )
                    })
                ) : (
                    <h1>No Task Found</h1>
                )
            }
        </div>
    );
}

export default Active;