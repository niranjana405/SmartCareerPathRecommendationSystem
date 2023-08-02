
  package com.niranjana.SecurityModule;
  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder; 
  import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
  import org.springframework.security.config.annotation.web.builders.HttpSecurity;
  import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; 
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import lombok.RequiredArgsConstructor;
  
@Configuration
  @EnableWebSecurity 
  @RequiredArgsConstructor
  public class SecurityConfig  {
  
 
	private final JWTFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	
	  	http
	  	.csrf()
	  	.disable()
	  	.authorizeHttpRequests()
	  	.requestMatchers("/api/auth/**")
	  	.permitAll()
	  	.anyRequest()
	  	.authenticated()
	  	.and()
	  	.sessionManagement()
	  	.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	  	.and()
	  	.authenticationProvider(authenticationProvider)
	  	.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
  }
  
  }
 