package com.fams.api.mapper;

import com.fams.api.dto.SyllabusCreateDTO;
import com.fams.api.dto.SyllabusDetailDTO;

public interface DetailMapper {
    SyllabusDetailDTO toDetailDTO(SyllabusCreateDTO syllabusCreateDTO);
}
