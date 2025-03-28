import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GlobalContext from '../contexts/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const navigate = useNavigate();
    const parsedId = parseInt(id);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const index = tasks.findIndex((t) => t.id === parsedId);

    const handleDelete = async () => {
        const response = await removeTask(parsedId);

        if (response.success) {
            alert('Task Deleted');
            navigate('/');
        } else {
            alert(response.message);
        }
    };

    const handleEdit = async (task) => {
        console.log(task);
        const response = await updateTask(task);

        if (response.success) {
            alert('Task modified');
            setShowEditModal(false);
        } else {
            alert(response.message);
        }
    };

    return (
        <div>
            {tasks[index] && (
                <>
                    <p>Nome: {tasks[index].title}</p>
                    <p>Descrizione: {tasks[index].description}</p>
                    <p>Stato: {tasks[index].status}</p>
                    <p>Data di creazione: {tasks[index].createdAt}</p>
                </>
            )}
            <button
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Elimina Task
            </button>
            <button
                onClick={() => {
                    setShowEditModal(true);
                }}
            >
                Modifica Task
            </button>
            <Modal
                title="Eliminare Task?"
                content={<p>Sicuro di voler eliminare il Task?</p>}
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                onConfirm={handleDelete}
            />
            <EditTaskModal
                show={showEditModal}
                task={tasks[index]}
                onClose={() => {
                    setShowEditModal(false);
                }}
                onSave={handleEdit}
            />
        </div>
    );
}
