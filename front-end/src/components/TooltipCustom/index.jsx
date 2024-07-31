import PropTypes from 'prop-types';

import { Tooltip } from 'antd';

const TooltipCustom = ({ title, trigger, color = '#FFFFFF' }) => {
    return (
        <Tooltip
            id="delivery-type"
            title={title}
            arrow={false}
            color={color}
            overlayStyle={{
                maxWidth: 436,
            }}
            overlayInnerStyle={{
                borderRadius: 10,
                padding: '1rem',
                boxShadow: '0 20px 40px 0 rgba(0,0,0,0.16)',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'black',
            }}
        >
            {trigger}
        </Tooltip>
    );
};

TooltipCustom.propTypes = {
    title: PropTypes.node,
    trigger: PropTypes.node,
    color: PropTypes.string,
};

export default TooltipCustom;
