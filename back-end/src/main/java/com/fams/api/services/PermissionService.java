package com.fams.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fams.api.entity.Permission;
import com.fams.api.repository.PermissionRepository;

@Service
public class PermissionService implements BaseServices<Permission> {
    @Autowired
    private PermissionRepository permissionRepository;
    
    public Permission create(Permission permission) {
        return permissionRepository.save(permission);
    }

    public Permission update(Permission changedPermission) {
        Optional<Permission> optionalPermission = permissionRepository.findById(changedPermission.getId());
        if(optionalPermission.isPresent()) {
            Permission permission = optionalPermission.get();
            permission.setName(changedPermission.getName());
            permission = permissionRepository.save(permission);
            return permission;
        } else {
            throw new IllegalStateException("No permission with id" + changedPermission.getId() + " found");
        }
    }

    public Permission findByID(String id) {
        Optional<Permission> optionalPermission = permissionRepository.findById(id);
        if(optionalPermission.isPresent())
        {
            return optionalPermission.get();
        }
        else
        {
            throw new IllegalStateException("No permission with id" + id + " found");
        }
    }

    public List<Permission> findAll() {
        return permissionRepository.findAll();
    }

    public void delete(String id) {
        permissionRepository.deleteById(id);
    }

    public void deleteAll() {
        permissionRepository.deleteAll();
    }
}
