import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ProgramDetailContext = createContext();

export const ProgramDetailProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [Syllabus, setSyllabus] = useState(null);
    const [syllabusDays, setSyllabusDays] = useState([]);
    const [syllabusUnits, setSyllabusUnits] = useState([[]]);
    const [unitChapters, setUnitChapters] = useState([[]]);
    const [outputStandards, setOutputStandards] = useState([]);
    const [deliveryTypes, setDeliveryTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <ProgramDetailContext.Provider
            value={{
                userName,
                setUserName,
                Syllabus,
                setSyllabus,
                syllabusDays,
                setSyllabusDays,
                syllabusUnits,
                setSyllabusUnits,
                unitChapters,
                setUnitChapters,
                outputStandards,
                setOutputStandards,
                deliveryTypes,
                setDeliveryTypes,
                loading,
                setLoading,
            }}
        >
            {children}
        </ProgramDetailContext.Provider>
    );
};

ProgramDetailProvider.propTypes = {
    children: PropTypes.node,
};
