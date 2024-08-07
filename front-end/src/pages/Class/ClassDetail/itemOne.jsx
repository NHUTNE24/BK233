import { Button } from 'antd';
import { MdEdit } from 'react-icons/md';
import {
    Accordion2,
    AccordionSummary,
    AccordionDetails3,
} from '../../../components/Accordion';
import Proptypes from 'prop-types';
import { useEffect, useState } from 'react';
import URL from '../../../constants/url';
import { basicAuth } from '../../../constants/user';
import SyllabusCard from '../../../components/SyllabusCard';
import axios from 'axios';

function ItemOne({ id }) {
    const [trainingProgram, setTrainingProgram] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTrainingProgram = async () => {
        try {
            const response = await axios.get(
                `${URL.LOCAL_API_CLASS}/${id}/training-programs`,
                {
                    headers: {
                        Authorization: basicAuth,
                    },
                }
            );
            setTrainingProgram(response.data);
        } catch (error) {
            console.error(
                'There was an error fetching the training programs!',
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainingProgram();
    }, []);

    return (
        <div className="flex flex-col">
            {trainingProgram.map((item, index) => (
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
                        {item.syllabi.map((item, index) => (
                            <SyllabusCard
                                key={index}
                                hasImage
                                imageLink="https://www.w3schools.com/howto/img_avatar.png"
                                active={item.status === 'Active' ? true : false}
                                deActive={
                                    item.status === 'Active' ? false : true
                                }
                                programName={item.topicName}
                                syllabusName={`${item.topicCode} ${item.version}`}
                                duration={`${item.days} days (${item.hours} hours)`}
                                modified={`Modified on ${item.modifiedDate} by ${item.modifiedBy}`}
                            />
                        ))}
                    </AccordionDetails3>
                </Accordion2>
            ))}
        </div>
    );
}

ItemOne.propTypes = {
    id: Proptypes.string,
};

export default ItemOne;
