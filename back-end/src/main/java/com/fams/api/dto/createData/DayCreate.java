package com.fams.api.dto.createData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class DayCreate {
    String dayId;
    List<UnitCreate> syllabusUnits;
}
