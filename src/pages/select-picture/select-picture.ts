import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-select-picture',
  templateUrl: 'select-picture.html'
})
export class SelectPicturePage {
  image: string;

  constructor(private camera: Camera) {

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
    } catch (e) {
      console.error(e);
    }
  }

}
