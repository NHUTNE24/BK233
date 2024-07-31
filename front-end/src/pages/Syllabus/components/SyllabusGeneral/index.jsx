import './SyllabusGeneral.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdStarOutline, MdOutlinePeople } from 'react-icons/md';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { MdOutlineFilterCenterFocus } from 'react-icons/md';

import UnitChapter from './../UnitChapter/index';
import { useSelector } from 'react-redux';

const SyllabusGeneral = () => {
    const data = useSelector((state) => state.syllabusDetail);

    const flattenChapter = data.unitChapters ? data.unitChapters.reduce((acc, cur) => acc.concat(cur), []) : [];

    const outputStandardIds = flattenChapter.reduce((acc, cur) => [...acc, cur.outputStandardId], []);

    const outputStandardRender = data.outputStandards
        ? data.outputStandards.filter((item) => outputStandardIds.find((item1) => item1 === item.id))
        : [];

    return (
        <div>
            <div className="syllabus-general-container">
                <div className="syllabus-general-left-column">
                    <div className="level-container">
                        <div className="level-left-column">
                            <span style={{ fontSize: '24px', marginRight: '8px' }}>
                                <MdStarOutline />
                            </span>{' '}
                            Level
                        </div>
                        <div className="level-right-column">
                            <span>{data.syllabus.level}</span>
                        </div>
                    </div>
                    <div className="attendee-number-container">
                        <div className="attendee-number-left-column">
                            <span style={{ fontSize: '24px', marginRight: '8px' }}>
                                <MdOutlinePeople />
                            </span>{' '}
                            Attendee number
                        </div>
                        <div className="attendee-number-right-column">{data.syllabus.attendeeNumber}</div>
                    </div>
                    <div className="output-standard-container">
                        <div className="output-standard-left-column">
                            <span style={{ fontSize: '24px', marginRight: '8px' }}>
                                <MdOutlineVerifiedUser />{' '}
                            </span>
                            Output Standard
                        </div>
                        <div className="output-standard-right-column">
                            {outputStandardRender
                                ? outputStandardRender.map((info, index) => (
                                      <div
                                          className="output-standard-info"
                                          key={index}
                                      >
                                          {info != null && <span>{info.code}</span>}
                                      </div>
                                  ))
                                : 'NULL'}
                        </div>
                    </div>
                </div>
                <div className="syllabus-general-right-column">
                    <div className="technical-requirement-title">
                        <span style={{ fontSize: '22px', marginTop: '4px', marginRight: '12px' }}>
                            <IoSettingsOutline />
                        </span>
                        Technical Requirement(s)
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: data.syllabus.technicalRequirement }}
                        className="technical-requirement-content"
                    />
                </div>
            </div>

            <div className="course-objectives-container">
                <div className="course-objectives-title">
                    <span style={{ fontSize: '24px', marginTop: '8px', marginRight: '8px' }}>
                        <MdOutlineFilterCenterFocus />
                    </span>{' '}
                    Course objectives
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: data.syllabus.courseObjective }}
                    className="course-objectives-content"
                />
            </div>
        </div>
    );
};
export default SyllabusGeneral;
