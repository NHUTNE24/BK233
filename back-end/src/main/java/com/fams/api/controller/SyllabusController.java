package com.fams.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fams.api.dto.SyllabusDTO;
import com.fams.api.services.SyllabusServices;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/syllabus")
public class SyllabusController {
  private final SyllabusServices syllabusServices;

  @GetMapping
  public ResponseEntity<List<SyllabusDTO>> findAllSyllabus() {
    List<SyllabusDTO> syllabi = syllabusServices.findAll();
    return new ResponseEntity<>(syllabi, HttpStatus.OK);
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<SyllabusDTO> findById(@PathVariable String id) {
    SyllabusDTO syllabusDTO = syllabusServices.findByID(id);
    return new ResponseEntity<>(syllabusDTO, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<SyllabusDTO> insertSyllabus(@RequestBody SyllabusDTO syllabusDto) {
    SyllabusDTO newSyllabus = syllabusServices.create(syllabusDto);
    return new ResponseEntity<>(newSyllabus, HttpStatus.CREATED);
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<String> deleteSyllabus(@PathVariable String id) {
    syllabusServices.delete(id);
    return new ResponseEntity<>("Syllabus has been successfully deleted!", HttpStatus.OK);
  }

  @PutMapping(path = "/{id}")
  public ResponseEntity<SyllabusDTO> updateSyllabus(@PathVariable String id, @RequestBody SyllabusDTO syllabusDTO) {
    syllabusDTO.setId(id);
    SyllabusDTO updatedSyllabusDTO = syllabusServices.update(syllabusDTO);
    return new ResponseEntity<>(updatedSyllabusDTO, HttpStatus.OK);
  }
}
