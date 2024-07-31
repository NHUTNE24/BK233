package com.fams.api.services;

import com.fams.api.dto.*;
import com.fams.api.dto.createData.DayCreate;
import com.fams.api.dto.createData.UnitCreate;
import com.fams.api.entity.*;
import com.fams.api.mapper.DetailMapperImpl;
import com.fams.api.mapper.SyllabusMapper;
import com.fams.api.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@AllArgsConstructor
public class SyllabusDetailService {
    private final SyllabusRepository syllabusRepository;
    private final SyllabusDayRepo syllabusDayRepo;
    private final SyllabusUnitRepo syllabusUnitRepo;
    private final UnitChapterRepository unitChapterRepository;
    private final AssignmentSchemaRepository assignmentSchemaRepository;
    private final OutputStandardRepository outputStandardRepository;
    private final DeliveryTypeRepository deliveryTypeRepository;
    private final TrainingDeliveryPrincipleRepository trainingDeliveryPrincipleRepository;

    private final SyllabusServices syllabusServices;
    private final SyllabusUnitServices syllabusUnitServices;

    private final SyllabusMapper syllabusMapper;
    private final DetailMapperImpl detailMapper;

    public SyllabusDetailDTO getSyllabusDetail(String id) {
        Optional<Syllabus> syllabusFound = syllabusRepository.findById(id);

        if (syllabusFound.isPresent()) {

            Syllabus syllabusItem = syllabusFound.get();
            SyllabusDetailDTO syllabusDetail = new SyllabusDetailDTO();
            syllabusDetail.setSyllabus(syllabusItem);

            Optional<List<SyllabusDay>> syllabusDays = syllabusDayRepo.findBySyllabusId(syllabusItem.getId());
            if (syllabusDays.isPresent()) {
                syllabusDetail.setSyllabusDays(syllabusDays.get());
            } else {
                syllabusDetail.setSyllabusDays(null);
            }

            List<SyllabusDay> sDayList = syllabusDetail.getSyllabusDays();
            List<List<SyllabusUnit>> syllabusUnits = new ArrayList<>();
            Optional<List<SyllabusUnit>> tempUnitList;
            List<SyllabusUnit> totalUnitList = new ArrayList<>();
            if (sDayList != null && !sDayList.isEmpty()) {
                for (SyllabusDay item : sDayList) {
                    tempUnitList = syllabusUnitRepo.findBySyllabusDayId(item.getId());
                    if (tempUnitList.isPresent()) {
                        syllabusUnits.add(tempUnitList.get());
                        totalUnitList.addAll(tempUnitList.get());
                    }
                    else {
                        syllabusUnits.add(new ArrayList<>());
                    }
                }
            }
            syllabusDetail.setSyllabusUnits(syllabusUnits);

            List<List<UnitChapter>> unitChapters = new ArrayList<>();
            Optional<List<UnitChapter>> tempUnitChapter;
            List<UnitChapter> totalUnitChapter = new ArrayList<>();
            if (!totalUnitList.isEmpty()) {
                for (SyllabusUnit item : totalUnitList) {
                    tempUnitChapter = unitChapterRepository.findBySyllabusUnitId(item.getId());
                    if (tempUnitChapter.isPresent()) {
                        unitChapters.add((tempUnitChapter.get()));
                        totalUnitChapter.addAll(tempUnitChapter.get());
                    }
                    else {
                        unitChapters.add(new ArrayList<>());
                    }
                }
            }
            syllabusDetail.setUnitChapters(unitChapters);

            Optional<AssignmentSchema> assignmentSchema = assignmentSchemaRepository.findBySyllabusId(syllabusItem.getId());
            if (assignmentSchema.isPresent()) {
                syllabusDetail.setAssignmentSchema(assignmentSchema.get());
            } else {
                syllabusDetail.setAssignmentSchema(null);
            }

            List<OutputStandard> outputStandards = new ArrayList<>();
            List<DeliveryType> deliveryTypes = new ArrayList<>();
            Optional<OutputStandard> outputStandard;
            Optional<DeliveryType> deliveryType;
            if (!totalUnitChapter.isEmpty()){
                for (UnitChapter item : totalUnitChapter) {
                    outputStandard = outputStandardRepository.findById(item.getOutputStandardId());
                    if (outputStandard.isPresent()) outputStandards.add(outputStandard.get());

                    deliveryType = deliveryTypeRepository.findById(item.getDeliveryTypeId());
                    if (deliveryType.isPresent()) deliveryTypes.add(deliveryType.get());
                }
            }
            syllabusDetail.setOutputStandards(outputStandards.stream().distinct().toList());
            syllabusDetail.setDeliveryTypes(deliveryTypes.stream().distinct().toList());

            Optional<TrainingDeliveryPrinciple> trainingDeliveryPrinciple = trainingDeliveryPrincipleRepository.findBySyllabusId(syllabusItem.getId());
            if (trainingDeliveryPrinciple.isPresent()) {
                syllabusDetail.setTrainingDeliveryPrinciple(trainingDeliveryPrinciple.get());
            }
            else {
                syllabusDetail.setTrainingDeliveryPrinciple(null);
            }

            return syllabusDetail;
        } else {
            throw new RuntimeException("Syllabus not found with id " + id);
        }
    }

