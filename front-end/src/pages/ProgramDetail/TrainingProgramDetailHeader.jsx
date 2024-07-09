import PropTypes from 'prop-types';

import { Chips } from '../../components';
import { MoreHorizontalIcon } from '../../assets';

const TrainingProgramDetailHeader = ({ name, status }) => {
    return (
        <div>
            <h4 className="text-[2.4rem] text-[#FFF] font-[500] tracking-[0.6rem]">
                Training program
            </h4>
            <div className="flex items-center">
                <h3 className="text-[3.6rem] text-[#FFF] font-[700] tracking-[0.9rem] mr-[20px]">
                    {name}
                </h3>
                <Chips.Chip1
                    text={status}
                    backgroundColor="transparent"
                    border={true}
                    closable={false}
                />
                <a className="cursor-pointer ml-auto">
                    <MoreHorizontalIcon />
                </a>
            </div>
        </div>
    );
};

TrainingProgramDetailHeader.propTypes = {
    name: PropTypes.string,
    status: PropTypes.string,
};

export default TrainingProgramDetailHeader;
