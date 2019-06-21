// import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BroadcastService {
  private notify: EventEmitter<any> = new EventEmitter<any>();

  public broadcast(value: any): void {
    this.notify.emit(value);
  }

  public subscribe(f:Function):void {
    this.notify.subscribe(v=>f(v));
  }
}
