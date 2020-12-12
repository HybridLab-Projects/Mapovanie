import { Plugins } from '@capacitor/core'
const { Device } = Plugins

export default {
  async getDeviceInfo() {
    return Device.getInfo()
  },
}
