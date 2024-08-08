import { Button } from 'antd';
import Proptypes from 'prop-types';
import './Button.css';

export default function ButtonComponent({
    text,
    isIconOnly,
    isButtonWithIcon = false,
    icon,
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
            // className="class-btn-primary"
        />
    ) : isButtonWithIcon ? (
        <Button
            htmlType={htmlType}
            icon={icon}
            onClick={onClick}
            className="!pl-4 !pr-6"
            iconPosition={iconPosition}
        >
            {text}
        </Button>
    ) : isGhost ? (
        <Button
            htmlType={htmlType}
            onClick={onClick}
            type="text"
            className="!bg-none "
        >
            {text}
        </Button>
    ) : (
        <Button htmlType={htmlType} onClick={onClick}>
            {text}
        </Button>
    );
}

ButtonComponent.propTypes = {
    text: Proptypes.string,
    isIconOnly: Proptypes.bool,
    icon: Proptypes.node,
    iconPosition: Proptypes.oneOf(['start', 'end']),
    isButtonWithIcon: Proptypes.bool,
    isGhost: Proptypes.bool,
    onClick: Proptypes.func,
    htmlType: Proptypes.string,
};
