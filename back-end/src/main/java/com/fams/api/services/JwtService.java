package com.fams.api.services;

import com.fams.api.entity.UserModel;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    final private String secret = "secret";


    public String generateToken(UserModel user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().getName());
        claims.put("authorities", new CustomUserDetails(user).getAuthorities()); 
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}