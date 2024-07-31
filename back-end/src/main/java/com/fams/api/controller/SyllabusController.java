package com.fams.api.controller;

import com.fams.api.dto.*;
import com.fams.api.services.SyllabusDetailService;
import com.fams.api.services.SyllabusServices;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/syllabus")
public class SyllabusController {
  private final SyllabusServices syllabusServices;
  private final SyllabusDetailService syllabusDetailService;

  @GetMapping
  public ResponseEntity<List<SyllabusDTO>> findAllSyllabus() {
    List<SyllabusDTO> syllabi = syllabusServices.findAll();
    return new ResponseEntity<>(syllabi, HttpStatus.OK);
  }

  @GetMapping("/list")
  public ResponseEntity<?> getListSyllabus(
          @RequestParam Integer page,
          @RequestParam Integer pageSize,
          @RequestParam(value = "sortBy", required = false, defaultValue = "") String sortBy,
          @RequestParam(value = "order", required = false, defaultValue = "") String order
  ) {
    try {
      if (sortBy == "") sortBy = null;
      if (order == "") order = null;
      SyllabusListDTO syllabusList = syllabusDetailService.getSyllabusList(page, pageSize, sortBy, order);
      return new ResponseEntity<>(syllabusList, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/list/tags")
  public ResponseEntity<?> getSyllabusByTags(
          @RequestParam Integer page,
          @RequestParam Integer pageSize,
          @RequestParam(value = "tagList", required = false, defaultValue = "") List<String> tagList,
          @RequestParam(value = "dateStart", required = false, defaultValue = "") String dateStart,
          @RequestParam(value = "dateEnd", required = false, defaultValue = "") String dateEnd,
          @RequestParam(value = "sortBy", required = false, defaultValue = "") String sortBy,
          @RequestParam(value = "order", required = false, defaultValue = "") String order)
  {
    try {
      if (dateStart.isEmpty()) dateStart = null;
      if (dateEnd.isEmpty()) dateEnd = null;
      if (sortBy == "") sortBy = null;
      if (order == "") order = null;
      SyllabusListDTO syllabusList = syllabusDetailService.getSyllabusByTags(tagList, page, pageSize, dateStart, dateEnd, sortBy, order);
      return new ResponseEntity<>(syllabusList, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<SyllabusDetailDTO> findById(@PathVariable String id) {
    SyllabusDetailDTO syllabusDetailDTO = syllabusDetailService.getSyllabusDetail(id);
    return new ResponseEntity<>(syllabusDetailDTO, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<?> insertSyllabus(@RequestBody SyllabusCreateDTO syllabusCreateDTO) {
    SyllabusDetailDTO newSyllabus = syllabusDetailService.createSyllabusDetail(syllabusCreateDTO);
    return new ResponseEntity<>(newSyllabus, HttpStatus.CREATED);
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<String> deleteSyllabus(@PathVariable String id) {
    syllabusDetailService.deleteSyllabusDetail(id);
    return new ResponseEntity<>("Syllabus has been successfully deleted!", HttpStatus.OK);
  }

  @PutMapping(path = "/{id}")
  public ResponseEntity<?> updateSyllabus(@PathVariable String id, @RequestBody SyllabusCreateDTO syllabusCreateDTO) {
    SyllabusDetailDTO updatedSyllabusDTO = syllabusDetailService.updateSyllabusDetail(id, syllabusCreateDTO);
    return new ResponseEntity<>(updatedSyllabusDTO, HttpStatus.OK);
  }

  @PostMapping(path = "/duplicate/{id}")
  public ResponseEntity<?> duplicateSyllabus(@PathVariable String id) {
    SyllabusDetailDTO duplicatedSyllabus = syllabusDetailService.duplicateSyllabus(id);
    return new ResponseEntity<>(duplicatedSyllabus, HttpStatus.OK);
  }

  @PostMapping(path = "/import")
  public ResponseEntity<?> importSyllabus(@RequestBody ImportSyllabusDTO importSyllabusDTO) {
    String userName = importSyllabusDTO.getUserName();
    List<SyllabusDTO> syllabusDTOList = importSyllabusDTO.getSyllabusDTOList();
    Boolean scanCode = importSyllabusDTO.getScanCode();
    Boolean scanName = importSyllabusDTO.getScanName();
    String duplicateHandle = importSyllabusDTO.getDuplicateHandle();
    String status = syllabusDetailService.importSyllabus(userName, syllabusDTOList, scanCode, scanName, duplicateHandle);
    return new ResponseEntity<>(status, HttpStatus.OK);
  }
}
