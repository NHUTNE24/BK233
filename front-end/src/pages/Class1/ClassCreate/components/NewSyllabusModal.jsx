import Modal from '@mui/material/Modal';
import { Button } from '@nextui-org/button';
import PropTypes from 'prop-types';

function NewSyllabusModal({ open, handleClose}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className='absolute -translate-x-2/4 -translate-y-2/4 w-[33rem] bg-[#FFFFFF] shadow-[24px] left-[50%] top-[50%] rounded-2xl overflow-hidden'>
        <p className='subtitle1 !font-bold text-center px-4 py-3 bg-main text-primary'>New Syllabus</p>
        <div className='px-8 py-5 flex flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            <div className='grid grid-cols-[1fr_2fr] items-center'>
              <p className='body1'>Syllabus name</p>
              <input type='text' className='w-full p-2 border-[1px] border-solid border-[#000] rounded-[5px]' />
            </div>
            <div className='grid grid-cols-[1fr_2fr] items-center'>
              <p className='body1'>Day</p>
              <input type='text' className='w-full p-2 border-[1px] border-solid border-[#000] rounded-[5px]' />
            </div>
            <div className='grid grid-cols-[1fr_2fr] items-center'>
              <p className='body1'>Hour</p>
              <input type='text' className='w-full p-2 border-[1px] border-solid border-[#000] rounded-[5px]' />
            </div>
          </div>
          <div className='flex flex-row gap-2 justify-center'>
            <Button className='text-alert rounded-lg'>Cancel</Button>
            <Button className='bg-main text-primary rounded-lg'>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

NewSyllabusModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

export default NewSyllabusModal;