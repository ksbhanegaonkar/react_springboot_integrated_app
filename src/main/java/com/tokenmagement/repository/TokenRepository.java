package com.tokenmagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tokenmagement.entity.Token;



public interface TokenRepository extends JpaRepository<Token, Long> {
}
