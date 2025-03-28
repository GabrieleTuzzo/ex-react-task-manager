import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { isTitleValid } from '../utils/functions';

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const editFormRef = useRef();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setStatus(task.status || 'To do');
        }
    }, [task]);

    return (
        <Modal
            title={'Modifica Task'}
            show={show}
            confirmText={'Salva'}
            onClose={onClose}
            onConfirm={() => {
                editFormRef.current.requestSubmit();
            }}
            content={
                <form
                    ref={editFormRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave({ ...task, title, description, status });
                    }}
                >
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
                        <input
                            type="textarea"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Task status: </label>
                        <select
                            name="status"
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                            value={status}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
        />
    );
}
