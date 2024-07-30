package com.fams.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fams.api.entity.Role;
import com.fams.api.repository.RoleRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class RoleService implements BaseServices<Role> {
    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role findByID(String id) {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return role.get();
        } else {
            throw new IllegalStateException("No role with id" + id + " found");
        }
    }

    public Role create(Role role) {
        return roleRepository.save(role);
    }

    public Role update(Role changedRole) {
        Optional<Role> optionalRole = roleRepository.findById(changedRole.getId());
        if (optionalRole.isPresent()) {
            Role role = optionalRole.get();
            role.setName(changedRole.getName());
            role.setSyllabusPermission(changedRole.getSyllabusPermission());
            role.setTrainingProgramPermission(changedRole.getTrainingProgramPermission());
            role.setClassPermission(changedRole.getClassPermission());
            role.setLearningMaterialPermission(changedRole.getLearningMaterialPermission());
            role.setUserPermission(changedRole.getUserPermission());
            role = roleRepository.save(role);
            return role;
        } else {
            throw new IllegalStateException("No role with id" + changedRole.getId() + " found");
        }
    }

    public void delete(String id) {
        roleRepository.deleteById(id);
    }

    public void deleteAll() {
        roleRepository.deleteAll();
    }
    public Role findRoleByName(String name) {
        Optional<Role> role = roleRepository.findByName(name);
        if (role.isPresent()) {
            return role.get();
        } else {
            throw new IllegalStateException("No role with id" + name + " found");
        }
    }
}
