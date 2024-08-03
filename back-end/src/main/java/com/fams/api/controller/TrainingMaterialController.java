package com.fams.api.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.fams.api.entity.TrainingMaterial;
import com.fams.api.services.TrainingMaterialService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/training-materials")
public class TrainingMaterialController {

    private final TrainingMaterialService trainingMaterialService;
    private final Path rootLocation = Paths.get("uploads");
    public TrainingMaterialController(TrainingMaterialService trainingMaterialService) {
        this.trainingMaterialService = trainingMaterialService;
    }

    // Get all training materials
    @GetMapping
    public List<TrainingMaterial> getAllTrainingMaterials() {
        return trainingMaterialService.getAllTrainingMaterials();
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Resource resource = trainingMaterialService.loadFileAsResource(filename);
            String contentType = Files.probeContentType(Paths.get(resource.getURI()));

            if (contentType == null) {
                contentType = "application/octet-stream"; // Loại mặc định cho dữ liệu nhị phân
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType)) // Cập nhật loại nội dung đúng
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"") // sử dụng inline thay cho attachment để hiển thị trực tiếp
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/view/{filename:.+}")
    public ResponseEntity<Resource> viewFile(@PathVariable String filename) {
        try {
            Resource resource = trainingMaterialService.loadFileAsResource(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(Files.probeContentType(Paths.get(resource.getURI()))))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Add a training material

    @PostMapping("/upload/{chapterId}")
    public ResponseEntity<TrainingMaterial> uploadFile( @PathVariable String chapterId, @RequestParam("file") MultipartFile file) {
        TrainingMaterial uploadedFile = trainingMaterialService.addTrainingMaterial(file, chapterId);
        return ResponseEntity.ok(uploadedFile);
    }

    // Update an existing training material
    @PutMapping("/{trainingMaterialId}")
    public TrainingMaterial updateTrainingMaterial(@PathVariable String trainingMaterialId, @RequestBody TrainingMaterial updatedTrainingMaterial) {
        return trainingMaterialService.updateTrainingMaterial(trainingMaterialId, updatedTrainingMaterial);
    }

    // Delete a training material by ID
    @DeleteMapping("/{trainingMaterialId}")
    public void deleteTrainingMaterial(@PathVariable String trainingMaterialId) {
        trainingMaterialService.deleteTrainingMaterial(trainingMaterialId);
    }

    // Get a specific training material by ID
    @GetMapping("/{trainingMaterialId}")
    public TrainingMaterial getTrainingMaterialById(@PathVariable String trainingMaterialId) {
        return trainingMaterialService.getTrainingMaterialById(trainingMaterialId);
    }

    @GetMapping("/by-chapter/{unitChapterId}")
    public List<TrainingMaterial> getTrainingMaterialByChapterId(@PathVariable String unitChapterId) {
        return trainingMaterialService.getTrainingMaterialByChapter(unitChapterId);
    }
}