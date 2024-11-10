import moment from "moment"
function CompletedTask({task}) {
    return ( 
        <div className='bg-white py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="task-info text-gray-600 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize text-gray-700">{task.title}</h4>
                <p className="task-description text-gray-600">{task.description}</p>
                <div className='italic text-yellow-500'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
        </div>
     );
}

export default CompletedTask;