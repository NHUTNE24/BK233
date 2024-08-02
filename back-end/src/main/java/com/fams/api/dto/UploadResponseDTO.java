package com.fams.api.dto;

public class UploadResponseDTO {

    private String url;
    private String publicId;

    public UploadResponseDTO(String url, String publicId) {
        this.url = url;
        this.publicId = publicId;
    }

    public String getUrl() {
        return url;
    }

    public String getPublicId() {
        return publicId;
    }
}
