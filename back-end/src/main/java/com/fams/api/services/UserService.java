package com.fams.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fams.api.entity.UserModel;
import com.fams.api.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements BaseServices<UserModel> {
    @Autowired
    private UserRepository userRepository;

    public UserModel create(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel findByID(String id) {
        Optional<UserModel> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new IllegalStateException("No user with id " + id + " found");
        }
    }

    public List<UserModel> findAll() {
        return userRepository.findAll();
    }

    public UserModel update(UserModel changedUser) {
        Optional<UserModel> optionalUser = userRepository.findById(changedUser.getId());
        if (optionalUser.isPresent()) {
            UserModel user = optionalUser.get();
            user.setFullname(changedUser.getFullname());
            user.setEmail(changedUser.getEmail());
            user.setUsername(changedUser.getUsername());
            user.setPhone(changedUser.getPhone());
            user.setDob(changedUser.getDob());
            user.setGender(changedUser.isGender());
            user.setStatus(changedUser.isStatus());
            user.setUrlAvatar(changedUser.getUrlAvatar());
            user.setRole(changedUser.getRole());
            user = userRepository.save(user);
            return user;
        } else {
            throw new IllegalStateException("No user with id " + changedUser.getId() + " found");
        }
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }

    public Optional<UserModel> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public UserModel save(UserModel user){
        return userRepository.save(user);
    }
}
