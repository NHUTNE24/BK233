package com.fams.api.controller;

import com.fams.api.dto.SyllabusDayDTO;
import com.fams.api.services.SyllabusDayServices;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/syllabusDay")
public class SyllabusDayController {
    private final SyllabusDayServices syllabusDayService;

    @GetMapping
    public ResponseEntity<List<SyllabusDayDTO>> findAllSyllabusDays() {
        List<SyllabusDayDTO> syllabusDayDTOList = syllabusDayService.findAll();
        return new ResponseEntity<>(syllabusDayDTOList, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<SyllabusDayDTO> findById(@PathVariable String id) {
        SyllabusDayDTO syllabusDayDTO = syllabusDayService.findByID(id);
        return new ResponseEntity<>(syllabusDayDTO, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<SyllabusDayDTO> insertSyllabusDay(@RequestBody SyllabusDayDTO syllabusDayDTO) {
        SyllabusDayDTO newSyllabusDay = syllabusDayService.create(syllabusDayDTO);
        return new ResponseEntity<>(newSyllabusDay, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        syllabusDayService.delete(id);
        return new ResponseEntity<>("Deleted successful", HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<SyllabusDayDTO> update(@PathVariable String id, @RequestBody SyllabusDayDTO syllabusDayDTO) {
        syllabusDayDTO.setId(id);
        SyllabusDayDTO updateEntity = syllabusDayService.update(syllabusDayDTO);
        return new ResponseEntity<>(updateEntity, HttpStatus.OK);
    }
}
