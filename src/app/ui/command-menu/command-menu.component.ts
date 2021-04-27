import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuilderInfo } from 'src/app/services/models';

@Component({
  selector: 'app-command-menu',
  templateUrl: './command-menu.component.html',
  styleUrls: ['./command-menu.component.scss']
})

export class CommandMenuComponent implements OnInit {

  @Output() drop = new EventEmitter<BuilderInfo>();
  @Output() build = new EventEmitter<BuilderInfo>();
  @Output() burn = new EventEmitter<{ tokens: number }>();
  @Input() showmenu: boolean = false;
  action = '';

  buildables: any[][][] = [
    [['Dirt', 0x01, 0, 1],],
    [['Water', 0x81, 1, 2],],
    [['Tree', 0x81, 2, 3],],
  ];

  constructor() { }

  ngOnInit(): void {
    this.action = '';
  }

  sendDrop(layer: number, cost: number) {
    this.drop.emit({ layer, cost });
  }

  sendBuild(id: number, layer: number, cost: number) {
    this.build.emit({ id, layer, cost });
  }

  sendBurn(tokens: number) {
    this.burn.emit({ tokens });
    this.showmenu = false;
  }
}
