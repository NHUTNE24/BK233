package com.fams.api.configure;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fams.api.entity.UserModel;
import com.fams.api.services.JwtService;
import com.fams.api.services.UserService;
import com.fams.api.services.CustomOAuth2User;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtService jwtService;

    @Value("${frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) oAuth2AuthenticationToken.getPrincipal();
        Map<String, Object> attributes = defaultOAuth2User.getAttributes();
        String email = attributes.getOrDefault("email", "").toString();
        String name = attributes.getOrDefault("name", "").toString();

        String avatarUrl = null;
        String accountName = null;
        UserModel user = null;

        if ("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
            avatarUrl = attributes.getOrDefault("picture", "").toString();
        } else if ("facebook".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
            Map<String, Object> pictureData = (Map<String, Object>) attributes.get("picture");
            if (pictureData != null && pictureData.containsKey("data")) {
                Map<String, Object> data = (Map<String, Object>) pictureData.get("data");
                avatarUrl = data.getOrDefault("url", "").toString();
            }
        }

        Optional<UserModel> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            user = optionalUser.get();  
            accountName = user.getFullname();
            if (accountName.isEmpty()) accountName = name;
        } else {
            String redirectUrl = frontendUrl + "/login?error=UserNotFound";
            response.sendRedirect(redirectUrl);
            return;
        }

        // Set the new authentication in the security context
        Authentication newAuthentication = new OAuth2AuthenticationToken(
            new CustomOAuth2User(user, attributes),
            authentication.getAuthorities(),
            oAuth2AuthenticationToken.getAuthorizedClientRegistrationId()
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String jwtToken = jwtService.generateToken(user);

        // Encode the parameters for the redirect URL
        String encodedJwtToken = URLEncoder.encode(jwtToken, StandardCharsets.UTF_8.toString());
        String encodedUsername = URLEncoder.encode(accountName, StandardCharsets.UTF_8.toString());
        String encodedAvatarUrl = URLEncoder.encode(avatarUrl, StandardCharsets.UTF_8.toString());

        // Construct the redirect URL
        String redirectUrl = String.format("%s/login-success?token=%s&username=%s&avatar=%s", frontendUrl, encodedJwtToken, encodedUsername, encodedAvatarUrl);
        response.sendRedirect(redirectUrl);
    }
}
