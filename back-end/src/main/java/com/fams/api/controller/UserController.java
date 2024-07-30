package com.fams.api.controller;

import java.util.List;

import com.fams.api.entity.UserRole;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.fams.api.entity.UserModel;

import com.fams.api.services.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasAuthority('VIEW_USER')")
    @GetMapping
    public ResponseEntity<List<UserModel>> getAllUsers() {
        try {
            List<UserModel> users = userService.findAll();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('VIEW_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable String id) {
        UserModel user = userService.findByID(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('Admin') and hasAuthority('MODIFY_USER')")
    @PutMapping("/{id}")
    public ResponseEntity<UserModel> updateUser(@PathVariable String id, @RequestBody UserModel user) {
        try {
            UserModel updatedUser = userService.update(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // @PreAuthorize("hasRole('Admin') and hasPermission('Modify', 'user')")
    // @PostMapping("/user/{email}")
    // public void changeToAdmin(@PathVariable String email) {
    //     userService.findByEmail(email).ifPresent(userEntity -> {
    //         userEntity.setRole(UserRole.ROLE_ADMIN);
    //         userService.save(userEntity);
    //     });
    // }
    @PreAuthorize("hasRole('Admin') and hasAuthority('MODIFY_USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        try {
            userService.delete(id);
            return new ResponseEntity<>("User has been delete successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("User hasn't been delete.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
