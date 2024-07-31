package com.fams.api.dto.createData;

import com.fams.api.entity.UnitChapter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UnitCreate {
    String unitId;
    String unitName;
    List<UnitChapter> unitChapters;
}
