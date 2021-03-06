import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerRenderer } from './renderer/Player';
import { TileRenderer } from './renderer/Tile';
import { MapService } from './services/map.service';
import { CommandMenuComponent } from './ui/command-menu/command-menu.component';
import { HUDComponent } from './ui/hud/hud.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandMenuComponent,
    HUDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    MapService,
    PlayerRenderer,
    TileRenderer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
