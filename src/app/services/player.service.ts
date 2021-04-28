import { Injectable } from '@angular/core';
import { MOVESPEED } from '../config';
import { PlayerRenderer } from '../renderer/Player';
import { Coordinate } from './models';


@Injectable({
  providedIn: 'root'
})


export class PlayerService {
  deductTokens(cost: number) {
    if (this.balance < cost) throw 'Burn NCAT to fill your energy meter';
    this.balance -= cost;
    this.save();
  }

  burnTokens(e: number) {
    this.balance += e;
    this.save();
  }

  save() {
    sessionStorage.setItem('player', JSON.stringify({ balance: this.balance, r: this.coordinate.r, c: this.coordinate.c }))
  }


  frame = 0;
  MAX_FRAMES = 3;
  coordinate = new Coordinate;
  destination?: Coordinate | null;
  moving = false;
  direction = 0; // 0 = facing right, 1 = facing left
  balance = 0;

  constructor(private playerRenderer: PlayerRenderer) {
    try {
      let p = JSON.parse(sessionStorage.getItem('player') || '');
      if (p) {
        this.balance = p.balance || 0;
        this.coordinate.set(p.r, p.c);
      }
    } catch (e) {
      //
    }
  }

  nextframe(isBlocking: (pos: Coordinate) => boolean) {

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
    this.save();

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

  moveTo(pos: Coordinate) {
    this.destination = pos;
  }


}
