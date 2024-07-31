export const validateBasicInfo = (basicInfo) => {
    const check = basicInfo.syllabusName && basicInfo.code && basicInfo.version;
    return check ? true : false;
};

export const validateGeneral = (general) => {
    // console.log(general);
    const listAttr = Object.keys(general);
    for (let i = 0; i < listAttr.length; i++) {
        if (!general[listAttr[i]] || general[listAttr[i]]?.length === 0) {
            return false;
        }
    }
    return true;
};

export const validateSyllabusDays = (syllabusDays) => {
    // Example validation logic for syllabusDays
    return syllabusDays.length > 0 && syllabusDays.every((day) => day.syllabusUnits.length > 0);
};

export const validateAssessmentSchema = (errorSection, schema) => {
    let response = {
        status: true,
        errorSection: [...errorSection],
    };

    if (schema.quiz + schema.assignment + schema.finalAssessment !== 100) {
        if (!(response.errorSection || []).some((element) => element === 'assessment-schema')) {
            response.errorSection = [...response.errorSection, 'assessment-schema'];
        }
    } else {
        if (response.errorSection?.some((element) => element === 'assessment-schema')) {
            response.errorSection = response.errorSection?.filter((item) => item !== 'assessment-schema');
        }
    }
    if (schema.finalTheory + schema.finalPractice !== 100) {
        if (!(response.errorSection || []).some((element) => element === 'final-schema')) {
            response.errorSection = [...response.errorSection, 'final-schema'];
        }
    } else {
        if (response.errorSection?.some((element) => element === 'final-schema')) {
            response.errorSection = response.errorSection?.filter((item) => item !== 'final-schema');
        }
    }

    if (schema.gpa < 0 || schema.gpa > 4.0) {
        // if (!(response.errorSection || []).some((element) => element === 'gpa')) {
        //     response.errorSection = [...response.errorSection, 'gpa'];
        // }
        if (!response.errorSection.includes('gpa')) {
            response.errorSection = [...response.errorSection, 'gpa'];
        }
    } else {
        if (response.errorSection.includes('gpa')) {
            response.errorSection = response.errorSection?.filter((item) => item !== 'gpa');
        }
    }
    if (response.errorSection.length > 0) response.status = false;

    return response;
};

export const validateTrainingPrinciple = (trainingPrinciple) => {
    const listAttr = Object.keys(trainingPrinciple);
    for (let i = 0; i < listAttr.length; i++) {
        if (!trainingPrinciple[listAttr[i]] || trainingPrinciple[listAttr[i]]?.length === 0) {
            return false;
        }
    }
    return true;
};
