
import { Button } from 'antd';
import { MdOutlineUpload } from 'react-icons/md';
import FormCusTom from '../components/FormCustom';
import ModalCustom from '../components/ModalCustom';

function ImportSyllabus(props) {
    const { isModalOpen, handleCancel, handleOpenModal, handleFormSubmit, form, onCsvDataChange } = props;
    return (
        <>
            <Button
                className="btn-md"
                icon={<MdOutlineUpload style={{ fontSize: '23px' }} />}
                style={{
                    background: 'var(--highlight-one)',
                    color: 'white',
                    padding: '7px 10px',
                    width: '95px',
                    height: '32px',
                    borderRadius: '8px',
                    gap: '5px',
                }}
                onClick={handleOpenModal}
            >
                Import
            </Button>

            <ModalCustom
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                modalTitle={'Import Syllabus'}
                okTitle={'Import'}
                cancelTitle={'Cancel'}
                // form={form}
                handleFormSubmit={handleFormSubmit}
                bodyContent={
                    <FormCusTom
                        form={form}
                        onCsvDataChange={onCsvDataChange}
                    />
                }
                footerCenter={false}
            ></ModalCustom>
        </>
    );
}

export default ImportSyllabus;
