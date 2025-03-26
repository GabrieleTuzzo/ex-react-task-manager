import { Outlet, NavLink } from 'react-router-dom';

export default function DefaultLayout() {
    return (
        <>
            <header>
                <nav>
                    <NavLink to="/">Task Lisk</NavLink>
                    <NavLink to="/addTask"> add Task</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
