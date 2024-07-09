package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class OutputStandardDTO {
    private String id;
    private String code;
    private String descriptions;
    private String name;
}