import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/services/Player';

@Component({
  selector: 'app-command-menu',
  templateUrl: './command-menu.component.html',
  styleUrls: ['./command-menu.component.scss']
})
export class CommandMenuComponent implements OnInit {

  @Output() drop = new EventEmitter<string>();
  @Output() build = new EventEmitter<string>();
  @Output() buy = new EventEmitter<number>();
  @Input() showmenu: boolean = false;
  action = '';

  constructor(public player: Player) { }

  ngOnInit(): void {
    this.action = '';
  }

  dropItem(item?: string) {
    this.drop.emit(item);
  }

  buildItem(item?: string) {
    this.build.emit(item);
  }

  purchaseItem(tokens: number) {
    this.buy.emit(tokens);
  }
}
