import PropTypes from 'prop-types';

const TrainingProgramDetailDuration = ({
    days,
    hours,
    modified_on,
    modified_by,
}) => {
    return (
        <div
            id="edit-information"
            className="min-h-[91px] text-[1.4rem] border-b-[1.5px] ml-[-30px] pl-[30px] mr-[-25px] pr-[25px] py-[20px]"
        >
            <p>
                <strong className="text-[2.4rem]">{days + ' '}</strong> days{' '}
                <em>
                    {'(' + hours + ' '} hours{')'}
                </em>
            </p>
            <p>
                Modified on <em>{modified_on}</em> by{' '}
                <strong>{modified_by}</strong>
            </p>
        </div>
    );
};

TrainingProgramDetailDuration.propTypes = {
    days: PropTypes.number,
    hours: PropTypes.number,
    modified_on: PropTypes.instanceOf(Date),
    modified_by: PropTypes.string,
};

export default TrainingProgramDetailDuration;
