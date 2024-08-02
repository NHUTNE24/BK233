package com.fams.api.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public InputStream downloadFile(String publicId) throws Exception {
        Map<String, String> resource = cloudinary.api().resource(publicId, ObjectUtils.emptyMap());
        String url = resource.get("secure_url");

        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        return connection.getInputStream();
    }

    public Map uploadFile(MultipartFile file) throws IOException {
        Map options = ObjectUtils.asMap(
                "resource_type", "auto"
        );

        return cloudinary.uploader().upload(file.getBytes(), options);
    }

    public Map<String, ?> deleteFile(String publicId) throws Exception {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
