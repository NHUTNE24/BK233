import { CloseCircleOutlined } from '@ant-design/icons';
import './styles.css'
import PropTypes from 'prop-types';
import Chip1 from '../Chips/Chip1';
function SyllabusCard({
	active,
	deActive,
	deActiveWithIcon,
	hasImage = false,
	imageLink,
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
		hasImage ? 
		<div
			className={`syllabus-card grid grid-cols-[1fr_2fr] w-full rounded-2xl ${movable ? 'bg-[#DFDEDE]' : 'bg-white'} ${isActive ? 'text-main' : 'text-[#B9B9B9]'} hover:elevation2 overflow-hidden`}
		>
			<div className='overflow-hidden relative flex justify-center items-center h-[98px]'>
				<img src={imageLink} className={`w-full absolute ${isActive ? `` : `grayscale opacity-25`}`} alt="demo" />
			</div>
			<div className="flex flex-col gap-4 p-5">
				<div className="flex justify-between">
					<div className="flex flex-row items-center gap-2">
						<h4 className="tracking-[0.2em]">
							{programName}
						</h4>
						{isActive ? (
							<Chip1 text="Active" isActive={true} isRounded/>
						) : (
							<Chip1 text="Inactive" isActive={false} isRounded/>
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
		: 
		<div
			className={`syllabus-card w-full h-full p-5 rounded-2xl ${movable ? 'bg-[#DFDEDE]' : 'bg-white'} ${isActive ? 'text-main' : 'text-[#B9B9B9]'} hover:elevation2`}
		>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between">
					<div className="flex flex-row items-center gap-2">
						<h4 className="tracking-[0.2em]">
							{programName}
						</h4>
						{isActive ? (
							<Chip1 text="Active" isActive={true} isRounded/>
						) : (
							<Chip1 text="Inactive" isActive={false} isRounded/>
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
	hasImage: PropTypes.bool,
	imageLink: PropTypes.string,
	deActiveWithIcon: PropTypes.bool,
	withIcon: PropTypes.bool,
	movable: PropTypes.bool,
	programName: PropTypes.string.isRequired,
	syllabusName: PropTypes.string.isRequired,
	duration: PropTypes.element.isRequired,
	modified: PropTypes.element.isRequired,
};

export default SyllabusCard;
