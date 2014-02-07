package com.github.ligangty.tictactoe;

public class MockRoomGenerator {
    public static Room generateMockRoom(){
        Room room = new Room();
        room.setRoomId(System.currentTimeMillis());
        room.setOpen(true);
        
        return room;
    }
}
