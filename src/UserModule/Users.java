package com.niranjana.UserModule;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.*;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.niranjana.careerrecomendationmodule.CareerReport;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.JoinColumn;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Users implements UserDetails{

		private static final long serialVersionUID = -5929756509697881313L;
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long userId;
		private String firstName;
		private String lastName;
		private String email;
		private String password;			    
		@Enumerated(EnumType.STRING)
		private Role role;
		
		
	    @JsonIgnore
		@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	    private List<CareerReport> careerReports;

		
		
		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			
			return List.of(new SimpleGrantedAuthority(role.name()));
		}
		@Override
		public boolean isAccountNonExpired() {
			return true;
		}
		@Override
		public boolean isAccountNonLocked() {
			return true;
		}
		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}
		@Override
		public boolean isEnabled() {
			return true;
		}
		@Override
		public String getUsername() {
			return email;
		}
		@Override
		public String getPassword() {
			return password;
		}
	}
