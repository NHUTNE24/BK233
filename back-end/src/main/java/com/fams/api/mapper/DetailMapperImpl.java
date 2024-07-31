package com.fams.api.mapper;

import com.fams.api.dto.SyllabusCreateDTO;
import com.fams.api.dto.SyllabusDetailDTO;
import com.fams.api.dto.createData.DayCreate;
import com.fams.api.dto.createData.UnitCreate;
import com.fams.api.entity.Syllabus;
import com.fams.api.entity.SyllabusDay;
import com.fams.api.entity.SyllabusUnit;
import com.fams.api.entity.UnitChapter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DetailMapperImpl implements DetailMapper{
    @Override
    public SyllabusDetailDTO toDetailDTO(SyllabusCreateDTO item) {
        SyllabusDetailDTO result = new SyllabusDetailDTO();
        Syllabus syllabus = new Syllabus();
        syllabus.setTopicCode(item.getBasicInfo().getCode());
        syllabus.setTopicName(item.getBasicInfo().getSyllabusName());
        syllabus.setVersion(item.getBasicInfo().getVersion());
        syllabus.setLevel(item.getGeneral().getLevel());
        syllabus.setCourseObjective(item.getGeneral().getCourseContent());
        syllabus.setTechnicalRequirement(item.getGeneral().getTechnicalContent());
        syllabus.setStatus(item.getStatus());

        List<SyllabusDay> syllabusDays = new ArrayList<>();
        List<List<SyllabusUnit>> syllabusUnits = new ArrayList<>();
        List<List<UnitChapter>> unitChapters = new ArrayList<>();
        Integer dayNo = 0;
        for (DayCreate day : item.getSyllabusDay()) {
            SyllabusDay tempDay = new SyllabusDay();
            dayNo++;
            tempDay.setId(day.getDayId());
            tempDay.setDayNo(dayNo);

            Integer unitNo = 0;
            List<SyllabusUnit> tempUnits = new ArrayList<>();
            for (UnitCreate unit : day.getSyllabusUnits()) {
                SyllabusUnit syllabusUnit = new SyllabusUnit();
                unitNo++;
                syllabusUnit.setUnitNo(unitNo);
                syllabusUnit.setId(unit.getUnitId());
                syllabusUnit.setName(unit.getUnitName());

                Integer chapterNo = 0;
                List<UnitChapter> tempChapters = new ArrayList<>();
                for (UnitChapter chapter : unit.getUnitChapters()) {
                    chapterNo++;
                    chapter.setChapterNo(chapterNo);

                    tempChapters.add(chapter);
                }

                tempUnits.add(syllabusUnit);
                unitChapters.add(tempChapters);
            }

            syllabusDays.add(tempDay);
            syllabusUnits.add(tempUnits);
        }

        result.setSyllabus(syllabus);
        result.setUserName(item.getUserName());
        result.setSyllabusDays(syllabusDays);
        result.setSyllabusUnits(syllabusUnits);
        result.setUnitChapters(unitChapters);
        result.setAssignmentSchema(item.getAssignmentSchema());
        result.setTrainingDeliveryPrinciple(item.getTrainingPrinciple());

        return result;
    }
}
