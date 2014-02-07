package com.github.ligangty.tictactoe;

public class User {
    private String oid;
    private String username;
    private boolean isOnline;

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean isOnline) {
        this.isOnline = isOnline;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof User)) {
            return false;
        } else {
            User object = (User) obj;
            if (this.oid == null || object.oid == null) {
                return false;
            } else {
                return this.oid.equals(object.oid) && this.username == (object.username);
            }
        }
    }

    @Override
    public int hashCode() {
        // TODO Auto-generated method stub
        return 31 + (this.oid == null ? 0 : this.oid.hashCode()) + (this.username == null ? 0 : this.username.hashCode());
    }
}
