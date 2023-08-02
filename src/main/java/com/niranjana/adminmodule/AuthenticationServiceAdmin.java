package com.niranjana.adminmodule;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.niranjana.SecurityModule.JwtUtil;
import com.niranjana.UserModule.Role;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceAdmin  {
	
	
private final AdminRepo adminRepo;
private final PasswordEncoder passwordEncoder;
private final JwtUtil jwtUtil;
private final AuthenticationManager authenticationManager;
	
	public AuthenticationResponseAdmin registerAdmin(RegisterRequestAdmin req) {
		var admin=Admin.builder()
				.username(req.getUsername())
				.password(req.getPassword())
				.password(passwordEncoder.encode(req.getPassword()))
				.role(Role.ADMIN)
				.build();
		adminRepo.save(admin);
		System.out.println("REGISTERED");

		var jwtToken=jwtUtil.generateToken(admin);
		return AuthenticationResponseAdmin.builder().
				token(jwtToken).
				build();
	}

	public AuthenticationResponseAdmin authenticateAdmin(AuthenticationRequestAdmin req) {
		authenticationManager.authenticate(
new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
				);
		var admin=adminRepo.findByUsername(req.getUsername()).orElseThrow();
		var jwtToken=jwtUtil.generateToken(admin);
         System.out.println("AUTHENTICATION");
		return AuthenticationResponseAdmin.builder().
				token(jwtToken).
				build();
		}
}
