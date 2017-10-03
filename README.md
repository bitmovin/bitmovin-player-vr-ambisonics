# Bitmovin Player VR Ambisonics Integration

Integrates 1st order ambisonic audio to binaural stereo decoding/rendering support for 360/VR videos into the Bitmovin Player through the Web Audio API. This integration automatically selects an ambisonic audio track when a VR source is loaded (configurable) and renders ambisonic audio tracks automatically to binaural stereo output.

[Try out the demo](https://demo.bitmovin.com/public/ambisonics/).

## Getting Started

 0. Clone Git repository
 1. Install node.js
 2. Install Gulp: `npm install --global gulp-cli`
 3. Install required npm packages: `npm install`
 4. Run Gulp tasks (`gulp --tasks`)
  * `gulp` to build project into `dist` directory
  * `gulp watch` to develop and rebuild changed files automatically
  * `gulp serve` to open test page in browser, build and reload changed files automatically
  * `gulp lint` to lint TypeScript files
  
To just take a look at the project, also run `gulp serve`.

## Usage

 1. Build the script by running `gulp`
 2. Include `bitmovinplayer-vr-ambisonics.min.js` in your HTML document
 3. Create an instance of `Ambisonics` before or after calling `player.setup(...)` and pass in optional configuration properties:
    ```js
    var playerConfig = {
      key: 'YOUR-PLAYER-KEY',
      source: {
        ...
      },
      ...
    };

    var player = bitmovin.player('player');
    
    // An Ambisonics instance is always tied to one player instance
    var ambisonics = new bitmovin.player.vr.Ambisonics(player, { yawOffset: Math.PI });
    
    player.setup(playerConfig).then(function() {
      console.log('player loaded');
      // Optional: Update the VR viewport direction 30 times a second (instead of the default 4 times)
      player.vr.setViewingDirectionChangeEventInterval(1 / 30);
      // Optional: Update the VR viewport direction when the direction changes more than 1 degree (instead of the default 5 degree)
      player.vr.setViewingDirectionChangeThreshold(1);
    }, function(reason) {
      console.error('player setup failed', reason);
    });
    ```
 4. Optional: Release the instance by calling `ambisonics.release()` (must be called before destroying the player through `player.destroy()`)
 