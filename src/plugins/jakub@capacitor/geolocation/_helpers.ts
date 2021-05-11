/* eslint-disable no-mixed-operators */
import { GeolocationPosition } from '@capacitor/core'
import { Entity } from '@/plugins/app/_config/types'
import user from '@/plugins/app@user/user/user.vue'

export default {
  getFixedDeviceLocation(deviceLocation: GeolocationPosition): GeolocationPosition {
    return {
      coords: {
        latitude: deviceLocation.coords.latitude,
        longitude: deviceLocation.coords.longitude,
        accuracy: deviceLocation.coords.accuracy,
        altitude: deviceLocation.coords.altitude,
        altitudeAccuracy: deviceLocation.coords.altitudeAccuracy,
        heading: deviceLocation.coords.heading,
        speed: deviceLocation.coords.speed,
      },
      timestamp: deviceLocation.timestamp,
    }
  },
  calculateDistance(entity?: Entity, userLocation?: GeolocationPosition): number {
    if (!entity || !userLocation || !entity.lat || !entity.lon
        || !userLocation?.coords?.latitude || !userLocation?.coords?.longitude) return 0
    const p = 0.017453292519943295 // Math.PI / 180
    const c = Math.cos
    const a = 0.5 - c((+entity.lat - userLocation.coords.latitude) * p) / 2
        + c(userLocation.coords.latitude * p) * c(+entity.lat * p)
        * (1 - c((+entity.lon - userLocation.coords.longitude) * p)) / 2

    return Math.round(12742 * Math.asin(Math.sqrt(a)) * 10) / 10 // 2 * R; R = 6371 km
  },
}
