import {
  Camera, Photo, CameraResultType, CameraSource,
} from '@capacitor/camera'
import CamHelpers from './_helpers'

export default {
  async getFullPhoto(): Promise<Photo> {
    const photo = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    })

    if (!photo?.webPath) {
      throw Error('Error when taking photo.')
    }
    photo.dataUrl = await CamHelpers.getBase64FromBlobUrl(photo.webPath, photo.format)

    return photo
  },
}
