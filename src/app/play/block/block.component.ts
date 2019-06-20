import {
  Component,
  Input
} from '@angular/core';

import { PlayService } from '../../services/play.service';
import { BroadcastService } from '../../services/broadcast.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export default class BlockComponent {
  private imageUrl: string;
  private show = false;
  private disabled = false;

  @Input()
  private index: number;
  // private gameOver: EventEmitter<string> = new EventEmitter();
  constructor(private play: PlayService, private broadcast: BroadcastService) {
    // When GAME_OVER was notified from other block, unbind the click event
    // handler by setting disabled of component
    broadcast.subscribe(v => {
      if (v === "GAME_OVER") {
        this.disabled = true;
      }
    });
  }

  setIndex(index: number) {
    this.index = index;
  }

  clickBlock() {
    console.log(this.index);
    let needChange = this.play
      .setPlayerAct(this.index);
    if (needChange.needChange) {
      this.imageUrl = needChange.image.image;
      this.show = true;
      // when a click on this directive triggered, unbind the click event handler.
      this.disabled = true;
    }

    let winResult = this.play.decideWinning();
    if (winResult.isWin) {
      alert("Game Over!Congratulatios! user "
        + winResult.winner + " is winer!");
      // as game winning, broad cast "GAME_OVER" event to
      // notify all playDirectives to unbind click
      // function
      this.broadcast.broadcast("GAME_OVER");
    }
  }

}
