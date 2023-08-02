	package com.niranjana.UserModule;
	
	import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
	
	
	public interface UsersRepo extends JpaRepository<Users, Long>{
		Optional<Users>  findByEmail(String email);
		
	}
