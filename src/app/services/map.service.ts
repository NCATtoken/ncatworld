import { Injectable } from '@angular/core';
import { TILESIZE, WORLDSIZE } from '../config';
import { PlayerRenderer } from '../renderer/Player';
import { TileRenderer } from '../renderer/Tile';
import { BuilderInfo, Coordinate } from './models';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})


export class MapService {
  private viewportWidth = 1000;
  private viewportHeight = 1000;
  private map: number[][] = [];

  constructor(private tileRenderer: TileRenderer) {

    try {
      this.map = JSON.parse(sessionStorage.getItem('map') || '[][]');
    } catch (e) {
      //
    }

    if (!this.map || !this.map.length)
      // init blank map
      for (let r = 0; r < WORLDSIZE; r++) {
        var a: number[] = [];
        for (let c = 0; c < WORLDSIZE; c++) {
          a.push(0);
        }
        this.map.push(a);
      }
  }


  setViewportSize(width: number, height: number) {
    this.viewportWidth = width;
    this.viewportHeight = height;
  }

  build(pos: Coordinate, info: BuilderInfo) {
    this._setmap(pos, info.id!, 8 * info.layer);
  }

  drop(pos: Coordinate, info: BuilderInfo) {
    this.map[pos.r][pos.c] = 0;
    sessionStorage.setItem('map', JSON.stringify(this.map));
  }

  private _setmap(pos: Coordinate, id: number, shift: number) {
    this.map[pos.r][pos.c] = this.map[pos.r][pos.c] & ~(0xff << shift) | ((id & 0xff) << shift);
    sessionStorage.setItem('map', JSON.stringify(this.map));
  }

  private isBlocked(pos: Coordinate): boolean {
    return (this.map[pos.r][pos.c] & 0x808080) !== 0;
  }

  // update next move
  private nextframe(player: PlayerService) {
    player.nextframe((c) => this.isBlocked(c));
  }

  private getSurrounding(id: number, shift: number, r: number, c: number): number {
    var ret = 0;
    var WSLIMIT = WORLDSIZE - 1;
    // check if each surrounding block is same type and sum the weight
    if ((c == 0 && r == 0) || ((this.map[r - 1][c - 1] >> shift & 0xff) == id)) ret |= 0x01;
    if ((c > 0 && c < WSLIMIT && r == 0) || ((this.map[r - 1][c] >> shift & 0xff) == id)) ret |= 0x02;
    if ((c == WSLIMIT && r == 0) || ((this.map[r - 1][c + 1] >> shift & 0xff) == id)) ret |= 0x04;
    if ((c == WSLIMIT && r > 0 && r < WSLIMIT) || ((this.map[r][c + 1] >> shift & 0xff) == id)) ret |= 0x08;
    if ((c == WSLIMIT && r == WSLIMIT) || ((this.map[r + 1][c + 1] >> shift & 0xff) == id)) ret |= 0x10;
    if ((c > 0 && c < WSLIMIT && r == WSLIMIT) || ((this.map[r + 1][c] >> shift & 0xff) == id)) ret |= 0x20;
    if ((c == 0 && r == WSLIMIT) || ((this.map[r + 1][c - 1] >> shift & 0xff) == id)) ret |= 0x40;
    if ((c == 0 && r > 0 && r < WSLIMIT) || ((this.map[r][c - 1] >> shift & 0xff) == id)) ret |= 0x80;

    return ret;
  }

  render(context: CanvasRenderingContext2D, player: PlayerService, highlight: Coordinate | null,) {
    this.nextframe(player);
    let sw = Math.ceil(this.viewportWidth / TILESIZE);
    let sh = Math.ceil(this.viewportHeight / TILESIZE);
    for (let r = 0; r < sh; r++) {
      for (let c = 0; c < sw; c++) {
        this.tileRenderer.renderGround(0, 0xff, context, r, c);

        // ground
        var id;
        if (id = this.map[r][c] & 0xff) {
          let variant = this.getSurrounding(id, 0, r, c);
          this.tileRenderer.renderGround(id, variant, context, r, c);
        }
        // terrain
        if (id = this.map[r][c] >> 8 & 0xff) {
          let variant = this.getSurrounding(id, 8, r, c);
          this.tileRenderer.renderTerrain(id, variant, context, r, c);
        }
        // builds
        if (id = this.map[r][c] >> 16 & 0xff) {
          let variant = this.getSurrounding(id, 16, r, c);
          this.tileRenderer.renderObject(id, variant, context, r, c);
        }
        // context.drawImage(this.map.getBg(r, c), r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE)
        // let o = this.map.getOverlay(r, c);
        // if (o) {
        //   context.drawImage(o, r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE);
        // }
      }
    }

    player.render(context);
    if (highlight !== null) {
      this._drawHighlighted(context, highlight);
    }
  }

  private _drawHighlighted(context: CanvasRenderingContext2D, pos: Coordinate) {
    context.save();
    context.beginPath();
    context.strokeStyle = "white";
    context.rect(pos.x, pos.y, TILESIZE, TILESIZE);
    context.stroke();
    context.restore();
  }

}
