import { useContext } from 'react';
import PropTypes from 'prop-types';

import UnitTab from './UnitTab';
import { Collapse } from 'antd';
import { ProgramDetailContext } from './ProgramDetailContext';

const ProgramDayCard = ({
    index,
    SyllabusDay,
    roundedCorner,
    setRoundedCorners,
    roundedBottom,
    setRoundedBottom,
}) => {
    const { syllabusUnits } = useContext(ProgramDetailContext);

    const handleChange = () => {
        setRoundedCorners((array) => {
            // check if not last item
            if (index + 1 < array.length) array[index + 1] = !array[index + 1];
            return [...array];
        });
        setRoundedBottom((roundedBottom) => !roundedBottom);
    };

    const items = [
        {
            key: SyllabusDay?.id,
            label: (
                <div
                    className={`!w-full min-h-[39px] px-[20px] py-[10px] ${roundedCorner ? '!rounded-t-[20px]' : ''} ${roundedBottom ? '!rounded-b-[20px]' : ''} !bg-main font-bold !text-white !shadow-none`}
                >
                    <h6>Day {SyllabusDay?.day_no}</h6>
                </div>
            ),
            children: (
                <div className="!rounded-t-[20px] !py-0">
                    {syllabusUnits[index]?.map((SyllabusUnit, suIndex) => (
                        <UnitTab
                            key={SyllabusUnit?.id}
                            index={suIndex}
                            day_no={SyllabusDay?.day_no}
                            SyllabusUnit={SyllabusUnit}
                            maxIdx={syllabusUnits[suIndex]?.length - 1}
                        />
                    ))}
                </div>
            ),
            showArrow: false,
        },
    ];

    return (
        <div id="program-day-card" className="w-full">
            <Collapse
                onChange={handleChange}
                className={`w-full ${!(index + 1 === 1) && roundedCorner ? 'mt-[30px]' : ''} rounded-[20px] border-b-[1px] border-b-[#F1F1F1] text-[1rem] !shadow-[0_20px_40px_0_rgba(0,0,0,0.16)]`}
                items={items}
                defaultActiveKey={SyllabusDay?.id}
            />
        </div>
    );
};

ProgramDayCard.propTypes = {
    index: PropTypes.number,
    SyllabusDay: PropTypes.object.isRequired,
    roundedCorner: PropTypes.bool,
    setRoundedCorners: PropTypes.func,
    roundedBottom: PropTypes.bool,
    setRoundedBottom: PropTypes.func,
};

export default ProgramDayCard;
