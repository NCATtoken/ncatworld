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
      console.log(e);
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

  build(at: Coordinate, info: BuilderInfo) {
    this._setmap(at, info.id!, 8 * info.layer);
  }

  drop(at: Coordinate, info: BuilderInfo) {
    console.log(at, info);
    this.map[at.r][at.c] = 0;
    sessionStorage.setItem('map', JSON.stringify(this.map));
  }

  private _setmap(c: Coordinate, id: number, shift: number) {
    this.map[c.r][c.c] = this.map[c.r][c.c] & ~(0xff << shift) | ((id & 0xff) << shift);
    console.log(this.map);
    sessionStorage.setItem('map', JSON.stringify(this.map));
  }

  private isBlocked(c: Coordinate): boolean {
    return (this.map[c.r][c.c] & 0x808080) !== 0;
  }

  // update next move
  private nextframe(player: PlayerService) {
    player.nextframe((c) => this.isBlocked(c));
  }

  render(context: CanvasRenderingContext2D, player: PlayerService, highlight: Coordinate | null,) {
    this.nextframe(player);
    let sw = Math.ceil(this.viewportWidth / TILESIZE);
    let sh = Math.ceil(this.viewportHeight / TILESIZE);
    for (let r = 0; r < sw; r++) {
      for (let c = 0; c < sh; c++) {
        this.tileRenderer.renderGround(this.map[r][c] & 0xff, context, r, c);

        // ground
        if (this.map[r][c] & 0xff) {
          this.tileRenderer.renderTerrain(this.map[r][c] & 0xff, context, r, c);
        }
        // terrain
        if (this.map[r][c] >> 8 & 0xff) {
          this.tileRenderer.renderTerrain(this.map[r][c] >> 8 & 0xff, context, r, c);
        }
        // builds
        if (this.map[r][c] >> 16 & 0xff) {
          this.tileRenderer.renderObject(this.map[r][c] >> 16 & 0xff, context, r, c);
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

  private _drawHighlighted(context: CanvasRenderingContext2D, coordinate: Coordinate) {
    context.save();
    context.beginPath();
    context.strokeStyle = "white";
    context.rect(coordinate.x, coordinate.y, TILESIZE, TILESIZE);
    context.stroke();
    context.restore();
  }

}
