package com.fams.api.controller;

import com.fams.api.dto.FsuDTO;
import com.fams.api.services.FsuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fsu")
public class FsuController {

    @Autowired
    private FsuService fsuService;

    @GetMapping
    public ResponseEntity<List<FsuDTO>> getAllFsu() {
        return ResponseEntity.ok(fsuService.getAllFsu());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FsuDTO> getFsuById(@PathVariable String id) {
        FsuDTO fsuDTO = fsuService.getFsuById(id);
        if (fsuDTO != null) {
            return ResponseEntity.ok(fsuDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<FsuDTO> createFsu(@RequestBody FsuDTO fsuDTO) {
        return ResponseEntity.ok(fsuService.createFsu(fsuDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FsuDTO> updateFsu(@PathVariable String id, @RequestBody FsuDTO fsuDTO) {
        FsuDTO updatedFsu = fsuService.updateFsu(id, fsuDTO);
        if (updatedFsu != null) {
            return ResponseEntity.ok(updatedFsu);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFsu(@PathVariable String id) {
        fsuService.deleteFsu(id);
        return ResponseEntity.noContent().build();
    }
}
