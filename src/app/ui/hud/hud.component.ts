import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/services/Player';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HUDComponent implements OnInit {

  constructor(public player: Player) { }

  ngOnInit(): void {
  }

}
