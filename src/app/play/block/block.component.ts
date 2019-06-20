import { Component, Input } from '@angular/core';
// import { EventEmitter} from '@angular/core';

import {PlayService} from '../../services/play.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export default class BlockComponent {
  

  @Input()
  private index: number;
  private imageUrl: string;
  private show = false;
  // private gameOver: EventEmitter<string> = new EventEmitter();
  constructor( private play:PlayService) { }

  setIndex(index:number){
    this.index = index;
  }

  clickBlock(){
      // console.log(this.index);
      let needChange = this.play
          .setPlayerAct(this.index);
      if (needChange.needChange) {
        this.imageUrl = needChange.image.image;
        this.show=true;
      }

      let winResult = this.play.decideWinning();
      if (winResult.isWin) {
        alert("Game Over!Congratulatios! user "
            + winResult.winner + " is winer!");
        // as game winning, broad cast "GAME_OVER" event to
        // notify all playDirectives to unbind click
        // function
        // this.gameOver.emit(null);
        
      }
      // when a click on this directive triggered, unbind it.
      // element.off("click");
      // $scope.image = playClickService.changeImageType();
    
  }
  
}
