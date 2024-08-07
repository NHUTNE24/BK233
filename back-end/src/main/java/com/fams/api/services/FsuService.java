package com.fams.api.services;

import com.fams.api.dto.FsuDTO;
import com.fams.api.entity.Fsu;
import com.fams.api.repository.FsuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FsuService {

    @Autowired
    private FsuRepository fsuRepository;

    public List<FsuDTO> getAllFsu() {
        List<Fsu> fsus = fsuRepository.findAll();
        return fsus.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public FsuDTO getFsuById(String id) {
        Optional<Fsu> fsu = fsuRepository.findById(id);
        return fsu.map(this::convertToDTO).orElse(null);
    }

    public FsuDTO createFsu(FsuDTO fsuDTO) {
        Fsu fsu = new Fsu(fsuDTO.getId(), fsuDTO.getName());
        fsu = fsuRepository.save(fsu);
        return convertToDTO(fsu);
    }

    public FsuDTO updateFsu(String id, FsuDTO fsuDTO) {
        Optional<Fsu> fsuOptional = fsuRepository.findById(id);
        if (fsuOptional.isPresent()) {
            Fsu fsu = fsuOptional.get();
            fsu.setName(fsuDTO.getName());
            fsu = fsuRepository.save(fsu);
            return convertToDTO(fsu);
        } else {
            return null;
        }
    }

    public void deleteFsu(String id) {
        fsuRepository.deleteById(id);
    }

    private FsuDTO convertToDTO(Fsu fsu) {
        return new FsuDTO(fsu.getId(), fsu.getName());
    }
}
