const getGeolocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        return resolve({
          lat: res.coords.latitude.toFixed(4),
          lng: res.coords.longitude.toFixed(4)
        });
      });
    } else {
      reject(console.log("Browser doesn't support Geolocation"));
    }
  });

export default getGeolocation;
