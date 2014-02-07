package com.github.ligangty.tictactoe;

import java.io.BufferedReader;
import java.io.IOException;

import javax.enterprise.context.ApplicationScoped;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.gson.Gson;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class UserResource {

    @POST
    public Response register(@Context HttpServletRequest request) {
        User user;
        try {
            BufferedReader reader = request.getReader();
            String line = reader.readLine();
            user = UserService.addNewUser(line);
            if (user == null) {
                return Response.status(Status.NOT_MODIFIED).build();
            }
            return Response.ok(new Gson().toJson(user)).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GET
    public Response getUser(@QueryParam("oid") String oid) {
        User user = UserService.getUserByOid(oid);
        if (user != null) {
            return Response.ok(new Gson().toJson(user)).build();
        }
        return Response.status(Status.NOT_FOUND).build();
    }

}
