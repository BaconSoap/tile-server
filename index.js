var tilestrata = require('tilestrata');
var mapnik = require('tilestrata-mapnik');
var disk = require('tilestrata-disk');
var strata = tilestrata();

strata
  .layer('a')
    .route('tile.png')
      .use(disk.cache({dir: './.tilecache/a'}))
      .use(mapnik({
        pathname: './data/us-states-baselayer.xml',
        scale: 1,
        tileSize: 256
      }))
  .layer('b')
    .route('tile.png')
      .use(disk.cache({dir: './.tilecache/b'}))
      .use(mapnik({
        pathname: './data/us-states-baselayer.xml',
        scale: 1,
        tileSize: 256
      }));

strata.listen(8080, function() {
  console.log('Listening on 8080...');
});

process.on('SIGTERM', function() {
  strata.close(function() {
    process.exit(0);
  });
});
