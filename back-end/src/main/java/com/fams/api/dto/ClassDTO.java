package com.fams.api.dto;

import com.opencsv.bean.CsvBindByName;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class ClassDTO {
    private String id;

    @CsvBindByName(column = "Created By")
    private String createdBy;

    @CsvBindByName(column = "Created On")
    private LocalDateTime createdDate;

    private String updatedBy;
    private LocalDateTime updatedDate;
    private String classStatus;

    @CsvBindByName(column = "Class Code")
    private String classCode;

    @CsvBindByName(column = "Duration")
    private int duration;

    @CsvBindByName(column = "Class Name")
    private String className;

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
    private int plannedAttendee;
    private String slotTime;

    private String fsuId;

    @CsvBindByName(column = "FSU Name")
    private String fsuName;

    private String locationId;

    @CsvBindByName(column = "Location Name")
    private String locationName;

    private String attendeeTypeId;

    @CsvBindByName(column = "Attendee Name")
    private String attendeeTypeName;

    private String adminId;
    // private String trainingProgramCode;
    private List<String> trainingProgramCode;
    private String adminName;
    private String adminMail;
}
