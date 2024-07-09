import "./SyllabusDetailInformation.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SyllabusTab } from '../../components';
import { Dropdown, Space } from 'antd';

const items = [
    {
      label: <div style={{fontWeight: '600'}}>Manage</div>,
      key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: <div className="edit"><i className="fa-solid fa-pencil"></i> Edit syllabus</div>,
        key: '2',
    },
    {
        label: <div className="duplicate"><i className="fa-regular fa-clone"></i> Duplicate syllabus</div>,
        key: '3',
    },
    {
        label: <div className="de-activate"><i className="fa-regular fa-eye-slash"></i> De-activate syllabus</div>,
        key: '4',
    },
    {
        label: <div className="delete"><i className="fa-regular fa-trash-can"></i> Delete syllabus</div>,
        key: '5',
    },

  ];

const SyllabusDetailInformation = () => {
    const data = {
        title: 'C# Programming Language',
        status: 'Active',
        version: 'NPL v4.0',
        days: 8,
        modifiedDate: ' 23/07/2022',
        modifiedBy: 'Warrior Tran',
        generalInfo: {
            level: 'All level',
            attendeeNum: 20,
            standard: ['H4SD', 'K6SD', 'H6SD'],
            technicalRequirement: <div> <p>Trainees’ PCs need to have following software installed & run without any issues:</p>
                <ul>
                    <li>Microsoft SQL Server 2005 Express</li>
                    <li>Microsoft Visual Studio 2017</li>
                    <li>Microsoft Office 2007 (Visio, Word, PowerPoint)</li>
                </ul>
                </div>,
            courseRequirement: <div> <p>This topic is to introduce about C# programming language knowledge; adapt trainees with skills, lessons and practices which is specifically used in the Fsoft projects. 
                In details, after completing the topic, trainees will:</p>
                <ul>
                <li> Understand basic concepts of high-level programming languages (keyword, statement, operator, control-of-flow) </li>
                <li> Understand and distinguish two concepts: class (Class) and object (Object) </li>
                <li> Understand and apply object-oriented programming knowledge to resolve simple problems (Inheritance, Encapsulation, Abstraction, Polymorphism) </li>
                <li> Working with some of the existing data structures in C# (List, ArrayList, HashTable, Dictionary) </li>
                <li> Know how to control program errors (use try ... catch..finally, throw, throws) </li>
                <li> Be able to working with concurrency and multi-thread in C# </li>
                <li> Be able to working with common classes in ADO.net: SqlConnection, SqlCommand, SqlParameter, SqlDataAdapter, SqlDataReader </li>
                <li> Be able to manipulate SQL data from Window Form Application via 4 basic commands: Add, Update, Delete, Select </li>
                <li> Know how to design UI screen in Window Form Application </li>
                <li> Know how to use approciate controls for each field / data type: Textbox, Label, Combobox, Radio, DateTimePicker, NumericUpDown, RichTextBox </li>
                </ul>
                </div>,
            },
        outlineInfo: {},
        otherInfo: {},
    };

    return (
        <div className="syllabus-detail-information-container">
            <div className="syllabus-detail-information-first-container">
                <p>Syllabus</p>
                <div className="syllabus-title-container">
                    <div className="syllabus-title-left-column"><span>{data.title}</span></div>
                    <div className="syllabus-title-right-column">
                        <div className="syllabus-title-status-info"><span>{data.status}</span></div>
                    </div>
                    <Dropdown className="dropdown-manage-modal" menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className="icon-container"><i className="fa-solid fa-ellipsis"></i></div>
                        </Space>
                        </a>
                    </Dropdown>
                    
                </div>
                <div className="syllabus-version-info">{data.version}</div>
            </div>
            <hr></hr>
            <div className="syllabus-detail-information-second-container">
                <div><span style={{ fontSize: '24px', fontWeight: '600' }}>{data.days}</span> days <span>({data.days * 24} hours)</span></div>
                <div>Modified on {data.modifiedDate} by <span style={{ fontWeight: '700' }}>{data.modifiedBy}</span></div>
            </div>
            <SyllabusTab generalInfo={data.generalInfo} />
        </div> 
    );
};
export default SyllabusDetailInformation;