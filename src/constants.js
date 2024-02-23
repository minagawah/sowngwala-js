/**
 * @module sowngwala/constants
 */

export const OFFSET_GMT = '+00:00'; // Z (Greenwich)
export const OFFSET_TOKYO = '+09:00'; // Z

export const MYSQL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const ISO8601_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

export const NUM_OF_DAYS_IN_A_YEAR = 365.25;

/**
 * Sun's mean ecliptic longitude at
 * Jan. 0.0, 1990 which is represented
 * as "ε g" (Epsilon G) in the book.
 * This is the position it would have
 * had if it had been moving in
 * a circular orbit rather than
 * an eclipse.
 * (Peter Duffett-Smith, p.86)
 */
export const ECLIPTIC_LONGITUDE_AT_1990 = 279.403_303; // ε g

/**
 * This is the longitude of the sun
 * at perigree which is represented
 * as "ω bar g" (Omega bar G).
 * (Peter Duffett-Smith, p.86)
 */
export const ECLIPTIC_LONGITUDE_OF_PERIGEE = 282.768_422; // ω bar g

/**
 * This is the eccentricity of
 * the sun-earth orbit.
 * (Peter Duffett-Smith, p.86)
 */
export const ECCENTRICITY_OF_ORBIT = 0.016_713;

export const MOON_MEAN_LONGITUDE_AT_THE_EPOCH = 318.351_648; // l o
export const MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH = 36.340_410; // P o
export const MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH = 318.510_107; // N o
export const INCLINATION_OF_THE_MOON_ORBIT = 5.145_396; // i
export const ECCENTRICITY_OF_MOON_ORBIT = 0.054_900; // e
export const SEMI_MAJOR_AXIS_OF_MOON_ORBIT = 384_401.0; // a
export const MOON_ANGULAR_SIZE_AT_DISTANCE_A_FROM_THE_EARTH = 0.518_1; // θ o
export const PARALLAX_AT_DISTANCE_A_FROM_THE_EARTH = 0.950_7; // π o

export const J2000 = 2_451_545.0;
