package com.sliit.smartlady.model;

/**
 * Created by Fazeel on 10/15/2016.
 */
public class User {
    private int id;
    private String fullname;
    private String password;
    private String email;
    private int userrole;
    private String address;
    private String userdescription;
    private String imagePath;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getUserrole() {
        return userrole;
    }

    public void setUserrole(int userrole) {
        this.userrole = userrole;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserdescription() {
        return userdescription;
    }

    public void setUserdescription(String userdescription) {
        this.userdescription = userdescription;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullname='" + fullname + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", userrole='" + userrole + '\'' +
                ", address='" + address + '\'' +
                ", usrdescription='" + userdescription + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
