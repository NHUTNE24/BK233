package com.fams.api.mapper;

import org.mapstruct.Mapper;

import com.fams.api.dto.SyllabusDayDTO;
import com.fams.api.entity.SyllabusDay;

@Mapper(componentModel = "spring")
public interface SyllabusDayMapper {
    SyllabusDay toSyllabusDay(SyllabusDayDTO syllabusDayDTO);
    SyllabusDayDTO toSyllabusDayDTO(SyllabusDay syllabusDay);
}
