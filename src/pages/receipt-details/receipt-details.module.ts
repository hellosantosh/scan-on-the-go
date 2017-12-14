import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptDetailsPage } from './receipt-details';

@NgModule({
  declarations: [
    ReceiptDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptDetailsPage),
  ],
})
export class ReceiptDetailsPageModule {}
