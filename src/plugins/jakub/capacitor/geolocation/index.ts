import { GeolocationPosition, Plugins } from '@capacitor/core';
import GeoHelpers from './_helpers';

const { Geolocation } = Plugins;

export default {
  async getDeviceLocation(): Promise<GeolocationPosition> {
    const deviceLocation = await Geolocation.getCurrentPosition({
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: 2000,
    });
    return GeoHelpers.getFixedDeviceLocation(deviceLocation);
  },
};