package com.fams.api.entity;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import com.mongodb.lang.NonNull;

@Data
@Builder
@Document(collection = "users")
public class UserModel {
    @Id
    private String id;

    @Indexed(unique = true)
    @NonNull
    private String email;

    @NonNull
    private String username;

    @NonNull
    private String password;

    @NonNull
    private String fullname;

    @NonNull
    private String phone;

    @NonNull
    private LocalDate dob;

    @NonNull
    private boolean gender;

    @NonNull
    private boolean status;
    private String urlAvatar;

    @DBRef
    private Role role;

    @Column(name = "source")
    @Enumerated(EnumType.STRING)
    private RegistrationSource source;

    public UserModel() {
        
    }

    public UserModel(String id, String email, String username, String password, String fullname, String phone,
                     LocalDate dob, boolean gender, boolean status, String urlAvatar, Role role , RegistrationSource source) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.phone = phone;
        this.dob = dob;
        this.gender = gender;
        this.status = status;
        this.urlAvatar = urlAvatar;
        this.role = role;
        this.source = source;
    }
}