    public SyllabusListDTO getSyllabusList(Integer pageNumber, Integer pageSize, String sortBy, String order) {
        List<Syllabus> syllabusFound = syllabusRepository.findAll();
        switch (sortBy) {
            case "syllabus" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getTopicName));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "code" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getTopicCode));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "create_on" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getCreatedDate));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "create_by" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getCreatedBy));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "duration" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getDays));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "status" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getStatus));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            default -> {
                Collections.reverse(syllabusFound);
            }
        }

        Integer totalElements = syllabusFound.size();
        if ((pageNumber - 1) * pageSize > totalElements) {
            throw new RuntimeException("No such page number " + pageNumber);
        }
        Integer totalPages = Math.ceilDiv(totalElements, pageSize);
        Boolean lastPage = (pageSize * pageNumber >= totalElements);

        SyllabusListDTO syllabusList = new SyllabusListDTO();
        syllabusList.setPage(pageNumber);
        syllabusList.setLastPage(lastPage);
        syllabusList.setPageSize(pageSize);
        syllabusList.setTotalPages(totalPages);
        syllabusList.setTotalElements(totalElements);

        Integer fromIndex = (pageNumber - 1) * pageSize;
        Integer toIndex = Math.min(fromIndex + pageSize, totalElements);
        syllabusFound = syllabusFound.subList(fromIndex, toIndex);
        syllabusList.setContent(syllabusFound);

        return syllabusList;
    }


    public SyllabusDetailDTO createSyllabusDetail(SyllabusCreateDTO syllabusCreateDTO) {
        SyllabusDetailDTO syllabusDetailDTO = detailMapper.toDetailDTO(syllabusCreateDTO);

        String userName = syllabusCreateDTO.getUserName();
        String dateTime = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Syllabus syllabus = syllabusDetailDTO.getSyllabus();
        List<SyllabusDay> syllabusDays = syllabusDetailDTO.getSyllabusDays();
        List<List<SyllabusUnit>> syllabusUnits = syllabusDetailDTO.getSyllabusUnits();
        List<List<UnitChapter>> unitChapters = syllabusDetailDTO.getUnitChapters();
        AssignmentSchema assignmentSchema = syllabusDetailDTO.getAssignmentSchema();
        TrainingDeliveryPrinciple trainingDeliveryPrinciple = syllabusDetailDTO.getTrainingDeliveryPrinciple();


        // Create Syllabus
        syllabus.setCreatedDate(dateTime);
        syllabus.setCreatedBy(userName);
        syllabus.setModifiedDate(dateTime);
        syllabus.setModifiedBy(userName);
        syllabus.setDays(syllabusDays.size());
        SyllabusDTO insertedSyllabus = syllabusServices.create(syllabusMapper.toDTO(syllabus));

        // Create Syllabus Days
        {
            syllabusDays = syllabusDays.stream().map(syllabusDay -> {
                syllabusDay.setSyllabusId(insertedSyllabus.getId());
                syllabusDay.setCreatedDate(dateTime);
                syllabusDay.setCreatedBy(userName);
                syllabusDay.setModifiedDate(dateTime);
                syllabusDay.setModifiedBy(userName);
                return syllabusDayRepo.insert(syllabusDay);
            }).toList();
        }

        // Create Units for each day
        int noDay = syllabusDays.size();
        List<SyllabusUnit> unitList = new ArrayList<>();
        for (int i = 0; i < noDay; i++){
            List<SyllabusUnit> tempListUnits = syllabusUnits.get(i);
            String dayId = syllabusDays.get(i).getId();
            tempListUnits.stream().map(unitItem -> {
                unitItem.setSyllabusDayId(dayId);
                unitItem.setCreatedBy(userName);
                unitItem.setCreatedDate(dateTime);
                unitItem.setModifiedDate(dateTime);
                unitItem.setModifiedBy(userName);
                return syllabusUnitRepo.insert(unitItem);
            }).toList();
            unitList.addAll(tempListUnits);
        }

        // Create Chapters for each syllabus unit
        int noUnit = unitList.size();
        for (int i = 0 ; i < noUnit; i++) {
            List<UnitChapter> tempListChaps = unitChapters.get(i);
            String unitId = unitList.get(i).getId();
            tempListChaps.stream().map(chapItem -> {
                chapItem.setSyllabusUnitId(unitId);
                chapItem.setCreatedBy(userName);
                chapItem.setCreatedDate(dateTime);
                chapItem.setModifiedDate(dateTime);
                chapItem.setModifiedBy(userName);
                return unitChapterRepository.insert(chapItem);
            }).toList();

            updateUnitDuration(unitId);
        }

        // Update Assignment Schema (because we have created Assignment Schema when we create Syllabus)
        String assignmentSchemaId = assignmentSchemaRepository.findBySyllabusId(insertedSyllabus.getId()).get().getId();
        assignmentSchema.setSyllabusId(insertedSyllabus.getId());
        assignmentSchema.setId(assignmentSchemaId);
        AssignmentSchema insertedAssignmentSchema = assignmentSchemaRepository.save(assignmentSchema);

        // Create Training Delivery Principle (because we have created Training Delivery Principle when we create Syllabus)
        String trainingId = trainingDeliveryPrincipleRepository.findBySyllabusId(insertedSyllabus.getId()).get().getId();
        trainingDeliveryPrinciple.setSyllabusId(insertedSyllabus.getId());
        trainingDeliveryPrinciple.setId(trainingId);
        TrainingDeliveryPrinciple insertedTrainingDeliveryPrinciple = trainingDeliveryPrincipleRepository.save(trainingDeliveryPrinciple);

        // Update OutputStandard on Syllabus
        updateOutputStandard(insertedSyllabus.getId());
        updateSyllabusDuration(insertedSyllabus.getId());

        return getSyllabusDetail(insertedSyllabus.getId());
    }

    public SyllabusDetailDTO updateSyllabusDetail(String syllabusId, SyllabusCreateDTO syllabusCreateDTO) {
        SyllabusDetailDTO prevSyllabusDetail = getSyllabusDetail(syllabusId);

        // Create previous and current list of ids to compare
        List<String> prevDayIds = new ArrayList<>();
        List<String> prevUnitIds = new ArrayList<>();
        List<String> prevChapterIds = new ArrayList<>();
        List<String> currDayIds = new ArrayList<>();
        List<String> currUnitIds = new ArrayList<>();
        List<String> currChapterIds = new ArrayList<>();

        // Get list of prev
        for (SyllabusDay day : prevSyllabusDetail.getSyllabusDays()) {
            prevDayIds.add(day.getId());
        }
        for (List<SyllabusUnit> units : prevSyllabusDetail.getSyllabusUnits()) {
            for (SyllabusUnit unit : units) {
                prevUnitIds.add(unit.getId());
            }
        }
        for (List<UnitChapter> chapters : prevSyllabusDetail.getUnitChapters()) {
            for (UnitChapter chapter : chapters) {
                prevChapterIds.add(chapter.getId());
            }
        }

        // Handle update
        SyllabusDetailDTO detailToUpdate = detailMapper.toDetailDTO(syllabusCreateDTO);

        String userName = syllabusCreateDTO.getUserName();
        String dateTime = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Syllabus syllabus = detailToUpdate.getSyllabus();


        // Update Syllabus
        syllabus.setId(syllabusId);
        syllabus.setModifiedDate(dateTime);
        syllabus.setModifiedBy(userName);
        syllabus.setDays(syllabusCreateDTO.getSyllabusDay().size());
        SyllabusDTO insertedSyllabus = syllabusServices.update(syllabusMapper.toDTO(syllabus));

        Integer dayNo = 0;
        for (DayCreate day : syllabusCreateDTO.getSyllabusDay()) {
            dayNo++;
            // Handle update/create day
            String dayId = "";
            if (day.getDayId() != null && syllabusDayRepo.findById(day.getDayId()).isPresent()) {
                SyllabusDay updatedDay = syllabusDayRepo.findById(day.getDayId()).get();
                updatedDay.setSyllabusId(syllabusId);
                updatedDay.setDayNo(dayNo);
                updatedDay.setModifiedDate(dateTime);
                updatedDay.setModifiedBy(userName);
                SyllabusDay syllabusDay = syllabusDayRepo.save(updatedDay);
                dayId = syllabusDay.getId();
            }
            else {
                SyllabusDay newDay = new SyllabusDay();
                newDay.setSyllabusId(syllabusId);
                newDay.setDayNo(dayNo);
                newDay.setCreatedDate(dateTime);
                newDay.setCreatedBy(userName);
                newDay.setModifiedDate(dateTime);
                newDay.setModifiedBy(userName);
                SyllabusDay syllabusDay = syllabusDayRepo.insert(newDay);
                dayId = syllabusDay.getId();
            }

            Integer unitNo = 0;
            for (UnitCreate unit : day.getSyllabusUnits()) {
                unitNo++;
                String unitId = "";
                if (unit.getUnitId() != null && syllabusUnitRepo.findById(unit.getUnitId()).isPresent()) {
                    SyllabusUnit newUnit = syllabusUnitRepo.findById(unit.getUnitId()).get();
                    newUnit.setName(unit.getUnitName());
                    newUnit.setModifiedDate(dateTime);
                    newUnit.setModifiedBy(userName);
                    newUnit.setSyllabusDayId(dayId);
                    newUnit.setUnitNo(unitNo);
                    SyllabusUnit syllabusUnit = syllabusUnitRepo.save(newUnit);
                    unitId = syllabusUnit.getId();
                }
                else {
                    SyllabusUnit updatedUnit = new SyllabusUnit();
                    updatedUnit.setName(unit.getUnitName());
                    updatedUnit.setCreatedDate(dateTime);
                    updatedUnit.setCreatedBy(userName);
                    updatedUnit.setModifiedDate(dateTime);
                    updatedUnit.setModifiedBy(userName);
                    updatedUnit.setSyllabusDayId(dayId);
                    updatedUnit.setUnitNo(unitNo);
                    SyllabusUnit syllabusUnit = syllabusUnitRepo.insert(updatedUnit);
                    unitId = syllabusUnit.getId();
                }

                Integer chapterNo = 0;
                for (UnitChapter chapter : unit.getUnitChapters()) {
                    chapterNo++;
                    // Handle update/create unitChapter
                    String chapterId = "";
                    if (chapter.getId() != null && unitChapterRepository.findById(chapter.getId()).isPresent()) {
                        UnitChapter updatedChapter = unitChapterRepository.findById(chapter.getId()).get();
                        updatedChapter.setName(chapter.getName());
                        updatedChapter.setDuration(chapter.getDuration());
                        updatedChapter.setIsOnline(chapter.getIsOnline());
                        updatedChapter.setDeliveryTypeId(chapter.getDeliveryTypeId());
                        updatedChapter.setOutputStandardId(chapter.getOutputStandardId());
                        updatedChapter.setSyllabusUnitId(unitId);
                        updatedChapter.setModifiedDate(dateTime);
                        updatedChapter.setModifiedBy(userName);
                        UnitChapter unitChapter = unitChapterRepository.save(updatedChapter);
                        chapterId = unitChapter.getId();
                    }
                    else {
                        UnitChapter newChapter = new UnitChapter();
                        newChapter.setName(chapter.getName());
                        newChapter.setDuration(chapter.getDuration());
                        newChapter.setIsOnline(chapter.getIsOnline());
                        newChapter.setDeliveryTypeId(chapter.getDeliveryTypeId());
                        newChapter.setOutputStandardId(chapter.getOutputStandardId());
                        newChapter.setSyllabusUnitId(unitId);
                        newChapter.setCreatedDate(dateTime);
                        newChapter.setCreatedBy(userName);
                        newChapter.setModifiedDate(dateTime);
                        newChapter.setModifiedBy(userName);
                        UnitChapter unitChapter = unitChapterRepository.insert(newChapter);
                        chapterId = unitChapter.getId();
                    }

                    currChapterIds.add(chapterId);
                }

                currUnitIds.add(unitId);
            }

            if (dayId != "") currDayIds.add(dayId);
        }

        // Update Assign Schema (because we have created Assign Schema when we create Syllabus)
        AssignmentSchema assignmentSchema = detailToUpdate.getAssignmentSchema();
        String assignmentSchemaId = assignmentSchemaRepository.findBySyllabusId(insertedSyllabus.getId()).get().getId();
        assignmentSchema.setSyllabusId(insertedSyllabus.getId());
        assignmentSchema.setId(assignmentSchemaId);
        AssignmentSchema insertedAssignmentSchema = assignmentSchemaRepository.save(assignmentSchema);

        // Update Training Delivery Principle (because we have created Training Delivery Principle when we create Syllabus)
        TrainingDeliveryPrinciple trainingDeliveryPrinciple = detailToUpdate.getTrainingDeliveryPrinciple();
        String trainingId = trainingDeliveryPrincipleRepository.findBySyllabusId(insertedSyllabus.getId()).get().getId();
        trainingDeliveryPrinciple.setSyllabusId(insertedSyllabus.getId());
        trainingDeliveryPrinciple.setId(trainingId);
        TrainingDeliveryPrinciple insertedTrainingDeliveryPrinciple = trainingDeliveryPrincipleRepository.save(trainingDeliveryPrinciple);

        // Handle deleted item
        for (String dayId : prevDayIds) {
            if (!currDayIds.contains(dayId)) syllabusDayRepo.deleteById(dayId);
        }
        for (String unitId : prevUnitIds) {
            if (!currUnitIds.contains(unitId)) syllabusUnitRepo.deleteById(unitId);
        }
        for (String chapterId : prevChapterIds) {
            if (!currChapterIds.contains(chapterId)) unitChapterRepository.deleteById(chapterId);
        }

        // Update OutputStandard on Syllabus
        updateOutputStandard(insertedSyllabus.getId());
        for (String unitId : currUnitIds) {
            updateUnitDuration(unitId);
        }
        updateSyllabusDuration(insertedSyllabus.getId());

        return getSyllabusDetail(syllabusId);
    }

    public void updateOutputStandard(String syllabusId) {
        SyllabusDetailDTO syllabusFound = getSyllabusDetail(syllabusId);
        List<String> outputStandards = new ArrayList<>();
        List<List<UnitChapter>> unitChapters = syllabusFound.getUnitChapters();
        unitChapters.forEach(unit -> {
            unit.forEach(chapter -> {
                Optional<OutputStandard> outputStandard = outputStandardRepository.findById(chapter.getOutputStandardId());
                if (outputStandard.isPresent()) {
                    outputStandards.add(outputStandard.get().getCode());
                }
            });
        });

        Syllabus updatedSyllabus = syllabusRepository.findById(syllabusId).get();
        List<String> finalOutput = outputStandards.stream().distinct().toList();
        updatedSyllabus.setOutputStandards(finalOutput);
        Syllabus res = syllabusRepository.save(updatedSyllabus);
        return;
    }

    public String getSyllabusIdFromUnit(String unitId) {
        Optional<SyllabusUnit> unitFound = syllabusUnitRepo.findById(unitId);
        if (!unitFound.isPresent()) throw new RuntimeException("Can't trace SyllabusId");
        Optional<SyllabusDay> dayFound = syllabusDayRepo.findById(unitFound.get().getSyllabusDayId());
        if (!dayFound.isPresent()) throw new RuntimeException("Can't trace SyllabusId");
        Optional<Syllabus> syllabusFound = syllabusRepository.findById(dayFound.get().getSyllabusId());
        if (!syllabusFound.isPresent()) throw new RuntimeException("Can't trace SyllabusId");
        return syllabusFound.get().getId();
    }

    public void deleteSyllabusDetail(String id) {
        Optional<Syllabus> syllabusFound = syllabusRepository.findById(id);
        if (!syllabusFound.isPresent()) {
            throw new RuntimeException("Syllabus not found with id " + id);
        }
        else
        {
            SyllabusDetailDTO syllabusToDelete = getSyllabusDetail(id);
            trainingDeliveryPrincipleRepository.deleteById(syllabusToDelete.getTrainingDeliveryPrinciple().getId());
            assignmentSchemaRepository.deleteById(syllabusToDelete.getAssignmentSchema().getId());

            // Delete Unit chapters
            for (List<UnitChapter> unitChapters : syllabusToDelete.getUnitChapters()) {
                for (UnitChapter item : unitChapters) {
                    unitChapterRepository.deleteById(item.getId());
                }
            }

            // Delete Syllabus Unit
            for (List<SyllabusUnit> syllabusUnits: syllabusToDelete.getSyllabusUnits()) {
                for (SyllabusUnit item : syllabusUnits) {
                    syllabusUnitRepo.deleteById(item.getId());
                }
            }

            // Delete Syllabus Day
            for (SyllabusDay item : syllabusToDelete.getSyllabusDays()) {
                syllabusDayRepo.deleteById(item.getId());
            }

            // Delete Syllabus
            syllabusRepository.deleteById(id);
        }
    }

    public SyllabusDetailDTO duplicateSyllabus(String id) {
        SyllabusDetailDTO syllabusToDuplicate = getSyllabusDetail(id);

        // Update Syllabus
        Syllabus tempSyllabus = syllabusToDuplicate.getSyllabus();
        tempSyllabus.setId(null);
        SyllabusDTO insertedSyllabus = syllabusServices.create(syllabusMapper.toDTO(tempSyllabus));
        tempSyllabus.setId(insertedSyllabus.getId());
        syllabusToDuplicate.setSyllabus(tempSyllabus);

        // Update Syllabus Day
        List<SyllabusDay> dayList = new ArrayList<>();
        for (SyllabusDay item : syllabusToDuplicate.getSyllabusDays()) {
            item.setId(null);
            item.setSyllabusId(insertedSyllabus.getId());
            dayList.add(syllabusDayRepo.insert(item));
        }

        // Update Syllabus Unit
        Integer dayNo = 0;
        List<SyllabusUnit> unitList = new ArrayList<>();
        for (List<SyllabusUnit> syllabusUnits: syllabusToDuplicate.getSyllabusUnits()) {
            String dayId = dayList.get(dayNo).getId();
            for (SyllabusUnit item : syllabusUnits) {
                item.setId(null);
                item.setSyllabusDayId(dayId);
                unitList.add(syllabusUnitRepo.insert(item));
            }
            dayNo++;
        }

        // Update Unit chapters
        Integer unitNo = 0;
        for (List<UnitChapter> unitChapters : syllabusToDuplicate.getUnitChapters()) {
            String unitId = unitList.get(unitNo).getId();
            for (UnitChapter item : unitChapters) {
                item.setId(null);
                item.setSyllabusUnitId(unitId);
                unitChapterRepository.insert(item);
            }
            unitNo++;
        }

        for (SyllabusUnit unit : unitList) {
            updateUnitDuration(unit.getId());
        }
        updateSyllabusDuration(insertedSyllabus.getId());
        updateOutputStandard(insertedSyllabus.getId());

        return syllabusToDuplicate;
    }

    public SyllabusListDTO getSyllabusByTags(
            List<String> tagList,
            Integer pageNumber,
            Integer pageSize,
            String dateStart,
            String dateEnd,
            String sortBy,
            String order
    ) {
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Syllabus> syllabusFound = syllabusRepository.findAll();
        switch (sortBy) {
            case "syllabus" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getTopicName));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "code" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getTopicCode));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "create_on" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getCreatedDate));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "create_by" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getCreatedBy));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "duration" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getDays));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            case "status" -> {
                Collections.sort(syllabusFound, Comparator.comparing(Syllabus::getStatus));
                if ("desc".equalsIgnoreCase(order)) Collections.reverse(syllabusFound);
            }
            default -> {
                Collections.reverse(syllabusFound);
            }
        }

        syllabusFound = syllabusFound.stream().filter(item ->
                (item.getTopicName() != null
                        &&
                        tagList.stream().allMatch(item.getTopicName().toLowerCase()::contains)
                        && (dateStart == null || LocalDate.parse(item.getCreatedDate(), dateFormat).compareTo(LocalDate.parse(dateStart, dateFormat)) >= 0)
                        && (dateEnd == null || LocalDate.parse(item.getCreatedDate(), dateFormat).compareTo(LocalDate.parse(dateEnd, dateFormat)) <= 0))
        ).toList();

        Integer totalElements = syllabusFound.size();
        if ((pageNumber - 1) * pageSize > totalElements) {
            throw new RuntimeException("No such page number " + pageNumber);
        }
        Integer totalPages = Math.ceilDiv(totalElements, pageSize);
        Boolean lastPage = (pageSize * pageNumber >= totalElements);

        SyllabusListDTO syllabusList = new SyllabusListDTO();
        syllabusList.setPage(pageNumber);
        syllabusList.setLastPage(lastPage);
        syllabusList.setPageSize(pageSize);
        syllabusList.setTotalPages(totalPages);
        syllabusList.setTotalElements(totalElements);

        Integer fromIndex = (pageNumber - 1) * pageSize;
        Integer toIndex = Math.min(fromIndex + pageSize, totalElements);
        syllabusFound = syllabusFound.subList(fromIndex, toIndex);
        syllabusList.setContent(syllabusFound);

        return syllabusList;
    }


    public void updateUnitDuration(String unitId) {
        Optional<List<UnitChapter>> unitChapters = unitChapterRepository.findBySyllabusUnitId(unitId);
        if (unitChapters.isPresent()) {
            Float duration = 0F;
            for (UnitChapter chapter : unitChapters.get()) {
                duration += chapter.getDuration();
            }

            SyllabusUnitDTO syllabusUnitDTO = syllabusUnitServices.findByID(unitId);
            syllabusUnitDTO.setDuration(duration);
            syllabusUnitServices.update(syllabusUnitDTO);
        }
    }

    public void updateSyllabusDuration(String syllabusId) {
        Optional<List<SyllabusDay>> syllabusDays = syllabusDayRepo.findBySyllabusId(syllabusId);
        if (syllabusDays.isPresent()) {
            // Find total duration
            Float duration = 0F;
            List<SyllabusDay> dayList = syllabusDays.get();
            for (SyllabusDay day : dayList) {
                Optional<List<SyllabusUnit>> syllabusUnits = syllabusUnitRepo.findBySyllabusDayId(day.getId());
                if (syllabusUnits.isPresent()) {
                    List<SyllabusUnit> unitList = syllabusUnits.get();
                    for (SyllabusUnit unit : unitList)
                        duration += unit.getDuration();
                }
            }

            // Find and set by syllabus
            SyllabusDTO syllabusDTO = syllabusServices.findByID(syllabusId);
            syllabusDTO.setHours(duration);
            syllabusServices.update(syllabusDTO);
        }
    }

    public String importSyllabus(
            String userName,
            List<SyllabusDTO> syllabusList,
            Boolean scanCode,
            Boolean scanName,
            String duplicateHandle
    ) {
        try {
            String dateTime = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            List<Syllabus> dupSyllabus = new ArrayList<>();
            for (SyllabusDTO item : syllabusList) {
                item.setCreatedBy(userName);
                item.setCreatedDate(dateTime);
                item.setModifiedDate(dateTime);
                item.setModifiedBy(userName);

                if (scanCode && scanName) {
                    dupSyllabus = syllabusRepository.findByTopicCodeAndTopicName(item.getTopicCode(), item.getTopicName()).get();
                }
                else if (scanCode) {
                    dupSyllabus = syllabusRepository.findByTopicCode(item.getTopicCode()).get();
                }
                else if (scanName) {
                    dupSyllabus = syllabusRepository.findByTopicName(item.getTopicName()).get();
                }

                switch (duplicateHandle) {
                    case "Allow" -> {
                        syllabusServices.create(item);
//                        return "Allow";
                    }
                    case "Replace" -> {

                        if (!dupSyllabus.isEmpty()) {
                            for (Syllabus syllabus : dupSyllabus) {
                                deleteSyllabusDetail(syllabus.getId());
                            }
                        }
                        syllabusServices.create(item);
//                        return "Replace";
                    }
                    case "Skip" -> {
                        if (dupSyllabus.isEmpty()) {
                            syllabusServices.create(item);
                        }
//                        return "Skip";
                    }
                    case null, default -> {
                        syllabusServices.create(item);
//                        return "Other";
                    }
                }
            }
            return "Import Successful";
        }
        catch (Exception err) {
            throw new RuntimeException(err);
        }
    }
}
