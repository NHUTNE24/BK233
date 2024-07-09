import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
function SyllabusCard({
    active,
    deActive,
    deActiveWithIcon,
    withIcon,
    movable,
    programName,
    syllabusName,
    duration,
    modified,
}) {
    const isDefault =
        active || (!deActive && !deActiveWithIcon && !withIcon && !movable);
    const isWithIcon = withIcon || movable || deActiveWithIcon;
    const isActive = isDefault || movable || withIcon;
    return (
        <div
            className={`w-full h-full p-[20px] rounded-r-[20px] ${movable ? 'bg-[#DFDEDE]' : 'bg-white'} ${isActive ? 'text-[#474747]' : 'text-[#8B8B8B]'}`}
            style={{ boxShadow: '0px 4px 8px 3px #00000026' }}
        >
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex flex-row items-center justify-start gap-[20px]">
                        <p className="text-[24px] font-semibold tracking-[0.2em]">
                            {programName}
                        </p>
                        {isActive ? (
                            <button className="h-[27px] w-[72px] px-[15px] py-[5px] bg-[#2D3748] text-white text-[12px] rounded-[50px] font-medium">
                                Active
                            </button>
                        ) : (
                            <button className="h-[27px] w-[72px] px-[15px] py-[5px] bg-[#B9B9B9] text-white text-[12px] rounded-[50px] font-medium">
                                Inactive
                            </button>
                        )}
                    </div>
                    {isWithIcon && (
                        <div className="cursor-pointer">
                            <CloseCircleOutlined
                                style={{ fontSize: '150%', color: '#000000' }}
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-start gap-[10px] font-semibold text-[14px] items-center">
                    <p>{syllabusName}</p>
                    <div>|</div>
                    <p>{duration}</p>
                    <div>|</div>
                    <p>{modified}</p>
                </div>
            </div>
        </div>
    );
}

SyllabusCard.propTypes = {
    active: PropTypes.bool,
    deActive: PropTypes.bool,
    deActiveWithIcon: PropTypes.bool,
    withIcon: PropTypes.bool,
    movable: PropTypes.bool,
    programName: PropTypes.string.isRequired,
    syllabusName: PropTypes.string.isRequired,
    duration: PropTypes.element.isRequired,
    modified: PropTypes.element.isRequired,
};

export default SyllabusCard;
