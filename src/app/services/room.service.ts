import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from '../model/room.type';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RoomService {
  readonly apiUrl: string = environment.apiRoot + "room";
  constructor(private http: HttpClient) { }

  public getRoom(roomId: string): Observable<any> {
    return this.http.get(this.apiUrl, { params: { "roomId": roomId } });
  }

  public createRoom(room: Room): Observable<any> {
    return this.http.post(this.apiUrl, room);
  }
}