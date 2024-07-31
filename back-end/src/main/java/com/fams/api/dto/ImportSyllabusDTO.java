package com.fams.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ImportSyllabusDTO {
    public String userName;
    public List<SyllabusDTO> syllabusDTOList;
    public Boolean scanCode;
    public Boolean scanName;
    public String duplicateHandle;
}
