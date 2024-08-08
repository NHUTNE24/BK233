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
        if (emailOrUsernameExists(user)) {
            throw new IllegalStateException("Email or Username already exists");
        }
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
            UserModel existingUser = optionalUser.get();
            
            if (!existingUser.getEmail().equals(changedUser.getEmail()) || !existingUser.getUsername().equals(changedUser.getUsername())) {
                if (emailOrUsernameExists(changedUser)) {
                    throw new IllegalStateException("Email or Username already exists");
                }
            }

            existingUser.setFullname(changedUser.getFullname());
            existingUser.setEmail(changedUser.getEmail());
            existingUser.setUsername(changedUser.getUsername());
            existingUser.setPhone(changedUser.getPhone());
            existingUser.setDob(changedUser.getDob());
            existingUser.setGender(changedUser.isGender());
            existingUser.setStatus(changedUser.isStatus());
            existingUser.setUrlAvatar(changedUser.getUrlAvatar());
            existingUser.setRole(changedUser.getRole());
            existingUser = userRepository.save(existingUser);
            return existingUser;
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

    private boolean emailOrUsernameExists(UserModel user) {
        return userRepository.findByEmail(user.getEmail()).isPresent() || userRepository.findByUsername(user.getUsername()).isPresent();
    }
}
