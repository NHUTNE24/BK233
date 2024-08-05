import PropTypes from 'prop-types';
import { GoChecklist } from 'react-icons/go';
import { LiaHandPaper } from 'react-icons/lia';
import { LuBookMarked, LuSpellCheck } from 'react-icons/lu';
import { RiBaseStationLine, RiUserVoiceLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import TrainingMaterialModal from '../TrainingMaterialModal';
import { useEffect, useState } from 'react';
import axios from 'axios';

UnitChapter.propTypes = {
    chapterInfo: PropTypes.object.isRequired,
    unitInfo: PropTypes.object.isRequired,
    handleFetchChapter: PropTypes.func.isRequired,
    handleReloadData: PropTypes.func.isRequired,
};

const deliveryTypeIcon = {
    'Assignment/Lab': <LuBookMarked />,
    'Concept/Lecture': <RiUserVoiceLine />,
    'Guide/Review': <LiaHandPaper />,
    'Test/Quiz': <GoChecklist />,
    Exam: <LuSpellCheck />,
    'Seminar/Workshop': <RiBaseStationLine />,
};

function UnitChapter({ chapterInfo, unitInfo, dayInfo }) {
    const data = useSelector((state) => state.syllabusDetail);

    const [trainingMaterials, setTraningMaterials] = useState([]);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/training-materials')
                if (result.status === 200) {
                    setTraningMaterials(result.data);
                } else {
                    console.log('fail')
                }

            } catch (err) {
                console.log(err)
            }
        }
        fetchMaterial();
    },[])

    // const trainingMaterials = data.trainingMaterials.reduce(
    //     (acc, cur) => acc.concat(cur.filter((item) => item.unitChapterId === chapterInfo.id && item.deleted === false)),
    //     [],
    // );

    return (
        <div className={styles['chapter-wrapper']}>
            <div className={styles.container}>
                <h3 className={styles['chapter-name']}>{chapterInfo.name}</h3>
                <div className={styles['chapter-body']}>
                    <ul className={styles['body-wrapper']}>
                        <li className={styles['output-standard']}>
                            {data.outputStandards.find((item) => item.id === chapterInfo.outputStandardId).code}
                        </li>
                        <li className={styles['chapter-duration']}>{`${chapterInfo.duration} mins`}</li>
                        <li
                            className={`${styles['chapter-method']} ${chapterInfo.online ? styles['chapter-method--online'] : styles['chapter-method--offline']}`}
                        >
                            {chapterInfo.online ? 'Online' : 'Offline'}
                        </li>
                        <li className={styles['delivery-type']}>
                            {
                                deliveryTypeIcon[
                                    data.deliveryTypes.find((item) => item.id === chapterInfo.deliveryTypeId).name
                                ]
                            }
                        </li>
                        <li className={styles['material-training']}>
                            <TrainingMaterialModal dayInfo={dayInfo} unitInfo={unitInfo} chapterInfo={chapterInfo} material={trainingMaterials} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UnitChapter;
