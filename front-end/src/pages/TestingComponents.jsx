import { useState } from 'react';

import ButtonComponent from '../components/Button/Button';
import Chip1 from '../components/Chips/Chip1';
import FilterTool from '../components/FilterTool/index';
import ModalBasic from '../components/ModalBasic/ModalBasic';

import FilterListIcon from '@mui/icons-material/FilterList';
import SyllabusCard from '../components/SyllabusCard';
import { SyllabusTab } from '../components';
import ItemOne from './Class/ClassUpdate/itemOne';

export default function TestingComponents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 flex flex-col gap-6">
      <h4>Testing Components</h4>
      <div className='flex flex-row items-center'>
        <h6 className='mr-3'>Chip</h6>
        <Chip1 text='Active' isRounded />
        <Chip1 text='H4SD' isRounded isClosable />
        <Chip1 text='Inactive' isRounded isActive={false} />
        <Chip1 text='Draft' isRounded isDraft />
        <Chip1 text='foundation' isSearchChip />
        <Chip1 text='foundation' isSearchChip isClosable />
      </div>
      <div className='flex flex-row gap-2 items-center'>
        <h6>Button</h6>
        <ButtonComponent text='Filter' isButtonWithIcon icon={<FilterListIcon />} />
        <ButtonComponent text='Filter' isIconOnly icon={<FilterListIcon />} />
        <ButtonComponent text='Filter' />
        <ButtonComponent isGhost text='Filter' />
      </div>
      <div className='flex flex-row gap-2 items-center'>
        <h6>Filter tool</h6>
        <ButtonComponent text='Filter' isButtonWithIcon icon={<FilterListIcon />} onClick={() => setIsModalOpen(true)} />
        <ModalBasic
          title="Filter"
          width={812}
          cancelText="Clear"
          okText="Apply"
          onOpen={isModalOpen}
          isShowFooter={null}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          content={<FilterTool />}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <h6>Syllabus Card</h6>
        <SyllabusCard
          active={true}
          withIcon
          hasImage
          imageLink='https://www.w3schools.com/howto/img_avatar.png'
          programName='Foundation'
          syllabusName='LIN v2.0'
          duration='4 days (12 hours)'
          modified='Modified on 23/07/2022 by Johny Deep'
        />
        <SyllabusCard
          deActive={true}
          hasImage
          imageLink='https://www.w3schools.com/howto/img_avatar.png'
          programName='Foundation'
          syllabusName='LIN v2.0'
          duration='4 days (12 hours)'
          modified='Modified on 23/07/2022 by Johny Deep'
        />
        <SyllabusCard
          active={true}
          programName='Foundation'
          syllabusName='LIN v2.0'
          duration='4 days (12 hours)'
          modified='Modified on 23/07/2022 by Johny Deep'
        />
        <SyllabusCard
          deActive={true}
          programName='Foundation'
          syllabusName='LIN v2.0'
          duration='4 days (12 hours)'
          modified='Modified on 23/07/2022 by Johny Deep'
        />
      </div>
      <div className='flex flex-col gap-3'>
        <h6>Syllabus Tab</h6>
        <SyllabusTab
          tabContent={
            [
              { key: 0, content: <ItemOne /> },
              { key: 1, content: 1 },
              { key: 2, content: 2 },
              { key: 3, content: 3 },
              { key: 4, content: 4 },
            ]
          }
          onChange={() => console.log('onChange')}
          tabName={['General', 'Syllabus', 'Assessment', 'Judgement', 'fefefe']}
        />
      </div>
    </div>
  );
}
