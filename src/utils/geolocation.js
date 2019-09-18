const getGeolocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        return resolve({
          lat: Math.floor(res.coords.latitude),
          lng: Math.floor(res.coords.longitude)
        });
      });
    } else {
      reject(console.log("Browser doesn't support Geolocation"));
    }
  });

export default getGeolocation;
