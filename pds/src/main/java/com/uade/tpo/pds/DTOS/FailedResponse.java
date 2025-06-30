package com.uade.tpo.pds.DTOS;

public class FailedResponse {
    private String message;

    public FailedResponse(String message) {
        this.message = message;
    }

    public FailedResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}