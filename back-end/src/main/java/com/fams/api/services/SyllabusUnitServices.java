package com.fams.api.services;

import com.fams.api.dto.SyllabusUnitDTO;
import com.fams.api.entity.SyllabusUnit;
import com.fams.api.mapper.SyllabusUnitMapper;
import com.fams.api.repository.SyllabusUnitRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class SyllabusUnitServices implements BaseServices<SyllabusUnitDTO>{
    private SyllabusUnitRepo syllabusUnitRepo;
    private final SyllabusUnitMapper syllabusUnitMapper;

    @Override
    public SyllabusUnitDTO create(SyllabusUnitDTO syllabusUnitDTO) {
        SyllabusUnit syllabusUnit = syllabusUnitMapper.toEntity(syllabusUnitDTO);
        SyllabusUnit savedSyllabus = syllabusUnitRepo.insert(syllabusUnit);
        SyllabusUnitDTO savedSyllabusDTO = syllabusUnitMapper.toDTO(savedSyllabus);
        return savedSyllabusDTO;
    }

    @Override
    public List<SyllabusUnitDTO> findAll() {
        List<SyllabusUnit> syllabusUnit = syllabusUnitRepo.findAll();
        return syllabusUnit.stream().map(syllabusUnitMapper::toDTO).toList();
    }

    @Override
    public SyllabusUnitDTO findByID(String id) {
        Optional<SyllabusUnit> syllabusUnitToFind = syllabusUnitRepo.findById(id);
        if (syllabusUnitToFind.isPresent())
        {
            SyllabusUnit result = syllabusUnitToFind.get();
            return syllabusUnitMapper.toDTO(result);
        }
        else {
            return null;
        }
    }

    @Override
    public SyllabusUnitDTO update(SyllabusUnitDTO syllabusUnitDTO) {
        Optional<SyllabusUnit> isFound = syllabusUnitRepo.findById(syllabusUnitDTO.getId());
        if (isFound.isPresent()) {
            SyllabusUnit result = syllabusUnitRepo.save(syllabusUnitMapper.toEntity(syllabusUnitDTO));
            return syllabusUnitMapper.toDTO(result);
        }
        else {
            return null;
        }
    }

    @Override
    public void delete(String id) {
        syllabusUnitRepo.deleteById(id);
    }

    @Override
    public void deleteAll() {
        syllabusUnitRepo.deleteAll();
    }
}
