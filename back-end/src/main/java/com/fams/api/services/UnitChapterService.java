package com.fams.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fams.api.entity.UnitChapter;
import com.fams.api.repository.OutputStandardRepository;
import com.fams.api.repository.UnitChapterRepository;

@Service
public class UnitChapterService {
    private final UnitChapterRepository unitChapterRepository;
    private final OutputStandardRepository outputStandardRepository;
    //Còn syllabusUnit

    public UnitChapterService(UnitChapterRepository unitChapterRepository, OutputStandardRepository outputStandardRepository) {
        this.unitChapterRepository = unitChapterRepository;
        this.outputStandardRepository = outputStandardRepository;
        //Còn SyllabusUnit
    }

    //Get all unit chapters
    public List<UnitChapter> getAllUnitChapters() {
        return unitChapterRepository.findAll();
    }

    //Add an unit chapter
    public UnitChapter addUnitChapter(UnitChapter unitChapter){
        if (unitChapter.getOutputStandardId() != null && !unitChapter.getOutputStandardId().isEmpty()) {
            if (!outputStandardRepository.existsById(unitChapter.getOutputStandardId())) {
                throw new RuntimeException("Output Standard not found with id " + unitChapter.getOutputStandardId());
            }
        }
        //Còn SyllabusUnit
        return unitChapterRepository.insert(unitChapter);
    }

    //Update an existing unit chapter
    public UnitChapter updateUnitChapter(String id, UnitChapter updatedUnitChapter){
        return unitChapterRepository.findById(id).map(unitChapter -> {
            if (updatedUnitChapter.getCreatedBy() != null) unitChapter.setCreatedBy(updatedUnitChapter.getCreatedBy());
            if (updatedUnitChapter.getCreatedDate() != null) unitChapter.setCreatedDate(updatedUnitChapter.getCreatedDate());
            if (updatedUnitChapter.getModifiedBy() != null) unitChapter.setModifiedBy(updatedUnitChapter.getModifiedBy());
            if (updatedUnitChapter.getModifiedDate() != null) unitChapter.setModifiedDate(updatedUnitChapter.getModifiedDate());
            if (updatedUnitChapter.getName() != null) unitChapter.setName(updatedUnitChapter.getName());
            if (updatedUnitChapter.getChapterNo() != 0) unitChapter.setChapterNo(updatedUnitChapter.getChapterNo());
            if (updatedUnitChapter.getDuration() != 0) unitChapter.setDuration(updatedUnitChapter.getDuration());
            //Còn SyllabusUnit
            if (updatedUnitChapter.getOutputStandardId() != null && !updatedUnitChapter.getOutputStandardId().isEmpty()) {
                if (!outputStandardRepository.existsById(updatedUnitChapter.getOutputStandardId())) {
                    throw new RuntimeException("Output Standard not found with id " + updatedUnitChapter.getOutputStandardId());
                }
            } else {
                unitChapter.setOutputStandardId(updatedUnitChapter.getOutputStandardId());
            }
            return unitChapterRepository.save(unitChapter);
        }).orElseThrow(() -> new RuntimeException("Unit chapter not found with id " + id));
    }

    //Delete an unit chapter by id
    public void deleteUnitChapter(String id) {
        if (unitChapterRepository.findById(id).isPresent())
            unitChapterRepository.deleteById(id);
        else throw new RuntimeException("Unit chapter not found with id " + id);
    }

    //Get a specific unit chapter by id
    public UnitChapter getUnitChapterById(String id) {
        Optional<UnitChapter> unitChapter = unitChapterRepository.findById(id);
        if (unitChapter.isPresent()) {
            return unitChapter.get();
        } else {
            throw new RuntimeException("Unit chapter not found with id " + id);
        }    
    }
}
