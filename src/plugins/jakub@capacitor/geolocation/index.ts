import { Geolocation, Position } from '@capacitor/geolocation'
import GeoHelpers from './_helpers'

export default {
  async getDeviceLocation(): Promise<Position> {
    const deviceLocation = await Geolocation.getCurrentPosition({
      enableHighAccuracy: false,
      maximumAge: 0,
    })
    return GeoHelpers.getFixedDeviceLocation(deviceLocation)
  },
}
