package com.niranjana.SecurityModule;

import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter{
	
	
	private final JwtUtil jwtUtil;

	private final UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain)
			throws ServletException, IOException {
		
		
		final String authheader=request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		if( authheader==null|| !authheader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		jwt=authheader.substring(7);
		userEmail=jwtUtil.extUsername(jwt);
		
		if(userEmail!=null &&  SecurityContextHolder.getContext().getAuthentication()==null) {
			
			 UserDetails userDetails=this.userDetailsService.loadUserByUsername(userEmail);
			 if(jwtUtil.isTokenValid(jwt, userDetails)) {
				 UsernamePasswordAuthenticationToken authenticateToken = new UsernamePasswordAuthenticationToken
						 (userDetails,null,userDetails.getAuthorities());
				 authenticateToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					 
					 SecurityContextHolder.getContext().setAuthentication(authenticateToken);
			 }
		}
		filterChain.doFilter(request, response);

		
	}
}