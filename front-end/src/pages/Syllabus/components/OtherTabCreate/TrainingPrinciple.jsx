import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WordEditor from '../WordEditor';
import { updateTrainingPrinciple } from '../../../../store/syllabus/updateSyllabusSlice';

function TrainingPrinciple() {
    const data = useSelector((state) => state.updateSyllabus);
    const dispatch = useDispatch();

    const initialValue = `
<h4>Training</h4>
<ul>
 ${
     data.trainingPrinciple.training ||
     `
 <li>Trainee who actively complete online learning according to MOOC links provided</li>
<li>At the end of the day, students complete Daily Quiz for 30 minutes</li>
<li>Trainer/Mentor supports answering questions, guiding exercises 1.5-2.0h/day</li>
<li>Trainer conducts the workshops
    <li class="ql-indent-1">Trainees complete Assignments and Labs</li>
    <li class="ql-indent-1">Trainees have 1 final test in 4 hours (1 hour theory + 3 hours of practice)</li>
</li>`
 } 
</ul>

<h4>Pre-test</h4>
<ul>
 ${
     data.trainingPrinciple.pretest ||
     `
 <li>Only allow each student to retake the test up to 2 times</li>
<li>Re-exam the same structure as the Final Test</li>`
 } 
</ul>

<h4>Marking</h4>
<ul>
${
    data.trainingPrinciple.marking ||
    `
<li>Mentor review students on 2 Assignments</li>
<li>Mentor marks the 3 Quizzes and Final Exam Theory</li>
<li>Trainer marks the Final Exam Practice</li>
<li>If the trainees have to retake test, the score will be calculated:
    <li class="ql-indent-1">The score &gt;=6, the score will be 6</li>
    <li class="ql-indent-1">The score &lt;6, the score will be that score</li>
</li>`
}
</ul>

<h4>Waiver Criteria</h4>
<ul>
 ${
     data.trainingPrinciple.waiverCriteria ||
     `
 <li>Students pass the quick test</li>
<li>Trainer Audit: rank B</li>`
 }

</ul>

<h4>Others</h4>
<ul>
  ${
      data.trainingPrinciple.others ||
      `<li>Trainers can allow students to complete homework and submit the next day</li>
`
  }
</ul>
`;
    const [content, setContent] = useState(initialValue);

    useEffect(() => {
        const dataObj = {};
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const headings = doc.querySelectorAll('h4');
        let title = ['training', 'pretest', 'marking', 'waiverCriteria', 'others'];
        headings.forEach((heading, index) => {
            let nextElement = heading.nextElementSibling;
            let htmlContent = '';
            while (nextElement && nextElement.tagName.toLowerCase() !== 'h4') {
                htmlContent += nextElement.outerHTML;
                nextElement = nextElement.nextElementSibling;
            }
            // dataObj[heading.textContent.trim()] = htmlContent;
            dataObj[title[index]] = htmlContent;
            // console.log(dataObj);
        });

        dispatch(updateTrainingPrinciple(dataObj));
        // console.log(dataObj);
    }, [content]);

    return (
        <div className="other-tab-create-editor">
            <h4 className="other-tab-create-editor__title-header">Training delivery principle</h4>
            <div className="other-tab-create-editor_contenteditable">
                <WordEditor
                    height={'500px'}
                    content={content}
                    setContent={setContent}
                />
            </div>
        </div>
    );
}

export default TrainingPrinciple;
