package com.fams.api.services;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.fams.api.entity.UserModel;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomOAuth2User implements OAuth2User {

    private final UserModel user;
    private final Map<String, Object> attributes;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomOAuth2User(UserModel user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;

        UserDetails userDetails = new CustomUserDetails(user);
        this.authorities = userDetails.getAuthorities();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return user.getEmail();
    }

    public UserModel getUser() {
        return user;
    }
}
