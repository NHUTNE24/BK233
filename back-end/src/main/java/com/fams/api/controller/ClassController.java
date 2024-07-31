package com.fams.api.controller;

import com.fams.api.dto.ClassDTO;
import com.fams.api.services.ClassService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/classes")
public class ClassController {
    private final ClassService classService;


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
