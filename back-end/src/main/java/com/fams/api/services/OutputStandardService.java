package com.fams.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fams.api.entity.OutputStandard;
import com.fams.api.repository.OutputStandardRepository;

@Service
public class OutputStandardService {
    
    private final OutputStandardRepository outputStandardRepository;

    public OutputStandardService(OutputStandardRepository outputStandardRepository) {
        this.outputStandardRepository = outputStandardRepository;
    }

    //Get all output standard
    public List<OutputStandard> getAllOutputStandards() {
        return outputStandardRepository.findAll();
    }

    //Add an output standard
    public OutputStandard addOutputStandard(OutputStandard outputStandard) {
        return outputStandardRepository.insert(outputStandard);
    }

    //Update an existing output standard
    public OutputStandard updateOutputStandard(String id, OutputStandard updatedOutputStandard) {
        return outputStandardRepository.findById(id).map(outputStandard -> {
            if (updatedOutputStandard.getName() != null) outputStandard.setName(updatedOutputStandard.getName());
            if (updatedOutputStandard.getCode() != null) outputStandard.setCode(updatedOutputStandard.getCode());
            if (updatedOutputStandard.getDescriptions() != null) outputStandard.setDescriptions(updatedOutputStandard.getDescriptions());
            return outputStandardRepository.save(outputStandard);
        }).orElseThrow(() -> new RuntimeException("Output standard not found with id " + id));
    }

    //Delete an output standard by ID
    public void deleteOutputStandard(String id) {
        if (outputStandardRepository.findById(id).isPresent())
            outputStandardRepository.deleteById(id);
        else throw new RuntimeException("Output standard not found with id " + id);
    }

    //Get a specific output standard by id
    public OutputStandard getOutputStandardById(String id) {
        Optional<OutputStandard> outputStandard = outputStandardRepository.findById(id);
        if (outputStandard.isPresent()) {
            return outputStandard.get();
        } else {
            throw new RuntimeException("Output standard not found with id " + id);
        }
    }
}
