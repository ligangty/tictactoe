package com.github.ligangty.tictactoe;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.Gson;

public class UserService {
	private static final Set<User> userCache = Collections
			.synchronizedSet(new HashSet<User>());

	public static User getUserFromCacheByOid(String oid) {
		for (User user : userCache) {
			if (oid.equals(user.getOid())) {
				return user;
			}
		}
		return null;
	}

	public static User getUserByUsername(String username) {
		for (User user : userCache) {
			if (username.equals(user.getUsername())) {
				return user;
			}
		}
		return null;
	}

	public static User getUserByOid(String oid) {
		for (User user : userCache) {
			if (oid.equals(user.getOid())) {
				return user;
			}
		}
		return null;
	}

	public static boolean isUserRegistered(String username) {
		return getUserByUsername(username) != null;
	}

	public static boolean isUserExists(String oid) {
		return getUserByOid(oid) != null;
	}

	public static User addNewUser(String userJson) {
		User user = new Gson().fromJson(userJson, User.class);
		if (isUserRegistered(user.getUsername())) {
			return null;
		}
		user.setOid(System.currentTimeMillis() + "");
		user.setOnline(true);
		userCache.add(user);
		return user;
	}
}
