package com.fams.api.controller;

import com.fams.api.entity.Permission;
import com.fams.api.services.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @GetMapping
    public ResponseEntity<List<Permission>> getAllPermissions() {
        try {
            List<Permission> permissions = permissionService.findAll();
            return new ResponseEntity<>(permissions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Permission> getPermissionById(@PathVariable String id) {
        try {
            Permission permission = permissionService.findByID(id);
            return new ResponseEntity<>(permission, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Permission> createPermission(@RequestBody Permission permission) {
        try {
            Permission newPermission = permissionService.create(permission);
            return new ResponseEntity<>(newPermission, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePermissionById(@PathVariable String id) {
        try {
            permissionService.delete(id);
            return new ResponseEntity<>("Permission deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
