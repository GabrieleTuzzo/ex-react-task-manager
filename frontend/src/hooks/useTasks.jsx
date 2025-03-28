import { useEffect, useState } from 'react';

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const fetchedTasks = await fetchData(`/tasks`, 'GET');

            setTasks(fetchedTasks);
        }

        fetchTasks();
    }, []);

    async function fetchData(path, method, body = null) {
        const options = {
            method: method,
        };

        if (body) {
            options.body = JSON.stringify(body);
            options.headers = { 'Content-Type': 'application/json' };
        }

        const res = await fetch(
            `${import.meta.env.VITE_BASE_URI}${path}`,
            options
        );
        const data = await res.json();

        return data;
    }

    function addTask(newTask) {
        return (async function postTask() {
            const response = await fetchData('/tasks', 'POST', newTask);

            if (response.success) {
                setTasks([...tasks, newTask]);
            } else {
                console.error(response.message);
            }

            return response;
        })();
    }

    function removeTask(id) {
        return (async function deleteTask() {
            const response = await fetchData(`/tasks/${id}`, 'DELETE');

            if (response.success) {
                setTasks(tasks.filter((t) => t.id !== id));
            } else {
                console.error(response.message);
            }
            return response;
        })();
    }

    function updateTask(updatedTask) {
        return (async function putTask() {
            const response = await fetchData(
                `/tasks/${updatedTask.id}`,
                'PUT',
                updatedTask
            );

            if (response.success) {
                setTasks(
                    tasks.map((t) => {
                        if (t.id === updatedTask.id) {
                            t = { ...updatedTask };
                        }
                        return t;
                    })
                );
            } else {
                console.error(response.message);
            }
            return response;
        })();
    }

    return { tasks, addTask, removeTask, updateTask };
}
