const list = moment.tz.names();
// list.forEach(name => {
//   console.log(name);
// });
const zone = moment(new Date()).tz('Japan').format('Z');
console.log('zone:', zone);

// TOKYO
const lat = Lattitude({ degrees: 35.67, bound: 'N' });
const lng = Longitude({ degrees: 139.65, bound: 'E' });
const geo = GeoCoord({ lat, lng });

const d = new Date();
const local = NaiveDateTime.from_ymd_hms(
  d.year(),
  d.month() + 1,
  d.date(),
  d.hour(),
  d.minute(),
  d.second()
);
const zone_offset = approx_zone_from_geo(local, geo);
console.log('zone_offset:', zone_offset);
