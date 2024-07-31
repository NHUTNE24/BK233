package com.fams.api.controller;

import com.fams.api.dto.ModuleDTO;
import com.fams.api.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {
    
    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    //Get all modules
    @GetMapping
    public ResponseEntity<List<ModuleDTO>> getAllModules() {
        List<ModuleDTO> allModules = moduleService.findAll();
        return new ResponseEntity<>(allModules, HttpStatus.OK);
    }

    //Add a module
    @PostMapping
    public ResponseEntity<?> addModule(@RequestBody ModuleDTO moduleDTO) {
        ModuleDTO newModule = moduleService.create(moduleDTO);
        return new ResponseEntity<>(newModule, HttpStatus.CREATED);
    }

    //Update an existing module
    @PutMapping("/{id}")
    public ResponseEntity<?> updateModule(@PathVariable String id, @RequestBody ModuleDTO updatedModuleDTO) {
        try {
            ModuleDTO resultModule = moduleService.update(updatedModuleDTO);
            return new ResponseEntity<>(resultModule, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        
    }

    //Delete a module by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable String id) {
        try {
            moduleService.delete(id);
            return new ResponseEntity<>("Module has been deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        
    }

    //Get a specific module by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getModuleById(@PathVariable String id) {
        try {
            ModuleDTO module = moduleService.findByID(id);
            return new ResponseEntity<>(module, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
