package com.fams.api.services;

import com.fams.api.dto.ClassDTO;
import com.fams.api.dto.SyllabusDTO;
import com.fams.api.dto.TrainingProgramDetail;
import com.fams.api.dto.TrainingProgramDto;
import com.fams.api.entity.Class;
import com.fams.api.entity.*;
import com.fams.api.mapper.ClassMapper;
import com.fams.api.mapper.SyllabusMapper;
import com.fams.api.mapper.TrainingProgramMapper;
import com.fams.api.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ClassService implements BaseServices<ClassDTO> {
    private ClassRepository classRepository;
    private LocationRepository locationRepository;
    private FsuRepository fsuRepository;
    private AttendeeTypeRepository attendeeTypeRepository;
    private AdminRepository adminRepository;
    private TrainingProgramRepository trainingProgramRepository;
    private SyllabusRepository syllabusRepository;

    @Override
    public ClassDTO create(ClassDTO classDTO) {
        Class classEntity = ClassMapper.INSTANCE.toEntity(classDTO);
        Class savedClass = classRepository.save(classEntity);
        return ClassMapper.INSTANCE.toDTO(savedClass);
    }

    // Get location name by ID
    public String getLocationNameById(String locationId) {
        if (locationId == null) {
            return null;
        }
        Optional<Location> location = locationRepository.findById(locationId);
        return location.map(Location::getName).orElse(null);
    }

    // Get Fsu name by ID
    public String getFsuNameById(String fsuId) {
        if (fsuId == null) {
            return null;
        }
        Optional<Fsu> fsu = fsuRepository.findById(fsuId);
        return fsu.map(Fsu::getName).orElse(null);
    }

    // Get attendee name by ID
    public String getAttendeeNameById(String attendeeTypeId) {
        if (attendeeTypeId == null) {
            return null;
        }
        Optional<AttendeeType> attendeeType = attendeeTypeRepository.findById(attendeeTypeId);
        return attendeeType.map(AttendeeType::getAttendeeTypeName).orElse(null);
    }

    // Get admin name by ID
    public String getAdminNameById(String adminId) {
        if (adminId == null) {
            return null;
        }
        Optional<Admin> admin = adminRepository.findById(adminId);
        return admin.map(Admin::getName).orElse(null);
    }

    // Get admin email by ID
    public String getAdminEmailById(String adminId) {
        if (adminId == null) {
            return null;
        }
        Optional<Admin> admin = adminRepository.findById(adminId);
        return admin.map(Admin::getEmail).orElse(null);
    }

    @Override
    public ClassDTO findByID(String id) {
        Class classEntity = classRepository.findById(id).orElse(null);
        if (classEntity != null) {
            ClassDTO classDTO = ClassMapper.INSTANCE.toDTO(classEntity);
            String locationName = getLocationNameById(classDTO.getLocationId());
            classDTO.setLocationName(locationName);
            String fsuName = getFsuNameById(classDTO.getFsuId());
            classDTO.setFsuName(fsuName);
            String attendeeTypeName = getAttendeeNameById(classDTO.getAttendeeTypeId());
            classDTO.setAttendeeTypeName(attendeeTypeName);
            String adminName = getAdminNameById(classDTO.getAdminId());
            classDTO.setAdminName(adminName);
            String adminEmail = getAdminEmailById(classDTO.getAdminId());
            classDTO.setAdminMail(adminEmail);
            return classDTO;
        }
        return null;
    }

    @Override
    public List<ClassDTO> findAll() {
        return classRepository.findAll().stream()
                .map(classEntity -> {
                    ClassDTO classDTO = ClassMapper.INSTANCE.toDTO(classEntity);
                    String locationName = getLocationNameById(classDTO.getLocationId());
                    classDTO.setLocationName(locationName);
                    String fsuName = getFsuNameById(classDTO.getFsuId());
                    classDTO.setFsuName(fsuName);
                    String attendeeTypeName = getAttendeeNameById(classDTO.getAttendeeTypeId());
                    classDTO.setAttendeeTypeName(attendeeTypeName);
                    String adminName = getAdminNameById(classDTO.getAdminId());
                    classDTO.setAdminName(adminName);
                    String adminEmail = getAdminEmailById(classDTO.getAdminId());
                    classDTO.setAdminMail(adminEmail);

                    return classDTO;
                })
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
            classEntity.setLocationId(classDetails.getLocationId());
            classEntity.setFsuId(classDetails.getFsuId());
            classEntity.setAdminId(classDetails.getAdminId());
            classEntity.setAttendeeTypeId(classDetails.getAttendeeTypeId());
            classEntity.setTrainingProgramCode(classDetails.getTrainingProgramCode());
            classEntity.setPlannedAttendee(classDetails.getPlannedAttendee());
            classEntity.setSlotTime(classDetails.getSlotTime());
            classEntity.setTrainingProgramCode(classDetails.getTrainingProgramCode());
            Class updatedClass = classRepository.save(classEntity);
            ClassDTO updatedClassDTO = ClassMapper.INSTANCE.toDTO(updatedClass);
            String locationName = getLocationNameById(classEntity.getLocationId());
            updatedClassDTO.setLocationName(locationName);
            String fsuName = getFsuNameById(classEntity.getFsuId());
            updatedClassDTO.setFsuName(fsuName);
            String adminName=getAdminNameById(classEntity.getAdminId());
            updatedClassDTO.setAdminName(adminName);
            String adminMail=getAdminEmailById(classEntity.getAdminId());
            updatedClassDTO.setAdminMail(adminMail);


            return updatedClassDTO;
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

    public TrainingProgramDetail getTrainingProgramDetailByClassId(String trainingProgramId) {
        Optional<TrainingProgram> optionalTrainingProgram = trainingProgramRepository.findById(trainingProgramId);
        if (optionalTrainingProgram.isPresent()) {
            TrainingProgram trainingProgram = optionalTrainingProgram.get();
            List<Syllabus> syllabusList = syllabusRepository.findAllByIdIn(trainingProgram.getSyllabusId());
            List<SyllabusDTO> syllabusDTOList = syllabusList.stream()
                    .map(SyllabusMapper.INSTANCE::toDTO)
                    .collect(Collectors.toList());

            TrainingProgramDetail trainingProgramDetail = new TrainingProgramDetail();
            trainingProgramDetail.setTrainingProgramCode(trainingProgram.getTrainingProgramCode());
            trainingProgramDetail.setCreatedBy(trainingProgram.getCreatedBy());
            trainingProgramDetail.setCreatedDate(trainingProgram.getCreatedDate());
            trainingProgramDetail.setModifiedBy(trainingProgram.getModifiedBy());
            trainingProgramDetail.setModifiedDate(trainingProgram.getModifiedDate());
            trainingProgramDetail.setDays(trainingProgram.getDays());
            trainingProgramDetail.setHours(trainingProgram.getHours());
            trainingProgramDetail.setName(trainingProgram.getName());
            trainingProgramDetail.setStatus(trainingProgram.getStatus());
            trainingProgramDetail.setUserId(trainingProgram.getUserId());
            trainingProgramDetail.setTechnicalCodeId(trainingProgram.getTechnicalCodeId());
            trainingProgramDetail.setTechnicalGroupId(trainingProgram.getTechnicalGroupId());
            trainingProgramDetail.setModuleId(trainingProgram.getModuleId());
            trainingProgramDetail.setSyllabusId(trainingProgram.getSyllabusId());
            trainingProgramDetail.setSyllabi(syllabusDTOList);

            return trainingProgramDetail;
        } else {
            throw new RuntimeException("Training Program not found with id " + trainingProgramId);
        }
    }

    public List<TrainingProgramDetail> getTrainingProgramDetailList() {
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();

        return trainingPrograms.stream()
                .map(trainingProgram -> {
                    List<Syllabus> syllabusList = syllabusRepository.findAllByIdIn(trainingProgram.getSyllabusId());
                    List<SyllabusDTO> syllabusDTOList = syllabusList.stream()
                            .map(SyllabusMapper.INSTANCE::toDTO)
                            .collect(Collectors.toList());

                    TrainingProgramDetail trainingProgramDetail = new TrainingProgramDetail();
                    trainingProgramDetail.setTrainingProgramCode(trainingProgram.getTrainingProgramCode());
                    trainingProgramDetail.setCreatedBy(trainingProgram.getCreatedBy());
                    trainingProgramDetail.setCreatedDate(trainingProgram.getCreatedDate());
                    trainingProgramDetail.setModifiedBy(trainingProgram.getModifiedBy());
                    trainingProgramDetail.setModifiedDate(trainingProgram.getModifiedDate());
                    trainingProgramDetail.setDays(trainingProgram.getDays());
                    trainingProgramDetail.setHours(trainingProgram.getHours());
                    trainingProgramDetail.setName(trainingProgram.getName());
                    trainingProgramDetail.setStatus(trainingProgram.getStatus());
                    trainingProgramDetail.setUserId(trainingProgram.getUserId());
                    trainingProgramDetail.setTechnicalCodeId(trainingProgram.getTechnicalCodeId());
                    trainingProgramDetail.setTechnicalGroupId(trainingProgram.getTechnicalGroupId());
                    trainingProgramDetail.setModuleId(trainingProgram.getModuleId());
                    trainingProgramDetail.setSyllabusId(trainingProgram.getSyllabusId());
                    trainingProgramDetail.setSyllabi(syllabusDTOList);
                    return trainingProgramDetail;
                })
                .collect(Collectors.toList());
    }

    // Phương thức để tìm tất cả ClassDTO với các trường cần thiết để xuất dữ liệu
    public List<ClassDTO> findAllForExport() {
        return classRepository.findAll().stream()
                .map(classEntity -> {
                    ClassDTO classDTO = ClassMapper.INSTANCE.toDTO(classEntity);
                    classDTO.setLocationName(getLocationNameById(classDTO.getLocationId()));
                    classDTO.setFsuName(getFsuNameById(classDTO.getFsuId()));
                    classDTO.setAttendeeTypeName(getAttendeeNameById(classDTO.getAttendeeTypeId()));
                    classDTO.setAdminName(getAdminNameById(classDTO.getAdminId()));
                    return classDTO;
                })
                .collect(Collectors.toList());
    }

    public List<TrainingProgramDetail> getTrainingProgramDetailListByClassId(String id) {
        Optional<Class> optionalClass = classRepository.findById(id);
        if (optionalClass.isPresent()) {
            Class classEntity = optionalClass.get();
            List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAllByTrainingProgramCodeIn(classEntity.getTrainingProgramCode());
            return trainingPrograms.stream()
                    .map(trainingProgram -> {
                        List<Syllabus> syllabusList = syllabusRepository.findAllByIdIn(trainingProgram.getSyllabusId());
                        List<SyllabusDTO> syllabusDTOList = syllabusList.stream()
                                .map(SyllabusMapper.INSTANCE::toDTO)
                                .collect(Collectors.toList());

                        TrainingProgramDetail trainingProgramDetail = new TrainingProgramDetail();
                        trainingProgramDetail.setTrainingProgramCode(trainingProgram.getTrainingProgramCode());
                        trainingProgramDetail.setCreatedBy(trainingProgram.getCreatedBy());
                        trainingProgramDetail.setCreatedDate(trainingProgram.getCreatedDate());
                        trainingProgramDetail.setModifiedBy(trainingProgram.getModifiedBy());
                        trainingProgramDetail.setModifiedDate(trainingProgram.getModifiedDate());
                        trainingProgramDetail.setDays(trainingProgram.getDays());
                        trainingProgramDetail.setHours(trainingProgram.getHours());
                        trainingProgramDetail.setName(trainingProgram.getName());
                        trainingProgramDetail.setStatus(trainingProgram.getStatus());
                        trainingProgramDetail.setUserId(trainingProgram.getUserId());
                        trainingProgramDetail.setTechnicalCodeId(trainingProgram.getTechnicalCodeId());
                        trainingProgramDetail.setTechnicalGroupId(trainingProgram.getTechnicalGroupId());
                        trainingProgramDetail.setModuleId(trainingProgram.getModuleId());
                        trainingProgramDetail.setSyllabusId(trainingProgram.getSyllabusId());
                        trainingProgramDetail.setSyllabi(syllabusDTOList);
                        return trainingProgramDetail;
                    })
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Class not found with id " + id);
        }
    }

    // public ClassDTO updateTrainingProgramCodes(String classId, List<String> newTrainingProgramCodes) {
    //     Class classEntity = classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Class not found with id " + classId));

    //     classEntity.setTrainingProgramCode(newTrainingProgramCodes);
    //     Class updatedClass = classRepository.save(classEntity);

    //     ClassDTO updatedClassDTO = ClassMapper.INSTANCE.toDTO(updatedClass);
    //     String locationName = getLocationNameById(updatedClass.getLocationId());
    //     updatedClassDTO.setLocationName(locationName);
    //     String fsuName = getFsuNameById(updatedClass.getFsuId());
    //     updatedClassDTO.setFsuName(fsuName);
    //     String adminName = getAdminNameById(updatedClass.getAdminId());
    //     updatedClassDTO.setAdminName(adminName);
    //     String adminMail = getAdminEmailById(updatedClass.getAdminId());
    //     updatedClassDTO.setAdminMail(adminMail);

    //     return updatedClassDTO;
    // }
}
