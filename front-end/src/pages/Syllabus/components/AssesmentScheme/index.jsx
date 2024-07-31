import PropTypes from 'prop-types';
import styles from './style.module.scss';
AssessmentScheme.propTypes = {
    schema: PropTypes.object.isRequired,
};

function AssessmentScheme({ schema }) {
    const { quiz = 15, assignment = 15, finalAssessment = 70, gpa = 70 } = schema;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Assessment scheme</h2>
            <div className={styles.body}>
                <div className={styles['assessment-percent']}>
                    <div className={styles['other-percent']}>
                        <p className={styles['final-percent']}>
                            Quiz <span className={styles['percent-value']}>{quiz}%</span>
                        </p>
                        <p className={styles['final-percent']}>
                            Assignment <span className={styles['percent-value']}>{assignment}%</span>
                        </p>
                    </div>
                    <p className={styles['final-percent']}>
                        Final <span className={styles['percent-value']}>{finalAssessment}%</span>
                    </p>
                </div>
                <div className={styles['passing-criteria']}>
                    <h3 className={styles['criteria-title']}>Passing criteria</h3>
                    <p className={styles['gpa-percent']}>
                        GPA * <span className={styles['percent-value']}>{((gpa / 4) * 100).toFixed(1)}%</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AssessmentScheme;
