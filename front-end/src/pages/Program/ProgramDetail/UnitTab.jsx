import { useContext } from 'react';
import PropTypes from 'prop-types';

import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { SyllabusDetail2 } from 'src/components';
import { Collapse } from 'antd';

import { ProgramDetailContext } from './ProgramDetailContext';

const UnitTab = ({ index, day_no, SyllabusUnit, maxIdx }) => {
    const { unitChapters } = useContext(ProgramDetailContext);
    const filteredUnitChapters = unitChapters?.reduce(
        (list, unitChapterList) => [
            ...list,
            ...unitChapterList.filter(
                (UnitChapter) => UnitChapter.syllabusUnitId === SyllabusUnit?.id
            ),
        ],
        []
    );

    const items = [
        {
            key: SyllabusUnit?.id,
            label: (
                <label className="p-[20px] relative cursor-pointer">
                    <h6>{SyllabusUnit?.name}</h6>
                    <p className="font-normal">
                        <em>{SyllabusUnit?.duration}hrs</em>
                    </p>
                </label>
            ),
            children: (
                <div className="pr-[20px] flex flex-col gap-[5px]">
                    {filteredUnitChapters?.map((UnitChapter) => (
                        <div key={UnitChapter.id}>
                            <SyllabusDetail2
                                width="w-full"
                                day_no={day_no}
                                unit_no={SyllabusUnit?.unitNo}
                                unit_name={SyllabusUnit?.name}
                                UnitChapter={UnitChapter}
                            />
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    console.log(index)
    console.log(maxIdx)

    return (
        <div
            id="unit-tab"
            className={`flex font-bold ${index < maxIdx ? 'border-b-[0.7px] border-[#000]' : ''}`}
        >
            <h6 className="w-[150px] h-full p-[20px]">
                Unit {SyllabusUnit?.unitNo}
            </h6>
            <Collapse
                className="w-full !shadow-none border-0"
                items={items}
                defaultActiveKey={SyllabusUnit?.id}
                expandIcon={({ isActive }) => (
                    <MdOutlineArrowDropDownCircle
                        className={`mt-[40px] mr-[20px] !text-[24px] !text-menuIconColor ${isActive ? 'rotate-180' : 'rotate-0'}`}
                    />
                )}
                expandIconPosition="end"
            />
        </div>
    );
};

UnitTab.propTypes = {
    index: PropTypes.number,
    day_no: PropTypes.number,
    SyllabusUnit: PropTypes.object.isRequired,
    maxIdx: PropTypes.number,
};

export default UnitTab;