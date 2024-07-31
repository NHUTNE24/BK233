import { MdOutlineVerifiedUser } from 'react-icons/md';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';

TrainingDeliveryPrinciple.propTypes = {};

function TrainingDeliveryPrinciple() {
    const data = useSelector((state) => state.syllabusDetail);

    const {
        training = '',
        pretest = '',
        marking = '',
        others = '',
        waiverCriteria = '',
    } = data.trainingDeliveryPrinciple || {};

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Training delivery principle</h2>
            <div className={styles.container}>
                <div className={styles['principle-header-wrapper']}>
                    <div className={styles['principle-header']}>
                        <MdOutlineVerifiedUser style={{ fontSize: '24px' }} />
                        <h3 className={styles['principle-name']}>Training</h3>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: training }} />
            </div>
            <div className={styles.container}>
                <div className={styles['principle-header-wrapper']}>
                    <div className={styles['principle-header']}>
                        <MdOutlineVerifiedUser style={{ fontSize: '24px' }} />
                        <h3 className={styles['principle-name']}>Pre-test</h3>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: pretest }} />
            </div>
            <div className={styles.container}>
                <div className={styles['principle-header-wrapper']}>
                    <div className={styles['principle-header']}>
                        <MdOutlineVerifiedUser style={{ fontSize: '24px' }} />
                        <h3 className={styles['principle-name']}>Marking</h3>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: marking }} />
            </div>
            <div className={styles.container}>
                <div className={styles['principle-header-wrapper']}>
                    <div className={styles['principle-header']}>
                        <MdOutlineVerifiedUser style={{ fontSize: '24px' }} />
                        <h3 className={styles['principle-name']}>Waiver Criteria</h3>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: waiverCriteria }} />
            </div>
            <div className={styles.container}>
                <div className={styles['principle-header-wrapper']}>
                    <div className={styles['principle-header']}>
                        <MdOutlineVerifiedUser style={{ fontSize: '24px' }} />
                        <h3 className={styles['principle-name']}>Others</h3>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: others }} />
            </div>
        </div>
    );
}

export default TrainingDeliveryPrinciple;
