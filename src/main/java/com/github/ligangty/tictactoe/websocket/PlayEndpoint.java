package com.github.ligangty.tictactoe.websocket;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.github.ligangty.tictactoe.Play;
import com.google.gson.Gson;

@ServerEndpoint("/play/{roomId}")
public class PlayEndpoint {
    @OnMessage
    public String handlePlay(Session session, String message, @PathParam("roomId") String roomId) {
        Play play = new Gson().fromJson(message, Play.class);
        System.out.println("roomId is:" + roomId);
        System.out.println(play);
        return message;
    }

    @OnOpen
    public void myOnOpen(Session session, @PathParam("roomId") String roomId) {
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnClose
    public void myOnClose(CloseReason reason) {
        System.out.println("Closing a WebSocket due to " + reason.getReasonPhrase());
    }

    @OnError
    public void error(Session session, Throwable t) {
        t.printStackTrace();
    }
}
