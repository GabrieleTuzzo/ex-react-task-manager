import { memo } from 'react';
import { Link } from 'react-router-dom';

export default memo(function TaskRow({ title, status, createdAt, id }) {
    function setBackground(status) {
        switch (status) {
            case 'To do':
                return 'red';
            case 'Doing':
                return 'yellow';
            case 'Done':
                return 'lightgreen';
            default:
                return 'white';
        }
    }

    return (
        <tr>
            <td>
                <Link to={`/task/${id}`}>{title}</Link>
            </td>
            <td style={{ backgroundColor: `${setBackground(status)}` }}>
                {status}
            </td>
            <td>{createdAt}</td>
        </tr>
    );
});
