import { TILESIZE } from "../config";

export interface BuilderInfo {
    id?: number;  //optional, no need for dropping tile
    layer: number;
    cost: number;
}

export class Coordinate {

    r: number;
    c: number;
    x: number;
    y: number;

    constructor() {
        this.r = this.c = this.x = this.y = 0;
    }

    copy(): Coordinate {
        var c = new Coordinate();
        c.set(this.r, this.c);
        return c;
    }

    set(r: number, c: number) {
        this.r = r;
        this.c = c;
        this.y = r * TILESIZE;
        this.x = c * TILESIZE;
    }

    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.updateRC();
    }

    // update R & C based on X and Y
    updateRC() {
        this.c = Math.ceil(this.x / TILESIZE);
        this.r = Math.ceil(this.y / TILESIZE);
    }
}
