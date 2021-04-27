import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { TARGETFPS, TILESIZE } from "./config";
import { MapService } from './services/map.service';
import { BuilderInfo, Coordinate } from './services/models';
import { PlayerService } from './services/player.service';

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
  cursorAt = new Coordinate;
  mode?: string;
  builderInfo?: BuilderInfo;
  pixelscale = 1;


  constructor(private player: PlayerService, private map: MapService) {
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
        if (!this.showmenu) {
          // mobile friendly, hide menu = end editor
          delete this.mode;
          delete this.builderInfo;
        }
        break;
      case 'Escape':
        this.showmenu = false;
        // this.showhighlight = false;
        delete this.mode;
        delete this.builderInfo;
        break;
    }

  }


  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    this.resizeCanvas();

    setInterval(() => this.renderframe(), 1000 / TARGETFPS);
  }

  renderframe() {
    this.map.render(this.ctx, this.player, this.mode ? this.cursorAt : null);
  }

  resizeCanvas() {
    this.pixelscale = (window.innerWidth < 640) ? 1 : 2;
    this.map.setViewportSize(window.innerWidth / this.pixelscale, window.innerHeight / this.pixelscale);
    this.canvas.nativeElement.width = window.innerWidth / this.pixelscale;
    this.canvas.nativeElement.height = window.innerHeight / this.pixelscale;
    this.renderframe();
  }

  _getCoordinate(event: MouseEvent): Coordinate {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    var c = new Coordinate;
    c.set(Math.floor(y / TILESIZE / this.pixelscale), Math.floor(x / TILESIZE / this.pixelscale));
    return c;
  }

  clickCanvas(event: MouseEvent) {
    // hide menu
    if (this.showmenu) {
      this.showmenu = false;
      delete this.mode;
      delete this.builderInfo;
      return;
    }

    switch (this.mode) {
      case 'build':
        try {
          this.player.deductTokens(this.builderInfo!.cost);
          this.map.build(this.cursorAt, this.builderInfo!);
        } catch (e) {
          alert(e);
        }
        return;

      case 'drop':
        try {
          this.player.deductTokens(this.builderInfo!.cost);
          this.map.drop(this.cursorAt, this.builderInfo!);
        } catch (e) {
          alert(e);
        }
        return;
    }

    const c = this._getCoordinate(event);
    this.player.moveTo(c);
  }

  pointCanvas(event: MouseEvent) {
    const c = this._getCoordinate(event);
    this.cursorAt = c;
  }

  drop(e: BuilderInfo) {
    this.mode = 'drop';
    this.builderInfo = e;
    this.showmenu = false;
  }

  burn(e: { tokens: number }) {
    this.player.burnTokens(e.tokens);
    this.showmenu = false;
  }

  build(e: BuilderInfo) {
    this.mode = 'build';
    this.builderInfo = e;
    this.showmenu = false;
  }
}