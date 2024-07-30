import PropTypes from 'prop-types';
import { Tag } from 'antd';
import './Chip.css';

const Chip1 = ({
	text,
	isClosable = false,
	isActive = true,
	isRounded = false,
	isBordered = false,
	isDraft = false,
	isSearchChip = false,
}) => {
	return (
		<Tag
			className={`caption1 h-7 content-center text-primary
				${isBordered ? 'border border-gray-500' : 'border-none'}
				${isRounded ? 'rounded-full px-3' : ''}
				${isActive ? 'bg-main' : 'bg-[#B9B9B9]'}
				${isDraft ? '!bg-[#285D9A]' : ''}
				${isSearchChip ? '!bg-[#474747]' : ''}
			`}
			closable={isClosable}
		>
			{text}
		</Tag>
	);
};

Chip1.propTypes = {
	text: PropTypes.string,
	isClosable: PropTypes.bool,
	isActive: PropTypes.bool,
	isBordered: PropTypes.bool,
	isRounded: PropTypes.bool,
	isDraft: PropTypes.bool,
	isSearchChip: PropTypes.bool,
};

export default Chip1;
