import { useDispatch } from 'react-redux';
import { message, Tabs } from 'antd';

import axios from 'axios';
import PropTypes from 'prop-types';
import { setData } from '../../../../store/syllabus/syllabusDetailSlice';

import './TabsCustom.scss';
import OthersTabCreate from '../OtherTabCreate';
import OutlineTabCreate from '../OutlineTabCreate';
import General from '../../CreateSyllabus/General';
import { useEffect, useState } from 'react';
function TabsCustom({
    dataSource,
    courseRef,
    levelRef,
    outputStandardList,
    activeTab,
    onTabChange,
    onFormChange,
    form,
    attendeeNumberRef,
    technicalRef,
}) {
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/syllabus/${dataSource.syllabus.id}`
            );
            const data = response.data;
            dispatch(setData(data));
        } catch (err) {
            console.error(err);
        }
    };

    const [deliveryTypeList, setDeliveryTypeList] = useState([]);

    useEffect(() => {
        const fetchDeliveryType = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:8080/api/delivery-type'
                );

                if (result.status === 200) {
                    setDeliveryTypeList(result.data);
                } else {
                    message.error('Fail to fetch delivery Type');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDeliveryType();
    }, []);

    const tabs = [
        {
            label: 'General',
            children: (
                <General
                    form={form}
                    dataSource={dataSource}
                    attendeeNumberRef={attendeeNumberRef}
                    technicalRef={technicalRef}
                    courseRef={courseRef}
                    levelRef={levelRef}
                />
            ),
            key: '1',
        },
        {
            label: 'Outline',
            children: (
                <OutlineTabCreate
                    form={form}
                    handleReloadData={fetchData}
                    dataSource={dataSource}
                    deliveryTypeList={deliveryTypeList}
                    outputStandardList={outputStandardList}
                />
            ),
            key: '2',
        },
        {
            label: 'Others',
            children: (
                <OthersTabCreate
                    form={form}
                    dataSource={dataSource}
                    deliveryTypeList={deliveryTypeList}
                    outputStandardList={outputStandardList}
                />
            ),
            key: '3',
        },
    ];
    return (
        <>
            <div className="tabs-custom">
                <Tabs
                    activeKey={activeTab}
                    onChange={onTabChange}
                    type="card"
                    items={tabs.map((tab, index) => ({
                        ...tab,
                        key: tab.key,
                        label: tab.label,
                        children: tab.children,
                    }))}
                />
            </div>
        </>
    );
}

export default TabsCustom;
