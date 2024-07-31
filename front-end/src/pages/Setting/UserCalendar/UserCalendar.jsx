
import Calendar from '../../../components/Calendar/Calendar';
import './UserCalendar.css'; // Import custom CSS for styling


const UserCalendar = () => {


    return (
        <>
            <h4 className="p-8 bg-main text-primary border-t">
                Calendar
            </h4>
            <div className="content">
                <Calendar />
            </div>
        </>
    );
};

export default UserCalendar;
