package edu.miage.springboot.services.interfaces;

import edu.miage.springboot.dao.entities.UserEntity;

import java.util.List;

public interface UserService {
    List<UserEntity> getAllUsers();
    UserEntity getUserById(Long id);
    UserEntity createUser(UserEntity user);
    UserEntity updateUser(Long id, UserEntity userDetails);
    boolean deleteUser(Long id);
}