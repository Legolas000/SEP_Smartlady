package com.sliit.smartlady.model;

/**
 * Created by ARHAM on 10/15/2016.
 */

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class fileUpload {

    private List<MultipartFile> crunchifyFiles;

    public List<MultipartFile> getFiles() {
        return crunchifyFiles;
    }

    public void setFiles(List<MultipartFile> files) {
        this.crunchifyFiles = files;
    }

    private MultipartFile file;

    public void setFile(MultipartFile file)
    {
        this.file = file;
    }

    public MultipartFile getFile(){
        return this.file;
    }
}