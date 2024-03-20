# Release Change Log

## 0.10.0

- When suggesting a list of cities on the demo page, instead of using "datalist" which is not supported by Android Firefox, implemented an original suggestion box underneath the city input.

## 0.9.0

- For `calibrate` in `coords/angle`, take additional options `options.angle` and `options.hour_overflow`. When calibrate, defaults to take 'hour' as in that of the time, and NOT as that of degrees. Similarly, when calibrate, defaults to NOT overflow 'hour' even when it had a negative value.
- For `coords/equatorial`, run `calibrate` when an instance is created.
- For `coords/horizontal`, run `calibrate` when an instance is created.
- For `time/calibrate_hmsn`, take options.
- Refactored `src.check` to make it easier to understand.

## 0.8.1

- Added the demo page, added a link to Github repo.

## 0.8.0

- For `src.check/check.js` will now have the current version appended to the name when bundled.

## 0.7.0

- Added `tools/parse_cities.js`
- For `src.check/check.js`, added a feature to find latitude and longitude from the city name.

## 0.6.0

- No longer using 'moment' but 'NaiveDateTime'.
- Adding local time related features.
- More features for Horizontal system.
- Added `chrono/naive_time.NaiveTime#from_hms`
- Added `chrono/naive_date`
- Added `chrono/naive_datetime`
- Added `sun/sun_pos_horizontal`
- Added `time/utc_from_local`
- Added `time/utc_from_local_geo`

## 0.5.0

- Added `coords/geo.GeoCoord`
- Added `coords/geo.Latitude`
- Added `coords/geo.Longitude`
- Added `coords/horizontal_from_equatorial`
- Added `coords/horizontal_from_equatorial_with_hour_angle`
- Added `time/asc_from_hour_angle`
- Added `time/gst_from_local`
- Added `time/hour_angle_from_asc`
- Added `time/local_from_gst`
- For the following programs, not only returning the expected outcome, but also to include some values that were calculated along the way.
  - `sun/sun_pos_ecliptic_from_generic_date`
  - `sun/sun_pos_ecliptic`
  - `sun/sun_pos_equatorial_from_generic_date`
  - `sun/sun_pos_equatorial`
  - `coords/equatorial_from_ecliptic_with_generic_date`
  - `coords/equatorial_from_ecliptic_with_generic_datetime`

## 0.4.0

- Renamed `coords/equatorial_from_ecliptic` to `coords/equatorial_from_ecliptic_with_obliquity`.
- Added `coords/equatorial_from_ecliptic_with_generic_datetime`
- Added `sun/sun_pos_ecliptic_from_generic_date`
- Added `sun/sun_pos_equatorial_from_generic_date`
- Fixed `sun/sun_pos_ecliptic` to take time into consideration (it only took date before but not for specific time).

## 0.3.1

- Removed unnecessary log output
- Fixed the checker app, making it worthy.
- 0.3.0
- For runtime use, changed the exposed global from `Sowngwala.lib` to `Sowngwala`.

## 0.2.0

- Added `moon/moon_pos_equatorial` and `moon/moon_pos_equatorial` for calculating for the moon's position.
- For both `src/coords/Angle` and `chrono/NaiveTime` will no longer run `calibrate_hms` upon the instance creation, meaning, it will not check for the overflow on "hour", "min", and "sec", but you must run it manually whenever you need it.
- Instead of `sun/longitude_and_mean_anomaly` returning `mean_anom` in "radians", it now returns it in "degrees".
- Moved `sun/find_kepler` to `coords/find_kepler`
- Renamed `sun/pos_ecliptic_from_generic_date` to `sun/sun_pos_ecliptic`
- Renamed `sun/pos_equatorial_from_generic_date` to `sun/sun_pos_equatorial`
- Renamed `longitude_and_mean_anomaly` to `sun_longitude_and_mean_anomaly`
