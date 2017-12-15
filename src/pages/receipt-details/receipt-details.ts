import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
    private alert: AlertController,
    private camera: Camera,) {

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
    this.takePhoto();
    // alert("corpId: " + this.corpId + " date: " + this.receiptDate + "::amount "
    //   + this.amount + "::expenseType " + this.expenseType + ":: " + this.justification);

    // if(this.image != null) {
    //   this.vision.getLabels(this.image).subscribe((result) => {
    //     this.saveResultsToFireBase(this.image, result.json().responses);
    //   }, err => {
    //     this.showAlert(err);
    //   });
    // }
    
    // this.showSuccess();
  }

  showSuccess() {
     let alert = this.alert.create({
      title: 'Success',
      subTitle: 'Data submitted for processing to EBS. Enjoy the remaining part of your trip',
      buttons: ['OK']
    });
    alert.present();
  }

  // showAlert(message) {
  //   let alert = this.alert.create({
  //     title: 'Error',
  //     subTitle: message,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  // saveResultsToFireBase(imageData, results) {
  //   this.itemsRef.push({ amount: this.amount,
  //     comment: this.justification, 
  //     corpid: this.corpId, 
  //     date: this.receiptDate,
  //     expensetype: this.expenseType,
  //     imageData: imageData, 
  //     results: results });
  // }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }    
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe((result) => {
        this.saveResults(imageData, result.json().responses);
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert(err);
    });
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  saveResults(imageData, results) {
    this.itemsRef.push({ imageData: imageData, results: results });

  }

}
