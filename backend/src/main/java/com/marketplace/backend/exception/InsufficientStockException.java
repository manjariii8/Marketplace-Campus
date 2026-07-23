package com.marketplace.backend.exception;

public class InsufficientStockException extends RuntimeException {

    public InsufficientStockException(
            String product,
            Integer available,
            Integer requested
    ) {
        super("Product '" + product +
                "' has only " + available +
                " items available. Requested: " + requested);
    }

}