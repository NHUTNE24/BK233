import { useState } from 'react';
import RangepickerCustom from '../RangepickerCustom';
import DateMonthpickerCustom from '../DateMonthpickerCustom';
import DatepickerCustom from '../DatepickerCustom';
import ButtonModal from '../ButtonModal';
import ModalCustom from '../ModalCustom';
const DateModalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div style={{ padding: '20px' }}>
                <p>Rangepicker</p>
                <RangepickerCustom />
                <p>Datepicker</p>
                <DatepickerCustom />
                <p>Date/Month/Yearpicker</p>
                <DateMonthpickerCustom />
                <p>Modal</p>
                <ButtonModal handleOpenModal={handleOpenModal} />
                <ModalCustom
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                />
            </div>
        </>
    );
};
export default DateModalExample;
