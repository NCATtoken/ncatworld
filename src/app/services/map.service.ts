import { Injectable } from '@angular/core';

export class MapTile {
  type!: number;
  imageUrl!: string;
}

export interface Coordinate {
  x: number; y: number;
}

@Injectable({
  providedIn: 'root'
})


export class MapService {

  dirt!: HTMLImageElement;
  water!: HTMLImageElement;
  grass!: HTMLImageElement;
  tree!: HTMLImageElement;
  w = 1000; h = 1000;
  map: (string | undefined)[][] = [];
  overlay: (string | undefined)[][] = [];


  constructor() {

    this.dirt = new Image();
    this.dirt.src = 'assets/dirt.png';
    this.grass = new Image();
    this.grass.src = 'assets/grass.png';
    this.water = new Image();
    this.water.src = 'assets/water.png';
    this.tree = new Image();
    this.tree.src = 'assets/tree.png';

    try {
      this.map = JSON.parse(sessionStorage.getItem('map') || '[]');
      this.overlay = JSON.parse(sessionStorage.getItem('overlay') || '[]');
    } catch (e) {
      console.log(e);
    }

    if (!this.map || !this.map.length || !this.overlay || !this.overlay.length)
      // init blank map
      for (let r = 0; r < 100; r++) {
        var a: (string | undefined)[] = [];
        for (let c = 0; c < 100; c++) {
          a.push(undefined);
        }
        this.map.push(a);
        var b = [];
        for (let c = 0; c < 100; c++) {
          b.push(undefined);
        }
        this.overlay.push(b);
      }
  }

  getBg(x: number, y: number): HTMLImageElement {
    switch (this.map[x][y]) {
      case 'water': return this.water;
      case 'grass': return this.grass;
    }
    return this.dirt;
  }

  getOverlay(x: number, y: number): HTMLImageElement | undefined {
    switch (this.overlay[x][y]) {
      case 'tree': return this.tree;
    }
    return undefined;
  }

  isBlocking(x: number, y: number): boolean {
    switch (this.map[x][y]) {
      case 'water': return true;
    }
    if (this.overlay[x][y]) {
      return true;
    }
    return false;
  }

  setBg(c: Coordinate, type?: string) {
    this.map[c.x][c.y] = type;
    sessionStorage.setItem('map', JSON.stringify(this.map));
  }

  setOverlay(c: Coordinate, type?: string) {
    this.overlay[c.x][c.y] = type;
    sessionStorage.setItem('overlay', JSON.stringify(this.overlay));
  }
}
