package com.marketplace.backend.exception;

public class CategoryDeletionException extends RuntimeException{
    public CategoryDeletionException(String message) {
        super(message);
    }
}
