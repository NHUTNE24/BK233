package com.fams.api.services;

import com.fams.api.dto.LocationDTO;
import com.fams.api.entity.Location;
import com.fams.api.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<LocationDTO> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return locations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public LocationDTO getLocationById(String id) {
        Optional<Location> location = locationRepository.findById(id);
        return location.map(this::convertToDTO).orElse(null);
    }

    public LocationDTO createLocation(LocationDTO locationDTO) {
        Location location = new Location(locationDTO.getId(), locationDTO.getAddress(), locationDTO.getName());
        location = locationRepository.save(location);
        return convertToDTO(location);
    }

    public LocationDTO updateLocation(String id, LocationDTO locationDTO) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (locationOptional.isPresent()) {
            Location location = locationOptional.get();
            location.setAddress(locationDTO.getAddress());
            location.setName(locationDTO.getName());
            location = locationRepository.save(location);
            return convertToDTO(location);
        } else {
            return null;
        }
    }

    public void deleteLocation(String id) {
        locationRepository.deleteById(id);
    }

    private LocationDTO convertToDTO(Location location) {
        return new LocationDTO(location.getId(), location.getAddress(), location.getName());
    }
}
