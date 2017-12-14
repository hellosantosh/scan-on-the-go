import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiptDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-details',
  templateUrl: 'receipt-details.html',
})
export class ReceiptDetailsPage {
  receiptDate: string;
  amount: number;
  expenseType: string;
  justification: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    alert('Receipt Details Page loaded');
    console.log('ionViewDidLoad ReceiptDetailsPage');
  }

  sendDataToCloud() {
    alert("date " + this.receiptDate + "::amount " 
    + this.amount + "::expenseType " + this.expenseType + ":: " + this.justification);
  }
}
