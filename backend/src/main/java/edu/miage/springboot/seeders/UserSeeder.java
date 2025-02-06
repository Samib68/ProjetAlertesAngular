package edu.miage.springboot.seeders;

import edu.miage.springboot.dao.entities.GroupEntity;
import edu.miage.springboot.dao.entities.UserEntity;
import edu.miage.springboot.dao.entities.UserRoleEntity;
import edu.miage.springboot.dao.repositories.GroupRepository;
import edu.miage.springboot.dao.repositories.UserRepository;
import edu.miage.springboot.dao.repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class UserSeeder implements CommandLineRunner {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Override
    public void run(String... args) throws Exception {
        UserRoleEntity userRole = new UserRoleEntity();
        userRole.setName("USER");
        userRole = userRoleRepository.save(userRole);

        UserRoleEntity adminRole = new UserRoleEntity();
        adminRole.setName("ADMIN");
        adminRole = userRoleRepository.save(adminRole);

// Créer les groupes
        GroupEntity normalGroupForUser = new GroupEntity();
        normalGroupForUser.setName("groupe1");
        normalGroupForUser.setDescription("Groupe n°1 pour l'utilisateur");
        normalGroupForUser.setDiffusion(false); // Ce groupe n'est pas un groupe de diffusion
        normalGroupForUser = groupRepository.save(normalGroupForUser);

        GroupEntity normalGroupForAdmin = new GroupEntity();
        normalGroupForAdmin.setName("administrateurs");
        normalGroupForAdmin.setDescription("Groupe pour les administrateurs");
        normalGroupForAdmin.setDiffusion(false); // Ce groupe n'est pas un groupe de diffusion
        normalGroupForAdmin = groupRepository.save(normalGroupForAdmin);

// Créer l'utilisateur normal
        UserEntity user = new UserEntity();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("123456"));
        user.setRoles(Set.of(userRole));
        user.setEmail("envoialertesuha@gmail.com");

// Ajouter le groupe normal à l'utilisateur
        user.setGroups(Set.of(normalGroupForUser));

        userRepository.save(user);

// Créer l'utilisateur administrateur
        UserEntity admin = new UserEntity();
        admin.setUsername("administrateur");
        admin.setPassword(passwordEncoder.encode("123456"));
        admin.setRoles(Set.of(userRole, adminRole));

// Ajouter le groupe normal aux administrateurs
        admin.setGroups(Set.of(normalGroupForAdmin));

        userRepository.save(admin);

    }
}
