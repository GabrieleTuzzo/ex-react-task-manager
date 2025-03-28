import { useCallback, useContext, useMemo, useState } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import TaskRow from '../components/TaskRow';
import { debounce } from '../utils/functions';

export default function TaskList() {
    const { tasks } = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');

    function handleSort(value) {
        sortBy === value ? setSortOrder(sortOrder * -1) : setSortBy(value);
    }

    const orderedTasks = useMemo(() => {
        const statusOrder = ['To do', 'Doing', 'Done'];

        const filteredTasks = tasks.filter((task) => {
            const query = searchQuery.toLowerCase();
            return (
                task.title.toLowerCase().includes(query) ||
                task.status.toLowerCase().includes(query) ||
                task.createdAt.includes(query)
            );
        });

        return filteredTasks.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title) * sortOrder;
                case 'status':
                    const statusOrderA = statusOrder.indexOf(a.status);
                    const statusOrderB = statusOrder.indexOf(b.status);
                    return (statusOrderA - statusOrderB) * sortOrder;
                case 'createdAt':
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return (dateA - dateB) * sortOrder;
                default:
                    return 0;
            }
        });
    }, [tasks, sortBy, sortOrder, searchQuery]);

    const debouncedSetSearchQuery = useCallback(
        debounce((value) => {
            setSearchQuery(value);
        }, 400),
        []
    );

    const handleSearchChange = (e) => {
        debouncedSetSearchQuery(e.target.value);
    };

    return (
        <>
            <input type="text" onChange={handleSearchChange} />
            <table>
                <thead>
                    <tr>
                        <th
                            onClick={() => {
                                handleSort('title');
                            }}
                        >
                            Nome
                        </th>
                        <th
                            onClick={() => {
                                handleSort('status');
                            }}
                        >
                            Stato
                        </th>
                        <th
                            onClick={() => {
                                handleSort('createdAt');
                            }}
                        >
                            Data di Creazione
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orderedTasks.map((task) => (
                        <TaskRow key={task.id} {...task} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
