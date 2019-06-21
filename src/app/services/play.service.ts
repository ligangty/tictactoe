import { Injectable } from '@angular/core';

import ImageType from '../model/imagetype.type'; 

@Injectable({ providedIn: 'root' })
export class PlayService {
  private readonly BLOCK_IMAGE: ImageType = {
    image: "assets/block.gif",
    type: 1
  }
  private readonly CIRCLE_IMAGE: ImageType = {
    image: "assets/circle.gif",
    type: 2
  }
  private readonly WINNING_RULESET = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  private ticMatrix = [
    {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    }, {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    },
    {
      type: 0,
      clicked: false
    }]

  private currentImageType: string

  public changeImgType(): ImageType {
    if (this.currentImageType === "block") {
      this.currentImageType = "circle";
      return this.CIRCLE_IMAGE;
    } else {
      this.currentImageType = "block";
      return this.BLOCK_IMAGE;
    }
  }

  public setPlayerAct(clickedDivIndex: number): { needChange: boolean, image: ImageType } {
    if (this.ticMatrix[clickedDivIndex].clicked === true) {
      return { needChange: false, image: null };
    } else {
      var changedImage = this.changeImgType();
      this.ticMatrix[clickedDivIndex].type = changedImage.type;
      this.ticMatrix[clickedDivIndex].clicked = true;
      return {
        needChange: true,
        image: changedImage
      };
    }
  }

  public decideWinning(): { isWin: boolean, winner: number } {
    for (var index = 0; index < this.WINNING_RULESET.length; index++) {
      var winRule = this.WINNING_RULESET[index];
      if ((this.ticMatrix[winRule[0]].type !== 0)
        && (this.ticMatrix[winRule[0]].type === this.ticMatrix[winRule[1]].type)
        && (this.ticMatrix[winRule[0]].type === this.ticMatrix[winRule[2]].type)) {
        return {
          isWin: true,
          winner: this.ticMatrix[winRule[0]].type
        };
      }
    }
    return {
      isWin: false,
      winner: null
    };
  }
}