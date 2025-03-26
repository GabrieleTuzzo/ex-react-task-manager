import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import GlobalContext from './contexts/GlobalContext';
import DefaultLayout from './layout/DefaultLayout';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import useTasks from './hooks/useTasks';

function App() {
    const { tasks, addTask, removeTask, updateTask } = useTasks();

    return (
        <GlobalContext.Provider
            value={{ tasks, addTask, removeTask, updateTask }}
        >
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route index element={<TaskList />} />
                        <Route path="/addTask" element={<AddTask />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalContext.Provider>
    );
}

export default App;
