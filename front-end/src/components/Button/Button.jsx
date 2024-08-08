import { Button } from 'antd';
import Proptypes from 'prop-types';
import './Button.css';

export default function ButtonComponent({
    text,
    isIconOnly = false,
    isButtonWithIcon = false,
    icon,
    isBgOrange = false,
    isDanger = false,
    iconPosition = 'start',
    isGhost = false,
    onClick,
    htmlType,
}) {
    return isIconOnly ? (
        <Button
            htmlType={htmlType}
            icon={icon}
            onClick={onClick}
            className="class-btn-isIconOnly"
        />
    ) : isButtonWithIcon ? (
        <Button
            htmlType={htmlType}
            icon={icon}
            onClick={onClick}
            className={`class-btn-isButtonWithIcon ${
                isBgOrange ? '!bg-orange hover:!bg-[#FFB347]' : ''
            }`}
            iconPosition={iconPosition}
        >
            {text}
        </Button>
    ) : isGhost ? (
        <Button
            htmlType={htmlType}
            onClick={onClick}
            type="text"
            className={`!bg-none class-btn-isGhost
                ${isBgOrange ? '!text-orange hover:!text-[#FFB347]' : ''}
                ${isDanger ? '!text-alert !border-alert hover:!bg-alert' : ''}

                `}
        >
            {text}
        </Button>
    ) : (
        <Button
            htmlType={htmlType}
            onClick={onClick}
            className={`
                class-btn-default
                ${isBgOrange ? '!bg-orange hover:!bg-[#FFB347]' : ''}
                ${isDanger ? '!bg-alert hover:!bg-female' : ''}
            `}
        >
            {text}
        </Button>
    );
}

ButtonComponent.propTypes = {
    text: Proptypes.string,
    isIconOnly: Proptypes.bool,
    icon: Proptypes.node,
    isBgOrange: Proptypes.bool,
    isDanger: Proptypes.bool,
    iconPosition: Proptypes.oneOf(['start', 'end']),
    isButtonWithIcon: Proptypes.bool,
    isGhost: Proptypes.bool,
    onClick: Proptypes.func,
    htmlType: Proptypes.string,
};
