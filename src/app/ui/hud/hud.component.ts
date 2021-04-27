import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HUDComponent implements OnInit {

  constructor(public player: PlayerService) { }

  ngOnInit(): void {
  }

}
