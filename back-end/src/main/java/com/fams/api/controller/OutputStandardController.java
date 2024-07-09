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

import com.fams.api.entity.OutputStandard;
import com.fams.api.services.OutputStandardService;

@RestController
@RequestMapping("/api/output-standards")
public class OutputStandardController {
    
    private final OutputStandardService outputStandardService;

    @Autowired
    public OutputStandardController(OutputStandardService outputStandardService) {
        this.outputStandardService = outputStandardService;
    }

    //Get all output standards
    @GetMapping
    public ResponseEntity<List<OutputStandard>> getAllOutputStandards() {
        List<OutputStandard> allOutputStandards = outputStandardService.getAllOutputStandards();
        return new ResponseEntity<>(allOutputStandards, HttpStatus.OK);
    }

    //Add an output standard
    @PostMapping
    public ResponseEntity<OutputStandard> addOutputStandard(@RequestBody OutputStandard outputStandard) {
        OutputStandard newOutputStandard = outputStandardService.addOutputStandard(outputStandard);
        return new ResponseEntity<>(newOutputStandard, HttpStatus.CREATED);
    }

    //Update an existing output standard
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOutputStandard(@PathVariable String id, @RequestBody OutputStandard outputStandard) {
        try {
            OutputStandard updatedOutputStandard = outputStandardService.updateOutputStandard(id, outputStandard);
            return new ResponseEntity<>(updatedOutputStandard, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //Delete an output standard by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOutputStandard(@PathVariable String id) {
        try {
            outputStandardService.deleteOutputStandard(id);
            return new ResponseEntity<>("Output standard has been deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //Get an output standard by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getOutputStandardById(@PathVariable String id) {
        try {
            OutputStandard outputStandard = outputStandardService.getOutputStandardById(id);
            return new ResponseEntity<>(outputStandard, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
