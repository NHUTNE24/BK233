package com.fams.api.dto.createData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class GeneralInfo {
    String level;
    Integer attendeeNumber;
    String technicalContent;
    String courseContent;
}
