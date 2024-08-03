import PropTypes from 'prop-types';

const TrainingProgramDetailDuration = ({
    days,
    hours,
    modified_on,
    modified_by,
}) => {
    return (
        <div
            id="training-program-detail-duration"
            className="flex flex-col justify-around min-h-[91px] text-[0.875rem] border-b-[1.5px] py-[20px]"
        >
            <p>
                <strong className="text-[1.5rem]">{days + ' '}</strong> days{' '}
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
    modified_on: PropTypes.string,
    modified_by: PropTypes.string,
};

export default TrainingProgramDetailDuration;
