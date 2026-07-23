package com.marketplace.backend.exception;

public class IllegalOrderStateException extends RuntimeException{
    public IllegalOrderStateException(String message){
        super(message);

    }
}
