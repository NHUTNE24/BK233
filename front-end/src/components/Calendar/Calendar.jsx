import React, { useEffect, useState, useCallback } from 'react';
import { Calendar as RsuiteCalendar, Badge } from 'rsuite';
import axios from 'axios';
import 'rsuite/Calendar/styles/index.css';
import './Calendar.css'; // Import your custom styles

const Calendar = () => {
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/classes');
        const adjustedClasses = response.data.map(classItem => {
          const adjustedStartDate = new Date(classItem.startDate);
          adjustedStartDate.setDate(adjustedStartDate.getDate() - 1);
          return {
            ...classItem,
            startDate: adjustedStartDate.toISOString().split('T')[0] // Assuming your date format is YYYY-MM-DD
          };
        });
        setClasses(adjustedClasses);
      } catch (error) {
        console.error("There was an error fetching the classes!", error);
      }
    };

    fetchClasses();
  }, []);

  const getClassList = useCallback((date) => {
    return classes.filter(classItem => {
      const startDate = new Date(classItem.startDate);
      const endDate = new Date(classItem.endDate);
      return date >= startDate && date <= endDate;
    });
  }, [classes]);

  const handleCellClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const renderCell = useCallback((date) => {
    const list = getClassList(date);

    if (list.length) {
      return (
        <div className="cell-content" onClick={() => handleCellClick(date)}>
          <ul className="calendar-class-list">
            {list.slice(0, 2).map((classItem, index) => (
              <li key={index}>
                <Badge /> <b>{classItem.className}</b>
                <div>{classItem.startTime} - {classItem.endTime}</div>
              </li>
            ))}
            {list.length > 2 && (
              <li className="more-item">
                <Badge /> <b>{list.length - 2} more</b>
              </li>
            )}
          </ul>
        </div>
      );
    }

    return null;
  }, [getClassList]);

  const selectedClasses = selectedDate ? getClassList(selectedDate) : [];

  return (
    <>
      <RsuiteCalendar bordered renderCell={renderCell} />
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)} role="dialog" aria-modal="true">
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Class Schedule</h3>
            {selectedClasses.map((classItem, index) => (
              <div key={index} className="class-details">
                <b>{classItem.className}</b>
                <div>{classItem.startTime} - {classItem.endTime}</div>
              </div>
            ))}
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
