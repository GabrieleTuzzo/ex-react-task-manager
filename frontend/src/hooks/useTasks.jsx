import { useEffect, useState } from 'react';

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const fetchedTasks = await fetchData(
                `${import.meta.env.VITE_BASE_URI}/tasks`,
                'GET'
            );

            setTasks(fetchedTasks);
        }

        fetchTasks();
    }, []);

    async function fetchData(url, method) {
        const res = await fetch(url, { method: method });
        const data = await res.json();

        return data;
    }

    function addTask() {}
    function removeTask() {}
    function updateTask() {}

    return { tasks, addTask, removeTask, updateTask };
}
