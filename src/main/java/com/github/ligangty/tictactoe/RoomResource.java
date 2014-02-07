package com.github.ligangty.tictactoe;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.gson.Gson;

@Path("/room")
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class RoomResource {

    @POST
    public Response createNewRoom(@Context HttpServletRequest request) {
        Room room;
        try {
            BufferedReader reader = request.getReader();
            String line = reader.readLine();
            room = RoomService.createNewRoom(line);
            if (room == null) {
                return Response.status(Status.NOT_MODIFIED).build();
            }
            return Response.ok(new Gson().toJson(room)).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    public Response listRooms() {
        return Response.ok(new Gson().toJson(RoomService.getAllRooms())).build();
    }

}
