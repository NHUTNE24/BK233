import PropTypes from 'prop-types';

import { Chips } from 'src/components';
import ProgramComponents from '../components';

const TrainingProgramDetailHeader = ({
    hasMenu,
    name,
    status,
    trainingProgramCode,
    handleSuccess,
    handleError,
    handleEditAdditional,
    handleDuplicateAdditional,
    handleChangeStatusAdditional,
    handleDeleteAdditional,
}) => {
    return (
        <div
            id="training-program-detail-header"
            className="w-full min-h-[123px] py-[20px] bg-main"
        >
            <h4 className="text-[#FFF] font-[500] tracking-[0.375rem]">
                Training program
            </h4>
            <div className="flex items-center">
                <h3 className="text-[#FFF] font-[700] tracking-[0.5625rem] mr-[30px]">
                    {name}
                </h3>
                <Chips.ChipRounded
                    text={status}
                    outlined={true}
                    inactive={status !== 'Active'}
                />
                {hasMenu && (
                    <i className="ml-auto">
                        <ProgramComponents.ManageTrainingProgramMenu
                            trainingProgramCode={trainingProgramCode}
                            status={status}
                            handleSuccess={handleSuccess}
                            handleError={handleError}
                            handleEditAdditional={handleEditAdditional}
                            handleDuplicateAdditional={
                                handleDuplicateAdditional
                            }
                            handleChangeStatusAdditional={
                                handleChangeStatusAdditional
                            }
                            handleDeleteAdditional={handleDeleteAdditional}
                        />
                    </i>
                )}
            </div>
        </div>
    );
};

TrainingProgramDetailHeader.propTypes = {
    hasMenu: PropTypes.bool,
    name: PropTypes.string,
    status: PropTypes.string,
    trainingProgramCode: PropTypes.string,
    handleSuccess: PropTypes.func,
    handleError: PropTypes.func,
    handleEditAdditional: PropTypes.func,
    handleDuplicateAdditional: PropTypes.func,
    handleChangeStatusAdditional: PropTypes.func,
    handleDeleteAdditional: PropTypes.func,
};

export default TrainingProgramDetailHeader;
