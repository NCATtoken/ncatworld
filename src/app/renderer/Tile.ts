import { Injectable } from "@angular/core";
import { TILESIZE } from "../config";
import { tileStitcher } from "./TileStitcher";

@Injectable({
  providedIn: 'root'
})

export class TileRenderer {
  grass!: HTMLImageElement;
  dirt!: HTMLImageElement;
  water!: HTMLImageElement;
  tree!: HTMLImageElement;

  constructor() {
    this.grass = new Image();
    this.grass.src = 'assets/grass.png';
    this.dirt = new Image();
    this.dirt.src = 'assets/tiles/dirt.png';
    this.water = new Image();
    this.water.src = 'assets/tiles/water.png';
    this.tree = new Image();
    this.tree.src = 'assets/tree.png';
  }

  getTexture(id: number, layer: number, variant: number): { img: HTMLImageElement, r: number, c: number } {
    var img: HTMLImageElement = this.grass;
    switch (layer) {
      case 1:
        switch (id) {
          case 0x01:
            img = this.dirt;
            break;
        }
        break;
      case 2:
        switch (id) {
          case 0x81:
            img = this.water;
            break;
        }
        break;
    }

    return Object.assign({ img }, tileStitcher(variant));
  }


  renderGround(id: number, variant: number, context: CanvasRenderingContext2D, r: number, c: number) {
    if (id == 0) {
      context.drawImage(this.grass, c * TILESIZE, r * TILESIZE, TILESIZE, TILESIZE);
      return;
    }
    const res = this.getTexture(id, 1, variant);
    context.drawImage(res.img, res.c * TILESIZE, res.r * TILESIZE, TILESIZE, TILESIZE, c * TILESIZE, r * TILESIZE, TILESIZE, TILESIZE);
    // context.fillText('0x' + variant.toString(16).toUpperCase(), c * TILESIZE, r * TILESIZE + 20, TILESIZE - 4);
  }

  // ground 0x0001 - 0x00ff, terrain 0x0100 - 0xff00
  renderTerrain(id: number, variant: number, context: CanvasRenderingContext2D, r: number, c: number) {
    // which terrain?
    const res = this.getTexture(id, 2, variant);
    context.drawImage(res.img, res.c * TILESIZE, res.r * TILESIZE, TILESIZE, TILESIZE, c * TILESIZE, r * TILESIZE, TILESIZE, TILESIZE);
    // context.fillText('0x' + variant.toString(16).toUpperCase(), c * TILESIZE, r * TILESIZE + 20, TILESIZE - 4);
  }

  // 0x0000 to 0xffff
  renderObject(id: number, variant: number, context: CanvasRenderingContext2D, r: number, c: number) {
    context.drawImage(this.tree, c * TILESIZE, r * TILESIZE, TILESIZE, TILESIZE);
    // context.fillText('0x' + variant.toString(16).toUpperCase(), c * TILESIZE, r * TILESIZE + 20, TILESIZE - 4);
  }

}
