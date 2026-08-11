# sowngwala-js

## 1. About

This is a JS library for calculating the sun's and moon's positions.
It was ported from
[sowngwala](https://github.com/minagawah/sowngwala),
a Rust library I wrote.

As noted in the original library, most of the calculation logic is based on
[Peter Duffett-Smith "Practical Astronomy With Your Calculator"](https://books.google.co.jp/books?id=DwJfCtzaVvYC&hl=ja&source=gbs_book_similarbooks)
(The Press Syndicate of the University of Cambridge, 1988).

"sowngwala" means "one who is professional at the sun" in
[Belter](https://expanse.fandom.com/wiki/Belter_Creole),
the constructed language from the sci-fi TV series "The Expanse (2015)".

[View Demo](https://tokyo800.jp/mina/sowngwala/)

### 1.1 Files & Folders

`src` is the main library code, and `types` is the generated declaration mirror. The checker app in `src.check` and the web/build config files are support-only for browser checking, not part of the core calculation library.

#### 1-1-1. Relevant

These files make up the core library and its generated type surface.

```text
src/
├── chrono/
│   ├── index.js
│   ├── naive_date.js
│   ├── naive_datetime.js
│   └── naive_time.js
├── coords/
│   ├── __tests__/
│   ├── angle.js
│   ├── ...
├── moon/
│   ├── __tests__/
│   ├── index.js
│   └── ...
├── sun/
│   ├── __tests__/
│   ├── index.js
│   └── ...
├── time/
│   ├── __tests__/
│   ├── index.js
│   └── ...
├── constants.js
├── delta_t.js
├── index.js
├── types.js
├── utils.js
└── d.ts/global.d.ts

types/
├── chrono/
│   ├── index.d.ts
│   └── ...
├── coords/
│   ├── index.d.ts
│   └── ...
├── moon/
│   ├── index.d.ts
│   └── ...
├── sun/
│   ├── index.d.ts
│   └── ...
├── time/
│   ├── index.d.ts
│   └── ...
├── constants.d.ts
├── delta_t.d.ts
├── index.d.ts
├── types.d.ts
└── utils.d.ts
```

#### 1-1-2. Irrelevant

These files are not part of the library's calculation code. They exist to support the browser-based checker, the demo page, and the build tools used to run them locally.

```text
repo root/
├── .eslintignore
├── .eslintrc.js
├── .nvmrc
├── .prettierignore
├── .prettierrc.js
├── babel.config.js
├── jest.config.js
├── jsdoc.conf.js
├── postcss.config.js
├── tailwind.config.js
├── tw.colors.js
├── tsconfig.json
├── tsconfig.generate.json
├── webpack.base.js
├── webpack.dev.js
├── webpack.prod.js
└── src.check/
    ├── check.html
    ├── controllers/
    │   ├── dom_element.js
    │   └── event_listener.js
    ├── data.js
    ├── geo_from_row.js
    ├── get_city_list.js
    ├── index.js
    ├── styles/
    │   ├── _define.css
    │   └── main.css
    └── utils.js
```

## 2. Release Change Log

See [changelog](changelog.md).

## 3. Usage

### 3-1. Position of the Sun

Finding the sun's position usually means one of two things:

- Physical Observation
  - You want to know where the sun will physically appear at a given time and place.
  - For this, you want the position in either the "Equatorial" or "Horizontal" coordinate system.
  - If you want "Equatorial", use [sun_equatorial_from_generic_datetime](src/sun/sun_equatorial_from_generic_datetime.js)
  - If you want "Horizontal", use [sun_horizontal_from_generic_datetime](src/sun/sun_horizontal_from_generic_datetime.js)
- Astrological Calculation
  - Your astrology system needs the sun's position.
  - Usually, you want the position in the "Ecliptic" coordinate system so that you get *"latitude (β)"* and *"longitude (λ)"* for the given time and place.
  - Use [sun_ecliptic_from_generic_datetime](src/sun/sun_ecliptic_from_generic_datetime.js)

[sun_horizontal_from_generic_datetime](src/sun/sun_horizontal_from_generic_datetime.js) returns the sun's "Horizontal" position, but the result also includes the "Ecliptic" and "Equatorial" values. That is because you need the "Ecliptic" position first, then it is converted to "Equatorial", and finally to "Horizontal". So a "Horizontal" result also includes the intermediate values produced along the way.

I have two examples below. One is for the browser runtime, and the other is for npm module use in a bundled ES6 app. Both illustrate [sun_equatorial_from_generic_datetime](src/sun/sun_equatorial_from_generic_datetime.js).

If you want more examples, see how I implemented [sun_ecliptic_from_generic_datetime](src/sun/sun_ecliptic_from_generic_datetime.js) for [the demo page](https://tokyo800.jp/mina/sowngwala/). The source code is in [src.check](src.check), specifically `_calculate_sun_position` inside [src.check/controllers/event_listener.js](src.check/controllers/event_listener.js).

### (a) Usage for Browser Runtime

This is how to use `sowngwala-js` directly in a page.
The library is exposed globally as `Sowngwala`, and you can use any of the provided methods.

```html
<html>
<body>
<script src="https://{YOUR_SERVER_PATH}/sowngwala-0.11.2.js"></script>
<script type="text/javascript">
window.addEventListener('load', () => {
  const { NaiveDateTime } = Sowngwala.chrono;
  const { sun_equatorial_from_generic_datetime } = Sowngwala.sun;

  // Find out the sun's
  // Equatorial position
  // for July 1, 1988 (UTC)
  const utc = NaiveDateTime.from_ymd(
    1988,
    7,
    27,
  );

  const { coord } =
    sun_equatorial_from_generic_datetime(utc);

  // right ascension (α)
  const asc = coord.asc;

  // declination (δ)
  const dec = coord.dec;

  console.log('asc:', asc.print()); // 8°26'4.0
  console.log('dec:', dec.print()); // 19°12'42.5
});
</script>
</body>
</html>
```

As noted above, the example is for the Equatorial position. For a complete Horizontal example, see [_calculate_sun_position](src.check/controllers/event_listener.js) in `src.check`, which also shows the use of local standard time and the observer's latitude and longitude.

### (b) Usage for ES6 Apps

If you want to include `sowngwala-js` in your bundle, this is how.
Since `sowngwala-js` has not yet been published as an npm package,
you need to install it directly from this GitHub repository.
In your `package.json`, add the following to "dependencies":

```json
"dependencies": {
  "sowngwala-js": "git://github.com/minagawah/sowngwala-js.git",
}
```

Once installed, start writing code. The implementation is about the same as the browser runtime example.

```js
import {
  NaiveDateTime,
  sun_equatorial_from_generic_datetime,
} from 'sowngwala';

// The rest of the code is
// the same as for the runtime example...
```

As noted above, see [_calculate_sun_position](src.check/controllers/event_listener.js) in `src.check` for the Horizontal example, including local standard time and the observer's latitude and longitude.


### 3-1. Position of the Moon

You can also calculate the moon's position. If you want the Ecliptic position, that method is available too.

```js
import {
  NaiveDateTime,
  moon_pos_equatorial,
} from 'sowngwala';

const utc = NaiveDateTime.from_ymd_hms(
  1979,
  2,
  26,
  16,
  0,
  0
);

const coord = moon_pos_equatorial(utc);

const asc = coord.asc; // right ascension (α)
const dec = coord.dec; // declination (δ)

const asc_hms = `${asc.hour()}°${asc.minute()}'${asc.second()}"`;
const dec_hms = `${dec.hour()}°${dec.minute()}'${dec.second()}"`;

console.log('asc:', asc_hms); // 22°33'28.7
console.log('dec:', dec_hms); // -8°00'57.6
```

## 4. Development

First, install the npm packages:
```
nvm use
npm install
```

To run Jest unit tests, do this:
```
npm run test
```

To generate `*.d.ts` files in `types`:
```
npm run type:generate
```

To generate JSDoc output in `jsdoc`:
```
npm run jsdoc
```

To build the bundles in `dist`:
```
npm run build
```
This creates the versioned library bundles in `dist/` and the checker assets in `dist/check/`.

To launch the Webpack dev server and serve the checker page in `src.check/check.html`:
```
npm run dev
```
This is the local browser demo path used by `src.check`.

## 5. Notes

### 5-1. How the Program Finds the Sun's Position

To find the sun's Equatorial position, the process starts with [sun_equatorial_from_generic_datetime](src/sun/sun_equatorial_from_generic_datetime.js). Given a date, it returns [EquaCoord](src/coords/equatorial.js). Most of the calculation happens in [sun_ecliptic_from_generic_datetime](src/sun/sun_ecliptic_from_generic_datetime.js).

Refer to p.91 of
[Peter Duffett-Smith's "Practical Astronomy With Your Calculator" (1988)](https://books.google.co.jp/books?id=DwJfCtzaVvYC&hl=ja&source=gbs_book_similarbooks)
where he describes 10 steps for calculating the sun's Equatorial position.

**Step 1** finds the *"day number"*, meaning the number of days since the start of the year in question, and it is calculated with [day_number_from_generic_date](src/time/day_number_from_generic_date.js).

**Step 2** finds the number of days since January 0th, 1990. This is the epoch date used as the basis for the book's calculations, and it is calculated with [days_since_1990](src/time/days_since_1990.js).

**Step 3** through **Step 10** are covered by [longitude_and_mean_anomaly](src/sun/longitude_and_mean_anomaly.js). As the name suggests, it takes the number of days since 1900 and returns (1) `lng` ("λ" or "Sun's longitude") and (2) `mean_anom` ("M" or "Mean Anomaly") for the date.

One more note: within **Step 3** through **Step 10**, **Step 6** is handled by [find_kepler](src/coords/find_kepler.js), which contains a recursive function for finding "Mean anomaly (M)" and "Eccentric anomaly (E)" using Kepler's equation.

## 6. Installed NPM Packages

Although this is a library, it includes web-related npm modules so the Webpack dev server can run the checker page in [src.check/check.html](src.check/check.html). Otherwise, those dependencies would not be needed.

### Babel

- core-js
- @babel/cli
- @babel/core
- @babel/preset-env
- babel-loader

### Webpack

- webpack
- webpack-cli
- webpack-dev-server
- file-loader
- css-loader
- style-loader
- postcss-loader
- html-webpack-plugin
- copy-webpack-plugin
- mini-css-extract-plugin
- terser-webpack-plugin
- license-webpack-plugin
- webpack-bundle-analyzer

### ESLint & Prettier

- prettier
- eslint
- eslint-config-prettier
  - Filters out all the ESLint rules which conflict with Prettier.
- eslint-plugin-prettier
  - Orchestrates ESLint and Prettier together.
- @stylistic/eslint-plugin
  - New way of setting rules

### CSS

- postcss
- postcss-cli
- postcss-preset-env
- postcss-import
- postcss-mixins
- postcss-nested
- autoprefixer
- tailwindcss
- babel-plugin-preval

### JSDoc

- jsdoc
- jsdoc-tsimport-plugin
- ~~jsdoc-to-markdown~~
  - High vulnerability depending on `jsdoc-parse`
- jsdoc-plugin-intersection
- typescript
- @types/ramda

### Jest

- jest
- babel-jest

### Others

- rimraf
- nodemon
- concurrently
- ramda
- moment
- moment-timezone
- csv-parse

```
npm install --save core-js ramda moment moment-timezone;

npm install --save-dev @babel/cli @babel/core \
  @babel/preset-env babel-jest babel-loader \
  webpack webpack-cli webpack-dev-server \
  file-loader css-loader style-loader postcss-loader \
  html-webpack-plugin copy-webpack-plugin \
  mini-css-extract-plugin terser-webpack-plugin \
  license-webpack-plugin webpack-bundle-analyzer \
  prettier eslint eslint-config-prettier eslint-plugin-prettier \
  @stylistic/eslint-plugin \
  postcss postcss-cli autoprefixer \
  postcss-preset-env postcss-import postcss-mixins postcss-nested \
  tailwindcss babel-plugin-preval \
  jsdoc jsdoc-tsimport-plugin jsdoc-plugin-intersection \
  typescript @types/ramda jest \
  rimraf nodemon concurrently csv-parse;
```

## 7. License

### SowngwalaJS Library

Dual-licensed under either of the following.  
Choose whichever you prefer.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))

### Geo-location Data for Check App

City names and longitude/latitude data used in the checker app are provided by Pareto Software, LLC, and are covered by the CC BY 4.0 Deed. [See details](license.simplemaps-world-cities.txt) for the license.  
https://simplemaps.com/data/world-cities
