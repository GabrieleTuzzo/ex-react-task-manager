import { useContext, useRef, useState } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import { isTitleValid } from '../utils/functions';

export default function addTask() {
    const [title, setTitle] = useState('');
    const descRef = useRef();
    const statusRef = useRef();

    const { addTask } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isTitleValid(title)) {
            const newTask = {
                title: title,
                description: descRef.current.value,
                status: statusRef.current.value,
            };

            const response = await addTask(newTask);

            if (response.success) {
                alert('Task created successfully');
                setTitle('');
                descRef.current.value = '';
                statusRef.current.value = 'To do';
            } else {
                alert(response.message);
            }
        } else {
            console.error('Data not valid');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Task title: </label>
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                {!isTitleValid(title) && (
                    <p style={{ color: 'red' }}>Title not valid</p>
                )}
            </div>
            <div>
                <label htmlFor="description">Task description: </label>
                <input type="textarea" ref={descRef} />
            </div>
            <div>
                <label htmlFor="status">Task status: </label>
                <select name="status" ref={statusRef}>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button>Aggiungi Task</button>
        </form>
    );
}
