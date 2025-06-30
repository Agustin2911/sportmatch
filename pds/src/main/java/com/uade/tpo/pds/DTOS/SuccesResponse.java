package com.uade.tpo.pds.DTOS;

public class SuccesResponse {
    private String message;

    public SuccesResponse(String message) {
        this.message = message;
    }

    public SuccesResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}