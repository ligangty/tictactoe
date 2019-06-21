import Room from './room.type';
export interface RoomEvent{
  indicator:string;
  room: Room;
}

export function isInstanceOfRoomEvent(o: any): o is RoomEvent{
  return 'indicator' in o && 'room' in o;
}