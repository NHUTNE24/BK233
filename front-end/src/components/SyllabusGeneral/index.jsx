import "./SyllabusGeneral.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SyllabusGeneral = (infoData) => {
    const info = infoData.infoData;
    
    return (
            <div>
                <div className="syllabus-general-container">
                    <div className="syllabus-general-left-column">
                        <div className="level-container">
                            <div className="level-left-column"><i className="fa-solid fa-star"></i> Level</div>
                        <div className="level-right-column"><span>{ info.level }</span></div>
                        </div>
                        <div className="attendee-number-container">
                            <div className="attendee-number-left-column"><i className="fa-solid fa-user-group"></i> Attendee number</div>
                            <div className="attendee-number-right-column">{ info.attendeeNum }</div>
                        </div>
                        <div className="output-standard-container">
                            <div className="output-standard-left-column"><i className="fa-solid fa-shield-heart"></i> Output Standard</div>
                            <div className="output-standard-right-column">
                                {info.standard.map((info, index) => (<div className="output-standard-info" key={index}><span>{info}</span></div>))}   
                            </div>
                        </div>
                    </div>
                    <div className="syllabus-general-right-column">
                        <div className="technical-requirement-title"><i className="fa-solid fa-gear"></i> Technical Requirement(s)</div>
                        <div className="technical-requirement-content">{info.technicalRequirement}</div>
                    </div>
                </div>
                <div className="course-objectives-container">
                    <div className="course-objectives-title"><i className="fa-solid fa-arrows-to-circle"></i> Course Objectives</div>
                    <div className="course-objectives-content">{ info.courseRequirement }</div>
                </div>
            </div>
          
        );
  };
  export default SyllabusGeneral;