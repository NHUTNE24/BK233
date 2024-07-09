package com.fams.api.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class ClassDTO {
    private String id;
    private String createdBy;
    private LocalDateTime createdDate;
    private String updatedBy;
    private LocalDateTime updatedDate;
    private String classStatus;
    private String classCode;
    private int duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String approvedBy;
    private LocalDateTime approvedDate;
    private String reviewBy;
    private LocalDateTime reviewDate;
    private int acceptedAttendee;
    private int actualAttendee;
    private String className;
    private int plannedAttendee;
    private String slotTime;
    
    private String fsuId;
    private String locationId;
    private String attendeeLevelId;
    private String trainingProgramCode;
}
