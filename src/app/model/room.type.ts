import { User } from "./user.type"
export interface Room {
  roomId: number;
  // roomName:string;
  creator: User;
  attenders: Set<User>;
  isOpen: boolean;
}