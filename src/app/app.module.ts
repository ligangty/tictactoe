import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import BlockComponent from './play/block/block.component'
import PlayComponent from './play/play.component';
import RegisterComponent from './register/register.component';
import RoomListComponent from './roomlist/roomlist.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    RegisterComponent,
    BlockComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
