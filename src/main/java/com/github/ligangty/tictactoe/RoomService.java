package com.github.ligangty.tictactoe;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class RoomService {
    private static final List<Room> waitingRooms = new ArrayList<Room>();
    private static final List<Room> playingRooms = new ArrayList<Room>();
    static {
        for (int i = 0; i < 5; i++) {
            waitingRooms.add(MockRoomGenerator.generateMockRoom());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static Room createNewRoom(String roomJson) {
        Room room = new Gson().fromJson(roomJson, Room.class);
        room.setRoomId(System.currentTimeMillis());
        room.setOpen(true);
        waitingRooms.add(room);
        return room;
    }

    public static List<Room> getAllRooms() {
        List<Room> allRooms = new ArrayList<Room>();
        allRooms.addAll(waitingRooms);
        allRooms.addAll(playingRooms);
        return allRooms;
    }

    public static Room startRoomGame(String roomJson) {
        Room tempRoom = new Gson().fromJson(roomJson, Room.class);
        if (tempRoom.getAttenders().size() != Constant.MAX_ROOM_ATTENDER_NUM) {
            return null;
        }

        Room handlingRoom = getWaitingRoomById(tempRoom.getRoomId());
        if (handlingRoom != null) {
            handlingRoom.getAttenders().addAll(handlingRoom.getAttenders());
            if (handlingRoom.isRoomFull()) {
                handlingRoom.setOpen(false);
                waitingRooms.remove(handlingRoom);
                playingRooms.add(handlingRoom);
            } else {
                return null;
            }
        } else {
            return null;
        }

        return handlingRoom;
    }

    public static Room endRoomGame(String roomJson) {
        Room tempRoom = new Gson().fromJson(roomJson, Room.class);
        Room handlingRoom = getPlayingRoomById(tempRoom.getRoomId());
        if (handlingRoom != null) {
            playingRooms.remove(handlingRoom);
            handlingRoom.setOpen(true);
            waitingRooms.add(handlingRoom);
        } else {
            return null;
        }

        return handlingRoom;
    }

    public static Room getWaitingRoomById(Long roomId) {
        for (Room room : waitingRooms) {
            if (room.getRoomId() == roomId) {
                return room;
            }
        }

        return null;
    }

    public static Room getPlayingRoomById(Long roomId) {
        for (Room room : playingRooms) {
            if (room.getRoomId() == roomId) {
                return room;
            }
        }

        return null;
    }

    public static boolean isUserInAnyRoomNow(String oid) {
        for (Room room : getAllRooms()) {
            for (User attender : room.getAttenders()) {
                if (oid.equals(attender.getOid())) {
                    return true;
                }
            }
        }
        return false;
    }
}
