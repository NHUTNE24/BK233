import { ConfigProvider, Slider } from 'antd';
import { useState, useEffect } from 'react';
import './SliderCustom.scss';

function SliderCustom({ state }) {
    const [sliderConfig, setSliderConfig] = useState({ value: 0, bgColor: 'white' });

    useEffect(() => {
        const updateSliderConfig = () => {
            if (state.isBasicInfoValid) {
                setSliderConfig({ value: 12.5, bgColor: 'green' });
                if (state.isGeneralValid.status) {
                    setSliderConfig({ value: 37.5, bgColor: '#EDF2F7' });
                    if (state.isSyllabusDaysValid) {
                        setSliderConfig({ value: 62.5, bgColor: '#D45B13' });
                        if (state.isTrainingPrincipleValid && state.isAssessmentSchemaValid.status) {
                            setSliderConfig({ value: 87.5, bgColor: 'green' });
                        }
                    }
                }
            } else {
                setSliderConfig({ value: 0, bgColor: 'red' });
            }
        };

        updateSliderConfig();
    }, [state]);

    const { value, bgColor } = sliderConfig;

    return (
        <ConfigProvider
            theme={{
                components: {
                    Slider: {
                        dotSize: 8,
                        dotActiveBorderColor: 'unset',
                        trackBg: bgColor,
                        railBg: value >= 87.5 ? 'green' : 'rgba(0, 0, 0, 0.04)',
                        railHoverBg: value >= 87.5 ? 'green' : 'rgba(0, 0, 0, 0.04)',
                        handleActiveColor: 'white',
                        handleColor: 'white',
                        handleActiveOutlineColor: 'unset',
                        handleSizeHover: 8,
                        handleLineWidthHover: 0,
                        handleSize: 8,
                        railSize: 12,
                        trackHoverBg: bgColor,
                    },
                },
            }}
        >
            <Slider
                marks={{
                    12.5: 'General',
                    37.5: 'Outline',
                    62.5: 'Other',
                    87.5: 'Done',
                }}
                step={25}
                min={0}
                max={100}
                value={value}
                onChange={(val) => console.log(val)}
            />
        </ConfigProvider>
    );
}

export default SliderCustom;
