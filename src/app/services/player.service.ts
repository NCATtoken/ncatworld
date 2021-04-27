import { Injectable } from '@angular/core';
import { MOVESPEED } from '../config';
import { PlayerRenderer } from '../renderer/Player';
import { Coordinate } from './models';


@Injectable({
  providedIn: 'root'
})


export class PlayerService {
  deductTokens(cost: number) {
    console.log('deductTokens', cost);
    if (this.balance < cost) throw 'You are poor';
    this.balance -= cost;
  }
  burnTokens(e: number) {
    this.balance += e;
  }


  frame = 0;
  MAX_FRAMES = 3;
  coordinate = new Coordinate;
  destination?: Coordinate | null;
  moving = false;
  direction = 0; // 0 = facing right, 1 = facing left
  balance = 0;

  constructor(private playerRenderer: PlayerRenderer) {
  }

  nextframe(isBlocking: (c: Coordinate) => boolean) {

    if (this.destination == null) return;

    let old = this.coordinate.copy();
    var moving = false;

    if (this.coordinate.x > this.destination.x) {
      this.coordinate.x -= MOVESPEED;
      this.direction = 1;
      moving = true;
    }
    else if (this.coordinate.x < this.destination.x) {
      this.coordinate.x += MOVESPEED;
      this.direction = 0;
      moving = true;
    }

    if (this.coordinate.y > this.destination.y) {
      this.coordinate.y -= MOVESPEED;
      moving = true;
    }
    else if (this.coordinate.y < this.destination.y) {
      this.coordinate.y += MOVESPEED;
      moving = true;
    }

    this.coordinate.updateRC();

    if (isBlocking(this.coordinate)) {
      // if cannot move, restore and stop moving
      this.coordinate = old.copy();
      moving = false;
    }

    this.moving = moving;

    if (!moving) {
      // this.frame = 0;
      this.destination = null;
    }
    else {
      this.frame = (this.frame + 1) % this.MAX_FRAMES;
    }
  }

  render(context: CanvasRenderingContext2D) {
    this.playerRenderer.render(context, this.coordinate.x, this.coordinate.y, this.frame, this.moving, this.direction);
  }

  moveTo(coordinate: Coordinate) {
    this.destination = coordinate;
  }


  // draw(ctx: CanvasRenderingContext2D) {
  //     // calculate movement
  //     let old = this.coordinate.copy();

  //     if (this.moveTo != null) {
  //         if (this.x > this.moveTo.x * TILESIZE) {
  //             this.x -= MOVESPEED;
  //             this.direction = 1;
  //         }
  //         else if (this.x < this.moveTo.x * TILESIZE) {
  //             this.x += MOVESPEED;
  //             this.direction = -1;
  //         }
  //         if (this.y > this.moveTo.y * TILESIZE) { this.y -= MOVESPEED; }
  //         else if (this.y < this.moveTo.y * TILESIZE) { this.y += MOVESPEED; }
  //     }

  //     this.checkValidMove(oldx, oldy);


  //     ctx.save();
  //     if (this.direction == -1) {
  //         ctx.translate(TILESIZE, 0);
  //         ctx.scale(-1, 1);
  //     }
  //     ctx.drawImage(this.img, this.direction * this.x, this.y, TILESIZE, TILESIZE);
  //     ctx.restore();
  // }

}
