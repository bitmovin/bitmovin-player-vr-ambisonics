# Bitmovin Player VR Ambisonics Integration

## Getting Started

 0. Clone Git repository
 1. Install node.js
 2. Install Gulp: `npm install --global gulp-cli`
 3. Install required npm packages: `npm install`
 4. Run Gulp tasks (`gulp --tasks`)
  * `gulp` to build project into `dist` directory
  * `gulp watch` to develop and rebuild changed files automatically
  * `gulp serve` to open test page in browser, build and reload changed files automatically
  * `gulp lint` to lint TypeScript and SASS files
  * `gulp build-prod` to build project with minified files into `dist` directory
  
To just take a look at the project, also run `gulp serve`.

## Usage

 1. Build the script by running `gulp build-prod`
 2. Include `bitmovinplayer-vr-ambisonics.min.js` in your HTML document
 3. ...
 