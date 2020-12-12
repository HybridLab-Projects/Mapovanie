import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

export default {
  async getCurrentPosition() {
    return await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 2000,
    })
  },
}
