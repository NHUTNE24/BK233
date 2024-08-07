import { Button, Select } from 'antd';
import { MdEdit } from 'react-icons/md';
import {
    Accordion2,
    AccordionSummary,
    AccordionDetails3,
} from './components/CustomAccordion';
import { useCallback, useEffect, useState } from 'react';
import URL from '../../../constants/url';
import { basicAuth } from '../../../constants/user';

import Chip1 from '../../../components/Chips/Chip1';
import axios from 'axios';

function ItemOne() {
    const [selectedTrainingProgram, setSelectedTrainingProgram] = useState([]);
    const [trainingProgram, setTrainingProgram] = useState([]);

    const fetchTrainingProgram = useCallback(async () => {
        try {
            const response = await axios.get(URL.LOCAL_API_PROGRAM, {
                headers: {
                    Authorization: basicAuth,
                },
            });
            const rawData = response.data;
            const enrichedProgram = await Promise.all(
                rawData.map(async (item) => {
                    const syllabusDetail = await Promise.all(
                        item.syllabusId.map(async (item) => {
                            const response = await axios.get(
                                `${URL.LOCAL_API_SYLLABUS}/${item}`,
                                {
                                    headers: {
                                        Authorization: basicAuth,
                                    },
                                }
                            );
                            return response.data;
                        })
                    );
                    return {
                        ...item,
                        syllabusDetail: syllabusDetail.flat(),
                    };
                })
            );
            setTrainingProgram(enrichedProgram);
            console.log(enrichedProgram);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchTrainingProgram();
    }, [fetchTrainingProgram]);

    const handleChange = (value) => {
        const selected = trainingProgram.filter((item) =>
            value.includes(item.trainingProgramCode)
        );
        setSelectedTrainingProgram(selected);
        console.log(selectedTrainingProgram);
    };

    return (
        <div className="flex flex-col">
            <div className="my-2">
                <Select
                    mode="multiple"
                    onChange={handleChange}
                    style={{ width: 1000 }}
                    placeholder="select"
                    options={trainingProgram.map((item) => ({
                        label: item.name,
                        value: item.trainingProgramCode,
                    }))}
                />
            </div>
            {selectedTrainingProgram &&
                selectedTrainingProgram.map((item, index) => (
                    <Accordion2 key={index}>
                        <AccordionSummary>
                            <header key={index} className="text-primary">
                                <div className="flex flex-row gap-2 items-center">
                                    <h4>{item.name}</h4>
                                    <Button
                                        shape="circle"
                                        icon={<MdEdit className="text-xl" />}
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <div>
                                        {item.days} days{' '}
                                        <span className="italic">
                                            ({item.hours} hours)
                                        </span>
                                    </div>
                                    <div className="h-5 w-0.5 bg-primary"></div>
                                    <div>
                                        Modified on{' '}
                                        <span className="italic">
                                            {item.modifiedOn}
                                        </span>{' '}
                                        by{' '}
                                        <span className="font-bold">
                                            {item.modifiedBy}
                                        </span>
                                    </div>
                                </div>
                            </header>
                        </AccordionSummary>
                        <AccordionDetails3>
                            {item.syllabusDetail.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-row items-center rounded-3xl overflow-hidden elevation2 ${item.syllabus.status === 'Active' ? `!text-main` : `!text-[#B9B9B9]`}`}
                                >
                                    <img
                                        src="https://via.placeholder.com/300x96"
                                        alt="placeholder"
                                    />
                                    <div className="px-5 py-4 flex flex-col gap-1">
                                        <div className="flex flex-row gap-3 items-center">
                                            <h4>{item.syllabus.topicName}</h4>
                                            <Chip1
                                                text={item.syllabus.status}
                                                closable={false}
                                                inactive={
                                                    item.syllabus.status !==
                                                    'Active'
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-row gap-3 items-center">
                                            <p className="subtitle2 !font-normal">
                                                {item.syllabus.topicCode +
                                                    ' ' +
                                                    item.syllabus.version}
                                            </p>
                                            <div
                                                className={`h-5 w-0.5 ${item.syllabus.status === 'Active' ? `!bg-primary` : `!bg-inputHiddenColor`}`}
                                            ></div>
                                            <p className="subtitle2 !font-normal">
                                                {item.syllabus.days +
                                                    ' days (' +
                                                    item.syllabus.hours +
                                                    ' hours)'}
                                            </p>
                                            <div
                                                className={`h-5 w-0.5 ${item.syllabus.status === 'Active' ? `!bg-primary` : `!bg-inputHiddenColor`}`}
                                            ></div>
                                            <p className="subtitle2 !font-normal">
                                                on{' '}
                                                <span>
                                                    {item.syllabus.modifiedDate}
                                                </span>{' '}
                                                by{' '}
                                                <span>
                                                    {item.syllabus.modifiedBy}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </AccordionDetails3>
                    </Accordion2>
                ))}
        </div>
    );
}

export default ItemOne;
