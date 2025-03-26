import { memo } from 'react';

export default memo(function TaskRow({ title, status, createdAt }) {
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
            <td>{title}</td>
            <td style={{ backgroundColor: `${setBackground(status)}` }}>
                {status}
            </td>
            <td>{createdAt}</td>
        </tr>
    );
});
