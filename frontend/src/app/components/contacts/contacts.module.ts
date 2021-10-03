import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
