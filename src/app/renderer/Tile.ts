import { Injectable } from "@angular/core";
import { TILESIZE, MOVESPEED } from "../config";

@Injectable({
  providedIn: 'root'
})

export class TileRenderer {
  grass!: HTMLImageElement;
  dirt!: HTMLImageElement;
  tree!: HTMLImageElement;



  constructor() {
    this.grass = new Image();
    this.grass.src = 'assets/grass.png';
    this.dirt = new Image();
    this.dirt.src = 'assets/dirt.png';
    this.tree = new Image();
    this.tree.src = 'assets/tree.png';
  }

  getTexture(id: number, layer: number) {
    switch (layer) {
      case 0:
        switch (id) {
          case 0x01:
        }
        break;
      case 1:
        switch (id) {
          case 0x01:
          case 0x81:
        }
        break;
      case 2:
        switch (id) {
          case 0x01:
          case 0x81:
        }
        break;
    }
    return null;
  }

  renderGround(id: number, context: CanvasRenderingContext2D, r: number, c: number) {
    context.drawImage(this.grass, r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE);
  }

  // ground 0x0001 - 0x00ff, terrain 0x0100 - 0xff00
  renderTerrain(id: number, context: CanvasRenderingContext2D, r: number, c: number) {
    // which terrain?
    context.drawImage(this.dirt, r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE);
  }

  // 0x0000 to 0xffff
  renderObject(id: number, context: CanvasRenderingContext2D, r: number, c: number) {
    context.drawImage(this.tree, r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE);
  }

}
