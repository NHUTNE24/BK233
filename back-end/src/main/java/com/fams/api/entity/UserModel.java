package com.fams.api.entity;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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

}
