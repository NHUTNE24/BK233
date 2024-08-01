import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import './SyllabusDetail.css';
import {
    DeliveryTypeIcon1,
    DeliveryTypeIcon2,
    DeliveryTypeIcon3,
    DeliveryTypeIcon4,
    DeliveryTypeIcon5,
    DeliveryTypeIcon6,
} from 'src/assets/icons/DeliveryTypes';
import MaterialFolderIcon from 'src/assets/icons/NavigationMenu/MaterialFolderIcon';

import { ProgramComponents } from 'src/pages/Program';
import { Chips, TooltipCustom } from 'src/components';

import { ProgramDetailContext } from '../../pages/Program/ProgramDetail/ProgramDetailContext';

const deliveryTypeIcons = {
    '1': { icon: DeliveryTypeIcon1, tooltip: 'Assignment/Lab' },
    '2': { icon: DeliveryTypeIcon2, tooltip: 'Concept/Lecture' },
    '3': { icon: DeliveryTypeIcon3, tooltip: 'Guide/Review' },
    '4': { icon: DeliveryTypeIcon4, tooltip: 'Test/Quiz' },
    '5': { icon: DeliveryTypeIcon5, tooltip: 'Exam' },
    '6': { icon: DeliveryTypeIcon6, tooltip: 'Seminar/Workshop' },
};

// const detailInfo2 = { name: '.NET Introduction', standard: 'H4SD', duration: 30, status: 'Online', delivery_type_id: 2 };

const SyllabusDetail2 = ({
    width = 'w-[831px]',
    day_no,
    unit_no,
    unit_name,
    UnitChapter,
}) => {
    const { outputStandards } = useContext(ProgramDetailContext);
    const { deliveryTypes } = useContext(ProgramDetailContext);

    const OutputStandard = outputStandards.filter(
        (OutputStandard) => OutputStandard.id === UnitChapter?.outputStandardId
    )[0];
    const DeliveryType = deliveryTypes.filter(
        (DeliveryType) => DeliveryType.id === UnitChapter?.deliveryTypeId
    )[0];
    const DeliveryTypeIcon = deliveryTypeIcons[DeliveryType?.icon];

    console.log(OutputStandard);
    console.log(DeliveryType);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`container ${width}`}>
            <div className="left-column font-bold">{UnitChapter?.name}</div>
            <div className="right-column">
                <TooltipCustom
                    title={
                        <div>
                            <h6 className="font-bold text-[1rem] text-main">
                                {OutputStandard?.name}
                            </h6>
                            <hr className="max-w-[184px] text-[#E2E8F0]" />
                            <p>{OutputStandard?.descriptions}</p>
                        </div>
                    }
                    trigger={
                        <span className="content-center">
                            <Chips.ChipSquare
                                text={OutputStandard?.code}
                                backgroundColor="var(--primary-color)"
                            />
                        </span>
                    }
                />
                <div className="duration-info font-normal">
                    {UnitChapter?.duration}mins
                </div>
                <div className="items-center">
                    <Chips.ChipRounded
                        text={UnitChapter?.isOnline ? 'Online' : 'Offline'}
                        outlined={true}
                        inactive={!UnitChapter?.isOnline}
                        textColor="var(--highlight-one)"
                        inactiveBackgroundColor="var(--primary-color)"
                    />
                </div>
                <TooltipCustom
                    title={DeliveryType?.name}
                    trigger={
                        <div className="icon">
                            {DeliveryTypeIcon && (
                                <DeliveryTypeIcon.icon width="24" height="24" />
                            )}
                        </div>
                    }
                />
                <div>
                    <ProgramComponents.ViewProgramMaterial
                        day_no={day_no}
                        unit_no={unit_no}
                        unit_name={unit_name}
                        unitChapterId={UnitChapter?.id}
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                    <a
                        className="cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="icon">
                            <MaterialFolderIcon width="24" height="24" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

SyllabusDetail2.propTypes = {
    width: PropTypes.string,
    day_no: PropTypes.number,
    unit_no: PropTypes.number,
    unit_name: PropTypes.string,
    UnitChapter: PropTypes.object.isRequired,
};

export default SyllabusDetail2;