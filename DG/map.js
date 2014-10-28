function onMapClick(e) {

    var latN = e.latlng.lat;
    var lngN = e.latlng.lng;
    var coord = latN.toFixed(4) + ", " + lngN.toFixed(4);

    popup
        .setLatLng(e.latlng)
        .setContent("<img src='http://dev1.tomnod.com/chip_api/chip/lat/" + latN + "/lng/" + lngN + "'" + "width='200' height='200'>")
        .openOn(map);

    document.getElementById('loc').innerHTML = coord; //add coordinates to mapInfo
}


