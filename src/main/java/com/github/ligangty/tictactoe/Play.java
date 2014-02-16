package com.github.ligangty.tictactoe;

public class Play {
    private Long roomId;
    private String playerOid;
    private String clicked;

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getPlayerOid() {
        return playerOid;
    }

    public void setPlayerOid(String playerOid) {
        this.playerOid = playerOid;
    }

    public String getClicked() {
        return clicked;
    }

    public void setClicked(String clicked) {
        this.clicked = clicked;
    }

    @Override
    public String toString() {
        return "the play is: roomId:" + this.roomId + ",playerOid:" + this.playerOid + ",clicked:" + this.clicked;
    }

}
