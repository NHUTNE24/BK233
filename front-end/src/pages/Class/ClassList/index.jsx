import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
	Space,
	Input,
	Button,
	Dropdown,
	ConfigProvider,
	Table,
	Modal,
	Tag,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import {
	MdOutlineAddCircleOutline,
	MdOutlineMoreHoriz,
	MdOutlineDeleteForever,
	MdOutlineCreate,
	MdOutlineSort,
	MdDownload,
} from 'react-icons/md';

import './ClassList.scss';
import FilterTool from '../../../components/FilterTool';
import TableCustom from '../../../components/Table';

const mockBaseURL = 'https://6697994c02f3150fb66e4613.mockapi.io/api/demo/class/class';

const ViewClass = () => {
	const [searchedText, setSearchedText] = useState('');
	const [classInfo, setClassInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [tags, setTags] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [filteredClassInfo, setFilteredClassInfo] = useState(classInfo);

	useEffect(() => {
		filterData(tags);
	});

	const fetchData = async () => {
		try {
			const response = await axios.get(mockBaseURL);
			setClassInfo(response.data);
			setFilteredClassInfo(response.data);
			console.log(classInfo);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handlePressEnter = () => {
		const value = searchedText.trim();
		if (value && !tags.includes(value)) {
			setTags([...tags, value]);
			setSearchedText('');
		}
	};

	const handleCloseTag = (removedTagId) => {
		const newTags = tags.filter((_, index) => index !== removedTagId);
		setTags(newTags);
	};

	const filterData = (tags) => {
		if (tags.length === 0) {
			setFilteredClassInfo(classInfo);
		} else {
			const filteredData = classInfo.filter((item) => {
				return tags.every(
					(tag) =>
						item.className
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.classCode
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.createdDate
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.createdBy
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.duration
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.actualAttendee
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.locationId
							.toLowerCase()
							.includes(tag.toLowerCase()) ||
						item.fsuId.toLowerCase().includes(tag.toLowerCase())
				);
			});
			setFilteredClassInfo(filteredData);
		}
	};

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCancel = () => setIsModalOpen(false);
	const handleOpenFilterModal = () => setIsFilterModalOpen(true);
	const handleFilterCancel = () => setIsFilterModalOpen(false);

	const onDelete = async (id) => {
		try {
			await axios.delete(`${mockBaseURL}/${id}`);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const columns = [
		{
			title: 'Class',
			dataIndex: 'className',
			sorter: (a, b) => a.className.localeCompare(b.className),
			sortIcon: () => <MdOutlineSort />,
			render: (text) => {
				const id = classInfo.find((item) => item.className === text).id;
				return <Link to={`/class/${id}`}>{text}</Link>
			},
		},
		{
			title: 'Class Code',
			dataIndex: 'classCode',
			sorter: (a, b) => a.classCode.localeCompare(b.classCode),
			sortIcon: () => <MdOutlineSort />,
		},
		{
			title: 'Created On',
			dataIndex: 'createdDate',
			sorter: (a, b) => {
				const dateA = new Date(
					parseInt(a.createdDate.split('/')[2]),
					parseInt(a.createdDate.split('/')[1]) - 1,
					parseInt(a.createdDate.split('/')[0])
				);
				const dateB = new Date(
					parseInt(b.createdDate.split('/')[2]),
					parseInt(b.createdDate.split('/')[1]) - 1,
					parseInt(b.createdDate.split('/')[0])
				);
				return dateA - dateB;
			},
			sortIcon: () => <MdOutlineSort />,
		},
		{
			title: 'Created By',
			dataIndex: 'createdBy',
			sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
			sortIcon: () => <MdOutlineSort />,
		},
		{
			title: 'Duration',
			dataIndex: 'duration',
			sorter: (a, b) => parseInt(a.duration) - parseInt(b.duration),
			sortIcon: () => <MdOutlineSort />,
		},
		{
			title: 'Attendee',
			dataIndex: 'actualAttendee',
			sorter: (a, b) => parseInt(a.actualAttendee) - parseInt(b.actualAttendee),
			sortIcon: () => <MdOutlineSort />,
		},
		{
			title: 'Location',
			dataIndex: 'locationId',
			sorter: (a, b) => a.locationId.localeCompare(b.locationId),
			sortIcon: () => <MdOutlineSort />,
		},
		{
			title: 'FSU',
			dataIndex: 'fsuId',
			sorter: (a, b) => a.fsuId.localeCompare(b.fsuId),
			sortIcon: () => <MdOutlineSort />,
		},
		{
			dataIndex: 'className',
			render: (text) => {
				let items = ['Edit', 'Delete'];
				const id = classInfo.find((item) => item.className === text).id;
				return (
					<Dropdown
						menu={{ items }}
						dropdownRender={() => (
							<div className="flex flex-col bg-primary elevation2 rounded-xl">
								<Link to={`/class/update/${id}`}>
									<Button
										className='!rounded-none !bg-primary !border-none text-left'
										icon={<MdOutlineCreate />}
									>
										Edit
									</Button>
								</Link>
								<Button
									onClick={() => onDelete(id)}
									className='!rounded-none !bg-primary !w-full !border-none' icon={<MdOutlineDeleteForever />}
								>
									Delete
								</Button>
							</div>
						)}
					>
						<Button type="text" style={{ fontSize: '22px' }}>
							<MdOutlineMoreHoriz />
						</Button>
					</Dropdown>
				);
			},
		},
	];

	return (
		<div className="view-class px-2">
			<Space
				direction="vertical"
				size="middle"
				style={{ display: 'flex' }}
			>
				<h4 className="view-class__header header-title">
					Training Class
				</h4>
				<div className="view-class__tools">
					<div className="view-class__search">
						<Input
							className="caption input-wrapper input__placeholder--black"
							prefix={
								<SearchOutlined
									style={{
										fontSize: '18px',
										marginRight: '5px',
									}}
									onClick={handlePressEnter}
								/>
							}
							placeholder="Search by..."
							style={{ width: '300px', height: '36px' }}
							value={searchedText}
							onChange={(e) => setSearchedText(e.target.value)}
							onPressEnter={handlePressEnter}
						/>
						<Button
							className="filter-button"
							icon={<MdOutlineSort />}
							onClick={handleOpenFilterModal}
						>
							Filter
						</Button>
					</div>
					<div>
						<Link to={'/class/create/step1'}>
							<Button
								icon={
									<MdOutlineAddCircleOutline
										style={{ fontSize: '23px' }}
									/>
								}
								style={{
									background: 'var(--primary-color)',
									color: 'white',
								}}
							>
								Add New
							</Button>
						</Link>

						<Button
							icon={<MdDownload style={{ fontSize: '23px' }} />}
							style={{ background: '#F6BE00', color: 'black' }}
						>
							Export
						</Button>
					</div>
				</div>
				<div className="view-class__table">
					<TableCustom dataSource={filteredClassInfo} columns={columns} noPagination={false} />
				</div>
			</Space>

			<Modal
				open={isFilterModalOpen}
				onCancel={handleFilterCancel}
				footer={null}
			>
				<FilterTool />
			</Modal>
		</div>
	);
};

export default ViewClass;
