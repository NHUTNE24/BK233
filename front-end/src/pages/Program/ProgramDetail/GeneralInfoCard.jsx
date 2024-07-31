import PropTypes from 'prop-types';

const GeneralInfoCard = ({ general_information }) => {
    console.log(general_information);

    return (
        <div className="max-w-[946px] p-[1.25rem] rounded-[10px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <div
                className="text-[0.875rem] font-[400] list-disc"
                dangerouslySetInnerHTML={{ __html: general_information }}
            ></div>
        </div>
    );
};

GeneralInfoCard.propTypes = {
    general_information: PropTypes.string,
};

export default GeneralInfoCard;
