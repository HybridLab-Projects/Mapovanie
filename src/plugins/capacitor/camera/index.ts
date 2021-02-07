import { CameraResultType, Plugins } from '@capacitor/core';
import CamHelpers from './_helpers';

const { Camera } = Plugins;

export default {
  async getFullPhoto() {
    const photo = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    if (!photo?.webPath) {
      throw Error('Error when taking photo.');
    }
    photo.dataUrl = await CamHelpers.getBase64FromBlobUrl(photo.webPath, photo.format);

    return photo;
  },
};
