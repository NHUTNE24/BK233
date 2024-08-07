package com.fams.api.services;

import com.fams.api.dto.AdminDTO;
import com.fams.api.entity.Admin;
import com.fams.api.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<AdminDTO> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        return admins.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public AdminDTO getAdminById(String id) {
        Optional<Admin> admin = adminRepository.findById(id);
        return admin.map(this::convertToDTO).orElse(null);
    }

    public AdminDTO createAdmin(AdminDTO adminDTO) {
        Admin admin = new Admin(adminDTO.getId(), adminDTO.getName(), adminDTO.getEmail());
        admin = adminRepository.save(admin);
        return convertToDTO(admin);
    }

    public AdminDTO updateAdmin(String id, AdminDTO adminDTO) {
        Optional<Admin> adminOptional = adminRepository.findById(id);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            admin.setName(adminDTO.getName());
            admin.setEmail(adminDTO.getEmail());
            admin = adminRepository.save(admin);
            return convertToDTO(admin);
        } else {
            return null;
        }
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }

    private AdminDTO convertToDTO(Admin admin) {
        return new AdminDTO(admin.getId(), admin.getName(), admin.getEmail());
    }
}
