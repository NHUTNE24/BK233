import { Button } from 'antd';
import { MdEdit } from "react-icons/md";
import { Accordion2, AccordionSummary, AccordionDetails3 } from '../../../components/Accordion';

import { Syllabus } from '../../../assets/data/Syllabus';
import { TrainingProgram } from '../../../assets/data/TrainingProgram';
import { SyllabusCard } from '../../../components';

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
                  <SyllabusCard
                    key={index}
                    hasImage
                    imageLink='https://www.w3schools.com/howto/img_avatar.png'
                    active={item.status === 'Active' ? true : false}
                    deActive={item.status === 'Active' ? false : true}
                    programName={item.name}
                    syllabusName={`${item.code} ${item.version}` }
                    duration={`${item.days} days (${item.hours} hours)`}
                    modified={`Modified on ${item.modified_on} by ${item.modified_by}`}
                  />
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