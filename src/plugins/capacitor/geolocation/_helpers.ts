import { GeolocationPosition } from '@capacitor/core';

export default {
  getFixedDeviceLocation(deviceLocation: GeolocationPosition) {
    const parsed = {
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
    };
    console.log(JSON.stringify(deviceLocation));
    console.log(JSON.stringify(parsed));
    return parsed;
  },
};
