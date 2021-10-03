import { ChatsComponent } from './chats.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [ChatsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChatsRoutingModule
  ]
})
export class ChatsModule { }
