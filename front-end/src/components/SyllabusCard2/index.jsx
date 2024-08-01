import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
function SyllabusCard2({
    syllabusId,
    isActive,
    isWithIcon,
    isMovable,
    syllabusName,
    syllabusCode,
    duration,
    modified,
    handleRemove,
}) {
    return (
        <div
            className={`w-full h-full p-[20px] rounded-[20px] ${isMovable ? 'bg-[#DFDEDE]' : 'bg-white'} ${isActive ? 'text-[#474747]' : 'text-[#8B8B8B]'}`}
            style={{ boxShadow: '0px 4px 8px 3px #00000026' }}
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex flex-row items-center justify-start gap-[20px]">
                        <p className="text-[24px] font-semibold tracking-[0.2em]">
                            {syllabusName}
                        </p>
                        {isActive ? (
                            <button className="h-[27px] w-[72px] py-[5px] bg-[var(--primary-color)] text-white text-[12px] text-center rounded-[50px] font-medium">
                                Active
                            </button>
                        ) : (
                            <button className="h-[27px] w-[72px] py-[5px] bg-[#B9B9B9] text-white text-[12px] text-center rounded-[50px] font-medium">
                                Inactive
                            </button>
                        )}
                    </div>
                    {isWithIcon && (
                        <div className="cursor-pointer" onClick={() => handleRemove(syllabusId)}>
                            <CloseCircleOutlined
                                style={{ fontSize: '150%', color: '#000000' }}
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-start gap-[10px] font-semibold text-[14px] items-center">
                    <p>{syllabusCode}</p>
                    <div>|</div>
                    <p>{duration}</p>
                    <div>|</div>
                    <p>{modified}</p>
                </div>
            </div>
        </div>
    );
}

SyllabusCard2.propTypes = {
    syllabusId: PropTypes.string,
    isActive: PropTypes.bool,
    isWithIcon: PropTypes.bool,
    isMovable: PropTypes.bool,
    syllabusName: PropTypes.string.isRequired,
    syllabusCode: PropTypes.string.isRequired,
    duration: PropTypes.node.isRequired,
    modified: PropTypes.node.isRequired,
    handleRemove: PropTypes.func,
};

export default SyllabusCard2;