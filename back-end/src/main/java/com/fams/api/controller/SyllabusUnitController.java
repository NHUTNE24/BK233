package com.fams.api.controller;

import com.fams.api.dto.SyllabusUnitDTO;
import com.fams.api.services.SyllabusUnitServices;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("api/syllabusUnit")
public class SyllabusUnitController {
    private final SyllabusUnitServices syllabusUnitService;

    @GetMapping
    public ResponseEntity<List<SyllabusUnitDTO>> findAllSyllabusUnits() {
        List<SyllabusUnitDTO> syllabusUnitDTOList = syllabusUnitService.findAll();
        return new ResponseEntity<>(syllabusUnitDTOList, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<SyllabusUnitDTO> findById(@PathVariable String id) {
        SyllabusUnitDTO syllabusUnitDTO = syllabusUnitService.findByID(id);
        return new ResponseEntity<>(syllabusUnitDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SyllabusUnitDTO> insertSyllabusUnit(@RequestBody SyllabusUnitDTO syllabusUnitDTO) {
        SyllabusUnitDTO newSyllabusUnit = syllabusUnitService.create(syllabusUnitDTO);
        return new ResponseEntity<>(newSyllabusUnit, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        syllabusUnitService.delete(id);
        return new ResponseEntity<>("Deleted successful", HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<SyllabusUnitDTO> update(@PathVariable String id, @RequestBody SyllabusUnitDTO syllabusUnitDTO) {
        syllabusUnitDTO.setId(id);
        SyllabusUnitDTO updateEntity = syllabusUnitService.update(syllabusUnitDTO);
        return new ResponseEntity<>(updateEntity, HttpStatus.OK);
    }
}
