## GeoJSON Specification (RFC 7946)

| Geometry Type      | Meaning                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Point              | A point represents a single geographic position                                                      |
| MultiPoint         | A MultiPoint represents two or more geographic points that share a relationship                      |
| LineString         | A linestring represents two or more geographic points that share a relationship                      |
| MultiLineString    | A multilinestring is an array of LineString coordinate arrays.                                       |
| Polygon            | To specify a constraint specific to Polygons, it is useful to introduce the concept of a linear ring |
| MultiPolygon       | A multiPolygon is an array of Polygon coordinate arrays.                                             |
| GeometryCollection | A GeoJson object with TYPE "GeometryCollection" is a Geometry object.                                |

### GeoJSON types

case-sensitive strings:

- Feature
- FeatureCollection
- the geometry types listed above.

### A GeoJSON FeatureCollection-Example:

```
 {
       "type": "FeatureCollection",
       "features": [{
           "type": "Feature",
           "geometry": {
               "type": "Point",
               "coordinates": [102.0, 0.5]
           },
           "properties": {
               "prop0": "value0"
           }
       }, {
           "type": "Feature",
           "geometry": {
               "type": "LineString",
               "coordinates": [
                   [102.0, 0.0],
                   [103.0, 1.0],
                   [104.0, 0.0],
                   [105.0, 1.0]
               ]
           },
           "properties": {
               "prop0": "value0",
               "prop1": 0.0
           }
       }, {
           "type": "Feature",
           "geometry": {
               "type": "Polygon",
               "coordinates": [
                   [
                       [100.0, 0.0],
                       [101.0, 0.0],
                       [101.0, 1.0],
                       [100.0, 1.0],
                       [100.0, 0.0]
                   ]
               ]
           },
           "properties": {
               "prop0": "value0",
               "prop1": {
                   "this": "that"
               }
           }
       }]
   }
```

"geometry": {
"type": "Point",
"coordinates": [-71.1502, -33.3632, 0]
coordinates:[LONGITUDE,LATITUDE,ALTITUDE]
}

### values fields

'circle-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0, 8, 1],

                                                     [ 1, 0, from 1...100 opacity, 1],
