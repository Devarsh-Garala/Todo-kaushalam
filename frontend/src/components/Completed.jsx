import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import CompletedTask from "./CompletedTask";
import Search from "./Search";

function Completed() {
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
                            task.completed && <CompletedTask
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

export default Completed;