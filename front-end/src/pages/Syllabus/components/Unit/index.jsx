import { Collapse } from 'antd';
import PropTypes from 'prop-types';
import { IoIosArrowDropdown } from 'react-icons/io';
import styles from './style.module.scss';
import UnitChapter from '../UnitChapter';

Unit.propTypes = {
    unitInfo: PropTypes.object.isRequired,
    chapterInfo: PropTypes.object.isRequired,
};

function Unit({ unitInfo, chapterInfo }) {
    const flattenChapter = chapterInfo.reduce((acc, cur) => [...acc, ...cur], []);

    const filterChapter = flattenChapter.filter((chapter) => chapter.syllabusUnitId === unitInfo.id);

    const totalDuration = filterChapter.reduce((acc, cur) => acc + cur.duration, 0);

    const chapterListRender = filterChapter.filter(
        (chapter) => chapter.isDeleted === false || chapter.isDeleted === null,
    );

    const item = [
        {
            key: 1,
            label: (
                <div className={styles['unit-header']}>
                    <div className={styles['unit-title']}>
                        <p className={styles['unit-id']}>{`Unit ${unitInfo.unitNo}`}</p>
                        <div className={styles['unit-info']}>
                            <div className={styles['name-wrapper']}>
                                <h3 className={styles['unit-name']}>{unitInfo.name || '...'}</h3>
                            </div>
                            <p className={styles['unit-duration']}>
                                {totalDuration > 60
                                    ? `${(totalDuration / 60).toFixed(2)} hrs`
                                    : `${totalDuration} mins`}
                            </p>
                        </div>
                    </div>
                </div>
            ),
            children: (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={styles['chapter-list']}>
                        <ul className={styles['chapter-list-wrapper']}>
                            {chapterListRender.map((chapter, idx) => (
                                <li key={idx}>
                                    <UnitChapter
                                        unitInfo={unitInfo}
                                        chapterInfo={chapter}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <Collapse
                defaultActiveKey={['1']}
                showArrow={false}
                ghost
                expandIcon={<IoIosArrowDropdown />}
                items={item}
                collapsible="icon"
            />
        </div>
    );
}

export default Unit;
