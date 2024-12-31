package edu.miage.springboot.services.impl;

import edu.miage.springboot.dao.entities.UserEntity;
import edu.miage.springboot.dao.repositories.UserRepository;
import edu.miage.springboot.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // Récupérer tous les utilisateurs
    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Récupérer un utilisateur par son ID
    @Override
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Créer un nouvel utilisateur
    @Override
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    // Mettre à jour un utilisateur existant
    @Override
    public UserEntity updateUser(Long id, UserEntity userDetails) {
        Optional<UserEntity> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setRoles(userDetails.getRoles());
            return userRepository.save(user);
        }
        return null;
    }

    // Supprimer un utilisateur par son ID
    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
