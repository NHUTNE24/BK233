import {
    MdOutlineMoreHoriz,
    MdOutlineDeleteForever,
    MdOutlineContentCopy,
    MdOutlineCreate,
    MdAddCircleOutline,
} from 'react-icons/md';
import { Button, Dropdown } from 'antd';
import ActionDropdown from '../components/ActionDropdown';

export const actions = [
    {
        key: 1,
        label: 'Add the training program',
        action: 'Add',
        icon: <MdAddCircleOutline />,
    },
    {
        key: 2,
        label: 'Edit the syllabus',
        action: 'Edit',
        icon: <MdOutlineCreate />,
    },
    {
        key: 3,
        label: 'Duplicate the syllabus',
        action: 'Duplicate',
        icon: <MdOutlineContentCopy />,
    },
    {
        key: 4,
        label: 'Delete the syllabus',
        action: 'Delete',
        icon: <MdOutlineDeleteForever />,
    },
];

export const renderActions = (_, record) => {
    // console.log(record);
    let items = actions.map((item, index) => ({
        key: index,
        label: (
            <ActionDropdown
                actions={item}
                key={index}
                id={record.id}
            />
        ),
    }));
    return (
        <>
            <Dropdown
                menu={{ items }}
                dropdownRender={(menu) => {
                    return (
                        <>
                            <div className="dropdown">{menu}</div>
                        </>
                    );
                }}
            >
                <Button
                    type="text"
                    style={{ fontSize: '22px' }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                    }}
                >
                    <MdOutlineMoreHoriz />
                </Button>
            </Dropdown>
        </>
    );
};
