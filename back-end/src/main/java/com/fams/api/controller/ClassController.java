package com.fams.api.controller;

import com.fams.api.dto.ClassDTO;
import com.fams.api.dto.SyllabusDTO;

import com.fams.api.dto.TrainingProgramDetailDTO;
import com.fams.api.dto.TrainingProgramDto;
import com.fams.api.entity.TrainingProgram;
import com.fams.api.services.ClassService;

import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.opencsv.ICSVWriter.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/classes")
public class ClassController {
    private final ClassService classService;

    @GetMapping("/export")
    public void exportToCsv(HttpServletResponse response) throws IOException, CsvRequiredFieldEmptyException, CsvDataTypeMismatchException {
        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=class-export.csv");
        response.setCharacterEncoding("UTF-8");

        List<ClassDTO> classDTOList = classService.findAllForExport();

        try {
            StatefulBeanToCsv<ClassDTO> beanWriter = new StatefulBeanToCsvBuilder<ClassDTO>(response.getWriter())
                    .withSeparator(DEFAULT_SEPARATOR)
                    .withQuotechar(NO_QUOTE_CHARACTER)
                    .withEscapechar(DEFAULT_ESCAPE_CHARACTER)
                    .withLineEnd(DEFAULT_LINE_END)
                    .withOrderedResults(false)
                    .build();
            beanWriter.write(classDTOList);
        } catch (CsvDataTypeMismatchException | CsvRequiredFieldEmptyException e) {
            throw new RuntimeException("Fail to export/" + e.getMessage(), e);
        }
    }

    @GetMapping("/training-programs")
    public ResponseEntity<List<TrainingProgramDetailDTO>> getTrainingProgramDetailList() {
        List<TrainingProgramDetailDTO> trainingProgramDetailList  = classService.getTrainingProgramDetailList();
        return ResponseEntity.ok(trainingProgramDetailList);
    }

    @GetMapping("/training-programs/{id}")
    public ResponseEntity<TrainingProgramDetailDTO> getTrainingProgramsDetailByClassId(@PathVariable String id) {
        TrainingProgramDetailDTO trainingProgramDetail  = classService.getTrainingProgramDetailByClassId(id);
        return ResponseEntity.ok(trainingProgramDetail);
    }
    @GetMapping("/{id}/training-programs")
    public ResponseEntity<List<TrainingProgramDetailDTO>> getTrainingProgramDetailListByClassId(@PathVariable String id) {
        List<TrainingProgramDetailDTO> trainingProgramDetailList = classService.getTrainingProgramDetailListByClassId(id);
        return ResponseEntity.ok(trainingProgramDetailList);
    }

    @GetMapping
    public List<ClassDTO> getAllClasses() {
        return classService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassDTO> getClassById(@PathVariable String id) {
        ClassDTO classDTO = classService.findByID(id);
        if (classDTO != null) {
            return ResponseEntity.ok(classDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ClassDTO createClass(@RequestBody ClassDTO classDTO) {
        return classService.create(classDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassDTO> updateClass(@PathVariable String id, @RequestBody ClassDTO classDetails) {
        classDetails.setId(id);
        ClassDTO updatedClass = classService.update(classDetails);
        if (updatedClass != null) {
            return ResponseEntity.ok(updatedClass);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClass(@PathVariable String id) {
        classService.delete(id);
        return new ResponseEntity<String>("delete ok", HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteAllClasses() {
        classService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}

