package com.fams.api.services;

import com.fams.api.dto.ModuleDTO;
import com.fams.api.entity.Module;
import com.fams.api.mapper.ModuleMapper;
import com.fams.api.repository.ModuleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ModuleService implements BaseServices<ModuleDTO> {

    private ModuleRepository moduleRepository;
    private final ModuleMapper moduleMapper;

    //Get all modules
    public List<ModuleDTO> findAll() {
        List<Module> modules = moduleRepository.findAll();
        return modules.stream().map(moduleMapper::toDTO).toList();
    }

    //Add a module
    public ModuleDTO create(ModuleDTO moduleDTO) {
        Module module = moduleMapper.toEntity(moduleDTO);
        Module savedModule = moduleRepository.insert(module);
        ModuleDTO savedModuleDTO = moduleMapper.toDTO(savedModule);
        return savedModuleDTO;
    }

    //Update an existing module
    public ModuleDTO update(ModuleDTO moduleDTO) {
        Module updatedModule = moduleRepository.findById(moduleDTO.getId()).get();
        return moduleRepository.findById(updatedModule.getId()).map(module -> {
            if (updatedModule.getModuleName() != null) module.setModuleName(updatedModule.getModuleName());
            if (updatedModule.getCreatedDate() != null) module.setCreatedDate(updatedModule.getCreatedDate());
            if (updatedModule.getCreatedBy() != null) module.setCreatedBy(updatedModule.getCreatedBy());
            if (updatedModule.getUpdatedDate() != null) module.setUpdatedDate(updatedModule.getUpdatedDate());
            if (updatedModule.getUpdatedBy() != null) module.setUpdatedBy(updatedModule.getUpdatedBy());
            return moduleMapper.toDTO(moduleRepository.save(module));
        }).orElseThrow(() -> new RuntimeException("Module not found with id " + updatedModule.getId()));
    }

    //Delete a module by ID
    public void delete(String id) {
        if (moduleRepository.findById(id).isPresent())
            moduleRepository.deleteById(id);
        else throw new RuntimeException("Module not found with id " + id);
    }

    // Delete all modules
    public void deleteAll() {
        moduleRepository.deleteAll();
    }

    //Get a specific module by id
    public ModuleDTO findByID(String id) {
        Optional<Module> module = moduleRepository.findById(id);
        if (module.isPresent()) {
            return moduleMapper.toDTO(module.get());
        } else {
            throw new RuntimeException("Module not found with id " + id);
        }
    }
}
