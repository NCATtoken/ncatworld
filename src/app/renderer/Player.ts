import { TILESIZE, MOVESPEED } from "../config";

// @Injectable({
//     providedIn: 'root'
// })

export class PlayerRenderer {

    avatar!: HTMLImageElement;

    constructor() {

        this.avatar = new Image();
        this.avatar.src = 'assets/player.png';
    }

    // direction: 0 = facing right, 1 = facing left
    render(context: CanvasRenderingContext2D, x: number, y: number, frame: number, moving: boolean, direction: number) {
        var f = 0;
        if (moving) {
            f = frame + (direction ^ 1);
        }
        else {
            f = direction * 3;
        }
        context.drawImage(this.avatar, f * TILESIZE, direction * TILESIZE, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
        // we dont do mirroring
        // context.save();
        // if (direction == -1) {
        //     context.translate(TILESIZE, 0);
        //     context.scale(-1, 1);
        // }
        // context.drawImage(this.img, this.direction * this.x, this.y, TILESIZE, TILESIZE);
        // context.restore();
    }

    // img!: HTMLImageElement;
    // x = 0;
    // y = 0;
    // moveTo?: { x: number, y: number } | undefined;
    // direction = 1;
    // keyframe = 0;

    // constructor(private map: MapService) {
    //     this.img = new Image();
    //     this.img.src = 'assets/cat2.png';
    //     try {
    //         let c = JSON.parse(sessionStorage.getItem('player') || '');
    //         this.x = c.x || 0;
    //         this.y = c.y || 0;
    //         this.direction = c.d || 1;
    //         this.balance = c.bal || 0;
    //     } catch (error) {
    //         //
    //     }
    // }

    // move(x: number, y: number) {
    //     this.moveTo = { x, y };
    // }

    // draw(context: CanvasRenderingContext2D) {
    //     // calculate movement
    //     let oldy = this.y;
    //     let oldx = this.x;
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


    //     context.save();
    //     if (this.direction == -1) {
    //         context.translate(TILESIZE, 0);
    //         context.scale(-1, 1);
    //     }
    //     context.drawImage(this.img, this.direction * this.x, this.y, TILESIZE, TILESIZE);
    //     context.restore();
    // }


    // checkValidMove(oldx: number, oldy: number) {
    //     if (this.map.isBlocking(Math.ceil(this.x / TILESIZE), Math.ceil(this.y / TILESIZE))) {
    //         this.x = oldx;
    //         this.y = oldy;
    //         // stop moving
    //         this.move(Math.ceil(oldx / TILESIZE), Math.ceil(oldy / TILESIZE));
    //     }
    //     this.save();
    // }

}