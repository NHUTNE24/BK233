package com.fams.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fams.api.entity.UnitChapter;
import com.fams.api.services.UnitChapterService;

@RestController
@RequestMapping("/api/unit-chapters")
public class UnitChapterController {
    
    private final UnitChapterService unitChapterService;

    @Autowired
    public UnitChapterController(UnitChapterService unitChapterService) {
        this.unitChapterService = unitChapterService;
    }
    
    //Get all unit chapters
    @GetMapping
    public ResponseEntity<List<UnitChapter>> getAllUnitChapters() {
        List<UnitChapter> allUnitChapters = unitChapterService.getAllUnitChapters();
        return new ResponseEntity<>(allUnitChapters, HttpStatus.OK);
    }

    //Add an unit chapter
    @PostMapping
    public ResponseEntity<?> addUnitChapter(@RequestBody UnitChapter unitChapter) {
        try {
            UnitChapter newUnitChapter = unitChapterService.addUnitChapter(unitChapter);
            return new ResponseEntity<>(newUnitChapter, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        
    }

    //Update an existing unit chapter
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUnitChapter(@PathVariable String id, @RequestBody UnitChapter updatedUnitChapter) {
        try {
            UnitChapter unitChapter = unitChapterService.updateUnitChapter(id, updatedUnitChapter);
            return new ResponseEntity<>(unitChapter, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //Delete an unit chapter
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUnitChapterById(@PathVariable String id) {
        try {
            unitChapterService.deleteUnitChapter(id);
            return new ResponseEntity<>("Unit chapter has been deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //Get a specific unit chapter
    @GetMapping("/{id}")
    public ResponseEntity<?> getUnitChapterById(@PathVariable String id) {
        try {
            UnitChapter unitChapter = unitChapterService.getUnitChapterById(id);
            return new ResponseEntity<>(unitChapter, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
