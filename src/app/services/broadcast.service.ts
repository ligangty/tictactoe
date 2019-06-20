// import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BroadcastService {
  private notify: EventEmitter<string> = new EventEmitter<string>();

  public broadcast(value: string): void {
    this.notify.emit(value);
  }

  public subscribe(f:Function):void {
    this.notify.subscribe(v=>f(v));
  }
}
