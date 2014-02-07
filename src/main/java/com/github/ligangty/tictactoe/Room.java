package com.github.ligangty.tictactoe;

import java.util.HashSet;
import java.util.Set;

public class Room {
    private Long roomId;
//    private String roomName;
    private User creator;
    private Set<User> attenders = new HashSet<User>();
    private boolean isOpen;

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

//    public String getRoomName() {
//        return roomName;
//    }
//
//    public void setRoomName(String roomName) {
//        this.roomName = roomName;
//    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Set<User> getAttenders() {
        return attenders;
    }

    public void setAttenders(Set<User> attenders) {
        this.attenders = attenders;
    }

    public boolean isRoomFull() {
        return attenders.size() == Constant.MAX_ROOM_ATTENDER_NUM;
    }

    public void addAttender(User user) {
        for (User userIn : attenders) {
            if (!user.getUsername().equals(userIn.getUsername())) {
                attenders.add(user);
            }
        }
    }

    public void removeAttender(User user) {
        for (User userIn : attenders) {
            if (user.getUsername().equals(userIn.getUsername())) {
                attenders.remove(userIn);
            }
        }
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean isOpen) {
        this.isOpen = isOpen;
    }

    @Override
    public int hashCode() {
        return 31 + roomId.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Room)) {
            return false;
        } else {
            Room object = (Room) obj;
            return this.roomId == object.roomId;
        }

    }
}
