package com.fams.api.mapper;

import com.fams.api.dto.SyllabusDayDTO;
import com.fams.api.entity.SyllabusDay;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SyllabusDayMapper {
    SyllabusDay toSyllabusDay(SyllabusDayDTO syllabusDayDTO);
    SyllabusDayDTO toSyllabusDayDTO(SyllabusDay syllabusDay);
}
