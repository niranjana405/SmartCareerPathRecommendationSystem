	package com.niranjana.adminmodule;
	
	import java.util.Optional;
	
	import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.niranjana.UserModule.Users;
	
	@Repository
	public interface AdminRepo extends JpaRepository<Admin, Long>{
		Optional<Admin>  findByUsername(String username);
		
	}
