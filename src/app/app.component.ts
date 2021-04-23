import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { Player } from './services/Player';
import { TARGETFPS, TILESIZE } from "./config";
import { Coordinate, MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'NCAT World';
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  showmenu = false;
  mode?: string;
  type?: string;

  w = 0; h = 0;
  bg!: HTMLImageElement;
  cursorAt: Coordinate = { x: 0, y: 0 };

  constructor(private player: Player, private map: MapService) {
    //
  }

  @HostListener('window:resize')
  windowResize() {
    this.resizeCanvas();
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    event.stopPropagation();
    switch (event.key) {
      case '/':
        this.showmenu = !this.showmenu;
        break;
      case 'Escape':
        this.showmenu = false;
        delete this.mode;
        delete this.type;
        break;
    }

  }


  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    this.resizeCanvas();

    setInterval(() => this.draw(), 1000 / TARGETFPS); // 30fps
  }

  draw() {
    for (let r = 0; r < this.w / TILESIZE; r++) {
      for (let c = 0; c < this.h / TILESIZE; c++) {
        this.ctx.drawImage(this.map.getBg(r, c), r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE)
        let o = this.map.getOverlay(r, c);
        if (o) {
          this.ctx.drawImage(o, r * TILESIZE, c * TILESIZE, TILESIZE, TILESIZE);
        }
      }
    }
    this.drawHighlighted();
    this.player.draw(this.ctx);
  }

  resizeCanvas() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.nativeElement.width = this.w;
    this.canvas.nativeElement.height = this.h;
    this.draw();
  }

  clickCanvas(event: MouseEvent) {
    // hide menu
    if (this.showmenu) {
      this.showmenu = false;
      delete this.mode;
      return;
    }

    switch (this.mode) {
      case 'build':
        this.map.setBg(this.cursorAt, this.type);
        this.player.deductTokens(5);
        return;

      case 'drop':
        this.map.setOverlay(this.cursorAt, this.type);
        this.player.deductTokens(20);
        return;
    }

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.player.move(Math.floor(x / TILESIZE), Math.floor(y / TILESIZE));
  }

  drawHighlighted() {
    if (!this.mode) return;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.rect(this.cursorAt.x * TILESIZE, this.cursorAt.y * TILESIZE, TILESIZE, TILESIZE);
    this.ctx.stroke();
  }

  pointCanvas(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.cursorAt = { x: Math.floor(x / TILESIZE), y: Math.floor(y / TILESIZE) };
  }

  drop(e: string) {
    this.mode = 'drop';
    this.type = e;
    this.showmenu = false;
  }

  buy(e: number) {
    this.player.addTokens(e);
    this.showmenu = false;
  }

  build(e: string) {
    this.mode = 'build';
    this.type = e;
    this.showmenu = false;
  }
}