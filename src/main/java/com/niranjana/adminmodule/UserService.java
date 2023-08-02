package com.niranjana.adminmodule;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.niranjana.UserModule.Users;
import com.niranjana.UserModule.UsersRepo;
import com.niranjana.careerrecomendationmodule.UserDTO;

@Service
public class UserService {

	@Autowired
    private UsersRepo userRepository;

    public List<UserDTO> getAllUsersWithCareerReports() {
        List<Users> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (Users user : users) {
            UserDTO userDTO = new UserDTO(user);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }
}
