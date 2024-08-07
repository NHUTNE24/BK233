package com.fams.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Document(collection = "class")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Class {
    @Id
    private String id;
    // private String location ;
    // private String attendee;
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
    private String attendeeTypeId;
    private List<String> trainingProgramCode;
    private String adminId;
}
