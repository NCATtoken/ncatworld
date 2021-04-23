import { Injectable } from "@angular/core";
import { TILESIZE, MOVESPEED } from "../config";
import { MapService } from "./map.service";

@Injectable({
    providedIn: 'root'
})

export class Player {
    img!: HTMLImageElement;
    x = 0;
    y = 0;
    moveTo?: { x: number, y: number } | undefined;
    direction = 1;
    balance = 0;

    constructor(private map: MapService) {
        this.img = new Image();
        this.img.src = 'assets/cat2.png';
        try {
            let c = JSON.parse(sessionStorage.getItem('player') || '');
            this.x = c.x || 0;
            this.y = c.y || 0;
            this.direction = c.d || 1;
            this.balance = c.bal || 0;
        } catch (error) {
            //
        }
    }

    move(x: number, y: number) {
        this.moveTo = { x, y };
    }

    draw(ctx: CanvasRenderingContext2D) {
        // calculate movement
        let oldy = this.y;
        let oldx = this.x;
        if (this.moveTo != null) {
            if (this.x > this.moveTo.x * TILESIZE) {
                this.x -= MOVESPEED;
                this.direction = 1;
            }
            else if (this.x < this.moveTo.x * TILESIZE) {
                this.x += MOVESPEED;
                this.direction = -1;
            }
            if (this.y > this.moveTo.y * TILESIZE) { this.y -= MOVESPEED; }
            else if (this.y < this.moveTo.y * TILESIZE) { this.y += MOVESPEED; }
        }

        this.checkValidMove(oldx, oldy);


        ctx.save();
        if (this.direction == -1) {
            ctx.translate(TILESIZE, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(this.img, this.direction * this.x, this.y, TILESIZE, TILESIZE);
        ctx.restore();
    }


    checkValidMove(oldx: number, oldy: number) {
        if (this.map.isBlocking(Math.ceil(this.x / TILESIZE), Math.ceil(this.y / TILESIZE))) {
            this.x = oldx;
            this.y = oldy;
            // stop moving
            this.move(Math.ceil(oldx / TILESIZE), Math.ceil(oldy / TILESIZE));
        }
        this.save();
    }

    //

    addTokens(tokens: number) {
        this.balance += tokens;
        this.save();
    }

    deductTokens(tokens: number) {
        this.balance -= tokens;
        this.save();
    }

    //
    save() {
        sessionStorage.setItem('player', JSON.stringify({ x: this.x, y: this.y, d: this.direction, bal: this.balance }));
    }
}