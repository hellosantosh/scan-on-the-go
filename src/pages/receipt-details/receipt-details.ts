import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';


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
  amount: string;
  expenseType: string;
  justification: string;
  image: string;
  corpId: string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase,
    private alert: AlertController) {

    this.receiptDate = navParams.get('receiptDate');
    this.amount = navParams.get('amount');
    this.expenseType = navParams.get("expenseType");
    this.justification = navParams.get('justification');
    this.image = navParams.get('image');
    this.corpId = navParams.get('corpId');
    this.itemsRef = db.list('items');
    this.items = this.itemsRef.valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailsPage');
  }

  sendDataToCloud() {

    alert("corpId: " + this.corpId + " date: " + this.receiptDate + "::amount "
      + this.amount + "::expenseType " + this.expenseType + ":: " + this.comments);

    if(this.image != null) {
      this.vision.getLabels(this.image).subscribe((result) => {
        this.saveResultsToFireBase(this.image, result.json().responses);
      }, err => {
        this.showAlert(err);
      });
    }
    
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  saveResultsToFireBase(imageData, results) {
    this.itemsRef.push({ amount: this.amount,
      comment: this.justification, 
      corpid: this.corpId, 
      date: this.receiptDate,
      expensetype: this.expenseType,
      imageData: imageData, 
      results: results });
  }

}
