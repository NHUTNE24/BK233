//package com.fams.api.services;
//
//import com.cloudinary.Cloudinary;
//import com.cloudinary.utils.ObjectUtils;
//import com.fams.api.entity.TrainingMaterial;
//import com.fams.api.repository.TrainingMaterialRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.InputStreamResource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.net.URLConnection;
//import java.util.Map;
//
//@Service
//public class FileService {
//
//    private final Cloudinary cloudinary;
//    private final TrainingMaterialRepository trainingMaterialRepository;
//
//    @Autowired
//    public FileService(Cloudinary cloudinary, TrainingMaterialRepository trainingMaterialRepository) {
//        this.cloudinary = cloudinary;
//        this.trainingMaterialRepository = trainingMaterialRepository;
//    }
//
//    public ResponseEntity<InputStreamResource> downloadFile(String publicId) {
//        try {
//            TrainingMaterial trainingMaterial = trainingMaterialRepository.findById(publicId).get();
//            return downloadFileByUrl(trainingMaterial.getUrl());
//        } catch (Exception e) {
//            throw new RuntimeException("Training material not found: " + publicId);
//        }
//    }
//
//    public ResponseEntity<InputStreamResource> downloadFileByUrl(String fileUrl) {
//        try {
//            URL url = new URL(fileUrl);
//
//            URLConnection connection = url.openConnection();
//            InputStream inputStream = connection.getInputStream();
//
//            String fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
//
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                    .body(new InputStreamResource(inputStream));
//
//        } catch (MalformedURLException e) {
//            // incorrect URL format
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(null);
//        } catch (IOException e) {
//            // issues with opening connection or streaming file
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(null);
//        }
//    }
//
//    public Map uploadFile(MultipartFile file) throws IOException {
//        Map options = ObjectUtils.asMap(
//                "resource_type", "auto"
//        );
//
//        return cloudinary.uploader().upload(file.getBytes(), options);
//    }
//
//    public void deleteFile(String publicId) throws Exception {
//        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));
//        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "video"));
//        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "raw"));
//    }
//}
