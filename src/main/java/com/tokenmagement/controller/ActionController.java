package com.tokenmagement.controller;

import java.awt.print.Book;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActionController {
    @PostMapping("/test")
    //return 201 instead of 200
    @ResponseStatus(HttpStatus.CREATED)
    public String newBook(@RequestBody Book newBook) {
        return "{\"kedar\":\"kedar\"}";
    }

}
