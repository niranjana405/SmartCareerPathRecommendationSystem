package com.niranjana.SecurityModule;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtil {

	private static final String secret_key = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

	public String extUsername(String token) {
		return extClaim(token, Claims::getSubject);
	}

	public Date extExpiration(String token) {
		return extClaim(token, Claims::getExpiration);
	}

	public <T> T extClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extAllClaims(token);
		return claimsResolver.apply(claims);
	}

	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>(), userDetails);
	}

	private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

		return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
				.signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();

	}

	public Boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extUsername(token);
		return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
	}

	private Boolean isTokenExpired(String token) {
		return extExpiration(token).before(new Date());
	}

	private Claims extAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
	}

	private Key getSignInKey() {

		byte[] keyBytes = Decoders.BASE64.decode(secret_key);
		return Keys.hmacShaKeyFor(keyBytes);
	}

}
