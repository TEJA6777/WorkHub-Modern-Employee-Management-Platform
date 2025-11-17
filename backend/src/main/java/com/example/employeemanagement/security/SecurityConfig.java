package com.example.employeemanagement.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/** This class represents the security configuration. */
@EnableWebSecurity
public class SecurityConfig {

  /** The user details service. */
  @Autowired private UserDetailsService userDetailsService;

  /**
   * Password encoder.
   *
   * @return The password encoder
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Authentication provider.
   *
   * @return The authentication provider
   */
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  /**
   * Authentication manager bean.
   *
   * @param config The authentication configuration
   * @return The authentication manager
   * @throws Exception If an error occurs
   */
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
      throws Exception {
    return config.getAuthenticationManager();
  }

  /**
   * Configure security.
   *
   * @param http The HTTP security
   * @return The security filter chain
   * @throws Exception If an error occurs
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // Disable authentication for all routes
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authz -> authz.anyRequest().permitAll());
    return http.build();
  }
}
