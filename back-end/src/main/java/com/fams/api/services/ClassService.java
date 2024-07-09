package com.fams.api.services;

import com.fams.api.entity.Class;
import com.fams.api.repository.ClassRepository;

import lombok.AllArgsConstructor;

import com.fams.api.dto.ClassDTO;
import com.fams.api.mapper.ClassMapper;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ClassService implements BaseServices<ClassDTO> {
    private ClassRepository classRepository;

    @Override
    public ClassDTO create(ClassDTO classDTO) {
        Class classEntity = ClassMapper.INSTANCE.toEntity(classDTO);
        Class savedClass = classRepository.save(classEntity);
        return ClassMapper.INSTANCE.toDTO(savedClass);
    }

    @Override
    public ClassDTO findByID(String id) {
        Class classEntity = classRepository.findById(id).orElse(null);
        return classEntity != null ? ClassMapper.INSTANCE.toDTO(classEntity) : null;
    }

    @Override
    public List<ClassDTO> findAll() {
        return classRepository.findAll().stream()
                .map(ClassMapper.INSTANCE::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClassDTO update(ClassDTO classDetails) {
        Class classEntity = classRepository.findById(classDetails.getId()).orElse(null);

        if (classEntity != null) {
            classEntity.setId(classDetails.getId());
            classEntity.setCreatedBy(classDetails.getCreatedBy());
            classEntity.setCreatedDate(classDetails.getCreatedDate());
            classEntity.setUpdatedBy(classDetails.getUpdatedBy());
            classEntity.setUpdatedDate(classDetails.getUpdatedDate());
            classEntity.setClassStatus(classDetails.getClassStatus());
            classEntity.setClassCode(classDetails.getClassCode());
            classEntity.setDuration(classDetails.getDuration());
            classEntity.setStartDate(classDetails.getStartDate());
            classEntity.setEndDate(classDetails.getEndDate());
            classEntity.setStartTime(classDetails.getStartTime());
            classEntity.setEndTime(classDetails.getEndTime());
            classEntity.setApprovedBy(classDetails.getApprovedBy());
            classEntity.setApprovedDate(classDetails.getApprovedDate());
            classEntity.setReviewBy(classDetails.getReviewBy());
            classEntity.setReviewDate(classDetails.getReviewDate());
            classEntity.setAcceptedAttendee(classDetails.getAcceptedAttendee());
            classEntity.setActualAttendee(classDetails.getActualAttendee());
            classEntity.setClassName(classDetails.getClassName());
            classEntity.setFsuId(classDetails.getFsuId());
            classEntity.setLocationId(classDetails.getLocationId());
            classEntity.setAttendeeLevelId(classDetails.getAttendeeLevelId());
            classEntity.setTrainingProgramCode(classDetails.getTrainingProgramCode());
            classEntity.setPlannedAttendee(classDetails.getPlannedAttendee());
            classEntity.setSlotTime(classDetails.getSlotTime());
            Class updatedClass = classRepository.save(classEntity);
            return ClassMapper.INSTANCE.toDTO(updatedClass);
        }
        return null;
    }

    @Override
    public void delete(String id) {
        classRepository.deleteById(id);
    }
    
    @Override
    public void deleteAll() {
        classRepository.deleteAll();
    }
}
