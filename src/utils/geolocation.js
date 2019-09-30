const getGeolocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        return resolve({
          lat: parseFloat(res.coords.latitude.toFixed(5)),
          lng: parseFloat(res.coords.longitude.toFixed(5))
        });
      });
    } else {
      reject(console.log("Browser doesn't support Geolocation"));
    }
  });

export default getGeolocation;
