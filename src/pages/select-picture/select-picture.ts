import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ReceiptDetailsPage } from '../receipt-details/receipt-details';

@Component({
  selector: 'page-select-picture',
  templateUrl: 'select-picture.html'
})
export class SelectPicturePage {
  rawImage: string;
  image: string;
  corpId: string;

  constructor(private camera: Camera, private navCtrl: NavController, private navParams: NavParams) {
    this.corpId = navParams.get('corpId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPicturePage');
  }

  pictureFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.takePhoto(options);
  }

  pictureFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.takePhoto(options);

  }

  async takePhoto(options: CameraOptions) {
    try {
      const result = await this.camera.getPicture(options);
      this.image = `data:image/jpeg;base64,${result}`
      this.rawImage = result;
    } catch (e) {
      console.error(e);
    }
  }

  pictureOK() {
    this.navCtrl.push(ReceiptDetailsPage, {
      image: this.image,
      rawImage: this.rawImage,
      corpId: this.corpId,
    });
  }

  backToTakePicture() {
    this.image = null;
    this.rawImage = null;
  }
}
