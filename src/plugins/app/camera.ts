import { Plugins, CameraResultType } from '@capacitor/core'
const { Camera } = Plugins

export default {
  async takePicture() {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    })
  },
}
