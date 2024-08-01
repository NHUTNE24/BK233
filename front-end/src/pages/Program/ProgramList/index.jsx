import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineSort, MdOutlinePublish, MdOutlineAddCircleOutline } from 'react-icons/md';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Chips, DropdownBox2, Inputs, Button } from 'src/components';
import { Radio, Pagination } from 'antd';
import ManageTrainingProgramMenu from '../components/ManageTrainingProgramMenu';
import NotificationModal from '../components/NotificationModal';
import Modal from 'react-modal';
import Papa from 'papaparse';
import './ProgramList.css';

const TrainingProgram = () => {
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    if (!editing)
      navigate(`${row.trainingProgramCode}`);
  };
  const [trainingProgramList, setProgramList] = useState([]);
  const currentProgramListRef = useRef([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const token = btoa(`${username}:${password}`);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [importmodalIsOpen, setImportmodalIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [importSetting, setimportSetting] = useState({
    encodingType: 'UTF-8',
    columnSeperator: ',',
    scanning: "name",
    duplicateHandle: "allow",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileSelect = () => {
    document.getElementById('fileInput').click();
  };
  const sortByColumn = (columnKey) => {
    const sortedList = [...currentProgramListRef.current].sort((a, b) => {
      const getValue = (item) => {
        const value = item[columnKey]?.toString().toLowerCase();
        if (columnKey === 'days') {
          console.log("dats")
          const match = value.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        }
        return value;
      };

      const valueA = getValue(a);
      const valueB = getValue(b);

      if (sortOrder === 'asc') {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else {
        if (valueA < valueB) return 1;
        if (valueA > valueB) return -1;
      }
      return 0;
    });
    setProgramList(sortedList);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleError = (error, action) => {
    if (error.response) {
      if (error.response.status === 400) {
        handleFailure(error.response.data.error);
      } else if (error.response.status === 500) {
        handleFailure("Internal Server Response");
      }
    } else {
      handleFailure(`Error ${action} program`);
    }
    console.error(`Error ${action} program:`, error);
  };
  useEffect(() => {
    axios.get(`${baseUrl}/api/training-programs`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((res) => {
        if (currentProgramListRef.current.length === 0) {
          currentProgramListRef.current = res.data;
          setProgramList(res.data);
        }
      })
      .catch((error) => {
        handleError(error, "getting");
      });
  });
  const editModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '15px',
      height: 'auto',
      padding: 0,
      flexDirection: 'column',
      gap: '10px',
      border: '2px solid',
      borderColor: 'var(--primary-color)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 99999,
    }
  };
  const [page, setPage] = useState(1);
  const tableHeight = window.innerHeight - 320;
  const topPosition = tableHeight + 109 + 60;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);
  const handleChange = (page) => {
    setPage(page);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };
  const handleAddTag = () => {
    if (searchText && !tags.includes(searchText)) {
      setTags(prevTags => [...prevTags, searchText]);
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };
  const totalPageFilter = trainingProgramList?.filter(row => tags.every(tag => [row.name, row.days, row.createdBy, row.createdDate].some(field => field?.toString().toLowerCase().includes(tag.toLowerCase()))))
  const currentData = totalPageFilter?.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage);
  const handleImport = () => {
    setImportmodalIsOpen(true);
  }
  const closeImportModal = () => {
    setImportmodalIsOpen(false);
  };
  const handleEncodingType = (e) => {
    const encodingType = e.target.value;
    setimportSetting((prevDetails) => ({
      ...prevDetails,
      encodingType: encodingType,
    }));
  };
  const handleColumnSeperator = (e) => {
    const columnSeperator = e.target.value;
    setimportSetting((prevDetails) => ({
      ...prevDetails,
      columnSeperator: columnSeperator,
    }));
  };
  const handleScanning = (e) => {
    const scanning = e.target.value;
    setimportSetting((prevDetails) => ({
      ...prevDetails,
      scanning: scanning,
    }));
  };
  const handleDuplicateHandle = (e) => {
    const duplicateHandle = e.target.value;
    setimportSetting((prevDetails) => ({
      ...prevDetails,
      duplicateHandle: duplicateHandle,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    console.log(selectedFile)

    Papa.parse(selectedFile, {
      complete: function (results) {
        const submitedData = preprocessData(results.data, importSetting.scanning, importSetting.duplicateHandle);
        const newProgram = submitedData
          .filter(row => row.trainingProgramCode && row.trainingProgramCode.trim() !== '')
          .map(row => ({
            trainingProgramCode: row.trainingProgramCode,
            createdBy: row.createdBy,
            createdDate: new Date(row.createdDate).toISOString(),
            modifiedBy: row.modifiedBy,
            modifiedDate: new Date(row.modifiedDate).toISOString(),
            days: row.days,
            hours: row.hours,
            startTime: new Date(row.modifiedDate).toISOString(),
            name: row.name,
            status: row.status,
            userId: null,
            technicalCodeId: null,
            technicalGroupId: null,
            moduleId: null,
            syllabusId: null,
          }));
        newProgram.forEach(program => {
          try {
            axios.post(`${baseUrl}/api/training-programs`, program, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
              }
            }).then(response => {
              console.log('Import program successfully:', response.data);
            }).catch((error) => {
              handleError(error, "getting");
            });
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        });
        closeImportModal();
        handleSuccess("Import program successfully");
      },
      header: true,
      delimiter: importSetting.columnSeperator,
      encoding: importSetting.encodingType,
    });
  };
  const handleSuccess = (message) => {
    setModalMessage(message);
    setModalStatus('success');
    setModalIsOpen(true);
  };
  const handleFailure = (message) => {
    setModalMessage(message);
    setModalStatus('failure');
    setModalIsOpen(true);
  }
  const fetchTrainingPrograms = () => {
    axios.get(`${baseUrl}/api/training-programs`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((res) => {
        let sortedData = res.data;
        setProgramList(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching training programs:", error);
      });
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalMessage('');
    fetchTrainingPrograms();

  };
  function preprocessData(data, scanning, duplicateHandle) {
    const processedData = [];
    const trackMap = new Map();

    data.forEach(item => {
      const key = item[scanning];
      const exists = trackMap.has(key);

      switch (duplicateHandle) {
        case 'allow':
          processedData.push(item);
          trackMap.set(key, true);
          break;
        case 'skip':
          if (!exists) {
            processedData.push(item);
            trackMap.set(key, true);
          }
          break;
        case 'replace':
          if (exists) {
            const index = processedData.findIndex(x => x[scanning] === key);
            processedData[index] = item;
          } else {
            processedData.push(item);
            trackMap.set(key, true);
          }
          break;
      }
    });
    return processedData;
  }
  

  function downloadCSV(csvContent, fileName = "download.csv") {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("importTemplate", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const csvContent = "trainingProgramCode,createdBy,createdDate,modifiedBy,modifiedDate,days,hours,startTime,name,status,userId\nCO3005,John,07-12-2024,John,07-12-2024,23,123,07-19-2024,Fundamental of Angular,Active,101";
  return (
    <section className="w-full max-h-[720px] relative bg-default" style={{ display: 'block' }}>
      <NotificationModal
        modalMessage={modalMessage}
        status={modalStatus}
        onClose={handleCloseModal}
        isOpen={modalIsOpen}
      />
      <Modal
        style={editModalStyles}
        isOpen={importmodalIsOpen}
        onRequestClose={closeImportModal}
        contentLabel="Duplication Status"
      >
        <div className='flex flex-row bg-main items-center justify-between w-full h-auto'>
          <div className='w-10'></div>
          <h2 className='font-bold text-xl text-white '>Import training programs</h2>
          <div className='w-10 cursor-pointer hover:bg-main/20 aspect-square mr-7 h-[30px] rounded-full  flex justify-center items-center'>
            <IoMdCloseCircleOutline className='text-3xl text-white' onClick={closeImportModal} />
          </div>
        </div>

        <div className='flex flex-col gap-2 justify-between items-center px-10 w-full h-auto'>
          <div className='w-full mb-2 mt-2 border-b-2 border-main pb-2'>Import setting </div>

          <div className='flex flex-row w-full items-center justify-between mb-1 h-[40px]'>
            <label className='text-base text-main font-semibold'>File (csv)</label>

            <div className='w-[300px] flex flex-row items-center'>
              <button onClick={handleFileSelect} className='self-start rounded-2xl text-base px-10 py-2 bg-main text-white font-bold hover:bg-secondary'>
                Select
              </button>
              <input
                type="file"
                id="fileInput"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className='flex flex-row w-full items-center justify-between mb-1 h-[40px]'>
            <label className='text-base text-main font-semibold'>Encoding type</label>

            <DropdownBox2
              large
              value={importSetting.encodingType || "UTF-8"}
              options={[
                { value: 'UTF-8', label: 'UTF-8' },
              ]}
              onChange={handleEncodingType}
            />

          </div>
          <div className='flex flex-row w-full items-center justify-between mb-1 h-[40px]'>
            <label className='text-base text-main font-semibold'>Column seperator</label>

            <DropdownBox2
              large
              value={importSetting.columnSeperator || ""}
              options={[
                { value: ',', label: 'Comma' },
              ]}
              onChange={handleColumnSeperator}
            />

          </div>
          <div className='flex flex-row w-full items-center justify-between mb-1 h-[40px]'>
            <label className='text-base text-main font-semibold'>Import Template</label>

            <div className='w-[300px] flex flex-row items-center'>
              <div onClick={() => downloadCSV(csvContent)} className='cursor-pointer ml-1 self-start rounded-2xl text-base text-main underline font-bold'>
                Download
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-between items-center px-10 w-full h-auto'>
          <div className='w-full mb-2 border-b-2 border-main pb-2'>Duplicate control </div>

          <div className='flex flex-row w-full items-center justify-between mb-1 h-[40px]'>
            <label className='text-base text-main font-semibold'>Scanning</label>
            <div className='w-[300px] flex flex-row items-center'>
              <Radio.Group onChange={handleScanning} value={importSetting.scanning || null}>
                <Radio value={"name"}>Program Name</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className='flex flex-row w-full items-center justify-between mb-1 h-[40px]'>
            <label className='text-base text-main font-semibold'>Duplicate handle</label>

            <div className='w-[300px] flex flex-row items-center'>
              <Radio.Group onChange={handleDuplicateHandle} value={importSetting.duplicateHandle || null}>
                <Radio value={"allow"}>Allow</Radio>
                <Radio value={"replace"}>Replace</Radio>
                <Radio value={"skip"}>Skip</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className='w-[300px] flex flex-row gap-10 mt-1 mb-4 items-center justify-center'>
          <div onClick={() => { }} className='cursor-pointer text-base text-warningColor underline font-bold'>
            Cancel
          </div>
          <button onClick={handleSubmit} className='rounded-2xl text-base px-5 py-2 bg-main text-white font-bold hover:bg-secondary'>
            Import
          </button>
        </div>
      </Modal>
      <div className="w-full absolute flex justify-start items-center h-[60px] bg-main">
        <h4 className="text-white font-bold ml-[30px]">Training Program</h4>
      </div>
      <div className="w-full absolute top-[70px] flex justify-center items-center flex-col h-auto">
        <div className="w-full flex flex-row justify-between items-center px-10">
          <div className="w-full h-[50px] flex flex-row items-center gap-2">
            <div className="w-full h-[50px] flex flex-row items-center gap-2">
              <Inputs.InputNormal hasSuffix={false} value={searchText} handleChange={(e) => setSearchText(e.target.value)} handleEnter={handleAddTag} />
              <button onClick={handleAddTag}><Button.ButtonIcon text="Filter" width='90px' /></button>
            </div>
            <div className="w-auto h-[50px] flex flex-row items-center gap-2 " onClick={() => handleImport()}>
              <Button.ButtonIcon
                text="Import"
                icon={<MdOutlinePublish style={{ fontSize: "20px" }} />}
                background="var(--highlight-one)"
              />
            </div>
            <div className="w-auto h-[50px] flex flex-row items-center gap-2 " onClick={() => { navigate(`/program/create-program`); }
            }>
              <Button.ButtonIcon
                text="Add new"
                icon={<MdOutlineAddCircleOutline style={{ fontSize: "20px" }} />}
                background="var(--primary-color)"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 px-10 py-2">
          {tags.map((tag, index) => (
            <Chips.ChipSquare
              key={index}
              text={tag}
              closable={true}
              hexColor="var(--primary-color)"
              handleClose={() => handleRemoveTag(tag)}
            />
          ))}
        </div>
        <div style={{ maxHeight: `${tableHeight}px` }} className="scroll w-auto overflow-y-scroll rounded-lg bg-secondaryContainer text-base tracking-wide shadow-[0_20px_40px_0_rgba(0,0,0,0.16)]">
          <table className="w-full table-fixed whitespace-nowrap h-auto">
            <thead className="sticky top-0 z-[10]">
              <tr className="roboto border-b bg-main text-base font-thin text-left text-white">
                <th className="px-4 py-3 w-[10%]">
                  <div className="flex flex-row items-center gap-1">
                    Index
                  </div>
                </th>
                <th className="px-4 py-3 w-[35%]">
                  <div className="flex flex-row items-center gap-1">
                    Program name
                    <MdOutlineSort onClick={() => sortByColumn('name')} />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex flex-row items-center gap-1">
                    Created on
                    <MdOutlineSort onClick={() => sortByColumn('createdDate')} />
                  </div>
                </th>
                <th className="px-4 py-3 w-[15%]">
                  <div className="flex flex-row items-center gap-1">
                    Created by
                    <MdOutlineSort onClick={() => sortByColumn('createdBy')} />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex flex-row items-center gap-1">
                    Duration
                    <MdOutlineSort onClick={() => sortByColumn('days')} />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex flex-row items-center gap-1">
                    Status
                    <MdOutlineSort onClick={() => sortByColumn('status')} />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex flex-row items-center gap-1"></div>
                </th>
              </tr>
            </thead>
            <tbody className="roboto h-[auto] divide-y">
              {currentData?.map((row, index) => (
                <tr onClick={() => handleRowClick(row)} key={index} className="bg-default hover:bg-main/10  font-bold text-main text-base text-left" style={{ height: '50px !important' }}>
                  <td className="px-4 py-3 w-[10%]">{(page - 1) * rowsPerPage + index + 1}</td>
                  <td className="px-4 py-3 w-[35%]">{row.name.length > 45 ? row.name.substring(0, 45) + '...' : row.name}</td>
                  <td className="px-4 py-3">{(row.createdDate)?.substr(0, 10)}</td>
                  <td className="px-4 py-3">{row.createdBy}</td>
                  <td className="px-4 py-3">{row.days} days</td>
                  <td className="px-4 py-3  text-white">
                    <Chips.ChipRounded
                      text={`${row.status === 'Active' ? 'Active' : row.status === 'Inactive' ? 'Inactive' : 'Draft'}`}
                      backgroundColor={`${row.status === 'Active' ? 'var(--primary-color)' : row.status === 'Inactive' ? '#bcbcbc' : 'var(--secondary-color)'}`}
                    />
                  </td>
                  <td>
                    <ManageTrainingProgramMenu
                      fontSize='1.2rem'
                      color='var(--primary-color)'
                      setEditing={setEditing}
                      isProgramList
                      trainingProgramCode={row.trainingProgramCode}
                      status={row.status}
                      handleSuccess={handleSuccess}
                      handleError={handleError}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-[40px] absolute flex flex-row justify-between" style={{ top: `${topPosition}px` }}>
        <div></div>
        <Pagination
          current={page}
          total={totalPageFilter?.length}
          pageSize={rowsPerPage}
          onChange={handleChange}
          showSizeChanger={false}
        />
        <div className="flex items-center text-[12px] font-medium gap-[10px] mr-[26px]">
          <p>Rows per page</p>
          <div>
            <select className="block w-full" value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrainingProgram;