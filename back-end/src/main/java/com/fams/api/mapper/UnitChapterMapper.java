package com.fams.api.mapper;

import com.fams.api.dto.UnitChapterDTO;
import com.fams.api.entity.UnitChapter;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UnitChapterMapper {
    UnitChapter toEntity(UnitChapterDTO unitChapterDTO);
    UnitChapterDTO toDTO(UnitChapter unitChapter);
}
