import { ProgramDetailProvider } from './ProgramDetailContext';
import TrainingProgramDetailLayout from './TrainingProgramDetailLayout';

const ProgramDetail = () => {
    return (
        <ProgramDetailProvider>
            <TrainingProgramDetailLayout />
        </ProgramDetailProvider>
    );
};

export default ProgramDetail;
