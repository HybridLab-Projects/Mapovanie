import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import CamHelpers from './_helpers';

const { Camera } = Plugins;

export default {
  async getFullPhoto() {
    const photo = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (!photo?.webPath) {
      throw Error('Error when taking photo.');
    }
    photo.dataUrl = await CamHelpers.getBase64FromBlobUrl(photo.webPath, photo.format);

    return photo;
  },
};
