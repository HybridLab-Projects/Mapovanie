import { Geolocation } from '@capacitor/core';
import GeoHelpers from './_helpers';

export default {
  async getDeviceLocation() {
    const deviceLocation = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 2000,
    });
    return GeoHelpers.getFixedDeviceLocation(deviceLocation);
  },
};
