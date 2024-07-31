package com.fams.api.dto;

import com.fams.api.entity.Syllabus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class SyllabusListDTO {
    private Boolean lastPage;
    private Integer page;
    private Integer pageSize;
    private Integer totalElements;
    private Integer totalPages;
    private List<Syllabus> content;
}
