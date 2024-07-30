package com.fams.api.services;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.fams.api.entity.Permission;
import com.fams.api.entity.Role;
import com.fams.api.entity.UserModel;

public class CustomOAuth2User implements OAuth2User {
    private final UserModel user;
    private final Map<String, Object> attributes; // Store attributes directly
    private final Set<GrantedAuthority> authorities = new HashSet<>();

    public CustomOAuth2User(UserModel user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes; // Store attributes

        initializeAuthorities();
    }

    private void initializeAuthorities() {
        Role role = user.getRole();

        // Add authorities directly (without setting on OAuth2UserAuthority)
        authorities.add(new SimpleGrantedAuthority(role.getName()));

        addPermissionIfAllowed(role.getSyllabusPermission(), "SYLLABUS");
        addPermissionIfAllowed(role.getTrainingProgramPermission(), "TRAININGPROGRAM");
        addPermissionIfAllowed(role.getClassPermission(), "CLASS");
        addPermissionIfAllowed(role.getLearningMaterialPermission(), "LEARNINGMATERIAL");
        addPermissionIfAllowed(role.getUserPermission(), "USER");
    }

    private void addPermissionIfAllowed(Permission permission, String resource) {
        switch (permission.getName()) {
            case "View":
                authorities.add(new SimpleGrantedAuthority("VIEW_" + resource.toUpperCase()));
                break;
            case "Modify":
                authorities.add(new SimpleGrantedAuthority("MODIFY_" + resource.toUpperCase()));
                break;
            case "Create":
                authorities.add(new SimpleGrantedAuthority("CREATE_" + resource.toUpperCase()));
                break;
            case "Full access":
                authorities.add(new SimpleGrantedAuthority("VIEW_" + resource.toUpperCase()));
                authorities.add(new SimpleGrantedAuthority("MODIFY_" + resource.toUpperCase()));
                authorities.add(new SimpleGrantedAuthority("CREATE_" + resource.toUpperCase()));
                break;
            // No need to handle "Access denied" explicitly
        }
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

    // Additional methods (if needed)
    public UserModel getUser() {
        return user;
    }
}
