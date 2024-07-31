package com.fams.api.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fams.api.entity.Permission;
import com.fams.api.entity.Role;
import com.fams.api.entity.UserModel;

public class CustomUserDetails implements UserDetails {
    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public CustomUserDetails(UserModel user) {
        this.username = user.getEmail();
        this.password = user.getPassword();

        Role role = user.getRole();
        this.authorities = new ArrayList<>();

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
            case "Access denied":
                break;
        }
    }

    // ... (các phương thức khác của UserDetails, ví dụ: isAccountNonExpired, isAccountNonLocked, isCredentialsNonExpired, isEnabled) ...

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}