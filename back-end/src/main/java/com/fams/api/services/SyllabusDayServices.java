package com.fams.api.services;

import com.fams.api.dto.SyllabusDayDTO;
import com.fams.api.entity.SyllabusDay;
import com.fams.api.mapper.SyllabusDayMapper;
import com.fams.api.repository.SyllabusDayRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class SyllabusDayServices implements BaseServices<SyllabusDayDTO>{
    private SyllabusDayRepo syllabusDayRepo;
    private final SyllabusDayMapper syllabusDayMapper;

    @Override
    public SyllabusDayDTO create(SyllabusDayDTO syllabusDayDTO) {
        SyllabusDay syllabusDay = syllabusDayMapper.toSyllabusDay(syllabusDayDTO);
        SyllabusDay savedSyllabus = syllabusDayRepo.insert(syllabusDay);
        SyllabusDayDTO savedSyllabusDTO = syllabusDayMapper.toSyllabusDayDTO(savedSyllabus);
        return savedSyllabusDTO;
    }

    @Override
    public List<SyllabusDayDTO> findAll() {
        List<SyllabusDay> syllabusDay = syllabusDayRepo.findAll();
        return syllabusDay.stream().map(syllabusDayMapper::toSyllabusDayDTO).toList();
    }

    @Override
    public SyllabusDayDTO findByID(String id) {
        Optional<SyllabusDay> syllabusDayToFind = syllabusDayRepo.findById(id);
        if (syllabusDayToFind.isPresent())
        {
            SyllabusDay result = syllabusDayToFind.get();
            return syllabusDayMapper.toSyllabusDayDTO(result);
        }
        else {
            return null;
        }
    }

    @Override
    public SyllabusDayDTO update(SyllabusDayDTO syllabusDayDTO) {
        Optional<SyllabusDay> isFound = syllabusDayRepo.findById(syllabusDayDTO.getId());
        if (isFound.isPresent()) {
            SyllabusDay result = syllabusDayRepo.save(syllabusDayMapper.toSyllabusDay(syllabusDayDTO));
            return syllabusDayMapper.toSyllabusDayDTO(result);
        }
        else {
            return null;
        }
    }

    @Override
    public void delete(String id) {
        syllabusDayRepo.deleteById(id);
    }

    @Override
    public void deleteAll() {
        syllabusDayRepo.deleteAll();
    }
}
