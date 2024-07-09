import { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const colors = ['white'];
const MyTooltip = () => {
    const [visible, setVisible] = useState({});

    const handleVisibleChange = (color, isVisible) => {
        setVisible((prevVisible) => ({ ...prevVisible, [color]: isVisible }));
    };

    const closeTooltip = (color) => {
        setVisible((prevVisible) => ({ ...prevVisible, [color]: false }));
    };
    return (
        <div>
            {colors.map((color, index) => (
                <Tooltip
                    key={index}
                    title={
                        <div className="p-4 text-gray-500">
                            <div className="text-left text-sm">
                                prompt text: this is an example
                                aaaaaaaaaaaaaaaaaaaa
                            </div>
                            <div className="text-xs text-right absolute bottom-0 right-0 mr-4">
                                1 of 4
                            </div>
                            <CloseCircleOutlined
                                className="absolute top-0 right-0 mr-1 mt-1"
                                onClick={() => closeTooltip(color)}
                            />
                        </div>
                    }
                    color={color}
                    visible={visible[color]}
                    onVisibleChange={(isVisible) =>
                        handleVisibleChange(color, isVisible)
                    }
                >
                    <Button>{color}</Button>
                </Tooltip>
            ))}
        </div>
    );
};
export default MyTooltip;
