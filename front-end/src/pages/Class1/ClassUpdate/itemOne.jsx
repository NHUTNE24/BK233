import { Button } from 'antd';
import { MdEdit } from "react-icons/md";
import { Accordion2, AccordionSummary, AccordionDetails3 } from './components/CustomAccordion';

import Chip1 from '../../../components/Chips/Chip1';
import { Syllabus } from '../../../assets/data/Syllabus';
import { TrainingProgram } from '../../../assets/data/TrainingProgram';

function ItemOne() {
  return (
    <div className="flex flex-col">
      {
        TrainingProgram.map((item, index) => (
          <Accordion2 key={index}>
            <AccordionSummary>
              <header key={index} className='text-primary'>
                <div className='flex flex-row gap-2 items-center'>
                  <h4>{item.name}</h4>
                  <Button shape='circle' icon={<MdEdit className='text-xl' />} />
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <div>{item.days} days <span className='italic'>({item.hours} hours)</span></div>
                  <div className='h-5 w-0.5 bg-primary'></div>
                  <div>Modified on <span className='italic'>{item.modified_on}</span> by <span className='font-bold'>{item.modified_by}</span></div>
                </div>
              </header>
            </AccordionSummary>
            <AccordionDetails3>
              {
                Syllabus.map((item, index) => (
                  <div key={index} className={`flex flex-row items-center rounded-3xl overflow-hidden elevation2 ${(item.status == "Active" ? `!text-main` : `!text-[#B9B9B9]`)}`}>
                    <img src='https://via.placeholder.com/300x96' alt='placeholder' />
                    <div className='px-5 py-4 flex flex-col gap-1'>
                      <div className='flex flex-row gap-3 items-center'>
                        <h4>{item.name}</h4>
                        <Chip1 text={item.status} closable={false} inactive={(item.status != 'Active') ? true : false} />
                      </div>
                      <div className='flex flex-row gap-3 items-center'>
                        <p className='subtitle2 !font-normal'>{item.code + ' ' + item.version}</p>
                        <div className={`h-5 w-0.5 ${(item.status == "Active" ? `!bg-primary` : `!bg-inputHiddenColor`)}`}></div>
                        <p className='subtitle2 !font-normal'>{item.days + ' days (' + item.hours + ' hours)'}</p>
                        <div className={`h-5 w-0.5 ${(item.status == "Active" ? `!bg-primary` : `!bg-inputHiddenColor`)}`}></div>
                        <p className='subtitle2 !font-normal'>on <span>{item.modified_on}</span> by <span>{item.modified_by}</span></p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </AccordionDetails3>
          </Accordion2>
        ))
      }
    </div>
  )
}

export default ItemOne;