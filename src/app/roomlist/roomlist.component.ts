import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { RoomService } from '../services/room.service';
import { UserService } from '../services/user.service';
import { BroadcastService } from '../services/broadcast.service';
import User from '../model/user.type';
import Room from '../model/room.type';
import { RoomEvent, isInstanceOfRoomEvent } from '../model/roomevent.type';

@Component({
  selector: 'app-room-list',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export default class RoomListComponent implements OnInit {
  private message: string;
  private user: User;
  private rooms: Array<Room>
  private loading: boolean = true;
  private oid: string;
  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private broadcast: BroadcastService,
    private router: ActivatedRoute,
    private location: Location) {
    router.params.subscribe(params => { console.log(params); this.oid = params.oid });
    broadcast.subscribe(v => {
      if (isInstanceOfRoomEvent(v)) {
        let re = v as RoomEvent;
        if (re.indicator === "NEW_ROOM_UPDATE") {
          //TODO: need to let room knew a room has been updated here
        }
      }
    })
  }

  ngOnInit() {
    if (!this.user) {
      this.userService.getUser(this.oid).subscribe(
        (u: User) => this.user = u,
        (error: HttpErrorResponse) => this.message = error.statusText
      );
    }

    if (!this.rooms) {
      this.roomService.queryRooms().subscribe(
        r => { this.rooms = r; this.loading = false; },
        (error: HttpErrorResponse) => this.message = error.statusText
      )
    }
  }

  createRoom() {
    let newRoom: Room = {
      roomId: undefined,
      creator: this.user,
      attenders: undefined,
      isOpen: undefined
    };
    this.roomService.createRoom(newRoom).subscribe(
      r => {
        newRoom = r;
        this.broadcast.broadcast({
          indicator: "NEW_ROOM_UPDATE",
          room: newRoom
        });
        this.location.go(`play/${newRoom.roomId}`);
      },

    );
    (error: HttpErrorResponse) => this.message = error.statusText
  }

}