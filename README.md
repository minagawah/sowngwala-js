# sowngwala-js

## 1. About

This is a JS library for finding the position of the sun, and was ported from
[sowngwala](https://github.com/minagawah/sowngwala)
which is another library that I wrote in Rust.

As it is mentioned in the original library, majority of calculation logic are based on
[Peter Duffett-Smith "Practical Astronomy With Your Calculator"](https://books.google.co.jp/books?id=DwJfCtzaVvYC&hl=ja&source=gbs_book_similarbooks)
(The Press Syndicate of the University of Cambridge, 1988).

"sowngwala" means "one who is professional at the sun" in
[Belter language](https://expanse.fandom.com/wiki/Belter_Creole)
which is from a sci-fi TV series "The Expanse (2015)".

## 2. Usage

When you are finding the position of the sun,
the most popular demands would probably be the following 2:

- Physical Observation
  - You want to know where the sun will physically appear at certain time and space.
- Astrological Calculation
  - Many Western/Eastern astrological systems ask you to know the sun's position.

Whichever you wish to pursue, the program offers the corresponding 2 methods:

- (Equatorial)  
[pos_equatorial_from_generic_date](src/sun/pos_equatorial_from_generic_date.js)
  - Usually for "Observation"
  - You want the sun's position in [Equatorial](src/coords/equatorial.js) coordinate system, so that you would get "right ascension (α)" and "declination (δ)" for the given time and space.
- (Ecliptic)  
[pos_ecliptic_from_generic_date](src/sun/pos_ecliptic_from_generic_date.js)
  - Usually for "Astrology"
  - You want the sun's position in [Ecliptic](src/coords/ecliptic.js) coordinate system, so that you would get "latitude (β)" and "ongitude (λ)" for the given time and space.

Since the steps for finding Equatorial position includes that of Ecliptic,
we can only focus on Equatorial, and it should pretty much suffice the needs.

Let's see how you can calculate Equatorial position of the sun.

### (a) Runtime Usage

This is how you want to directly use `sowngwala-js` in your page.

```html
<html>
<body>
<script src="https://[YOUR_SERVER_PATH]/sowngwala.lib.js"></script>
<script type="text/javascript">
import moment from 'moment';

window.addEventListener('load', () => {
  const { lib } = Sowngwala;
  const { pos_equatorial_from_generic_date } = lib.sun;

  // You want to know the sun's position
  // for July 1, 1988 in the  Equatorial
  // coordinate system which is comprised
  // of "right ascension (α)" and
  // "declination (δ)".

  const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
  const coord = pos_equatorial_from_generic_date(utc);

  const asc = coord.asc; // right ascension (α)
  const dec = coord.dec; // declination (δ)

  const asc_hms = `${asc.hour()}°${asc.minute()}'${asc.second()}"`;
  const dec_hms = `${dec.hour()}°${dec.minute()}'${dec.second()}"`;

  console.log('asc:', asc_hms); // 8°26'4.0
  console.log('dec:', dec_hms); // 19°12'42.5
});
</script>
</body>
</html>
```

### (b) NPM Install

This is when you want to include `sowngwala-js` in your JS app bundle.

Since `sowngwala-js` has not yet being published as a NPM package,
you need to directly install from this Github repo.
In your `package.json`, add the following to "dependencies":

```json
"dependencies": {
  "sowngwala-js": "git://github.com/minagawah/sowngwala-js.git",
}
```

Once installed, do the following:

```js
import moment from 'moment';
import { pos_equatorial_from_generic_date } from 'sowngwala';

// You want to know the sun's position
// for July 1, 1988 in the  Equatorial
// coordinate system which is comprised
// of "right ascension (α)" and
// "declination (δ)".

const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
const coord = pos_equatorial_from_generic_date(utc);

const asc = coord.asc; // right ascension (α)
const dec = coord.dec; // declination (δ)

const asc_hms = `${asc.hour()}°${asc.minute()}'${asc.second()}"`;
const dec_hms = `${dec.hour()}°${dec.minute()}'${dec.second()}"`;

console.log('asc:', asc_hms); // 8°26'4.0
console.log('dec:', dec_hms); // 19°12'42.5
```

## 3. Development

First of all, install NPM packages:
```
nvm use
npm install
```

To run Jest unit tests, do this:
```
npm run test
```

To emit `*.d.ts` files to `types`:
```
npm run type:generate
```

To emit JSDoc documents to `jsdoc`:
```
npm run jsdoc
```

To build (and emit bundles to `dist`):
```
npm run build
```

To launch Webpack devServer to check the behaviors
by serving the check page I have in `src.check/check.html`:
```
npm run dev
```

## 4. Notes

### 4-1. What's the Web-related NPM Packages All About?

You may notice the repo contains a lot of
web-related NPM packages, and it seems
strange for a library containing
only mathematical calculations.
It has web-related NPM packages
only because I have [a check page](src.check/check.html)
which runs when you `npm run dev`.
So, they have nothing to do with the implementations of the library itself.

### 4-2. How Does the Program Find the Sun's Position

When it comes to finding the Equatorial position of the sun,
it all begins with
[pos_equatorial_from_generic_date](src/sun/pos_equatorial_from_generic_date.js).
With a given a date, it returns
[EquaCoord](src/coords/equatorial.js).
However, majority of the calculations are done in
[pos_ecliptic_from_generic_date](src/sun/pos_ecliptic_from_generic_date.js).

Refer to p.91 of
[Peter Duffett-Smith's "Practical Astronomy With Your Calculator" (1988)](https://books.google.co.jp/books?id=DwJfCtzaVvYC&hl=ja&source=gbs_book_similarbooks)
where he describes 10 steps to calculate
the Equatorial position of the sun.

**Step 1** aims to find *"day number"* which is the number of days since the beginning of the year in concern, and is calculated with [day_number_from_generic_date](src/time/day_number_from_generic_date.js).

Next up, we have **Step 2** which is to find days since January 0th of 1990. This is the epoch date that his book supposes to base his calculations on, and is calculated with [days_since_1990](src/time/days_since_1990.js).

From **Step 3** to **Step 10** is covered by [longitude_and_mean_anomaly](src/sun/longitude_and_mean_anomaly.js). As the name suggests, it takes the number of days since 1900, and will return (1) `lng` ("λ" or "Sun's longitude"), and (2) `mean_anom` ("M" or "Mean Anomaly") for the date.

While Duffet-Smith's **Step 3** to **Step 10** are covered within [longitude_and_mean_anomaly](src/sun/longitude_and_mean_anomaly.js), **Step 6** is covered by [find_kepler](src/sun/find_kepler.js) which itself consists of a recursive function for finding "Mean anomaly (M)" and "Eccentric anomaly (E)" using Kepler's equation.

## 5. Installed NPM Packages

Although this is a libray, it has web related NPM modules installed
because we want to run Webpack devServer to check library behaviors using
[src.check/check.html](src.check/check.html).
Otherwise, we won't need such web related dependencies.

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
- license-webpack-plugin

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
  - High vulnerability depnding on: jsdoc-parse
- jsdoc-plugin-intersection
- typescript

### Jest

- jest
- babel-jest

### Others

- rimraf
- nodemon
- concurrently
- ramda
- moment

```
npm install --save core-js ramda moment;

npm install --save-dev @babel/cli @babel/core \
  @babel/preset-env babel-jest babel-loader \
  webpack webpack-cli webpack-dev-server \
  file-loader css-loader style-loader postcss-loader \
  html-webpack-plugin copy-webpack-plugin \
  mini-css-extract-plugin license-webpack-plugin \
  prettier eslint eslint-config-prettier eslint-plugin-prettier \
  @stylistic/eslint-plugin \
  postcss postcss-cli autoprefixer \
  postcss-preset-env postcss-import postcss-mixins postcss-nested \
  tailwindcss babel-plugin-preval \
  jsdoc jsdoc-tsimport-plugin jsdoc-plugin-intersection \
  typescript jest \
  rimraf nodemon concurrently ;
```

## 6. License

Dual-licensed under either of the followings.  
Choose at your option.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))


