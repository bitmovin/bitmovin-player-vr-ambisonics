(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	'use strict';

	// Primary namespace for Omnitone library.
	exports.Omnitone = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileOverview Omnitone library name space and common utilities.
	 */

	'use strict';

	/**
	 * @class Omnitone main namespace.
	 */
	var Omnitone = {};

	// Internal dependencies.
	var AudioBufferManager = __webpack_require__(2);
	var FOAConvolver = __webpack_require__(4);
	var FOARouter = __webpack_require__(5);
	var FOARotator = __webpack_require__(6);
	var FOAPhaseMatchedFilter = __webpack_require__(7);
	var FOAVirtualSpeaker = __webpack_require__(8);
	var FOADecoder = __webpack_require__(9);
	var FOARenderer = __webpack_require__(12);

	/**
	 * Load audio buffers based on the speaker configuration map data.
	 * @param {AudioContext} context      The associated AudioContext.
	 * @param {Map} speakerData           The speaker configuration map data.
	 *                                    { name, url, coef }
	 * @return {Promise}
	 */
	Omnitone.loadAudioBuffers = function (context, speakerData) {
	  return new Promise(function (resolve, reject) {
	    new AudioBufferManager(context, speakerData, function (buffers) {
	      resolve(buffers);
	    }, reject);
	  });
	};

	/**
	 * Create an instance of FOA Convolver. For parameters, refer the definition of
	 * Router class.
	 * @return {Object}
	 */
	Omnitone.createFOAConvolver = function (context, options) {
	  return new FOAConvolver(context, options);
	};

	/**
	 * Create an instance of FOA Router. For parameters, refer the definition of
	 * Router class.
	 * @return {Object}
	 */
	Omnitone.createFOARouter = function (context, channelMap) {
	  return new FOARouter(context, channelMap);
	};

	/**
	 * Create an instance of FOA Rotator. For parameters, refer the definition of
	 * Rotator class.
	 * @return {Object}
	 */
	Omnitone.createFOARotator = function (context) {
	  return new FOARotator(context);
	};

	/**
	 * Create an instance of FOAPhaseMatchedFilter. For parameters, refer the
	 * definition of PhaseMatchedFilter class.
	 * @return {FOAPhaseMatchedFilter}
	 */
	Omnitone.createFOAPhaseMatchedFilter = function (context) {
	  return new FOAPhaseMatchedFilter(context);
	};

	/**
	 * Create an instance of FOAVirtualSpeaker. For parameters, refer the
	 * definition of VirtualSpeaker class.
	 * @return {FOAVirtualSpeaker}
	 */
	Omnitone.createFOAVirtualSpeaker = function (context, options) {
	  return new FOAVirtualSpeaker(context, options);
	};

	/**
	 * Create a singleton FOADecoder instance.
	 * @param {AudioContext} context      Associated AudioContext.
	 * @param {DOMElement} videoElement   Video or Audio DOM element to be streamed.
	 * @param {Object} options            Options for FOA decoder.
	 * @param {String} options.baseResourceUrl    Base URL for resources.
	 *                                            (HRTF IR files)
	 * @param {Number} options.postGain           Post-decoding gain compensation.
	 *                                            (Default = 26.0)
	 * @param {Array} options.routingDestination  Custom channel layout.
	 * @return {FOADecoder}
	 */
	Omnitone.createFOADecoder = function (context, videoElement, options) {
	  return new FOADecoder(context, videoElement, options);
	};

	/**
	 * Create a singleton FOARenderer instance.
	 * @param {AudioContext} context      Associated AudioContext.
	 * @param {Object} options            Options.
	 * @param {String} options.HRIRUrl    Optional HRIR URL.
	 * @param {Number} options.postGainDB Optional post-decoding gain in dB.
	 * @param {Array} options.channelMap  Optional custom channel map.
	 */
	Omnitone.createFOARenderer = function (context, options) {
	  return new FOARenderer(context, options);
	};

	module.exports = Omnitone;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileOverview Audio buffer loading utility.
	 */

	'use strict';

	var Utils = __webpack_require__(3);

	/**
	 * Streamlined audio file loader supports Promise.
	 * @param {Object} context          AudioContext
	 * @param {Object} audioFileData    Audio file info as [{name, url}]
	 * @param {Function} resolve        Resolution handler for promise.
	 * @param {Function} reject         Rejection handler for promise.
	 * @param {Function} progress       Progress event handler.
	 */
	function AudioBufferManager(context, audioFileData, resolve, reject, progress) {
	  this._context = context;

	  this._buffers = new Map();
	  this._loadingTasks = {};

	  this._resolve = resolve;
	  this._reject = reject;
	  this._progress = progress;

	  // Iterating file loading.
	  for (var i = 0; i < audioFileData.length; i++) {
	    var fileInfo = audioFileData[i];

	    // Check for duplicates filename and quit if it happens.
	    if (this._loadingTasks.hasOwnProperty(fileInfo.name)) {
	      Utils.log('Duplicated filename when loading: ' + fileInfo.name);
	      return;
	    }

	    // Mark it as pending (0)
	    this._loadingTasks[fileInfo.name] = 0;
	    this._loadAudioFile(fileInfo);
	  }
	}

	AudioBufferManager.prototype._loadAudioFile = function (fileInfo) {
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', fileInfo.url);
	  xhr.responseType = 'arraybuffer';

	  var that = this;
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      that._context.decodeAudioData(xhr.response,
	        function (buffer) {
	          // Utils.log('File loaded: ' + fileInfo.url);
	          that._done(fileInfo.name, buffer);
	        },
	        function (message) {
	          Utils.log('Decoding failure: '
	            + fileInfo.url + ' (' + message + ')');
	          that._done(fileInfo.name, null);
	        });
	    } else {
	      Utils.log('XHR Error: ' + fileInfo.url + ' (' + xhr.statusText 
	        + ')');
	      that._done(fileInfo.name, null);
	    }
	  };

	  // TODO: fetch local resources if XHR fails.
	  xhr.onerror = function (event) {
	    Utils.log('XHR Network failure: ' + fileInfo.url);
	    that._done(fileInfo.name, null);
	  };

	  xhr.send();
	};

	AudioBufferManager.prototype._done = function (filename, buffer) {
	  // Label the loading task.
	  this._loadingTasks[filename] = buffer !== null ? 'loaded' : 'failed';

	  // A failed task will be a null buffer.
	  this._buffers.set(filename, buffer);

	  this._updateProgress(filename);
	};

	AudioBufferManager.prototype._updateProgress = function (filename) {
	  var numberOfFinishedTasks = 0, numberOfFailedTask = 0;
	  var numberOfTasks = 0;

	  for (var task in this._loadingTasks) {
	    numberOfTasks++;
	    if (this._loadingTasks[task] === 'loaded')
	      numberOfFinishedTasks++;
	    else if (this._loadingTasks[task] === 'failed')
	      numberOfFailedTask++;
	  }

	  if (typeof this._progress === 'function') {
	    this._progress(filename, numberOfFinishedTasks, numberOfTasks);
	    return;
	  }

	  if (numberOfFinishedTasks === numberOfTasks) {
	    this._resolve(this._buffers);
	    return;
	  }

	  if (numberOfFinishedTasks + numberOfFailedTask === numberOfTasks) {
	    this._reject(this._buffers);
	    return;
	  }
	};

	module.exports = AudioBufferManager;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileOverview Omnitone library common utilities.
	 */

	'use strict';

	/**
	 * Omnitone library logging function.
	 * @type {Function}
	 * @param {any} Message to be printed out.
	 */
	exports.log = function () {
	  window.console.log.apply(window.console, [
	    '%c[Omnitone]%c '
	      + Array.prototype.slice.call(arguments).join(' ') + ' %c(@'
	      + performance.now().toFixed(2) + 'ms)',
	    'background: #BBDEFB; color: #FF5722; font-weight: 700',
	    'font-weight: 400',
	    'color: #AAA'
	  ]);
	};

	/**
	 * A 4x4 matrix inversion utility.
	 * @param {Array} out   the receiving matrix.
	 * @param {Array} a     the source matrix.
	 * @returns {Array} out
	 */
	exports.invertMatrix4 = function (out, a) {
	  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	      a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	      a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	      a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	      b00 = a00 * a11 - a01 * a10,
	      b01 = a00 * a12 - a02 * a10,
	      b02 = a00 * a13 - a03 * a10,
	      b03 = a01 * a12 - a02 * a11,
	      b04 = a01 * a13 - a03 * a11,
	      b05 = a02 * a13 - a03 * a12,
	      b06 = a20 * a31 - a21 * a30,
	      b07 = a20 * a32 - a22 * a30,
	      b08 = a20 * a33 - a23 * a30,
	      b09 = a21 * a32 - a22 * a31,
	      b10 = a21 * a33 - a23 * a31,
	      b11 = a22 * a33 - a23 * a32,

	      det = b00 * b11 - b01 * b10 + b02 * b09 +
	            b03 * b08 - b04 * b07 + b05 * b06;

	  if (!det)
	    return null;
	  det = 1.0 / det;

	  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	  return out;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Copyright 2017 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileOverview A collection of convolvers. Can be used for the optimized FOA
	 *               binaural rendering. (e.g. SH-MaxRe HRTFs)
	 */

	'use strict';

	/**
	 * @class FOAConvolver
	 * @description A collection of 2 stereo convolvers for 4-channel FOA stream.
	 * @param {AudioContext} context        Associated AudioContext.
	 * @param {Object} options              Options for speaker.
	 * @param {AudioBuffer} options.IR      Stereo IR buffer for HRTF convolution.
	 * @param {Number} options.gain         Post-gain for the speaker.
	 */
	function FOAConvolver (context, options) {
	  if (options.IR.numberOfChannels !== 4)
	    throw 'IR does not have 4 channels. cannot proceed.';

	  this._active = false;

	  this._context = context;

	  this._input = this._context.createChannelSplitter(4);
	  this._mergerWY = this._context.createChannelMerger(2);
	  this._mergerZX = this._context.createChannelMerger(2);
	  this._convolverWY = this._context.createConvolver();
	  this._convolverZX = this._context.createConvolver();
	  this._splitterWY = this._context.createChannelSplitter(2);
	  this._splitterZX = this._context.createChannelSplitter(2);
	  this._inverter = this._context.createGain();
	  this._mergerBinaural = this._context.createChannelMerger(2);
	  this._summingBus = this._context.createGain();

	  // Group W and Y, then Z and X.
	  this._input.connect(this._mergerWY, 0, 0);
	  this._input.connect(this._mergerWY, 1, 1);
	  this._input.connect(this._mergerZX, 2, 0);
	  this._input.connect(this._mergerZX, 3, 1);

	  // Create a network of convolvers using splitter/merger.
	  this._mergerWY.connect(this._convolverWY);
	  this._mergerZX.connect(this._convolverZX);
	  this._convolverWY.connect(this._splitterWY);
	  this._convolverZX.connect(this._splitterZX);
	  this._splitterWY.connect(this._mergerBinaural, 0, 0);
	  this._splitterWY.connect(this._mergerBinaural, 0, 1);
	  this._splitterWY.connect(this._mergerBinaural, 1, 0);
	  this._splitterWY.connect(this._inverter, 1, 0);
	  this._inverter.connect(this._mergerBinaural, 0, 1);
	  this._splitterZX.connect(this._mergerBinaural, 0, 0);
	  this._splitterZX.connect(this._mergerBinaural, 0, 1);
	  this._splitterZX.connect(this._mergerBinaural, 1, 0);
	  this._splitterZX.connect(this._mergerBinaural, 1, 1);

	  this._convolverWY.normalize = false;
	  this._convolverZX.normalize = false;

	  // Generate 2 stereo buffers from a 4-channel IR.
	  this._setHRIRBuffers(options.IR);

	  // For asymmetric degree.
	  this._inverter.gain.value = -1;

	  // Input/Output proxy.
	  this.input = this._input;
	  this.output = this._summingBus;

	  this.enable();
	}

	FOAConvolver.prototype._setHRIRBuffers = function (hrirBuffer) {
	  // Use 2 stereo convolutions. This is because the mono convolution wastefully
	  // produces the stereo output with the same content.
	  this._hrirWY = this._context.createBuffer(2, hrirBuffer.length,
	                                            hrirBuffer.sampleRate);
	  this._hrirZX = this._context.createBuffer(2, hrirBuffer.length,
	                                            hrirBuffer.sampleRate);

	  // We do this because Safari does not support copyFromChannel/copyToChannel.
	  this._hrirWY.getChannelData(0).set(hrirBuffer.getChannelData(0));
	  this._hrirWY.getChannelData(1).set(hrirBuffer.getChannelData(1));
	  this._hrirZX.getChannelData(0).set(hrirBuffer.getChannelData(2));
	  this._hrirZX.getChannelData(1).set(hrirBuffer.getChannelData(3));

	  // After these assignments, the channel data in the buffer is immutable in
	  // FireFox. (i.e. neutered)
	  this._convolverWY.buffer = this._hrirWY;
	  this._convolverZX.buffer = this._hrirZX;
	};

	FOAConvolver.prototype.enable = function () {
	  this._mergerBinaural.connect(this._summingBus);
	  this._active = true;
	};

	FOAConvolver.prototype.disable = function () {
	  this._mergerBinaural.disconnect();
	  this._active = false;
	};

	module.exports = FOAConvolver;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	'use strict';

	/**
	 * @fileOverview An audio channel re-router to resolve different channel layouts
	 *               between various platforms.
	 */


	/**
	 * Channel map dictionary for various mapping scheme.
	 *
	 * @type {Object}
	 */
	var CHANNEL_MAP = {
	  // ACN, default channel map. Works correctly on Chrome and FireFox. (FFMpeg)
	  DEFAULT: [0, 1, 2, 3],
	  // Safari's decoder works differently on 4-channel stream.
	  APPLE: [2, 0, 1, 3],
	  // ACN -> FuMa conversion.
	  FUMA: [0, 3, 1, 2]
	};


	/**
	 * @class A simple channel re-router.
	 * @param {AudioContext} context Associated AudioContext.
	 * @param {Array} channelMap  Routing destination array.
	 *                                    e.g.) Chrome: [0, 1, 2, 3],
	 *                                    Apple(Safari): [2, 0, 1, 3]
	 */
	function FOARouter (context, channelMap) {
	  this._context = context;

	  this._splitter = this._context.createChannelSplitter(4);
	  this._merger = this._context.createChannelMerger(4);

	  this._channelMap = channelMap || CHANNEL_MAP.DEFAULT;

	  this._splitter.connect(this._merger, 0, this._channelMap[0]);
	  this._splitter.connect(this._merger, 1, this._channelMap[1]);
	  this._splitter.connect(this._merger, 2, this._channelMap[2]);
	  this._splitter.connect(this._merger, 3, this._channelMap[3]);

	  // input/output proxy.
	  this.input = this._splitter;
	  this.output = this._merger;
	}


	/**
	 * Set a channel map array.
	 *
	 * @param {Array} channelMap A custom channel map for FOA stream.
	 */
	FOARouter.prototype.setChannelMap = function (channelMap) {
	  if (!channelMap)
	    return;

	  this._channelMap = channelMap;
	  this._splitter.disconnect();
	  this._splitter.connect(this._merger, 0, this._channelMap[0]);
	  this._splitter.connect(this._merger, 1, this._channelMap[1]);
	  this._splitter.connect(this._merger, 2, this._channelMap[2]);
	  this._splitter.connect(this._merger, 3, this._channelMap[3]);
	}


	/**
	 * Static channel map dictionary.
	 *
	 * @static
	 * @type {Object}
	 */
	FOARouter.CHANNEL_MAP = CHANNEL_MAP;


	module.exports = FOARouter;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	'use strict';


	/**
	 * @fileOverview Sound field rotator for first-order-ambisonics decoding.
	 */


	/**
	 * @class First-order-ambisonic decoder based on gain node network.
	 * @param {AudioContext} context    Associated AudioContext.
	 */
	function FOARotator (context) {
	  this._context = context;

	  this._splitter = this._context.createChannelSplitter(4);
	  this._inY = this._context.createGain();
	  this._inZ = this._context.createGain();
	  this._inX = this._context.createGain();
	  this._m0 = this._context.createGain();
	  this._m1 = this._context.createGain();
	  this._m2 = this._context.createGain();
	  this._m3 = this._context.createGain();
	  this._m4 = this._context.createGain();
	  this._m5 = this._context.createGain();
	  this._m6 = this._context.createGain();
	  this._m7 = this._context.createGain();
	  this._m8 = this._context.createGain();
	  this._outY = this._context.createGain();
	  this._outZ = this._context.createGain();
	  this._outX = this._context.createGain();
	  this._merger = this._context.createChannelMerger(4);

	    // ACN channel ordering: [1, 2, 3] => [-Y, Z, -X]
	  this._splitter.connect(this._inY, 1); // Y (from channel 1)
	  this._splitter.connect(this._inZ, 2); // Z (from channel 2)
	  this._splitter.connect(this._inX, 3); // X (from channel 3)
	  this._inY.gain.value = -1;
	  this._inX.gain.value = -1;

	  // Apply the rotation in the world space.
	  // |Y|   | m0  m3  m6 |   | Y * m0 + Z * m3 + X * m6 |   | Yr |
	  // |Z| * | m1  m4  m7 | = | Y * m1 + Z * m4 + X * m7 | = | Zr |
	  // |X|   | m2  m5  m8 |   | Y * m2 + Z * m5 + X * m8 |   | Xr |
	  this._inY.connect(this._m0);
	  this._inY.connect(this._m1);
	  this._inY.connect(this._m2);
	  this._inZ.connect(this._m3);
	  this._inZ.connect(this._m4);
	  this._inZ.connect(this._m5);
	  this._inX.connect(this._m6);
	  this._inX.connect(this._m7);
	  this._inX.connect(this._m8);
	  this._m0.connect(this._outY);
	  this._m1.connect(this._outZ);
	  this._m2.connect(this._outX);
	  this._m3.connect(this._outY);
	  this._m4.connect(this._outZ);
	  this._m5.connect(this._outX);
	  this._m6.connect(this._outY);
	  this._m7.connect(this._outZ);
	  this._m8.connect(this._outX);

	  // Transform 3: world space to audio space.
	  this._splitter.connect(this._merger, 0, 0); // W -> W (to channel 0)
	  this._outY.connect(this._merger, 0, 1); // Y (to channel 1)
	  this._outZ.connect(this._merger, 0, 2); // Z (to channel 2)
	  this._outX.connect(this._merger, 0, 3); // X (to channel 3)
	  this._outY.gain.value = -1;
	  this._outX.gain.value = -1;

	  this.setRotationMatrix(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));

	  // input/output proxy.
	  this.input = this._splitter;
	  this.output = this._merger;
	}


	/**
	 * Set 3x3 matrix for soundfield rotation. (gl-matrix.js style)
	 * @param {Array} rotationMatrix    A 3x3 matrix of soundfield rotation. The
	 *                                  matrix is in the row-major representation.
	 */
	FOARotator.prototype.setRotationMatrix = function (rotationMatrix) {
	  this._m0.gain.value = rotationMatrix[0];
	  this._m1.gain.value = rotationMatrix[1];
	  this._m2.gain.value = rotationMatrix[2];
	  this._m3.gain.value = rotationMatrix[3];
	  this._m4.gain.value = rotationMatrix[4];
	  this._m5.gain.value = rotationMatrix[5];
	  this._m6.gain.value = rotationMatrix[6];
	  this._m7.gain.value = rotationMatrix[7];
	  this._m8.gain.value = rotationMatrix[8];
	};

	/**
	 * Set 4x4 matrix for soundfield rotation. (Three.js style)
	 * @param {Array} rotationMatrix4   A 4x4 matrix of soundfield rotation.
	 */
	FOARotator.prototype.setRotationMatrix4 = function (rotationMatrix4) {
	  this._m0.gain.value = rotationMatrix4[0];
	  this._m1.gain.value = rotationMatrix4[1];
	  this._m2.gain.value = rotationMatrix4[2];
	  this._m3.gain.value = rotationMatrix4[4];
	  this._m4.gain.value = rotationMatrix4[5];
	  this._m5.gain.value = rotationMatrix4[6];
	  this._m6.gain.value = rotationMatrix4[8];
	  this._m7.gain.value = rotationMatrix4[9];
	  this._m8.gain.value = rotationMatrix4[10];
	};

	/**
	 * Returns the current rotation matrix.
	 * @return {Array}                  A 3x3 matrix of soundfield rotation. The
	 *                                  matrix is in the row-major representation.
	 */
	FOARotator.prototype.getRotationMatrix = function () {
	  return [
	    this._m0.gain.value, this._m1.gain.value, this._m2.gain.value,
	    this._m3.gain.value, this._m4.gain.value, this._m5.gain.value,
	    this._m6.gain.value, this._m7.gain.value, this._m8.gain.value
	  ];
	};


	module.exports = FOARotator;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */



	/**
	 * @fileOverview Phase matched filter for first-order-ambisonics decoding.
	 */

	'use strict';

	var Utils = __webpack_require__(3);

	// Static parameters.
	var CROSSOVER_FREQUENCY = 690;
	var GAIN_COEFFICIENTS = [1.4142, 0.8166, 0.8166, 0.8166];

	// Helper: generate the coefficients for dual band filter.
	function generateDualBandCoefficients(crossoverFrequency, sampleRate) {
	  var k = Math.tan(Math.PI * crossoverFrequency / sampleRate),
	      k2 = k * k,
	      denominator = k2 + 2 * k + 1;

	  return {
	    lowpassA: [1, 2 * (k2 - 1) / denominator, (k2 - 2 * k + 1) / denominator],
	    lowpassB: [k2 / denominator, 2 * k2 / denominator, k2 / denominator],
	    hipassA: [1, 2 * (k2 - 1) / denominator, (k2 - 2 * k + 1) / denominator],
	    hipassB: [1 / denominator, -2 * 1 / denominator, 1 / denominator]
	  };
	}

	/**
	 * @class FOAPhaseMatchedFilter
	 * @description A set of filters (LP/HP) with a crossover frequency to
	 *              compensate the gain of high frequency contents without a phase
	 *              difference.
	 * @param {AudioContext} context        Associated AudioContext.
	 */
	function FOAPhaseMatchedFilter (context) {
	  this._context = context;

	  this._input = this._context.createGain();

	  if (!this._context.createIIRFilter) {
	    Utils.log('IIR filter is missing. Using Biquad filter instead.');
	    this._lpf = this._context.createBiquadFilter();
	    this._hpf = this._context.createBiquadFilter();
	    this._lpf.frequency.value = CROSSOVER_FREQUENCY;
	    this._hpf.frequency.value = CROSSOVER_FREQUENCY;
	    this._hpf.type = 'highpass';
	  } else {
	    var coef = generateDualBandCoefficients(
	        CROSSOVER_FREQUENCY, this._context.sampleRate);
	    this._lpf = this._context.createIIRFilter(coef.lowpassB, coef.lowpassA);
	    this._hpf = this._context.createIIRFilter(coef.hipassB, coef.hipassA);
	  }

	  this._splitterLow = this._context.createChannelSplitter(4);
	  this._splitterHigh = this._context.createChannelSplitter(4);
	  this._gainHighW = this._context.createGain();
	  this._gainHighY = this._context.createGain();
	  this._gainHighZ = this._context.createGain();
	  this._gainHighX = this._context.createGain();
	  this._merger = this._context.createChannelMerger(4);

	  this._input.connect(this._hpf);
	  this._hpf.connect(this._splitterHigh);
	  this._splitterHigh.connect(this._gainHighW, 0);
	  this._splitterHigh.connect(this._gainHighY, 1);
	  this._splitterHigh.connect(this._gainHighZ, 2);
	  this._splitterHigh.connect(this._gainHighX, 3);
	  this._gainHighW.connect(this._merger, 0, 0);
	  this._gainHighY.connect(this._merger, 0, 1);
	  this._gainHighZ.connect(this._merger, 0, 2);
	  this._gainHighX.connect(this._merger, 0, 3);

	  this._input.connect(this._lpf);
	  this._lpf.connect(this._splitterLow);
	  this._splitterLow.connect(this._merger, 0, 0);
	  this._splitterLow.connect(this._merger, 1, 1);
	  this._splitterLow.connect(this._merger, 2, 2);
	  this._splitterLow.connect(this._merger, 3, 3);

	  // Apply gain correction to hi-passed pressure and velocity components:
	  // Inverting sign is necessary as the low-passed and high-passed portion are
	  // out-of-phase after the filtering.
	  var now = this._context.currentTime;
	  this._gainHighW.gain.setValueAtTime(-1 * GAIN_COEFFICIENTS[0], now);
	  this._gainHighY.gain.setValueAtTime(-1 * GAIN_COEFFICIENTS[1], now);
	  this._gainHighZ.gain.setValueAtTime(-1 * GAIN_COEFFICIENTS[2], now);
	  this._gainHighX.gain.setValueAtTime(-1 * GAIN_COEFFICIENTS[3], now);

	  // Input/output Proxy.
	  this.input = this._input;
	  this.output = this._merger;
	}

	module.exports = FOAPhaseMatchedFilter;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileOverview Virtual speaker abstraction for first-order-ambisonics
	 *               decoding.
	 */

	'use strict';

	/**
	 * @class FOAVirtualSpeaker
	 * @description A virtual speaker with ambisonic decoding gain coefficients
	 *              and HRTF convolution for first-order-ambisonics stream.
	 *              Note that the subgraph directly connects to context's
	 *              destination.
	 * @param {AudioContext} context        Associated AudioContext.
	 * @param {Object} options              Options for speaker.
	 * @param {Array} options.coefficients  Decoding coefficients for (W,Y,Z,X).
	 * @param {AudioBuffer} options.IR      Stereo IR buffer for HRTF convolution.
	 * @param {Number} options.gain         Post-gain for the speaker.
	 */
	function FOAVirtualSpeaker (context, options) {
	  if (options.IR.numberOfChannels !== 2)
	    throw 'IR does not have 2 channels. cannot proceed.';

	  this._active = false;
	  
	  this._context = context;

	  this._input = this._context.createChannelSplitter(4);
	  this._cW = this._context.createGain();
	  this._cY = this._context.createGain();
	  this._cZ = this._context.createGain();
	  this._cX = this._context.createGain();
	  this._convolver = this._context.createConvolver();
	  this._gain = this._context.createGain();

	  this._input.connect(this._cW, 0);
	  this._input.connect(this._cY, 1);
	  this._input.connect(this._cZ, 2);
	  this._input.connect(this._cX, 3);
	  this._cW.connect(this._convolver);
	  this._cY.connect(this._convolver);
	  this._cZ.connect(this._convolver);
	  this._cX.connect(this._convolver);
	  this._convolver.connect(this._gain);
	  this._gain.connect(this._context.destination);

	  this.enable();

	  this._convolver.normalize = false;
	  this._convolver.buffer = options.IR;
	  this._gain.gain.value = options.gain;

	  // Set gain coefficients for FOA ambisonic streams.
	  this._cW.gain.value = options.coefficients[0];
	  this._cY.gain.value = options.coefficients[1];
	  this._cZ.gain.value = options.coefficients[2];
	  this._cX.gain.value = options.coefficients[3];

	  // Input proxy. Output directly connects to the destination.
	  this.input = this._input;
	}

	FOAVirtualSpeaker.prototype.enable = function () {
	  this._gain.connect(this._context.destination);
	  this._active = true;
	};

	FOAVirtualSpeaker.prototype.disable = function () {
	  this._gain.disconnect();
	  this._active = false;
	};

	module.exports = FOAVirtualSpeaker;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */


	/**
	 * @fileOverview Omnitone FOA decoder.
	 */

	'use strict';

	var AudioBufferManager = __webpack_require__(2);
	var FOARouter = __webpack_require__(5);
	var FOARotator = __webpack_require__(6);
	var FOAPhaseMatchedFilter = __webpack_require__(7);
	var FOAVirtualSpeaker = __webpack_require__(8);
	var FOASpeakerData = __webpack_require__(10);
	var Utils = __webpack_require__(3);
	var SystemVersion = __webpack_require__(11);

	// By default, Omnitone fetches IR from the spatial media repository.
	var HRTFSET_URL = 'https://raw.githubusercontent.com/GoogleChrome/omnitone/master/build/resources/';

	// Post gain compensation value.
	var POST_GAIN_DB = 0;


	/**
	 * @class Omnitone FOA decoder class.
	 * @param {AudioContext} context      Associated AudioContext.
	 * @param {VideoElement} videoElement Target video (or audio) element for
	 *                                    streaming.
	 * @param {Object} options
	 * @param {String} options.HRTFSetUrl Base URL for the cube HRTF sets.
	 * @param {Number} options.postGainDB Post-decoding gain compensation in dB.
	 * @param {Array} options.channelMap  Custom channel map.
	 */
	function FOADecoder (context, videoElement, options) {
	  this._isDecoderReady = false;
	  this._context = context;
	  this._videoElement = videoElement;
	  this._decodingMode = 'ambisonic';

	  this._postGainDB = POST_GAIN_DB;
	  this._HRTFSetUrl = HRTFSET_URL;
	  this._channelMap = FOARouter.CHANNEL_MAP.DEFAULT; // ACN

	  if (options) {
	    if (options.postGainDB)
	      this._postGainDB = options.postGainDB;

	    if (options.HRTFSetUrl)
	      this._HRTFSetUrl = options.HRTFSetUrl;

	    if (options.channelMap)
	      this._channelMap = options.channelMap;
	  }

	  // Rearrange speaker data based on |options.HRTFSetUrl|.
	  this._speakerData = [];
	  for (var i = 0; i < FOASpeakerData.length; ++i) {
	    this._speakerData.push({
	      name: FOASpeakerData[i].name,
	      url: this._HRTFSetUrl + '/' + FOASpeakerData[i].url,
	      coef: FOASpeakerData[i].coef
	    });
	  }

	  this._tempMatrix4 = new Float32Array(16);
	}

	/**
	 * Initialize and load the resources for the decode.
	 * @return {Promise}
	 */
	FOADecoder.prototype.initialize = function () {
	  Utils.log('Version: ' + SystemVersion);
	  Utils.log('Initializing... (mode: ' + this._decodingMode + ')');

	  // Rerouting channels if necessary.
	  var channelMapString = this._channelMap.toString();
	  var defaultChannelMapString = FOARouter.CHANNEL_MAP.DEFAULT.toString();
	  if (channelMapString !== defaultChannelMapString) {
	    Utils.log('Remapping channels ([' + defaultChannelMapString + '] -> ['
	      + channelMapString + '])');
	  }

	  this._audioElementSource = this._context.createMediaElementSource(
	    this._videoElement);
	  this._foaRouter = new FOARouter(this._context, this._channelMap);
	  this._foaRotator = new FOARotator(this._context);
	  this._foaPhaseMatchedFilter = new FOAPhaseMatchedFilter(this._context);

	  this._audioElementSource.connect(this._foaRouter.input);
	  this._foaRouter.output.connect(this._foaRotator.input);
	  this._foaRotator.output.connect(this._foaPhaseMatchedFilter.input);

	  this._foaVirtualSpeakers = [];

	  // Bypass signal path.
	  this._bypass = this._context.createGain();
	  this._audioElementSource.connect(this._bypass);

	  // Get the linear amplitude from the post gain option, which is in decibel.
	  var postGainLinear = Math.pow(10, this._postGainDB/20);
	  Utils.log('Gain compensation: ' + postGainLinear + ' (' + this._postGainDB
	    + 'dB)');

	  // This returns a promise so developers can use the decoder when it is ready.
	  var me = this;
	  return new Promise(function (resolve, reject) {
	    new AudioBufferManager(me._context, me._speakerData,
	      function (buffers) {
	        for (var i = 0; i < me._speakerData.length; ++i) {
	          me._foaVirtualSpeakers[i] = new FOAVirtualSpeaker(me._context, {
	            coefficients: me._speakerData[i].coef,
	            IR: buffers.get(me._speakerData[i].name),
	            gain: postGainLinear
	          });

	          me._foaPhaseMatchedFilter.output.connect(
	            me._foaVirtualSpeakers[i].input);
	        }

	        // Set the decoding mode.
	        me.setMode(me._decodingMode);
	        me._isDecoderReady = true;
	        Utils.log('HRTF IRs are loaded successfully. The decoder is ready.');

	        resolve();
	      }, reject);
	  });
	};

	/**
	 * Set the rotation matrix for the sound field rotation.
	 * @param {Array} rotationMatrix      3x3 rotation matrix (row-major
	 *                                    representation)
	 */
	FOADecoder.prototype.setRotationMatrix = function (rotationMatrix) {
	  this._foaRotator.setRotationMatrix(rotationMatrix);
	};


	/**
	 * Update the rotation matrix from a Three.js camera object.
	 * @param  {Object} cameraMatrix      The Matrix4 obejct of Three.js the camera.
	 */
	FOADecoder.prototype.setRotationMatrixFromCamera = function (cameraMatrix) {
	  // Extract the inner array elements and inverse. (The actual view rotation is
	  // the opposite of the camera movement.)
	  Utils.invertMatrix4(this._tempMatrix4, cameraMatrix.elements);
	  this._foaRotator.setRotationMatrix4(this._tempMatrix4);
	};

	/**
	 * Set the decoding mode.
	 * @param {String} mode               Decoding mode. When the mode is 'bypass'
	 *                                    the decoder is disabled and bypass the
	 *                                    input stream to the output. Setting the
	 *                                    mode to 'ambisonic' activates the decoder.
	 *                                    When the mode is 'off', all the
	 *                                    processing is completely turned off saving
	 *                                    the CPU power.
	 */
	FOADecoder.prototype.setMode = function (mode) {
	  if (mode === this._decodingMode)
	    return;

	  switch (mode) {

	    case 'bypass':
	      this._decodingMode = 'bypass';
	      for (var i = 0; i < this._foaVirtualSpeakers.length; ++i)
	        this._foaVirtualSpeakers[i].disable();
	      this._bypass.connect(this._context.destination);
	      break;

	    case 'ambisonic':
	      this._decodingMode = 'ambisonic';
	      for (var i = 0; i < this._foaVirtualSpeakers.length; ++i)
	        this._foaVirtualSpeakers[i].enable();
	      this._bypass.disconnect();
	      break;

	    case 'off':
	      this._decodingMode = 'off';
	      for (var i = 0; i < this._foaVirtualSpeakers.length; ++i)
	        this._foaVirtualSpeakers[i].disable();
	      this._bypass.disconnect();
	      break;

	    default:
	      break;
	  }

	  Utils.log('Decoding mode changed. (' + mode + ')');
	};

	module.exports = FOADecoder;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * See also:
	 * https://github.com/google/spatial-media/tree/master/spatial-audio
	 */

	/**
	 * The data for FOAVirtualSpeaker. Each entry contains the URL for IR files and
	 * the gain coefficients for the associated IR files. Note that the order of
	 * coefficients follows the ACN channel ordering. (W,Y,Z,X)
	 * @type {Array}
	 */
	var FOASpeakerData = [{
	  name: 'E35_A135',
	  url: 'E35_A135.wav',
	  gainFactor: 1,
	  coef: [.1250, 0.216495, 0.21653, -0.216495]
	}, {
	  name: 'E35_A-135',
	  url: 'E35_A-135.wav',
	  gainFactor: 1,
	  coef: [.1250, -0.216495, 0.21653, -0.216495]
	}, {
	  name: 'E-35_A135',
	  url: 'E-35_A135.wav',
	  gainFactor: 1,
	  coef: [.1250, 0.216495, -0.21653, -0.216495]
	}, {
	  name: 'E-35_A-135',
	  url: 'E-35_A-135.wav',
	  gainFactor: 1,
	  coef: [.1250, -0.216495, -0.21653, -0.216495]
	}, {
	  name: 'E35_A45',
	  url: 'E35_A45.wav',
	  gainFactor: 1,
	  coef: [.1250, 0.216495, 0.21653, 0.216495]
	}, {
	  name: 'E35_A-45',
	  url: 'E35_A-45.wav',
	  gainFactor: 1,
	  coef: [.1250, -0.216495, 0.21653, 0.216495]
	}, {
	  name: 'E-35_A45',
	  url: 'E-35_A45.wav',
	  gainFactor: 1,
	  coef: [.1250, 0.216495, -0.21653, 0.216495]
	}, {
	  name: 'E-35_A-45',
	  url: 'E-35_A-45.wav',
	  gainFactor: 1,
	  coef: [.1250, -0.216495, -0.21653, 0.216495]
	}];

	module.exports = FOASpeakerData;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileOverview Omnitone version.
	 */

	'use strict';

	/**
	 * Omnitone library version
	 * @type {String}
	 */
	module.exports = '0.2.2';


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2017 Google Inc. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	'use strict';

	/**
	 * @fileOverview Omnitone FOA decoder.
	 */
	var AudioBufferManager = __webpack_require__(2);
	var FOARouter = __webpack_require__(5);
	var FOARotator = __webpack_require__(6);
	var FOAConvolver = __webpack_require__(4);
	var Utils = __webpack_require__(3);
	var SystemVersion = __webpack_require__(11);

	// HRIR for optimized FOA rendering.
	// TODO(hongchan): change this with the absolute URL.
	var SH_MAXRE_HRIR_URL = 'resources/sh_hrir_o_1.wav';


	/**
	 * @class Omnitone FOA renderer class. Uses the optimized convolution technique.
	 * @param {AudioContext} context          Associated AudioContext.
	 * @param {Object} options
	 * @param {String} options.HRIRUrl        Optional HRIR URL.
	 * @param {String} options.renderingMode  Rendering mode.
	 * @param {Array} options.channelMap      Custom channel map.
	 */
	function FOARenderer (context, options) {
	  this._context = context;

	  // Priming internal setting with |options|.
	  this._HRIRUrl = SH_MAXRE_HRIR_URL;
	  this._channelMap = FOARouter.CHANNEL_MAP.DEFAULT;
	  this._renderingMode = 'ambisonic';
	  if (options) {
	    if (options.HRIRUrl)
	      this._HRIRUrl = options.HRIRUrl;
	    if (options.renderingMode)
	      this._renderingMode = options.renderingMode;
	    if (options.channelMap)
	      this._channelMap = options.channelMap;
	  }

	  this._isRendererReady = false;
	}


	/**
	 * Initialize and load the resources for the decode.
	 * @return {Promise}
	 */
	FOARenderer.prototype.initialize = function () {
	  Utils.log('Version: ' + SystemVersion);
	  Utils.log('Initializing... (mode: ' + this._renderingMode + ')');
	  Utils.log('Rendering via SH-MaxRE convolution.');

	  this._tempMatrix4 = new Float32Array(16);

	  return new Promise(this._initializeCallback.bind(this));
	};


	/**
	 * Internal callback handler for |initialize| method.
	 * @param {Function} resolve Promise resolution.
	 * @param {Function} reject Promise rejection.
	 */
	FOARenderer.prototype._initializeCallback = function (resolve, reject) {
	  var key = 'FOA_HRIR_AUDIOBUFFER';
	  new AudioBufferManager(
	      this._context,
	      [{ name: key, url: this._HRIRUrl }],
	      function (buffers) {
	        this.input = this._context.createGain();
	        this._bypass = this._context.createGain();
	        this._foaRouter = new FOARouter(this._context, this._channelMap);
	        this._foaRotator = new FOARotator(this._context);
	        this._foaConvolver = new FOAConvolver(this._context, {
	            IR: buffers.get(key)
	          });
	        this.output = this._context.createGain();

	        this.input.connect(this._foaRouter.input);
	        this.input.connect(this._bypass);
	        this._foaRouter.output.connect(this._foaRotator.input);
	        this._foaRotator.output.connect(this._foaConvolver.input);
	        this._foaConvolver.output.connect(this.output);

	        this.setChannelMap(this._channelMap);
	        this.setRenderingMode(this._renderingMode);

	        this._isRendererReady = true;
	        Utils.log('HRIRs are loaded successfully. The renderer is ready.');
	        resolve();
	      }.bind(this),
	      function (buffers) {
	        var errorMessage = 'Initialization failed: ' + key + ' is ' 
	            + buffers.get(0) + '.';
	        Utils.log(errorMessage);
	        reject(errorMessage);
	      });
	};

	/**
	 * Set the channel map.
	 * @param {Array} channelMap          A custom channel map for FOA stream.
	 */
	FOARenderer.prototype.setChannelMap = function (channelMap) {
	  if (!this._isRendererReady)
	    return;

	  if (channelMap.toString() !== this._channelMap.toString()) {
	    Utils.log('Remapping channels ([' + this._channelMap.toString() + '] -> ['
	      + channelMap.toString() + ']).');
	    this._channelMap = channelMap.slice();
	    this._foaRouter.setChannelMap(this._channelMap);
	  }
	};

	/**
	 * Set the rotation matrix for the sound field rotation.
	 * @param {Array} rotationMatrix      3x3 rotation matrix (row-major
	 *                                    representation)
	 */
	FOARenderer.prototype.setRotationMatrix = function (rotationMatrix) {
	  if (!this._isRendererReady)
	    return;

	  this._foaRotator.setRotationMatrix(rotationMatrix);
	};


	/**
	 * Update the rotation matrix from a Three.js camera object.
	 * @param  {Object} cameraMatrix      The Matrix4 obejct of Three.js the camera.
	 */
	FOARenderer.prototype.setRotationMatrixFromCamera = function (cameraMatrix) {
	  if (!this._isRendererReady)
	    return;

	  // Extract the inner array elements and inverse. (The actual view rotation is
	  // the opposite of the camera movement.)
	  Utils.invertMatrix4(this._tempMatrix4, cameraMatrix.elements);
	  this._foaRotator.setRotationMatrix4(this._tempMatrix4);
	};


	/**
	 * Set the decoding mode.
	 * @param {String} mode               Decoding mode. When the mode is 'bypass'
	 *                                    the decoder is disabled and bypass the
	 *                                    input stream to the output. Setting the
	 *                                    mode to 'ambisonic' activates the decoder.
	 *                                    When the mode is 'off', all the
	 *                                    processing is completely turned off saving
	 *                                    the CPU power.
	 */
	FOARenderer.prototype.setRenderingMode = function (mode) {
	  if (mode === this._renderingMode)
	    return;

	  switch (mode) {
	    // Bypass mode: The convolution path is disabled, disconnected (thus consume
	    // no CPU). Use bypass gain node to pass-through the input stream.
	    case 'bypass':
	      this._renderingMode = 'bypass';
	      this._foaConvolver.disable();
	      this._bypass.connect(this.output);
	      break;

	    // Ambisonic mode: Use the convolution and shut down the bypass path.
	    case 'ambisonic':
	      this._renderingMode = 'ambisonic';
	      this._foaConvolver.enable();
	      this._bypass.disconnect();
	      break;

	    // Off mode: Shut down all sound from the renderer.
	    case 'off':
	      this._renderingMode = 'off';
	      this._foaConvolver.disable();
	      this._bypass.disconnect();
	      break;

	    default:
	      // Unsupported mode. Ignore it.
	      Utils.log('Rendering mode "' + mode + '" is not supported.');
	      return;
	  }

	  Utils.log('Rendering mode changed. (' + mode + ')');
	};


	module.exports = FOARenderer;


/***/ }
/******/ ])
});
;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OmnitoneFOARendererImplementation_1 = require("./OmnitoneFOARendererImplementation");
var Ambisonics = /** @class */ (function () {
    function Ambisonics(player, config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.onPlayerReady = function (event) {
            _this.initialize();
        };
        this.onPlayerAudioChanged = function (event) {
            var isOldAudioTrackAmbisonic = Ambisonics.isAmbisonicTrack(event.sourceAudio);
            var isNewAudioTrackAmbisonic = Ambisonics.isAmbisonicTrack(event.targetAudio);
            if (!isOldAudioTrackAmbisonic && isNewAudioTrackAmbisonic) {
                console.debug('Activated Ambisonics audio', event.targetAudio);
                _this.enable();
            }
            else if (isOldAudioTrackAmbisonic && !isNewAudioTrackAmbisonic) {
                console.debug('Deactivated Ambisonics audio', event.targetAudio);
                _this.disable();
            }
        };
        this.onPlayerVrViewingDirectionChange = function (event) {
            console.log('VRViewingDirectionChange', event.direction);
            var rotationMatrix = Ambisonics.getRotationMatrix(event.direction, _this.config);
            _this.implementation.update(rotationMatrix);
        };
        this.player = player;
        this.config = config;
        this.config.autoSelectAmbisonicAudio = config.autoSelectAmbisonicAudio || true;
        this.config.yawOffset = config.yawOffset || 0;
        player.addEventHandler(player.EVENT.ON_READY, this.onPlayerReady);
        player.addEventHandler(player.EVENT.ON_AUDIO_CHANGED, this.onPlayerAudioChanged);
        // In case this instance was created after a source has been loaded into the player, we do not wait for the next
        // ON_SOURCE_LOADED event but initialize directly.
        if (player.isReady()) {
            this.initialize();
        }
    }
    Ambisonics.prototype.release = function () {
        this.disable();
        this.player.removeEventHandler(this.player.EVENT.ON_READY, this.onPlayerReady);
        this.player.removeEventHandler(this.player.EVENT.ON_AUDIO_CHANGED, this.onPlayerAudioChanged);
        this.implementation.release();
    };
    Ambisonics.prototype.initialize = function () {
        this.audioContext = new AudioContext();
        this.mediaElement = this.player.getVideoElement();
        if (Ambisonics.isVrContent(this.player) && this.config.autoSelectAmbisonicAudio) {
            var audioTracks = this.player.getAvailableAudio();
            var ambisonicAudioTrack = Ambisonics.findFirstAmbisonicTrack(audioTracks);
            console.log(audioTracks, ambisonicAudioTrack);
            if (ambisonicAudioTrack) {
                this.player.setAudio(ambisonicAudioTrack.id);
                console.debug('Autoselected first Ambisonics audio track', ambisonicAudioTrack);
            }
        }
    };
    Ambisonics.prototype.enable = function () {
        if (!Ambisonics.isVrContent(this.player)) {
            // Don't enable Ambisonics for non-VR content because it does not make any sense
            return;
        }
        if (this.enabled) {
            // Don't do anything if already enabled
            return;
        }
        // Create the FOARenderer only the first time it is required, then we reuse it
        if (!this.implementation) {
            this.implementation = new OmnitoneFOARendererImplementation_1.OmnitoneFOARendererImplementation();
            this.implementation.start(this.audioContext, this.mediaElement).catch(function (error) { return console.error(error); });
        }
        else {
            // Re-enable Ambisonics processing (in case it has been disabled earlier)
            this.implementation.enable();
        }
        this.player.addEventHandler(this.player.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE, this.onPlayerVrViewingDirectionChange);
        this.enabled = true;
    };
    Ambisonics.prototype.disable = function () {
        if (!this.enabled) {
            // Don't do anything if already disabled
            return;
        }
        // Disable rotation handling
        this.player.removeEventHandler(this.player.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE, this.onPlayerVrViewingDirectionChange);
        // Disable Ambisonics processing
        this.implementation.disable();
        this.enabled = false;
    };
    Ambisonics.isVrContent = function (player) {
        // We can't use this in ON_READY as the VR handler is not yet loaded in there.
        // We also can't check player.vr namespace availability for the same reason.
        // return player.getVRStatus().contentType !== 'none';
        // As a workaround, we check the source config because the player treats every source as VR
        // source when the vr property in the source is set.
        // TODO use method above once ON_READY is fixed
        return !!player.getConfig().source && !!player.getConfig().source.vr;
    };
    Ambisonics.isAmbisonicTrack = function (audioTrack) {
        var audioTrackRoles = audioTrack.role;
        if (audioTrackRoles && audioTrackRoles.length > 0) {
            for (var _i = 0, audioTrackRoles_1 = audioTrackRoles; _i < audioTrackRoles_1.length; _i++) {
                var audioTrackRole = audioTrackRoles_1[_i];
                if (audioTrackRole.schemeIdUri === Ambisonics.VR_SCHEME_ID_URI
                    && audioTrackRole.value === Ambisonics.VR_SCHEME_VALUE_FOA) {
                    return true;
                }
            }
        }
        return false;
    };
    Ambisonics.findFirstAmbisonicTrack = function (audioTracks) {
        // We iterate over all available audio tracks and check their roles to see if one is an Ambisonics track.
        for (var _i = 0, audioTracks_1 = audioTracks; _i < audioTracks_1.length; _i++) {
            var audioTrack = audioTracks_1[_i];
            if (Ambisonics.isAmbisonicTrack(audioTrack)) {
                return audioTrack;
            }
        }
        return null;
    };
    /**
     * Converts yaw/pitch/roll into a 3x3 rotation matrix.
     * @param {bitmovin.PlayerAPI.VR.ViewingDirection} direction the viewing direction from the player
     * @param {AmbisonicsConfig} config
     * @return {number[]} 3x3 rotation matrix
     */
    Ambisonics.getRotationMatrix = function (direction, config) {
        // Convert degrees to radians
        var degToRad = Math.PI / 180;
        var yaw = direction.yaw * degToRad;
        var pitch = direction.pitch * degToRad;
        var roll = direction.roll * degToRad;
        // The Bitmovin player assumes 0 degree at the left of the equirectangular projection,
        // while the source assumes it in the center, so we must correct our angles for the
        // Ambisonics audio to match the VR video viewport.
        var correctedYaw = yaw + config.yawOffset;
        var correctedPitch = pitch;
        var correctedRoll = roll;
        // Convert yaw/pitch/roll to matrix: http://planning.cs.uiuc.edu/node102.html
        var alpha = correctedYaw; // z-axis
        var beta = correctedPitch; // y-axis
        var gamma = correctedRoll; // x-axis
        var sinAlpha = Math.sin(alpha);
        var cosAlpha = Math.cos(alpha);
        var sinBeta = Math.sin(beta);
        var cosBeta = Math.cos(beta);
        var sinGamma = Math.sin(gamma);
        var cosGamma = Math.cos(gamma);
        return [
            cosAlpha * cosBeta,
            cosAlpha * sinBeta * sinGamma - sinAlpha * cosGamma,
            cosAlpha * sinBeta * cosGamma + sinAlpha * sinGamma,
            sinAlpha * cosBeta,
            sinAlpha * sinBeta * sinGamma + cosAlpha * cosGamma,
            sinAlpha * sinBeta * cosGamma - cosAlpha * sinGamma,
            -sinBeta,
            cosBeta * sinGamma,
            cosBeta * cosGamma,
        ];
    };
    Ambisonics.VR_SCHEME_ID_URI = 'https://bitmovin.com/082017/vr';
    Ambisonics.VR_SCHEME_VALUE_FOA = 'ambisonic-fo';
    return Ambisonics;
}());
exports.Ambisonics = Ambisonics;
},{"./OmnitoneFOARendererImplementation":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var omnitone_1 = require("omnitone");
/**
 * Implements Ambisonic decoding with Omnitone's FOARenderer
 * https://github.com/GoogleChrome/omnitone
 */
var OmnitoneFOARendererImplementation = /** @class */ (function () {
    function OmnitoneFOARendererImplementation() {
    }
    OmnitoneFOARendererImplementation.prototype.start = function (context, mediaElement) {
        var _this = this;
        this.audioContext = context;
        this.audioSource = this.audioContext.createMediaElementSource(mediaElement);
        this.foaRenderer = omnitone_1.Omnitone.createFOARenderer(this.audioContext, {
            HRIRUrl: 'https://cdn.rawgit.com/GoogleChrome/omnitone/962089ca/build/resources/sh_hrir_o_1.wav',
            // Remap channels from FuMa ordering (W,X,Y,Z) to ACN
            channelMap: [0, 3, 1, 2],
        });
        return this.foaRenderer.initialize().then(function () {
            _this.audioSource.connect(_this.foaRenderer.input);
            _this.foaRenderer.output.connect(_this.audioContext.destination);
        });
    };
    OmnitoneFOARendererImplementation.prototype.release = function () {
        this.disable();
        this.audioSource.disconnect(this.foaRenderer.input);
        this.foaRenderer.output.disconnect(this.audioContext.destination);
        this.audioSource.connect(this.audioContext.destination);
        return Promise.resolve();
    };
    OmnitoneFOARendererImplementation.prototype.enable = function () {
        this.foaRenderer.setRenderingMode('ambisonic');
    };
    OmnitoneFOARendererImplementation.prototype.disable = function () {
        this.foaRenderer.setRenderingMode('bypass');
    };
    OmnitoneFOARendererImplementation.prototype.update = function (rotationMatrix) {
        this.foaRenderer.setRotationMatrix(rotationMatrix);
    };
    return OmnitoneFOARendererImplementation;
}());
exports.OmnitoneFOARendererImplementation = OmnitoneFOARendererImplementation;
},{"omnitone":1}],4:[function(require,module,exports){
"use strict";
/// <reference path='Omnitone.d.ts' />
Object.defineProperty(exports, "__esModule", { value: true });
var Ambisonics_1 = require("./Ambisonics");
// Export Ambisonics integration to global namespace
var w = window;
w.bitmovin = w.bitmovin || {};
w.bitmovin.player = w.bitmovin.player || {};
w.bitmovin.player.vr = w.bitmovin.player.vr || {};
w.bitmovin.player.vr.Ambisonics = Ambisonics_1.Ambisonics;
},{"./Ambisonics":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvb21uaXRvbmUvYnVpbGQvb21uaXRvbmUuanMiLCJzcmMvdHMvQW1iaXNvbmljcy50cyIsInNyYy90cy9PbW5pdG9uZUZPQVJlbmRlcmVySW1wbGVtZW50YXRpb24udHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hoREEseUZBQXNGO0FBZ0J0RjtJQVlFLG9CQUFZLE1BQTBCLEVBQUUsTUFBNkI7UUFBN0IsdUJBQUEsRUFBQSxXQUE2QjtRQUFy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Q0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLHVCQUFVLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQGxpY2Vuc2Vcblx0ICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblx0ICpcblx0ICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXHQgKlxuXHQgKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5cdCAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcblx0ICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5cdCAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcblx0ICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cdCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyBQcmltYXJ5IG5hbWVzcGFjZSBmb3IgT21uaXRvbmUgbGlicmFyeS5cblx0ZXhwb3J0cy5PbW5pdG9uZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cdCAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXHQgKlxuXHQgKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cdCAqXG5cdCAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcblx0ICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuXHQgKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblx0ICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuXHQgKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblx0ICovXG5cblx0LyoqXG5cdCAqIEBmaWxlT3ZlcnZpZXcgT21uaXRvbmUgbGlicmFyeSBuYW1lIHNwYWNlIGFuZCBjb21tb24gdXRpbGl0aWVzLlxuXHQgKi9cblxuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEBjbGFzcyBPbW5pdG9uZSBtYWluIG5hbWVzcGFjZS5cblx0ICovXG5cdHZhciBPbW5pdG9uZSA9IHt9O1xuXG5cdC8vIEludGVybmFsIGRlcGVuZGVuY2llcy5cblx0dmFyIEF1ZGlvQnVmZmVyTWFuYWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cdHZhciBGT0FDb252b2x2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgRk9BUm91dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblx0dmFyIEZPQVJvdGF0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgRk9BUGhhc2VNYXRjaGVkRmlsdGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblx0dmFyIEZPQVZpcnR1YWxTcGVha2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblx0dmFyIEZPQURlY29kZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXHR2YXIgRk9BUmVuZGVyZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxuXHQvKipcblx0ICogTG9hZCBhdWRpbyBidWZmZXJzIGJhc2VkIG9uIHRoZSBzcGVha2VyIGNvbmZpZ3VyYXRpb24gbWFwIGRhdGEuXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0ICAgICAgVGhlIGFzc29jaWF0ZWQgQXVkaW9Db250ZXh0LlxuXHQgKiBAcGFyYW0ge01hcH0gc3BlYWtlckRhdGEgICAgICAgICAgIFRoZSBzcGVha2VyIGNvbmZpZ3VyYXRpb24gbWFwIGRhdGEuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lLCB1cmwsIGNvZWYgfVxuXHQgKiBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblx0T21uaXRvbmUubG9hZEF1ZGlvQnVmZmVycyA9IGZ1bmN0aW9uIChjb250ZXh0LCBzcGVha2VyRGF0YSkge1xuXHQgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdCAgICBuZXcgQXVkaW9CdWZmZXJNYW5hZ2VyKGNvbnRleHQsIHNwZWFrZXJEYXRhLCBmdW5jdGlvbiAoYnVmZmVycykge1xuXHQgICAgICByZXNvbHZlKGJ1ZmZlcnMpO1xuXHQgICAgfSwgcmVqZWN0KTtcblx0ICB9KTtcblx0fTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEZPQSBDb252b2x2ZXIuIEZvciBwYXJhbWV0ZXJzLCByZWZlciB0aGUgZGVmaW5pdGlvbiBvZlxuXHQgKiBSb3V0ZXIgY2xhc3MuXG5cdCAqIEByZXR1cm4ge09iamVjdH1cblx0ICovXG5cdE9tbml0b25lLmNyZWF0ZUZPQUNvbnZvbHZlciA9IGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIG5ldyBGT0FDb252b2x2ZXIoY29udGV4dCwgb3B0aW9ucyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBGT0EgUm91dGVyLiBGb3IgcGFyYW1ldGVycywgcmVmZXIgdGhlIGRlZmluaXRpb24gb2Zcblx0ICogUm91dGVyIGNsYXNzLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdCAqL1xuXHRPbW5pdG9uZS5jcmVhdGVGT0FSb3V0ZXIgPSBmdW5jdGlvbiAoY29udGV4dCwgY2hhbm5lbE1hcCkge1xuXHQgIHJldHVybiBuZXcgRk9BUm91dGVyKGNvbnRleHQsIGNoYW5uZWxNYXApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRk9BIFJvdGF0b3IuIEZvciBwYXJhbWV0ZXJzLCByZWZlciB0aGUgZGVmaW5pdGlvbiBvZlxuXHQgKiBSb3RhdG9yIGNsYXNzLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdCAqL1xuXHRPbW5pdG9uZS5jcmVhdGVGT0FSb3RhdG9yID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0ICByZXR1cm4gbmV3IEZPQVJvdGF0b3IoY29udGV4dCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBGT0FQaGFzZU1hdGNoZWRGaWx0ZXIuIEZvciBwYXJhbWV0ZXJzLCByZWZlciB0aGVcblx0ICogZGVmaW5pdGlvbiBvZiBQaGFzZU1hdGNoZWRGaWx0ZXIgY2xhc3MuXG5cdCAqIEByZXR1cm4ge0ZPQVBoYXNlTWF0Y2hlZEZpbHRlcn1cblx0ICovXG5cdE9tbml0b25lLmNyZWF0ZUZPQVBoYXNlTWF0Y2hlZEZpbHRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdCAgcmV0dXJuIG5ldyBGT0FQaGFzZU1hdGNoZWRGaWx0ZXIoY29udGV4dCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBGT0FWaXJ0dWFsU3BlYWtlci4gRm9yIHBhcmFtZXRlcnMsIHJlZmVyIHRoZVxuXHQgKiBkZWZpbml0aW9uIG9mIFZpcnR1YWxTcGVha2VyIGNsYXNzLlxuXHQgKiBAcmV0dXJuIHtGT0FWaXJ0dWFsU3BlYWtlcn1cblx0ICovXG5cdE9tbml0b25lLmNyZWF0ZUZPQVZpcnR1YWxTcGVha2VyID0gZnVuY3Rpb24gKGNvbnRleHQsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gbmV3IEZPQVZpcnR1YWxTcGVha2VyKGNvbnRleHQsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBzaW5nbGV0b24gRk9BRGVjb2RlciBpbnN0YW5jZS5cblx0ICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IGNvbnRleHQgICAgICBBc3NvY2lhdGVkIEF1ZGlvQ29udGV4dC5cblx0ICogQHBhcmFtIHtET01FbGVtZW50fSB2aWRlb0VsZW1lbnQgICBWaWRlbyBvciBBdWRpbyBET00gZWxlbWVudCB0byBiZSBzdHJlYW1lZC5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICBPcHRpb25zIGZvciBGT0EgZGVjb2Rlci5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYmFzZVJlc291cmNlVXJsICAgIEJhc2UgVVJMIGZvciByZXNvdXJjZXMuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoSFJURiBJUiBmaWxlcylcblx0ICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucG9zdEdhaW4gICAgICAgICAgIFBvc3QtZGVjb2RpbmcgZ2FpbiBjb21wZW5zYXRpb24uXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoRGVmYXVsdCA9IDI2LjApXG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucm91dGluZ0Rlc3RpbmF0aW9uICBDdXN0b20gY2hhbm5lbCBsYXlvdXQuXG5cdCAqIEByZXR1cm4ge0ZPQURlY29kZXJ9XG5cdCAqL1xuXHRPbW5pdG9uZS5jcmVhdGVGT0FEZWNvZGVyID0gZnVuY3Rpb24gKGNvbnRleHQsIHZpZGVvRWxlbWVudCwgb3B0aW9ucykge1xuXHQgIHJldHVybiBuZXcgRk9BRGVjb2Rlcihjb250ZXh0LCB2aWRlb0VsZW1lbnQsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBzaW5nbGV0b24gRk9BUmVuZGVyZXIgaW5zdGFuY2UuXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0ICAgICAgQXNzb2NpYXRlZCBBdWRpb0NvbnRleHQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zICAgICAgICAgICAgT3B0aW9ucy5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuSFJJUlVybCAgICBPcHRpb25hbCBIUklSIFVSTC5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucG9zdEdhaW5EQiBPcHRpb25hbCBwb3N0LWRlY29kaW5nIGdhaW4gaW4gZEIuXG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY2hhbm5lbE1hcCAgT3B0aW9uYWwgY3VzdG9tIGNoYW5uZWwgbWFwLlxuXHQgKi9cblx0T21uaXRvbmUuY3JlYXRlRk9BUmVuZGVyZXIgPSBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuXHQgIHJldHVybiBuZXcgRk9BUmVuZGVyZXIoY29udGV4dCwgb3B0aW9ucyk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBPbW5pdG9uZTtcblxuXG4vKioqLyB9LFxuLyogMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyoqXG5cdCAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cdCAqXG5cdCAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblx0ICpcblx0ICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuXHQgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5cdCAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuXHQgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5cdCAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBBdWRpbyBidWZmZXIgbG9hZGluZyB1dGlsaXR5LlxuXHQgKi9cblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHQvKipcblx0ICogU3RyZWFtbGluZWQgYXVkaW8gZmlsZSBsb2FkZXIgc3VwcG9ydHMgUHJvbWlzZS5cblx0ICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgICAgICAgICAgQXVkaW9Db250ZXh0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBhdWRpb0ZpbGVEYXRhICAgIEF1ZGlvIGZpbGUgaW5mbyBhcyBbe25hbWUsIHVybH1dXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgICAgICAgIFJlc29sdXRpb24gaGFuZGxlciBmb3IgcHJvbWlzZS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ICAgICAgICAgUmVqZWN0aW9uIGhhbmRsZXIgZm9yIHByb21pc2UuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHByb2dyZXNzICAgICAgIFByb2dyZXNzIGV2ZW50IGhhbmRsZXIuXG5cdCAqL1xuXHRmdW5jdGlvbiBBdWRpb0J1ZmZlck1hbmFnZXIoY29udGV4dCwgYXVkaW9GaWxlRGF0YSwgcmVzb2x2ZSwgcmVqZWN0LCBwcm9ncmVzcykge1xuXHQgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXG5cdCAgdGhpcy5fYnVmZmVycyA9IG5ldyBNYXAoKTtcblx0ICB0aGlzLl9sb2FkaW5nVGFza3MgPSB7fTtcblxuXHQgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuXHQgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcblx0ICB0aGlzLl9wcm9ncmVzcyA9IHByb2dyZXNzO1xuXG5cdCAgLy8gSXRlcmF0aW5nIGZpbGUgbG9hZGluZy5cblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IGF1ZGlvRmlsZURhdGEubGVuZ3RoOyBpKyspIHtcblx0ICAgIHZhciBmaWxlSW5mbyA9IGF1ZGlvRmlsZURhdGFbaV07XG5cblx0ICAgIC8vIENoZWNrIGZvciBkdXBsaWNhdGVzIGZpbGVuYW1lIGFuZCBxdWl0IGlmIGl0IGhhcHBlbnMuXG5cdCAgICBpZiAodGhpcy5fbG9hZGluZ1Rhc2tzLmhhc093blByb3BlcnR5KGZpbGVJbmZvLm5hbWUpKSB7XG5cdCAgICAgIFV0aWxzLmxvZygnRHVwbGljYXRlZCBmaWxlbmFtZSB3aGVuIGxvYWRpbmc6ICcgKyBmaWxlSW5mby5uYW1lKTtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXG5cdCAgICAvLyBNYXJrIGl0IGFzIHBlbmRpbmcgKDApXG5cdCAgICB0aGlzLl9sb2FkaW5nVGFza3NbZmlsZUluZm8ubmFtZV0gPSAwO1xuXHQgICAgdGhpcy5fbG9hZEF1ZGlvRmlsZShmaWxlSW5mbyk7XG5cdCAgfVxuXHR9XG5cblx0QXVkaW9CdWZmZXJNYW5hZ2VyLnByb3RvdHlwZS5fbG9hZEF1ZGlvRmlsZSA9IGZ1bmN0aW9uIChmaWxlSW5mbykge1xuXHQgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0ICB4aHIub3BlbignR0VUJywgZmlsZUluZm8udXJsKTtcblx0ICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcblxuXHQgIHZhciB0aGF0ID0gdGhpcztcblx0ICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuXHQgICAgICB0aGF0Ll9jb250ZXh0LmRlY29kZUF1ZGlvRGF0YSh4aHIucmVzcG9uc2UsXG5cdCAgICAgICAgZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHQgICAgICAgICAgLy8gVXRpbHMubG9nKCdGaWxlIGxvYWRlZDogJyArIGZpbGVJbmZvLnVybCk7XG5cdCAgICAgICAgICB0aGF0Ll9kb25lKGZpbGVJbmZvLm5hbWUsIGJ1ZmZlcik7XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBmdW5jdGlvbiAobWVzc2FnZSkge1xuXHQgICAgICAgICAgVXRpbHMubG9nKCdEZWNvZGluZyBmYWlsdXJlOiAnXG5cdCAgICAgICAgICAgICsgZmlsZUluZm8udXJsICsgJyAoJyArIG1lc3NhZ2UgKyAnKScpO1xuXHQgICAgICAgICAgdGhhdC5fZG9uZShmaWxlSW5mby5uYW1lLCBudWxsKTtcblx0ICAgICAgICB9KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIFV0aWxzLmxvZygnWEhSIEVycm9yOiAnICsgZmlsZUluZm8udXJsICsgJyAoJyArIHhoci5zdGF0dXNUZXh0IFxuXHQgICAgICAgICsgJyknKTtcblx0ICAgICAgdGhhdC5fZG9uZShmaWxlSW5mby5uYW1lLCBudWxsKTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gVE9ETzogZmV0Y2ggbG9jYWwgcmVzb3VyY2VzIGlmIFhIUiBmYWlscy5cblx0ICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgVXRpbHMubG9nKCdYSFIgTmV0d29yayBmYWlsdXJlOiAnICsgZmlsZUluZm8udXJsKTtcblx0ICAgIHRoYXQuX2RvbmUoZmlsZUluZm8ubmFtZSwgbnVsbCk7XG5cdCAgfTtcblxuXHQgIHhoci5zZW5kKCk7XG5cdH07XG5cblx0QXVkaW9CdWZmZXJNYW5hZ2VyLnByb3RvdHlwZS5fZG9uZSA9IGZ1bmN0aW9uIChmaWxlbmFtZSwgYnVmZmVyKSB7XG5cdCAgLy8gTGFiZWwgdGhlIGxvYWRpbmcgdGFzay5cblx0ICB0aGlzLl9sb2FkaW5nVGFza3NbZmlsZW5hbWVdID0gYnVmZmVyICE9PSBudWxsID8gJ2xvYWRlZCcgOiAnZmFpbGVkJztcblxuXHQgIC8vIEEgZmFpbGVkIHRhc2sgd2lsbCBiZSBhIG51bGwgYnVmZmVyLlxuXHQgIHRoaXMuX2J1ZmZlcnMuc2V0KGZpbGVuYW1lLCBidWZmZXIpO1xuXG5cdCAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MoZmlsZW5hbWUpO1xuXHR9O1xuXG5cdEF1ZGlvQnVmZmVyTWFuYWdlci5wcm90b3R5cGUuX3VwZGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKGZpbGVuYW1lKSB7XG5cdCAgdmFyIG51bWJlck9mRmluaXNoZWRUYXNrcyA9IDAsIG51bWJlck9mRmFpbGVkVGFzayA9IDA7XG5cdCAgdmFyIG51bWJlck9mVGFza3MgPSAwO1xuXG5cdCAgZm9yICh2YXIgdGFzayBpbiB0aGlzLl9sb2FkaW5nVGFza3MpIHtcblx0ICAgIG51bWJlck9mVGFza3MrKztcblx0ICAgIGlmICh0aGlzLl9sb2FkaW5nVGFza3NbdGFza10gPT09ICdsb2FkZWQnKVxuXHQgICAgICBudW1iZXJPZkZpbmlzaGVkVGFza3MrKztcblx0ICAgIGVsc2UgaWYgKHRoaXMuX2xvYWRpbmdUYXNrc1t0YXNrXSA9PT0gJ2ZhaWxlZCcpXG5cdCAgICAgIG51bWJlck9mRmFpbGVkVGFzaysrO1xuXHQgIH1cblxuXHQgIGlmICh0eXBlb2YgdGhpcy5fcHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHRoaXMuX3Byb2dyZXNzKGZpbGVuYW1lLCBudW1iZXJPZkZpbmlzaGVkVGFza3MsIG51bWJlck9mVGFza3MpO1xuXHQgICAgcmV0dXJuO1xuXHQgIH1cblxuXHQgIGlmIChudW1iZXJPZkZpbmlzaGVkVGFza3MgPT09IG51bWJlck9mVGFza3MpIHtcblx0ICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fYnVmZmVycyk7XG5cdCAgICByZXR1cm47XG5cdCAgfVxuXG5cdCAgaWYgKG51bWJlck9mRmluaXNoZWRUYXNrcyArIG51bWJlck9mRmFpbGVkVGFzayA9PT0gbnVtYmVyT2ZUYXNrcykge1xuXHQgICAgdGhpcy5fcmVqZWN0KHRoaXMuX2J1ZmZlcnMpO1xuXHQgICAgcmV0dXJuO1xuXHQgIH1cblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQnVmZmVyTWFuYWdlcjtcblxuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cdCAqXG5cdCAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblx0ICpcblx0ICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuXHQgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5cdCAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuXHQgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5cdCAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBPbW5pdG9uZSBsaWJyYXJ5IGNvbW1vbiB1dGlsaXRpZXMuXG5cdCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogT21uaXRvbmUgbGlicmFyeSBsb2dnaW5nIGZ1bmN0aW9uLlxuXHQgKiBAdHlwZSB7RnVuY3Rpb259XG5cdCAqIEBwYXJhbSB7YW55fSBNZXNzYWdlIHRvIGJlIHByaW50ZWQgb3V0LlxuXHQgKi9cblx0ZXhwb3J0cy5sb2cgPSBmdW5jdGlvbiAoKSB7XG5cdCAgd2luZG93LmNvbnNvbGUubG9nLmFwcGx5KHdpbmRvdy5jb25zb2xlLCBbXG5cdCAgICAnJWNbT21uaXRvbmVdJWMgJ1xuXHQgICAgICArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbignICcpICsgJyAlYyhAJ1xuXHQgICAgICArIHBlcmZvcm1hbmNlLm5vdygpLnRvRml4ZWQoMikgKyAnbXMpJyxcblx0ICAgICdiYWNrZ3JvdW5kOiAjQkJERUZCOyBjb2xvcjogI0ZGNTcyMjsgZm9udC13ZWlnaHQ6IDcwMCcsXG5cdCAgICAnZm9udC13ZWlnaHQ6IDQwMCcsXG5cdCAgICAnY29sb3I6ICNBQUEnXG5cdCAgXSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEEgNHg0IG1hdHJpeCBpbnZlcnNpb24gdXRpbGl0eS5cblx0ICogQHBhcmFtIHtBcnJheX0gb3V0ICAgdGhlIHJlY2VpdmluZyBtYXRyaXguXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGEgICAgIHRoZSBzb3VyY2UgbWF0cml4LlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IG91dFxuXHQgKi9cblx0ZXhwb3J0cy5pbnZlcnRNYXRyaXg0ID0gZnVuY3Rpb24gKG91dCwgYSkge1xuXHQgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuXHQgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuXHQgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG5cdCAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG5cdCAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcblx0ICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuXHQgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG5cdCAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcblx0ICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuXHQgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG5cdCAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcblx0ICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuXHQgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG5cdCAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcblx0ICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuXHQgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cblx0ICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICtcblx0ICAgICAgICAgICAgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG5cdCAgaWYgKCFkZXQpXG5cdCAgICByZXR1cm4gbnVsbDtcblx0ICBkZXQgPSAxLjAgLyBkZXQ7XG5cblx0ICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcblx0ICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcblx0ICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcblx0ICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcblx0ICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcblx0ICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcblx0ICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcblx0ICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcblx0ICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcblx0ICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcblx0ICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG5cdCAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuXHQgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcblx0ICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG5cdCAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuXHQgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuXHQgIHJldHVybiBvdXQ7XG5cdH1cblxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cdCAqXG5cdCAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblx0ICpcblx0ICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuXHQgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5cdCAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuXHQgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5cdCAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBBIGNvbGxlY3Rpb24gb2YgY29udm9sdmVycy4gQ2FuIGJlIHVzZWQgZm9yIHRoZSBvcHRpbWl6ZWQgRk9BXG5cdCAqICAgICAgICAgICAgICAgYmluYXVyYWwgcmVuZGVyaW5nLiAoZS5nLiBTSC1NYXhSZSBIUlRGcylcblx0ICovXG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBAY2xhc3MgRk9BQ29udm9sdmVyXG5cdCAqIEBkZXNjcmlwdGlvbiBBIGNvbGxlY3Rpb24gb2YgMiBzdGVyZW8gY29udm9sdmVycyBmb3IgNC1jaGFubmVsIEZPQSBzdHJlYW0uXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0ICAgICAgICBBc3NvY2lhdGVkIEF1ZGlvQ29udGV4dC5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICAgIE9wdGlvbnMgZm9yIHNwZWFrZXIuXG5cdCAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IG9wdGlvbnMuSVIgICAgICBTdGVyZW8gSVIgYnVmZmVyIGZvciBIUlRGIGNvbnZvbHV0aW9uLlxuXHQgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5nYWluICAgICAgICAgUG9zdC1nYWluIGZvciB0aGUgc3BlYWtlci5cblx0ICovXG5cdGZ1bmN0aW9uIEZPQUNvbnZvbHZlciAoY29udGV4dCwgb3B0aW9ucykge1xuXHQgIGlmIChvcHRpb25zLklSLm51bWJlck9mQ2hhbm5lbHMgIT09IDQpXG5cdCAgICB0aHJvdyAnSVIgZG9lcyBub3QgaGF2ZSA0IGNoYW5uZWxzLiBjYW5ub3QgcHJvY2VlZC4nO1xuXG5cdCAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG5cblx0ICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblxuXHQgIHRoaXMuX2lucHV0ID0gdGhpcy5fY29udGV4dC5jcmVhdGVDaGFubmVsU3BsaXR0ZXIoNCk7XG5cdCAgdGhpcy5fbWVyZ2VyV1kgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNoYW5uZWxNZXJnZXIoMik7XG5cdCAgdGhpcy5fbWVyZ2VyWlggPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNoYW5uZWxNZXJnZXIoMik7XG5cdCAgdGhpcy5fY29udm9sdmVyV1kgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuXHQgIHRoaXMuX2NvbnZvbHZlclpYID0gdGhpcy5fY29udGV4dC5jcmVhdGVDb252b2x2ZXIoKTtcblx0ICB0aGlzLl9zcGxpdHRlcldZID0gdGhpcy5fY29udGV4dC5jcmVhdGVDaGFubmVsU3BsaXR0ZXIoMik7XG5cdCAgdGhpcy5fc3BsaXR0ZXJaWCA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKDIpO1xuXHQgIHRoaXMuX2ludmVydGVyID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cdCAgdGhpcy5fbWVyZ2VyQmluYXVyYWwgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNoYW5uZWxNZXJnZXIoMik7XG5cdCAgdGhpcy5fc3VtbWluZ0J1cyA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG5cdCAgLy8gR3JvdXAgVyBhbmQgWSwgdGhlbiBaIGFuZCBYLlxuXHQgIHRoaXMuX2lucHV0LmNvbm5lY3QodGhpcy5fbWVyZ2VyV1ksIDAsIDApO1xuXHQgIHRoaXMuX2lucHV0LmNvbm5lY3QodGhpcy5fbWVyZ2VyV1ksIDEsIDEpO1xuXHQgIHRoaXMuX2lucHV0LmNvbm5lY3QodGhpcy5fbWVyZ2VyWlgsIDIsIDApO1xuXHQgIHRoaXMuX2lucHV0LmNvbm5lY3QodGhpcy5fbWVyZ2VyWlgsIDMsIDEpO1xuXG5cdCAgLy8gQ3JlYXRlIGEgbmV0d29yayBvZiBjb252b2x2ZXJzIHVzaW5nIHNwbGl0dGVyL21lcmdlci5cblx0ICB0aGlzLl9tZXJnZXJXWS5jb25uZWN0KHRoaXMuX2NvbnZvbHZlcldZKTtcblx0ICB0aGlzLl9tZXJnZXJaWC5jb25uZWN0KHRoaXMuX2NvbnZvbHZlclpYKTtcblx0ICB0aGlzLl9jb252b2x2ZXJXWS5jb25uZWN0KHRoaXMuX3NwbGl0dGVyV1kpO1xuXHQgIHRoaXMuX2NvbnZvbHZlclpYLmNvbm5lY3QodGhpcy5fc3BsaXR0ZXJaWCk7XG5cdCAgdGhpcy5fc3BsaXR0ZXJXWS5jb25uZWN0KHRoaXMuX21lcmdlckJpbmF1cmFsLCAwLCAwKTtcblx0ICB0aGlzLl9zcGxpdHRlcldZLmNvbm5lY3QodGhpcy5fbWVyZ2VyQmluYXVyYWwsIDAsIDEpO1xuXHQgIHRoaXMuX3NwbGl0dGVyV1kuY29ubmVjdCh0aGlzLl9tZXJnZXJCaW5hdXJhbCwgMSwgMCk7XG5cdCAgdGhpcy5fc3BsaXR0ZXJXWS5jb25uZWN0KHRoaXMuX2ludmVydGVyLCAxLCAwKTtcblx0ICB0aGlzLl9pbnZlcnRlci5jb25uZWN0KHRoaXMuX21lcmdlckJpbmF1cmFsLCAwLCAxKTtcblx0ICB0aGlzLl9zcGxpdHRlclpYLmNvbm5lY3QodGhpcy5fbWVyZ2VyQmluYXVyYWwsIDAsIDApO1xuXHQgIHRoaXMuX3NwbGl0dGVyWlguY29ubmVjdCh0aGlzLl9tZXJnZXJCaW5hdXJhbCwgMCwgMSk7XG5cdCAgdGhpcy5fc3BsaXR0ZXJaWC5jb25uZWN0KHRoaXMuX21lcmdlckJpbmF1cmFsLCAxLCAwKTtcblx0ICB0aGlzLl9zcGxpdHRlclpYLmNvbm5lY3QodGhpcy5fbWVyZ2VyQmluYXVyYWwsIDEsIDEpO1xuXG5cdCAgdGhpcy5fY29udm9sdmVyV1kubm9ybWFsaXplID0gZmFsc2U7XG5cdCAgdGhpcy5fY29udm9sdmVyWlgubm9ybWFsaXplID0gZmFsc2U7XG5cblx0ICAvLyBHZW5lcmF0ZSAyIHN0ZXJlbyBidWZmZXJzIGZyb20gYSA0LWNoYW5uZWwgSVIuXG5cdCAgdGhpcy5fc2V0SFJJUkJ1ZmZlcnMob3B0aW9ucy5JUik7XG5cblx0ICAvLyBGb3IgYXN5bW1ldHJpYyBkZWdyZWUuXG5cdCAgdGhpcy5faW52ZXJ0ZXIuZ2Fpbi52YWx1ZSA9IC0xO1xuXG5cdCAgLy8gSW5wdXQvT3V0cHV0IHByb3h5LlxuXHQgIHRoaXMuaW5wdXQgPSB0aGlzLl9pbnB1dDtcblx0ICB0aGlzLm91dHB1dCA9IHRoaXMuX3N1bW1pbmdCdXM7XG5cblx0ICB0aGlzLmVuYWJsZSgpO1xuXHR9XG5cblx0Rk9BQ29udm9sdmVyLnByb3RvdHlwZS5fc2V0SFJJUkJ1ZmZlcnMgPSBmdW5jdGlvbiAoaHJpckJ1ZmZlcikge1xuXHQgIC8vIFVzZSAyIHN0ZXJlbyBjb252b2x1dGlvbnMuIFRoaXMgaXMgYmVjYXVzZSB0aGUgbW9ubyBjb252b2x1dGlvbiB3YXN0ZWZ1bGx5XG5cdCAgLy8gcHJvZHVjZXMgdGhlIHN0ZXJlbyBvdXRwdXQgd2l0aCB0aGUgc2FtZSBjb250ZW50LlxuXHQgIHRoaXMuX2hyaXJXWSA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQnVmZmVyKDIsIGhyaXJCdWZmZXIubGVuZ3RoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyaXJCdWZmZXIuc2FtcGxlUmF0ZSk7XG5cdCAgdGhpcy5faHJpclpYID0gdGhpcy5fY29udGV4dC5jcmVhdGVCdWZmZXIoMiwgaHJpckJ1ZmZlci5sZW5ndGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJpckJ1ZmZlci5zYW1wbGVSYXRlKTtcblxuXHQgIC8vIFdlIGRvIHRoaXMgYmVjYXVzZSBTYWZhcmkgZG9lcyBub3Qgc3VwcG9ydCBjb3B5RnJvbUNoYW5uZWwvY29weVRvQ2hhbm5lbC5cblx0ICB0aGlzLl9ocmlyV1kuZ2V0Q2hhbm5lbERhdGEoMCkuc2V0KGhyaXJCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCkpO1xuXHQgIHRoaXMuX2hyaXJXWS5nZXRDaGFubmVsRGF0YSgxKS5zZXQoaHJpckJ1ZmZlci5nZXRDaGFubmVsRGF0YSgxKSk7XG5cdCAgdGhpcy5faHJpclpYLmdldENoYW5uZWxEYXRhKDApLnNldChocmlyQnVmZmVyLmdldENoYW5uZWxEYXRhKDIpKTtcblx0ICB0aGlzLl9ocmlyWlguZ2V0Q2hhbm5lbERhdGEoMSkuc2V0KGhyaXJCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMykpO1xuXG5cdCAgLy8gQWZ0ZXIgdGhlc2UgYXNzaWdubWVudHMsIHRoZSBjaGFubmVsIGRhdGEgaW4gdGhlIGJ1ZmZlciBpcyBpbW11dGFibGUgaW5cblx0ICAvLyBGaXJlRm94LiAoaS5lLiBuZXV0ZXJlZClcblx0ICB0aGlzLl9jb252b2x2ZXJXWS5idWZmZXIgPSB0aGlzLl9ocmlyV1k7XG5cdCAgdGhpcy5fY29udm9sdmVyWlguYnVmZmVyID0gdGhpcy5faHJpclpYO1xuXHR9O1xuXG5cdEZPQUNvbnZvbHZlci5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuXHQgIHRoaXMuX21lcmdlckJpbmF1cmFsLmNvbm5lY3QodGhpcy5fc3VtbWluZ0J1cyk7XG5cdCAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0fTtcblxuXHRGT0FDb252b2x2ZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdGhpcy5fbWVyZ2VyQmluYXVyYWwuZGlzY29ubmVjdCgpO1xuXHQgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gRk9BQ29udm9sdmVyO1xuXG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblx0ICpcblx0ICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXHQgKlxuXHQgKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5cdCAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcblx0ICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5cdCAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcblx0ICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cdCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBBbiBhdWRpbyBjaGFubmVsIHJlLXJvdXRlciB0byByZXNvbHZlIGRpZmZlcmVudCBjaGFubmVsIGxheW91dHNcblx0ICogICAgICAgICAgICAgICBiZXR3ZWVuIHZhcmlvdXMgcGxhdGZvcm1zLlxuXHQgKi9cblxuXG5cdC8qKlxuXHQgKiBDaGFubmVsIG1hcCBkaWN0aW9uYXJ5IGZvciB2YXJpb3VzIG1hcHBpbmcgc2NoZW1lLlxuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0dmFyIENIQU5ORUxfTUFQID0ge1xuXHQgIC8vIEFDTiwgZGVmYXVsdCBjaGFubmVsIG1hcC4gV29ya3MgY29ycmVjdGx5IG9uIENocm9tZSBhbmQgRmlyZUZveC4gKEZGTXBlZylcblx0ICBERUZBVUxUOiBbMCwgMSwgMiwgM10sXG5cdCAgLy8gU2FmYXJpJ3MgZGVjb2RlciB3b3JrcyBkaWZmZXJlbnRseSBvbiA0LWNoYW5uZWwgc3RyZWFtLlxuXHQgIEFQUExFOiBbMiwgMCwgMSwgM10sXG5cdCAgLy8gQUNOIC0+IEZ1TWEgY29udmVyc2lvbi5cblx0ICBGVU1BOiBbMCwgMywgMSwgMl1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAY2xhc3MgQSBzaW1wbGUgY2hhbm5lbCByZS1yb3V0ZXIuXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0IEFzc29jaWF0ZWQgQXVkaW9Db250ZXh0LlxuXHQgKiBAcGFyYW0ge0FycmF5fSBjaGFubmVsTWFwICBSb3V0aW5nIGRlc3RpbmF0aW9uIGFycmF5LlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuZy4pIENocm9tZTogWzAsIDEsIDIsIDNdLFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxlKFNhZmFyaSk6IFsyLCAwLCAxLCAzXVxuXHQgKi9cblx0ZnVuY3Rpb24gRk9BUm91dGVyIChjb250ZXh0LCBjaGFubmVsTWFwKSB7XG5cdCAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cblx0ICB0aGlzLl9zcGxpdHRlciA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKDQpO1xuXHQgIHRoaXMuX21lcmdlciA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ2hhbm5lbE1lcmdlcig0KTtcblxuXHQgIHRoaXMuX2NoYW5uZWxNYXAgPSBjaGFubmVsTWFwIHx8IENIQU5ORUxfTUFQLkRFRkFVTFQ7XG5cblx0ICB0aGlzLl9zcGxpdHRlci5jb25uZWN0KHRoaXMuX21lcmdlciwgMCwgdGhpcy5fY2hhbm5lbE1hcFswXSk7XG5cdCAgdGhpcy5fc3BsaXR0ZXIuY29ubmVjdCh0aGlzLl9tZXJnZXIsIDEsIHRoaXMuX2NoYW5uZWxNYXBbMV0pO1xuXHQgIHRoaXMuX3NwbGl0dGVyLmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAyLCB0aGlzLl9jaGFubmVsTWFwWzJdKTtcblx0ICB0aGlzLl9zcGxpdHRlci5jb25uZWN0KHRoaXMuX21lcmdlciwgMywgdGhpcy5fY2hhbm5lbE1hcFszXSk7XG5cblx0ICAvLyBpbnB1dC9vdXRwdXQgcHJveHkuXG5cdCAgdGhpcy5pbnB1dCA9IHRoaXMuX3NwbGl0dGVyO1xuXHQgIHRoaXMub3V0cHV0ID0gdGhpcy5fbWVyZ2VyO1xuXHR9XG5cblxuXHQvKipcblx0ICogU2V0IGEgY2hhbm5lbCBtYXAgYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNoYW5uZWxNYXAgQSBjdXN0b20gY2hhbm5lbCBtYXAgZm9yIEZPQSBzdHJlYW0uXG5cdCAqL1xuXHRGT0FSb3V0ZXIucHJvdG90eXBlLnNldENoYW5uZWxNYXAgPSBmdW5jdGlvbiAoY2hhbm5lbE1hcCkge1xuXHQgIGlmICghY2hhbm5lbE1hcClcblx0ICAgIHJldHVybjtcblxuXHQgIHRoaXMuX2NoYW5uZWxNYXAgPSBjaGFubmVsTWFwO1xuXHQgIHRoaXMuX3NwbGl0dGVyLmRpc2Nvbm5lY3QoKTtcblx0ICB0aGlzLl9zcGxpdHRlci5jb25uZWN0KHRoaXMuX21lcmdlciwgMCwgdGhpcy5fY2hhbm5lbE1hcFswXSk7XG5cdCAgdGhpcy5fc3BsaXR0ZXIuY29ubmVjdCh0aGlzLl9tZXJnZXIsIDEsIHRoaXMuX2NoYW5uZWxNYXBbMV0pO1xuXHQgIHRoaXMuX3NwbGl0dGVyLmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAyLCB0aGlzLl9jaGFubmVsTWFwWzJdKTtcblx0ICB0aGlzLl9zcGxpdHRlci5jb25uZWN0KHRoaXMuX21lcmdlciwgMywgdGhpcy5fY2hhbm5lbE1hcFszXSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTdGF0aWMgY2hhbm5lbCBtYXAgZGljdGlvbmFyeS5cblx0ICpcblx0ICogQHN0YXRpY1xuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0Rk9BUm91dGVyLkNIQU5ORUxfTUFQID0gQ0hBTk5FTF9NQVA7XG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZPQVJvdXRlcjtcblxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cdCAqXG5cdCAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblx0ICpcblx0ICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuXHQgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5cdCAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuXHQgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5cdCAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXHQgKi9cblxuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBTb3VuZCBmaWVsZCByb3RhdG9yIGZvciBmaXJzdC1vcmRlci1hbWJpc29uaWNzIGRlY29kaW5nLlxuXHQgKi9cblxuXG5cdC8qKlxuXHQgKiBAY2xhc3MgRmlyc3Qtb3JkZXItYW1iaXNvbmljIGRlY29kZXIgYmFzZWQgb24gZ2FpbiBub2RlIG5ldHdvcmsuXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0ICAgIEFzc29jaWF0ZWQgQXVkaW9Db250ZXh0LlxuXHQgKi9cblx0ZnVuY3Rpb24gRk9BUm90YXRvciAoY29udGV4dCkge1xuXHQgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXG5cdCAgdGhpcy5fc3BsaXR0ZXIgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNoYW5uZWxTcGxpdHRlcig0KTtcblx0ICB0aGlzLl9pblkgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9pblogPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9pblggPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9tMCA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX20xID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cdCAgdGhpcy5fbTIgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9tMyA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX200ID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cdCAgdGhpcy5fbTUgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9tNiA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX203ID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cdCAgdGhpcy5fbTggPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9vdXRZID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cdCAgdGhpcy5fb3V0WiA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX291dFggPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9tZXJnZXIgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNoYW5uZWxNZXJnZXIoNCk7XG5cblx0ICAgIC8vIEFDTiBjaGFubmVsIG9yZGVyaW5nOiBbMSwgMiwgM10gPT4gWy1ZLCBaLCAtWF1cblx0ICB0aGlzLl9zcGxpdHRlci5jb25uZWN0KHRoaXMuX2luWSwgMSk7IC8vIFkgKGZyb20gY2hhbm5lbCAxKVxuXHQgIHRoaXMuX3NwbGl0dGVyLmNvbm5lY3QodGhpcy5faW5aLCAyKTsgLy8gWiAoZnJvbSBjaGFubmVsIDIpXG5cdCAgdGhpcy5fc3BsaXR0ZXIuY29ubmVjdCh0aGlzLl9pblgsIDMpOyAvLyBYIChmcm9tIGNoYW5uZWwgMylcblx0ICB0aGlzLl9pblkuZ2Fpbi52YWx1ZSA9IC0xO1xuXHQgIHRoaXMuX2luWC5nYWluLnZhbHVlID0gLTE7XG5cblx0ICAvLyBBcHBseSB0aGUgcm90YXRpb24gaW4gdGhlIHdvcmxkIHNwYWNlLlxuXHQgIC8vIHxZfCAgIHwgbTAgIG0zICBtNiB8ICAgfCBZICogbTAgKyBaICogbTMgKyBYICogbTYgfCAgIHwgWXIgfFxuXHQgIC8vIHxafCAqIHwgbTEgIG00ICBtNyB8ID0gfCBZICogbTEgKyBaICogbTQgKyBYICogbTcgfCA9IHwgWnIgfFxuXHQgIC8vIHxYfCAgIHwgbTIgIG01ICBtOCB8ICAgfCBZICogbTIgKyBaICogbTUgKyBYICogbTggfCAgIHwgWHIgfFxuXHQgIHRoaXMuX2luWS5jb25uZWN0KHRoaXMuX20wKTtcblx0ICB0aGlzLl9pblkuY29ubmVjdCh0aGlzLl9tMSk7XG5cdCAgdGhpcy5faW5ZLmNvbm5lY3QodGhpcy5fbTIpO1xuXHQgIHRoaXMuX2luWi5jb25uZWN0KHRoaXMuX20zKTtcblx0ICB0aGlzLl9pblouY29ubmVjdCh0aGlzLl9tNCk7XG5cdCAgdGhpcy5faW5aLmNvbm5lY3QodGhpcy5fbTUpO1xuXHQgIHRoaXMuX2luWC5jb25uZWN0KHRoaXMuX202KTtcblx0ICB0aGlzLl9pblguY29ubmVjdCh0aGlzLl9tNyk7XG5cdCAgdGhpcy5faW5YLmNvbm5lY3QodGhpcy5fbTgpO1xuXHQgIHRoaXMuX20wLmNvbm5lY3QodGhpcy5fb3V0WSk7XG5cdCAgdGhpcy5fbTEuY29ubmVjdCh0aGlzLl9vdXRaKTtcblx0ICB0aGlzLl9tMi5jb25uZWN0KHRoaXMuX291dFgpO1xuXHQgIHRoaXMuX20zLmNvbm5lY3QodGhpcy5fb3V0WSk7XG5cdCAgdGhpcy5fbTQuY29ubmVjdCh0aGlzLl9vdXRaKTtcblx0ICB0aGlzLl9tNS5jb25uZWN0KHRoaXMuX291dFgpO1xuXHQgIHRoaXMuX202LmNvbm5lY3QodGhpcy5fb3V0WSk7XG5cdCAgdGhpcy5fbTcuY29ubmVjdCh0aGlzLl9vdXRaKTtcblx0ICB0aGlzLl9tOC5jb25uZWN0KHRoaXMuX291dFgpO1xuXG5cdCAgLy8gVHJhbnNmb3JtIDM6IHdvcmxkIHNwYWNlIHRvIGF1ZGlvIHNwYWNlLlxuXHQgIHRoaXMuX3NwbGl0dGVyLmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAwLCAwKTsgLy8gVyAtPiBXICh0byBjaGFubmVsIDApXG5cdCAgdGhpcy5fb3V0WS5jb25uZWN0KHRoaXMuX21lcmdlciwgMCwgMSk7IC8vIFkgKHRvIGNoYW5uZWwgMSlcblx0ICB0aGlzLl9vdXRaLmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAwLCAyKTsgLy8gWiAodG8gY2hhbm5lbCAyKVxuXHQgIHRoaXMuX291dFguY29ubmVjdCh0aGlzLl9tZXJnZXIsIDAsIDMpOyAvLyBYICh0byBjaGFubmVsIDMpXG5cdCAgdGhpcy5fb3V0WS5nYWluLnZhbHVlID0gLTE7XG5cdCAgdGhpcy5fb3V0WC5nYWluLnZhbHVlID0gLTE7XG5cblx0ICB0aGlzLnNldFJvdGF0aW9uTWF0cml4KG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdKSk7XG5cblx0ICAvLyBpbnB1dC9vdXRwdXQgcHJveHkuXG5cdCAgdGhpcy5pbnB1dCA9IHRoaXMuX3NwbGl0dGVyO1xuXHQgIHRoaXMub3V0cHV0ID0gdGhpcy5fbWVyZ2VyO1xuXHR9XG5cblxuXHQvKipcblx0ICogU2V0IDN4MyBtYXRyaXggZm9yIHNvdW5kZmllbGQgcm90YXRpb24uIChnbC1tYXRyaXguanMgc3R5bGUpXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHJvdGF0aW9uTWF0cml4ICAgIEEgM3gzIG1hdHJpeCBvZiBzb3VuZGZpZWxkIHJvdGF0aW9uLiBUaGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4IGlzIGluIHRoZSByb3ctbWFqb3IgcmVwcmVzZW50YXRpb24uXG5cdCAqL1xuXHRGT0FSb3RhdG9yLnByb3RvdHlwZS5zZXRSb3RhdGlvbk1hdHJpeCA9IGZ1bmN0aW9uIChyb3RhdGlvbk1hdHJpeCkge1xuXHQgIHRoaXMuX20wLmdhaW4udmFsdWUgPSByb3RhdGlvbk1hdHJpeFswXTtcblx0ICB0aGlzLl9tMS5nYWluLnZhbHVlID0gcm90YXRpb25NYXRyaXhbMV07XG5cdCAgdGhpcy5fbTIuZ2Fpbi52YWx1ZSA9IHJvdGF0aW9uTWF0cml4WzJdO1xuXHQgIHRoaXMuX20zLmdhaW4udmFsdWUgPSByb3RhdGlvbk1hdHJpeFszXTtcblx0ICB0aGlzLl9tNC5nYWluLnZhbHVlID0gcm90YXRpb25NYXRyaXhbNF07XG5cdCAgdGhpcy5fbTUuZ2Fpbi52YWx1ZSA9IHJvdGF0aW9uTWF0cml4WzVdO1xuXHQgIHRoaXMuX202LmdhaW4udmFsdWUgPSByb3RhdGlvbk1hdHJpeFs2XTtcblx0ICB0aGlzLl9tNy5nYWluLnZhbHVlID0gcm90YXRpb25NYXRyaXhbN107XG5cdCAgdGhpcy5fbTguZ2Fpbi52YWx1ZSA9IHJvdGF0aW9uTWF0cml4WzhdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgNHg0IG1hdHJpeCBmb3Igc291bmRmaWVsZCByb3RhdGlvbi4gKFRocmVlLmpzIHN0eWxlKVxuXHQgKiBAcGFyYW0ge0FycmF5fSByb3RhdGlvbk1hdHJpeDQgICBBIDR4NCBtYXRyaXggb2Ygc291bmRmaWVsZCByb3RhdGlvbi5cblx0ICovXG5cdEZPQVJvdGF0b3IucHJvdG90eXBlLnNldFJvdGF0aW9uTWF0cml4NCA9IGZ1bmN0aW9uIChyb3RhdGlvbk1hdHJpeDQpIHtcblx0ICB0aGlzLl9tMC5nYWluLnZhbHVlID0gcm90YXRpb25NYXRyaXg0WzBdO1xuXHQgIHRoaXMuX20xLmdhaW4udmFsdWUgPSByb3RhdGlvbk1hdHJpeDRbMV07XG5cdCAgdGhpcy5fbTIuZ2Fpbi52YWx1ZSA9IHJvdGF0aW9uTWF0cml4NFsyXTtcblx0ICB0aGlzLl9tMy5nYWluLnZhbHVlID0gcm90YXRpb25NYXRyaXg0WzRdO1xuXHQgIHRoaXMuX200LmdhaW4udmFsdWUgPSByb3RhdGlvbk1hdHJpeDRbNV07XG5cdCAgdGhpcy5fbTUuZ2Fpbi52YWx1ZSA9IHJvdGF0aW9uTWF0cml4NFs2XTtcblx0ICB0aGlzLl9tNi5nYWluLnZhbHVlID0gcm90YXRpb25NYXRyaXg0WzhdO1xuXHQgIHRoaXMuX203LmdhaW4udmFsdWUgPSByb3RhdGlvbk1hdHJpeDRbOV07XG5cdCAgdGhpcy5fbTguZ2Fpbi52YWx1ZSA9IHJvdGF0aW9uTWF0cml4NFsxMF07XG5cdH07XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgcm90YXRpb24gbWF0cml4LlxuXHQgKiBAcmV0dXJuIHtBcnJheX0gICAgICAgICAgICAgICAgICBBIDN4MyBtYXRyaXggb2Ygc291bmRmaWVsZCByb3RhdGlvbi4gVGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdHJpeCBpcyBpbiB0aGUgcm93LW1ham9yIHJlcHJlc2VudGF0aW9uLlxuXHQgKi9cblx0Rk9BUm90YXRvci5wcm90b3R5cGUuZ2V0Um90YXRpb25NYXRyaXggPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIFtcblx0ICAgIHRoaXMuX20wLmdhaW4udmFsdWUsIHRoaXMuX20xLmdhaW4udmFsdWUsIHRoaXMuX20yLmdhaW4udmFsdWUsXG5cdCAgICB0aGlzLl9tMy5nYWluLnZhbHVlLCB0aGlzLl9tNC5nYWluLnZhbHVlLCB0aGlzLl9tNS5nYWluLnZhbHVlLFxuXHQgICAgdGhpcy5fbTYuZ2Fpbi52YWx1ZSwgdGhpcy5fbTcuZ2Fpbi52YWx1ZSwgdGhpcy5fbTguZ2Fpbi52YWx1ZVxuXHQgIF07XG5cdH07XG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZPQVJvdGF0b3I7XG5cblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXHQgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuXHQgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cdCAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXHQgKlxuXHQgKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cdCAqXG5cdCAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcblx0ICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuXHQgKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblx0ICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuXHQgKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblx0ICovXG5cblxuXG5cdC8qKlxuXHQgKiBAZmlsZU92ZXJ2aWV3IFBoYXNlIG1hdGNoZWQgZmlsdGVyIGZvciBmaXJzdC1vcmRlci1hbWJpc29uaWNzIGRlY29kaW5nLlxuXHQgKi9cblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHQvLyBTdGF0aWMgcGFyYW1ldGVycy5cblx0dmFyIENST1NTT1ZFUl9GUkVRVUVOQ1kgPSA2OTA7XG5cdHZhciBHQUlOX0NPRUZGSUNJRU5UUyA9IFsxLjQxNDIsIDAuODE2NiwgMC44MTY2LCAwLjgxNjZdO1xuXG5cdC8vIEhlbHBlcjogZ2VuZXJhdGUgdGhlIGNvZWZmaWNpZW50cyBmb3IgZHVhbCBiYW5kIGZpbHRlci5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVEdWFsQmFuZENvZWZmaWNpZW50cyhjcm9zc292ZXJGcmVxdWVuY3ksIHNhbXBsZVJhdGUpIHtcblx0ICB2YXIgayA9IE1hdGgudGFuKE1hdGguUEkgKiBjcm9zc292ZXJGcmVxdWVuY3kgLyBzYW1wbGVSYXRlKSxcblx0ICAgICAgazIgPSBrICogayxcblx0ICAgICAgZGVub21pbmF0b3IgPSBrMiArIDIgKiBrICsgMTtcblxuXHQgIHJldHVybiB7XG5cdCAgICBsb3dwYXNzQTogWzEsIDIgKiAoazIgLSAxKSAvIGRlbm9taW5hdG9yLCAoazIgLSAyICogayArIDEpIC8gZGVub21pbmF0b3JdLFxuXHQgICAgbG93cGFzc0I6IFtrMiAvIGRlbm9taW5hdG9yLCAyICogazIgLyBkZW5vbWluYXRvciwgazIgLyBkZW5vbWluYXRvcl0sXG5cdCAgICBoaXBhc3NBOiBbMSwgMiAqIChrMiAtIDEpIC8gZGVub21pbmF0b3IsIChrMiAtIDIgKiBrICsgMSkgLyBkZW5vbWluYXRvcl0sXG5cdCAgICBoaXBhc3NCOiBbMSAvIGRlbm9taW5hdG9yLCAtMiAqIDEgLyBkZW5vbWluYXRvciwgMSAvIGRlbm9taW5hdG9yXVxuXHQgIH07XG5cdH1cblxuXHQvKipcblx0ICogQGNsYXNzIEZPQVBoYXNlTWF0Y2hlZEZpbHRlclxuXHQgKiBAZGVzY3JpcHRpb24gQSBzZXQgb2YgZmlsdGVycyAoTFAvSFApIHdpdGggYSBjcm9zc292ZXIgZnJlcXVlbmN5IHRvXG5cdCAqICAgICAgICAgICAgICBjb21wZW5zYXRlIHRoZSBnYWluIG9mIGhpZ2ggZnJlcXVlbmN5IGNvbnRlbnRzIHdpdGhvdXQgYSBwaGFzZVxuXHQgKiAgICAgICAgICAgICAgZGlmZmVyZW5jZS5cblx0ICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IGNvbnRleHQgICAgICAgIEFzc29jaWF0ZWQgQXVkaW9Db250ZXh0LlxuXHQgKi9cblx0ZnVuY3Rpb24gRk9BUGhhc2VNYXRjaGVkRmlsdGVyIChjb250ZXh0KSB7XG5cdCAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cblx0ICB0aGlzLl9pbnB1dCA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG5cdCAgaWYgKCF0aGlzLl9jb250ZXh0LmNyZWF0ZUlJUkZpbHRlcikge1xuXHQgICAgVXRpbHMubG9nKCdJSVIgZmlsdGVyIGlzIG1pc3NpbmcuIFVzaW5nIEJpcXVhZCBmaWx0ZXIgaW5zdGVhZC4nKTtcblx0ICAgIHRoaXMuX2xwZiA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKCk7XG5cdCAgICB0aGlzLl9ocGYgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuXHQgICAgdGhpcy5fbHBmLmZyZXF1ZW5jeS52YWx1ZSA9IENST1NTT1ZFUl9GUkVRVUVOQ1k7XG5cdCAgICB0aGlzLl9ocGYuZnJlcXVlbmN5LnZhbHVlID0gQ1JPU1NPVkVSX0ZSRVFVRU5DWTtcblx0ICAgIHRoaXMuX2hwZi50eXBlID0gJ2hpZ2hwYXNzJztcblx0ICB9IGVsc2Uge1xuXHQgICAgdmFyIGNvZWYgPSBnZW5lcmF0ZUR1YWxCYW5kQ29lZmZpY2llbnRzKFxuXHQgICAgICAgIENST1NTT1ZFUl9GUkVRVUVOQ1ksIHRoaXMuX2NvbnRleHQuc2FtcGxlUmF0ZSk7XG5cdCAgICB0aGlzLl9scGYgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUlJUkZpbHRlcihjb2VmLmxvd3Bhc3NCLCBjb2VmLmxvd3Bhc3NBKTtcblx0ICAgIHRoaXMuX2hwZiA9IHRoaXMuX2NvbnRleHQuY3JlYXRlSUlSRmlsdGVyKGNvZWYuaGlwYXNzQiwgY29lZi5oaXBhc3NBKTtcblx0ICB9XG5cblx0ICB0aGlzLl9zcGxpdHRlckxvdyA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKDQpO1xuXHQgIHRoaXMuX3NwbGl0dGVySGlnaCA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKDQpO1xuXHQgIHRoaXMuX2dhaW5IaWdoVyA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX2dhaW5IaWdoWSA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX2dhaW5IaWdoWiA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX2dhaW5IaWdoWCA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX21lcmdlciA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ2hhbm5lbE1lcmdlcig0KTtcblxuXHQgIHRoaXMuX2lucHV0LmNvbm5lY3QodGhpcy5faHBmKTtcblx0ICB0aGlzLl9ocGYuY29ubmVjdCh0aGlzLl9zcGxpdHRlckhpZ2gpO1xuXHQgIHRoaXMuX3NwbGl0dGVySGlnaC5jb25uZWN0KHRoaXMuX2dhaW5IaWdoVywgMCk7XG5cdCAgdGhpcy5fc3BsaXR0ZXJIaWdoLmNvbm5lY3QodGhpcy5fZ2FpbkhpZ2hZLCAxKTtcblx0ICB0aGlzLl9zcGxpdHRlckhpZ2guY29ubmVjdCh0aGlzLl9nYWluSGlnaFosIDIpO1xuXHQgIHRoaXMuX3NwbGl0dGVySGlnaC5jb25uZWN0KHRoaXMuX2dhaW5IaWdoWCwgMyk7XG5cdCAgdGhpcy5fZ2FpbkhpZ2hXLmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAwLCAwKTtcblx0ICB0aGlzLl9nYWluSGlnaFkuY29ubmVjdCh0aGlzLl9tZXJnZXIsIDAsIDEpO1xuXHQgIHRoaXMuX2dhaW5IaWdoWi5jb25uZWN0KHRoaXMuX21lcmdlciwgMCwgMik7XG5cdCAgdGhpcy5fZ2FpbkhpZ2hYLmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAwLCAzKTtcblxuXHQgIHRoaXMuX2lucHV0LmNvbm5lY3QodGhpcy5fbHBmKTtcblx0ICB0aGlzLl9scGYuY29ubmVjdCh0aGlzLl9zcGxpdHRlckxvdyk7XG5cdCAgdGhpcy5fc3BsaXR0ZXJMb3cuY29ubmVjdCh0aGlzLl9tZXJnZXIsIDAsIDApO1xuXHQgIHRoaXMuX3NwbGl0dGVyTG93LmNvbm5lY3QodGhpcy5fbWVyZ2VyLCAxLCAxKTtcblx0ICB0aGlzLl9zcGxpdHRlckxvdy5jb25uZWN0KHRoaXMuX21lcmdlciwgMiwgMik7XG5cdCAgdGhpcy5fc3BsaXR0ZXJMb3cuY29ubmVjdCh0aGlzLl9tZXJnZXIsIDMsIDMpO1xuXG5cdCAgLy8gQXBwbHkgZ2FpbiBjb3JyZWN0aW9uIHRvIGhpLXBhc3NlZCBwcmVzc3VyZSBhbmQgdmVsb2NpdHkgY29tcG9uZW50czpcblx0ICAvLyBJbnZlcnRpbmcgc2lnbiBpcyBuZWNlc3NhcnkgYXMgdGhlIGxvdy1wYXNzZWQgYW5kIGhpZ2gtcGFzc2VkIHBvcnRpb24gYXJlXG5cdCAgLy8gb3V0LW9mLXBoYXNlIGFmdGVyIHRoZSBmaWx0ZXJpbmcuXG5cdCAgdmFyIG5vdyA9IHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWU7XG5cdCAgdGhpcy5fZ2FpbkhpZ2hXLmdhaW4uc2V0VmFsdWVBdFRpbWUoLTEgKiBHQUlOX0NPRUZGSUNJRU5UU1swXSwgbm93KTtcblx0ICB0aGlzLl9nYWluSGlnaFkuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgtMSAqIEdBSU5fQ09FRkZJQ0lFTlRTWzFdLCBub3cpO1xuXHQgIHRoaXMuX2dhaW5IaWdoWi5nYWluLnNldFZhbHVlQXRUaW1lKC0xICogR0FJTl9DT0VGRklDSUVOVFNbMl0sIG5vdyk7XG5cdCAgdGhpcy5fZ2FpbkhpZ2hYLmdhaW4uc2V0VmFsdWVBdFRpbWUoLTEgKiBHQUlOX0NPRUZGSUNJRU5UU1szXSwgbm93KTtcblxuXHQgIC8vIElucHV0L291dHB1dCBQcm94eS5cblx0ICB0aGlzLmlucHV0ID0gdGhpcy5faW5wdXQ7XG5cdCAgdGhpcy5vdXRwdXQgPSB0aGlzLl9tZXJnZXI7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZPQVBoYXNlTWF0Y2hlZEZpbHRlcjtcblxuXG4vKioqLyB9LFxuLyogOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cdCAqXG5cdCAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblx0ICpcblx0ICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuXHQgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5cdCAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuXHQgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5cdCAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBWaXJ0dWFsIHNwZWFrZXIgYWJzdHJhY3Rpb24gZm9yIGZpcnN0LW9yZGVyLWFtYmlzb25pY3Ncblx0ICogICAgICAgICAgICAgICBkZWNvZGluZy5cblx0ICovXG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBAY2xhc3MgRk9BVmlydHVhbFNwZWFrZXJcblx0ICogQGRlc2NyaXB0aW9uIEEgdmlydHVhbCBzcGVha2VyIHdpdGggYW1iaXNvbmljIGRlY29kaW5nIGdhaW4gY29lZmZpY2llbnRzXG5cdCAqICAgICAgICAgICAgICBhbmQgSFJURiBjb252b2x1dGlvbiBmb3IgZmlyc3Qtb3JkZXItYW1iaXNvbmljcyBzdHJlYW0uXG5cdCAqICAgICAgICAgICAgICBOb3RlIHRoYXQgdGhlIHN1YmdyYXBoIGRpcmVjdGx5IGNvbm5lY3RzIHRvIGNvbnRleHQnc1xuXHQgKiAgICAgICAgICAgICAgZGVzdGluYXRpb24uXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0ICAgICAgICBBc3NvY2lhdGVkIEF1ZGlvQ29udGV4dC5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICAgIE9wdGlvbnMgZm9yIHNwZWFrZXIuXG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY29lZmZpY2llbnRzICBEZWNvZGluZyBjb2VmZmljaWVudHMgZm9yIChXLFksWixYKS5cblx0ICogQHBhcmFtIHtBdWRpb0J1ZmZlcn0gb3B0aW9ucy5JUiAgICAgIFN0ZXJlbyBJUiBidWZmZXIgZm9yIEhSVEYgY29udm9sdXRpb24uXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmdhaW4gICAgICAgICBQb3N0LWdhaW4gZm9yIHRoZSBzcGVha2VyLlxuXHQgKi9cblx0ZnVuY3Rpb24gRk9BVmlydHVhbFNwZWFrZXIgKGNvbnRleHQsIG9wdGlvbnMpIHtcblx0ICBpZiAob3B0aW9ucy5JUi5udW1iZXJPZkNoYW5uZWxzICE9PSAyKVxuXHQgICAgdGhyb3cgJ0lSIGRvZXMgbm90IGhhdmUgMiBjaGFubmVscy4gY2Fubm90IHByb2NlZWQuJztcblxuXHQgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuXHQgIFxuXHQgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXG5cdCAgdGhpcy5faW5wdXQgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUNoYW5uZWxTcGxpdHRlcig0KTtcblx0ICB0aGlzLl9jVyA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX2NZID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cdCAgdGhpcy5fY1ogPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9jWCA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHQgIHRoaXMuX2NvbnZvbHZlciA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQ29udm9sdmVyKCk7XG5cdCAgdGhpcy5fZ2FpbiA9IHRoaXMuX2NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG5cdCAgdGhpcy5faW5wdXQuY29ubmVjdCh0aGlzLl9jVywgMCk7XG5cdCAgdGhpcy5faW5wdXQuY29ubmVjdCh0aGlzLl9jWSwgMSk7XG5cdCAgdGhpcy5faW5wdXQuY29ubmVjdCh0aGlzLl9jWiwgMik7XG5cdCAgdGhpcy5faW5wdXQuY29ubmVjdCh0aGlzLl9jWCwgMyk7XG5cdCAgdGhpcy5fY1cuY29ubmVjdCh0aGlzLl9jb252b2x2ZXIpO1xuXHQgIHRoaXMuX2NZLmNvbm5lY3QodGhpcy5fY29udm9sdmVyKTtcblx0ICB0aGlzLl9jWi5jb25uZWN0KHRoaXMuX2NvbnZvbHZlcik7XG5cdCAgdGhpcy5fY1guY29ubmVjdCh0aGlzLl9jb252b2x2ZXIpO1xuXHQgIHRoaXMuX2NvbnZvbHZlci5jb25uZWN0KHRoaXMuX2dhaW4pO1xuXHQgIHRoaXMuX2dhaW4uY29ubmVjdCh0aGlzLl9jb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuXHQgIHRoaXMuZW5hYmxlKCk7XG5cblx0ICB0aGlzLl9jb252b2x2ZXIubm9ybWFsaXplID0gZmFsc2U7XG5cdCAgdGhpcy5fY29udm9sdmVyLmJ1ZmZlciA9IG9wdGlvbnMuSVI7XG5cdCAgdGhpcy5fZ2Fpbi5nYWluLnZhbHVlID0gb3B0aW9ucy5nYWluO1xuXG5cdCAgLy8gU2V0IGdhaW4gY29lZmZpY2llbnRzIGZvciBGT0EgYW1iaXNvbmljIHN0cmVhbXMuXG5cdCAgdGhpcy5fY1cuZ2Fpbi52YWx1ZSA9IG9wdGlvbnMuY29lZmZpY2llbnRzWzBdO1xuXHQgIHRoaXMuX2NZLmdhaW4udmFsdWUgPSBvcHRpb25zLmNvZWZmaWNpZW50c1sxXTtcblx0ICB0aGlzLl9jWi5nYWluLnZhbHVlID0gb3B0aW9ucy5jb2VmZmljaWVudHNbMl07XG5cdCAgdGhpcy5fY1guZ2Fpbi52YWx1ZSA9IG9wdGlvbnMuY29lZmZpY2llbnRzWzNdO1xuXG5cdCAgLy8gSW5wdXQgcHJveHkuIE91dHB1dCBkaXJlY3RseSBjb25uZWN0cyB0byB0aGUgZGVzdGluYXRpb24uXG5cdCAgdGhpcy5pbnB1dCA9IHRoaXMuX2lucHV0O1xuXHR9XG5cblx0Rk9BVmlydHVhbFNwZWFrZXIucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLl9nYWluLmNvbm5lY3QodGhpcy5fY29udGV4dC5kZXN0aW5hdGlvbik7XG5cdCAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0fTtcblxuXHRGT0FWaXJ0dWFsU3BlYWtlci5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLl9nYWluLmRpc2Nvbm5lY3QoKTtcblx0ICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZPQVZpcnR1YWxTcGVha2VyO1xuXG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblx0ICpcblx0ICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXHQgKlxuXHQgKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5cdCAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcblx0ICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5cdCAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcblx0ICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cdCAqL1xuXG5cblx0LyoqXG5cdCAqIEBmaWxlT3ZlcnZpZXcgT21uaXRvbmUgRk9BIGRlY29kZXIuXG5cdCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgQXVkaW9CdWZmZXJNYW5hZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblx0dmFyIEZPQVJvdXRlciA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cdHZhciBGT0FSb3RhdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0dmFyIEZPQVBoYXNlTWF0Y2hlZEZpbHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdHZhciBGT0FWaXJ0dWFsU3BlYWtlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cdHZhciBGT0FTcGVha2VyRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXHR2YXIgVXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXHR2YXIgU3lzdGVtVmVyc2lvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIE9tbml0b25lIGZldGNoZXMgSVIgZnJvbSB0aGUgc3BhdGlhbCBtZWRpYSByZXBvc2l0b3J5LlxuXHR2YXIgSFJURlNFVF9VUkwgPSAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0dvb2dsZUNocm9tZS9vbW5pdG9uZS9tYXN0ZXIvYnVpbGQvcmVzb3VyY2VzLyc7XG5cblx0Ly8gUG9zdCBnYWluIGNvbXBlbnNhdGlvbiB2YWx1ZS5cblx0dmFyIFBPU1RfR0FJTl9EQiA9IDA7XG5cblxuXHQvKipcblx0ICogQGNsYXNzIE9tbml0b25lIEZPQSBkZWNvZGVyIGNsYXNzLlxuXHQgKiBAcGFyYW0ge0F1ZGlvQ29udGV4dH0gY29udGV4dCAgICAgIEFzc29jaWF0ZWQgQXVkaW9Db250ZXh0LlxuXHQgKiBAcGFyYW0ge1ZpZGVvRWxlbWVudH0gdmlkZW9FbGVtZW50IFRhcmdldCB2aWRlbyAob3IgYXVkaW8pIGVsZW1lbnQgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5IUlRGU2V0VXJsIEJhc2UgVVJMIGZvciB0aGUgY3ViZSBIUlRGIHNldHMuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnBvc3RHYWluREIgUG9zdC1kZWNvZGluZyBnYWluIGNvbXBlbnNhdGlvbiBpbiBkQi5cblx0ICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jaGFubmVsTWFwICBDdXN0b20gY2hhbm5lbCBtYXAuXG5cdCAqL1xuXHRmdW5jdGlvbiBGT0FEZWNvZGVyIChjb250ZXh0LCB2aWRlb0VsZW1lbnQsIG9wdGlvbnMpIHtcblx0ICB0aGlzLl9pc0RlY29kZXJSZWFkeSA9IGZhbHNlO1xuXHQgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHQgIHRoaXMuX3ZpZGVvRWxlbWVudCA9IHZpZGVvRWxlbWVudDtcblx0ICB0aGlzLl9kZWNvZGluZ01vZGUgPSAnYW1iaXNvbmljJztcblxuXHQgIHRoaXMuX3Bvc3RHYWluREIgPSBQT1NUX0dBSU5fREI7XG5cdCAgdGhpcy5fSFJURlNldFVybCA9IEhSVEZTRVRfVVJMO1xuXHQgIHRoaXMuX2NoYW5uZWxNYXAgPSBGT0FSb3V0ZXIuQ0hBTk5FTF9NQVAuREVGQVVMVDsgLy8gQUNOXG5cblx0ICBpZiAob3B0aW9ucykge1xuXHQgICAgaWYgKG9wdGlvbnMucG9zdEdhaW5EQilcblx0ICAgICAgdGhpcy5fcG9zdEdhaW5EQiA9IG9wdGlvbnMucG9zdEdhaW5EQjtcblxuXHQgICAgaWYgKG9wdGlvbnMuSFJURlNldFVybClcblx0ICAgICAgdGhpcy5fSFJURlNldFVybCA9IG9wdGlvbnMuSFJURlNldFVybDtcblxuXHQgICAgaWYgKG9wdGlvbnMuY2hhbm5lbE1hcClcblx0ICAgICAgdGhpcy5fY2hhbm5lbE1hcCA9IG9wdGlvbnMuY2hhbm5lbE1hcDtcblx0ICB9XG5cblx0ICAvLyBSZWFycmFuZ2Ugc3BlYWtlciBkYXRhIGJhc2VkIG9uIHxvcHRpb25zLkhSVEZTZXRVcmx8LlxuXHQgIHRoaXMuX3NwZWFrZXJEYXRhID0gW107XG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBGT0FTcGVha2VyRGF0YS5sZW5ndGg7ICsraSkge1xuXHQgICAgdGhpcy5fc3BlYWtlckRhdGEucHVzaCh7XG5cdCAgICAgIG5hbWU6IEZPQVNwZWFrZXJEYXRhW2ldLm5hbWUsXG5cdCAgICAgIHVybDogdGhpcy5fSFJURlNldFVybCArICcvJyArIEZPQVNwZWFrZXJEYXRhW2ldLnVybCxcblx0ICAgICAgY29lZjogRk9BU3BlYWtlckRhdGFbaV0uY29lZlxuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgdGhpcy5fdGVtcE1hdHJpeDQgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIGFuZCBsb2FkIHRoZSByZXNvdXJjZXMgZm9yIHRoZSBkZWNvZGUuXG5cdCAqIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXHRGT0FEZWNvZGVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuXHQgIFV0aWxzLmxvZygnVmVyc2lvbjogJyArIFN5c3RlbVZlcnNpb24pO1xuXHQgIFV0aWxzLmxvZygnSW5pdGlhbGl6aW5nLi4uIChtb2RlOiAnICsgdGhpcy5fZGVjb2RpbmdNb2RlICsgJyknKTtcblxuXHQgIC8vIFJlcm91dGluZyBjaGFubmVscyBpZiBuZWNlc3NhcnkuXG5cdCAgdmFyIGNoYW5uZWxNYXBTdHJpbmcgPSB0aGlzLl9jaGFubmVsTWFwLnRvU3RyaW5nKCk7XG5cdCAgdmFyIGRlZmF1bHRDaGFubmVsTWFwU3RyaW5nID0gRk9BUm91dGVyLkNIQU5ORUxfTUFQLkRFRkFVTFQudG9TdHJpbmcoKTtcblx0ICBpZiAoY2hhbm5lbE1hcFN0cmluZyAhPT0gZGVmYXVsdENoYW5uZWxNYXBTdHJpbmcpIHtcblx0ICAgIFV0aWxzLmxvZygnUmVtYXBwaW5nIGNoYW5uZWxzIChbJyArIGRlZmF1bHRDaGFubmVsTWFwU3RyaW5nICsgJ10gLT4gWydcblx0ICAgICAgKyBjaGFubmVsTWFwU3RyaW5nICsgJ10pJyk7XG5cdCAgfVxuXG5cdCAgdGhpcy5fYXVkaW9FbGVtZW50U291cmNlID0gdGhpcy5fY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoXG5cdCAgICB0aGlzLl92aWRlb0VsZW1lbnQpO1xuXHQgIHRoaXMuX2ZvYVJvdXRlciA9IG5ldyBGT0FSb3V0ZXIodGhpcy5fY29udGV4dCwgdGhpcy5fY2hhbm5lbE1hcCk7XG5cdCAgdGhpcy5fZm9hUm90YXRvciA9IG5ldyBGT0FSb3RhdG9yKHRoaXMuX2NvbnRleHQpO1xuXHQgIHRoaXMuX2ZvYVBoYXNlTWF0Y2hlZEZpbHRlciA9IG5ldyBGT0FQaGFzZU1hdGNoZWRGaWx0ZXIodGhpcy5fY29udGV4dCk7XG5cblx0ICB0aGlzLl9hdWRpb0VsZW1lbnRTb3VyY2UuY29ubmVjdCh0aGlzLl9mb2FSb3V0ZXIuaW5wdXQpO1xuXHQgIHRoaXMuX2ZvYVJvdXRlci5vdXRwdXQuY29ubmVjdCh0aGlzLl9mb2FSb3RhdG9yLmlucHV0KTtcblx0ICB0aGlzLl9mb2FSb3RhdG9yLm91dHB1dC5jb25uZWN0KHRoaXMuX2ZvYVBoYXNlTWF0Y2hlZEZpbHRlci5pbnB1dCk7XG5cblx0ICB0aGlzLl9mb2FWaXJ0dWFsU3BlYWtlcnMgPSBbXTtcblxuXHQgIC8vIEJ5cGFzcyBzaWduYWwgcGF0aC5cblx0ICB0aGlzLl9ieXBhc3MgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICB0aGlzLl9hdWRpb0VsZW1lbnRTb3VyY2UuY29ubmVjdCh0aGlzLl9ieXBhc3MpO1xuXG5cdCAgLy8gR2V0IHRoZSBsaW5lYXIgYW1wbGl0dWRlIGZyb20gdGhlIHBvc3QgZ2FpbiBvcHRpb24sIHdoaWNoIGlzIGluIGRlY2liZWwuXG5cdCAgdmFyIHBvc3RHYWluTGluZWFyID0gTWF0aC5wb3coMTAsIHRoaXMuX3Bvc3RHYWluREIvMjApO1xuXHQgIFV0aWxzLmxvZygnR2FpbiBjb21wZW5zYXRpb246ICcgKyBwb3N0R2FpbkxpbmVhciArICcgKCcgKyB0aGlzLl9wb3N0R2FpbkRCXG5cdCAgICArICdkQiknKTtcblxuXHQgIC8vIFRoaXMgcmV0dXJucyBhIHByb21pc2Ugc28gZGV2ZWxvcGVycyBjYW4gdXNlIHRoZSBkZWNvZGVyIHdoZW4gaXQgaXMgcmVhZHkuXG5cdCAgdmFyIG1lID0gdGhpcztcblx0ICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHQgICAgbmV3IEF1ZGlvQnVmZmVyTWFuYWdlcihtZS5fY29udGV4dCwgbWUuX3NwZWFrZXJEYXRhLFxuXHQgICAgICBmdW5jdGlvbiAoYnVmZmVycykge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWUuX3NwZWFrZXJEYXRhLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICBtZS5fZm9hVmlydHVhbFNwZWFrZXJzW2ldID0gbmV3IEZPQVZpcnR1YWxTcGVha2VyKG1lLl9jb250ZXh0LCB7XG5cdCAgICAgICAgICAgIGNvZWZmaWNpZW50czogbWUuX3NwZWFrZXJEYXRhW2ldLmNvZWYsXG5cdCAgICAgICAgICAgIElSOiBidWZmZXJzLmdldChtZS5fc3BlYWtlckRhdGFbaV0ubmFtZSksXG5cdCAgICAgICAgICAgIGdhaW46IHBvc3RHYWluTGluZWFyXG5cdCAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgbWUuX2ZvYVBoYXNlTWF0Y2hlZEZpbHRlci5vdXRwdXQuY29ubmVjdChcblx0ICAgICAgICAgICAgbWUuX2ZvYVZpcnR1YWxTcGVha2Vyc1tpXS5pbnB1dCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gU2V0IHRoZSBkZWNvZGluZyBtb2RlLlxuXHQgICAgICAgIG1lLnNldE1vZGUobWUuX2RlY29kaW5nTW9kZSk7XG5cdCAgICAgICAgbWUuX2lzRGVjb2RlclJlYWR5ID0gdHJ1ZTtcblx0ICAgICAgICBVdGlscy5sb2coJ0hSVEYgSVJzIGFyZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LiBUaGUgZGVjb2RlciBpcyByZWFkeS4nKTtcblxuXHQgICAgICAgIHJlc29sdmUoKTtcblx0ICAgICAgfSwgcmVqZWN0KTtcblx0ICB9KTtcblx0fTtcblxuXHQvKipcblx0ICogU2V0IHRoZSByb3RhdGlvbiBtYXRyaXggZm9yIHRoZSBzb3VuZCBmaWVsZCByb3RhdGlvbi5cblx0ICogQHBhcmFtIHtBcnJheX0gcm90YXRpb25NYXRyaXggICAgICAzeDMgcm90YXRpb24gbWF0cml4IChyb3ctbWFqb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXByZXNlbnRhdGlvbilcblx0ICovXG5cdEZPQURlY29kZXIucHJvdG90eXBlLnNldFJvdGF0aW9uTWF0cml4ID0gZnVuY3Rpb24gKHJvdGF0aW9uTWF0cml4KSB7XG5cdCAgdGhpcy5fZm9hUm90YXRvci5zZXRSb3RhdGlvbk1hdHJpeChyb3RhdGlvbk1hdHJpeCk7XG5cdH07XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSByb3RhdGlvbiBtYXRyaXggZnJvbSBhIFRocmVlLmpzIGNhbWVyYSBvYmplY3QuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gY2FtZXJhTWF0cml4ICAgICAgVGhlIE1hdHJpeDQgb2JlamN0IG9mIFRocmVlLmpzIHRoZSBjYW1lcmEuXG5cdCAqL1xuXHRGT0FEZWNvZGVyLnByb3RvdHlwZS5zZXRSb3RhdGlvbk1hdHJpeEZyb21DYW1lcmEgPSBmdW5jdGlvbiAoY2FtZXJhTWF0cml4KSB7XG5cdCAgLy8gRXh0cmFjdCB0aGUgaW5uZXIgYXJyYXkgZWxlbWVudHMgYW5kIGludmVyc2UuIChUaGUgYWN0dWFsIHZpZXcgcm90YXRpb24gaXNcblx0ICAvLyB0aGUgb3Bwb3NpdGUgb2YgdGhlIGNhbWVyYSBtb3ZlbWVudC4pXG5cdCAgVXRpbHMuaW52ZXJ0TWF0cml4NCh0aGlzLl90ZW1wTWF0cml4NCwgY2FtZXJhTWF0cml4LmVsZW1lbnRzKTtcblx0ICB0aGlzLl9mb2FSb3RhdG9yLnNldFJvdGF0aW9uTWF0cml4NCh0aGlzLl90ZW1wTWF0cml4NCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZGVjb2RpbmcgbW9kZS5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG1vZGUgICAgICAgICAgICAgICBEZWNvZGluZyBtb2RlLiBXaGVuIHRoZSBtb2RlIGlzICdieXBhc3MnXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGRlY29kZXIgaXMgZGlzYWJsZWQgYW5kIGJ5cGFzcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCBzdHJlYW0gdG8gdGhlIG91dHB1dC4gU2V0dGluZyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlIHRvICdhbWJpc29uaWMnIGFjdGl2YXRlcyB0aGUgZGVjb2Rlci5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGVuIHRoZSBtb2RlIGlzICdvZmYnLCBhbGwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZyBpcyBjb21wbGV0ZWx5IHR1cm5lZCBvZmYgc2F2aW5nXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIENQVSBwb3dlci5cblx0ICovXG5cdEZPQURlY29kZXIucHJvdG90eXBlLnNldE1vZGUgPSBmdW5jdGlvbiAobW9kZSkge1xuXHQgIGlmIChtb2RlID09PSB0aGlzLl9kZWNvZGluZ01vZGUpXG5cdCAgICByZXR1cm47XG5cblx0ICBzd2l0Y2ggKG1vZGUpIHtcblxuXHQgICAgY2FzZSAnYnlwYXNzJzpcblx0ICAgICAgdGhpcy5fZGVjb2RpbmdNb2RlID0gJ2J5cGFzcyc7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZm9hVmlydHVhbFNwZWFrZXJzLmxlbmd0aDsgKytpKVxuXHQgICAgICAgIHRoaXMuX2ZvYVZpcnR1YWxTcGVha2Vyc1tpXS5kaXNhYmxlKCk7XG5cdCAgICAgIHRoaXMuX2J5cGFzcy5jb25uZWN0KHRoaXMuX2NvbnRleHQuZGVzdGluYXRpb24pO1xuXHQgICAgICBicmVhaztcblxuXHQgICAgY2FzZSAnYW1iaXNvbmljJzpcblx0ICAgICAgdGhpcy5fZGVjb2RpbmdNb2RlID0gJ2FtYmlzb25pYyc7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZm9hVmlydHVhbFNwZWFrZXJzLmxlbmd0aDsgKytpKVxuXHQgICAgICAgIHRoaXMuX2ZvYVZpcnR1YWxTcGVha2Vyc1tpXS5lbmFibGUoKTtcblx0ICAgICAgdGhpcy5fYnlwYXNzLmRpc2Nvbm5lY3QoKTtcblx0ICAgICAgYnJlYWs7XG5cblx0ICAgIGNhc2UgJ29mZic6XG5cdCAgICAgIHRoaXMuX2RlY29kaW5nTW9kZSA9ICdvZmYnO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZvYVZpcnR1YWxTcGVha2Vycy5sZW5ndGg7ICsraSlcblx0ICAgICAgICB0aGlzLl9mb2FWaXJ0dWFsU3BlYWtlcnNbaV0uZGlzYWJsZSgpO1xuXHQgICAgICB0aGlzLl9ieXBhc3MuZGlzY29ubmVjdCgpO1xuXHQgICAgICBicmVhaztcblxuXHQgICAgZGVmYXVsdDpcblx0ICAgICAgYnJlYWs7XG5cdCAgfVxuXG5cdCAgVXRpbHMubG9nKCdEZWNvZGluZyBtb2RlIGNoYW5nZWQuICgnICsgbW9kZSArICcpJyk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBGT0FEZWNvZGVyO1xuXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG5cdCAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblx0ICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cdCAqXG5cdCAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblx0ICpcblx0ICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuXHQgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5cdCAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuXHQgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5cdCAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogU2VlIGFsc286XG5cdCAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvc3BhdGlhbC1tZWRpYS90cmVlL21hc3Rlci9zcGF0aWFsLWF1ZGlvXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBUaGUgZGF0YSBmb3IgRk9BVmlydHVhbFNwZWFrZXIuIEVhY2ggZW50cnkgY29udGFpbnMgdGhlIFVSTCBmb3IgSVIgZmlsZXMgYW5kXG5cdCAqIHRoZSBnYWluIGNvZWZmaWNpZW50cyBmb3IgdGhlIGFzc29jaWF0ZWQgSVIgZmlsZXMuIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2Zcblx0ICogY29lZmZpY2llbnRzIGZvbGxvd3MgdGhlIEFDTiBjaGFubmVsIG9yZGVyaW5nLiAoVyxZLFosWClcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0dmFyIEZPQVNwZWFrZXJEYXRhID0gW3tcblx0ICBuYW1lOiAnRTM1X0ExMzUnLFxuXHQgIHVybDogJ0UzNV9BMTM1LndhdicsXG5cdCAgZ2FpbkZhY3RvcjogMSxcblx0ICBjb2VmOiBbLjEyNTAsIDAuMjE2NDk1LCAwLjIxNjUzLCAtMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRTM1X0EtMTM1Jyxcblx0ICB1cmw6ICdFMzVfQS0xMzUud2F2Jyxcblx0ICBnYWluRmFjdG9yOiAxLFxuXHQgIGNvZWY6IFsuMTI1MCwgLTAuMjE2NDk1LCAwLjIxNjUzLCAtMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRS0zNV9BMTM1Jyxcblx0ICB1cmw6ICdFLTM1X0ExMzUud2F2Jyxcblx0ICBnYWluRmFjdG9yOiAxLFxuXHQgIGNvZWY6IFsuMTI1MCwgMC4yMTY0OTUsIC0wLjIxNjUzLCAtMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRS0zNV9BLTEzNScsXG5cdCAgdXJsOiAnRS0zNV9BLTEzNS53YXYnLFxuXHQgIGdhaW5GYWN0b3I6IDEsXG5cdCAgY29lZjogWy4xMjUwLCAtMC4yMTY0OTUsIC0wLjIxNjUzLCAtMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRTM1X0E0NScsXG5cdCAgdXJsOiAnRTM1X0E0NS53YXYnLFxuXHQgIGdhaW5GYWN0b3I6IDEsXG5cdCAgY29lZjogWy4xMjUwLCAwLjIxNjQ5NSwgMC4yMTY1MywgMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRTM1X0EtNDUnLFxuXHQgIHVybDogJ0UzNV9BLTQ1LndhdicsXG5cdCAgZ2FpbkZhY3RvcjogMSxcblx0ICBjb2VmOiBbLjEyNTAsIC0wLjIxNjQ5NSwgMC4yMTY1MywgMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRS0zNV9BNDUnLFxuXHQgIHVybDogJ0UtMzVfQTQ1LndhdicsXG5cdCAgZ2FpbkZhY3RvcjogMSxcblx0ICBjb2VmOiBbLjEyNTAsIDAuMjE2NDk1LCAtMC4yMTY1MywgMC4yMTY0OTVdXG5cdH0sIHtcblx0ICBuYW1lOiAnRS0zNV9BLTQ1Jyxcblx0ICB1cmw6ICdFLTM1X0EtNDUud2F2Jyxcblx0ICBnYWluRmFjdG9yOiAxLFxuXHQgIGNvZWY6IFsuMTI1MCwgLTAuMjE2NDk1LCAtMC4yMTY1MywgMC4yMTY0OTVdXG5cdH1dO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gRk9BU3BlYWtlckRhdGE7XG5cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblx0ICpcblx0ICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXHQgKlxuXHQgKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5cdCAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcblx0ICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5cdCAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcblx0ICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAZmlsZU92ZXJ2aWV3IE9tbml0b25lIHZlcnNpb24uXG5cdCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogT21uaXRvbmUgbGlicmFyeSB2ZXJzaW9uXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHRtb2R1bGUuZXhwb3J0cyA9ICcwLjIuMic7XG5cblxuLyoqKi8gfSxcbi8qIDEyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcblx0ICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXHQgKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblx0ICpcblx0ICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXHQgKlxuXHQgKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5cdCAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcblx0ICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5cdCAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcblx0ICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cdCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQGZpbGVPdmVydmlldyBPbW5pdG9uZSBGT0EgZGVjb2Rlci5cblx0ICovXG5cdHZhciBBdWRpb0J1ZmZlck1hbmFnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHR2YXIgRk9BUm91dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblx0dmFyIEZPQVJvdGF0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgRk9BQ29udm9sdmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblx0dmFyIFV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblx0dmFyIFN5c3RlbVZlcnNpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblxuXHQvLyBIUklSIGZvciBvcHRpbWl6ZWQgRk9BIHJlbmRlcmluZy5cblx0Ly8gVE9ETyhob25nY2hhbik6IGNoYW5nZSB0aGlzIHdpdGggdGhlIGFic29sdXRlIFVSTC5cblx0dmFyIFNIX01BWFJFX0hSSVJfVVJMID0gJ3Jlc291cmNlcy9zaF9ocmlyX29fMS53YXYnO1xuXG5cblx0LyoqXG5cdCAqIEBjbGFzcyBPbW5pdG9uZSBGT0EgcmVuZGVyZXIgY2xhc3MuIFVzZXMgdGhlIG9wdGltaXplZCBjb252b2x1dGlvbiB0ZWNobmlxdWUuXG5cdCAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBjb250ZXh0ICAgICAgICAgIEFzc29jaWF0ZWQgQXVkaW9Db250ZXh0LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5IUklSVXJsICAgICAgICBPcHRpb25hbCBIUklSIFVSTC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucmVuZGVyaW5nTW9kZSAgUmVuZGVyaW5nIG1vZGUuXG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY2hhbm5lbE1hcCAgICAgIEN1c3RvbSBjaGFubmVsIG1hcC5cblx0ICovXG5cdGZ1bmN0aW9uIEZPQVJlbmRlcmVyIChjb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cblx0ICAvLyBQcmltaW5nIGludGVybmFsIHNldHRpbmcgd2l0aCB8b3B0aW9uc3wuXG5cdCAgdGhpcy5fSFJJUlVybCA9IFNIX01BWFJFX0hSSVJfVVJMO1xuXHQgIHRoaXMuX2NoYW5uZWxNYXAgPSBGT0FSb3V0ZXIuQ0hBTk5FTF9NQVAuREVGQVVMVDtcblx0ICB0aGlzLl9yZW5kZXJpbmdNb2RlID0gJ2FtYmlzb25pYyc7XG5cdCAgaWYgKG9wdGlvbnMpIHtcblx0ICAgIGlmIChvcHRpb25zLkhSSVJVcmwpXG5cdCAgICAgIHRoaXMuX0hSSVJVcmwgPSBvcHRpb25zLkhSSVJVcmw7XG5cdCAgICBpZiAob3B0aW9ucy5yZW5kZXJpbmdNb2RlKVxuXHQgICAgICB0aGlzLl9yZW5kZXJpbmdNb2RlID0gb3B0aW9ucy5yZW5kZXJpbmdNb2RlO1xuXHQgICAgaWYgKG9wdGlvbnMuY2hhbm5lbE1hcClcblx0ICAgICAgdGhpcy5fY2hhbm5lbE1hcCA9IG9wdGlvbnMuY2hhbm5lbE1hcDtcblx0ICB9XG5cblx0ICB0aGlzLl9pc1JlbmRlcmVyUmVhZHkgPSBmYWxzZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgYW5kIGxvYWQgdGhlIHJlc291cmNlcyBmb3IgdGhlIGRlY29kZS5cblx0ICogQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cdEZPQVJlbmRlcmVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuXHQgIFV0aWxzLmxvZygnVmVyc2lvbjogJyArIFN5c3RlbVZlcnNpb24pO1xuXHQgIFV0aWxzLmxvZygnSW5pdGlhbGl6aW5nLi4uIChtb2RlOiAnICsgdGhpcy5fcmVuZGVyaW5nTW9kZSArICcpJyk7XG5cdCAgVXRpbHMubG9nKCdSZW5kZXJpbmcgdmlhIFNILU1heFJFIGNvbnZvbHV0aW9uLicpO1xuXG5cdCAgdGhpcy5fdGVtcE1hdHJpeDQgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcblxuXHQgIHJldHVybiBuZXcgUHJvbWlzZSh0aGlzLl9pbml0aWFsaXplQ2FsbGJhY2suYmluZCh0aGlzKSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogSW50ZXJuYWwgY2FsbGJhY2sgaGFuZGxlciBmb3IgfGluaXRpYWxpemV8IG1ldGhvZC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBQcm9taXNlIHJlc29sdXRpb24uXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBQcm9taXNlIHJlamVjdGlvbi5cblx0ICovXG5cdEZPQVJlbmRlcmVyLnByb3RvdHlwZS5faW5pdGlhbGl6ZUNhbGxiYWNrID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHQgIHZhciBrZXkgPSAnRk9BX0hSSVJfQVVESU9CVUZGRVInO1xuXHQgIG5ldyBBdWRpb0J1ZmZlck1hbmFnZXIoXG5cdCAgICAgIHRoaXMuX2NvbnRleHQsXG5cdCAgICAgIFt7IG5hbWU6IGtleSwgdXJsOiB0aGlzLl9IUklSVXJsIH1dLFxuXHQgICAgICBmdW5jdGlvbiAoYnVmZmVycykge1xuXHQgICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICAgICAgICB0aGlzLl9ieXBhc3MgPSB0aGlzLl9jb250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0ICAgICAgICB0aGlzLl9mb2FSb3V0ZXIgPSBuZXcgRk9BUm91dGVyKHRoaXMuX2NvbnRleHQsIHRoaXMuX2NoYW5uZWxNYXApO1xuXHQgICAgICAgIHRoaXMuX2ZvYVJvdGF0b3IgPSBuZXcgRk9BUm90YXRvcih0aGlzLl9jb250ZXh0KTtcblx0ICAgICAgICB0aGlzLl9mb2FDb252b2x2ZXIgPSBuZXcgRk9BQ29udm9sdmVyKHRoaXMuX2NvbnRleHQsIHtcblx0ICAgICAgICAgICAgSVI6IGJ1ZmZlcnMuZ2V0KGtleSlcblx0ICAgICAgICAgIH0pO1xuXHQgICAgICAgIHRoaXMub3V0cHV0ID0gdGhpcy5fY29udGV4dC5jcmVhdGVHYWluKCk7XG5cblx0ICAgICAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5fZm9hUm91dGVyLmlucHV0KTtcblx0ICAgICAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5fYnlwYXNzKTtcblx0ICAgICAgICB0aGlzLl9mb2FSb3V0ZXIub3V0cHV0LmNvbm5lY3QodGhpcy5fZm9hUm90YXRvci5pbnB1dCk7XG5cdCAgICAgICAgdGhpcy5fZm9hUm90YXRvci5vdXRwdXQuY29ubmVjdCh0aGlzLl9mb2FDb252b2x2ZXIuaW5wdXQpO1xuXHQgICAgICAgIHRoaXMuX2ZvYUNvbnZvbHZlci5vdXRwdXQuY29ubmVjdCh0aGlzLm91dHB1dCk7XG5cblx0ICAgICAgICB0aGlzLnNldENoYW5uZWxNYXAodGhpcy5fY2hhbm5lbE1hcCk7XG5cdCAgICAgICAgdGhpcy5zZXRSZW5kZXJpbmdNb2RlKHRoaXMuX3JlbmRlcmluZ01vZGUpO1xuXG5cdCAgICAgICAgdGhpcy5faXNSZW5kZXJlclJlYWR5ID0gdHJ1ZTtcblx0ICAgICAgICBVdGlscy5sb2coJ0hSSVJzIGFyZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LiBUaGUgcmVuZGVyZXIgaXMgcmVhZHkuJyk7XG5cdCAgICAgICAgcmVzb2x2ZSgpO1xuXHQgICAgICB9LmJpbmQodGhpcyksXG5cdCAgICAgIGZ1bmN0aW9uIChidWZmZXJzKSB7XG5cdCAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICdJbml0aWFsaXphdGlvbiBmYWlsZWQ6ICcgKyBrZXkgKyAnIGlzICcgXG5cdCAgICAgICAgICAgICsgYnVmZmVycy5nZXQoMCkgKyAnLic7XG5cdCAgICAgICAgVXRpbHMubG9nKGVycm9yTWVzc2FnZSk7XG5cdCAgICAgICAgcmVqZWN0KGVycm9yTWVzc2FnZSk7XG5cdCAgICAgIH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGNoYW5uZWwgbWFwLlxuXHQgKiBAcGFyYW0ge0FycmF5fSBjaGFubmVsTWFwICAgICAgICAgIEEgY3VzdG9tIGNoYW5uZWwgbWFwIGZvciBGT0Egc3RyZWFtLlxuXHQgKi9cblx0Rk9BUmVuZGVyZXIucHJvdG90eXBlLnNldENoYW5uZWxNYXAgPSBmdW5jdGlvbiAoY2hhbm5lbE1hcCkge1xuXHQgIGlmICghdGhpcy5faXNSZW5kZXJlclJlYWR5KVxuXHQgICAgcmV0dXJuO1xuXG5cdCAgaWYgKGNoYW5uZWxNYXAudG9TdHJpbmcoKSAhPT0gdGhpcy5fY2hhbm5lbE1hcC50b1N0cmluZygpKSB7XG5cdCAgICBVdGlscy5sb2coJ1JlbWFwcGluZyBjaGFubmVscyAoWycgKyB0aGlzLl9jaGFubmVsTWFwLnRvU3RyaW5nKCkgKyAnXSAtPiBbJ1xuXHQgICAgICArIGNoYW5uZWxNYXAudG9TdHJpbmcoKSArICddKS4nKTtcblx0ICAgIHRoaXMuX2NoYW5uZWxNYXAgPSBjaGFubmVsTWFwLnNsaWNlKCk7XG5cdCAgICB0aGlzLl9mb2FSb3V0ZXIuc2V0Q2hhbm5lbE1hcCh0aGlzLl9jaGFubmVsTWFwKTtcblx0ICB9XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgcm90YXRpb24gbWF0cml4IGZvciB0aGUgc291bmQgZmllbGQgcm90YXRpb24uXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHJvdGF0aW9uTWF0cml4ICAgICAgM3gzIHJvdGF0aW9uIG1hdHJpeCAocm93LW1ham9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50YXRpb24pXG5cdCAqL1xuXHRGT0FSZW5kZXJlci5wcm90b3R5cGUuc2V0Um90YXRpb25NYXRyaXggPSBmdW5jdGlvbiAocm90YXRpb25NYXRyaXgpIHtcblx0ICBpZiAoIXRoaXMuX2lzUmVuZGVyZXJSZWFkeSlcblx0ICAgIHJldHVybjtcblxuXHQgIHRoaXMuX2ZvYVJvdGF0b3Iuc2V0Um90YXRpb25NYXRyaXgocm90YXRpb25NYXRyaXgpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgcm90YXRpb24gbWF0cml4IGZyb20gYSBUaHJlZS5qcyBjYW1lcmEgb2JqZWN0LlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IGNhbWVyYU1hdHJpeCAgICAgIFRoZSBNYXRyaXg0IG9iZWpjdCBvZiBUaHJlZS5qcyB0aGUgY2FtZXJhLlxuXHQgKi9cblx0Rk9BUmVuZGVyZXIucHJvdG90eXBlLnNldFJvdGF0aW9uTWF0cml4RnJvbUNhbWVyYSA9IGZ1bmN0aW9uIChjYW1lcmFNYXRyaXgpIHtcblx0ICBpZiAoIXRoaXMuX2lzUmVuZGVyZXJSZWFkeSlcblx0ICAgIHJldHVybjtcblxuXHQgIC8vIEV4dHJhY3QgdGhlIGlubmVyIGFycmF5IGVsZW1lbnRzIGFuZCBpbnZlcnNlLiAoVGhlIGFjdHVhbCB2aWV3IHJvdGF0aW9uIGlzXG5cdCAgLy8gdGhlIG9wcG9zaXRlIG9mIHRoZSBjYW1lcmEgbW92ZW1lbnQuKVxuXHQgIFV0aWxzLmludmVydE1hdHJpeDQodGhpcy5fdGVtcE1hdHJpeDQsIGNhbWVyYU1hdHJpeC5lbGVtZW50cyk7XG5cdCAgdGhpcy5fZm9hUm90YXRvci5zZXRSb3RhdGlvbk1hdHJpeDQodGhpcy5fdGVtcE1hdHJpeDQpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZGVjb2RpbmcgbW9kZS5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG1vZGUgICAgICAgICAgICAgICBEZWNvZGluZyBtb2RlLiBXaGVuIHRoZSBtb2RlIGlzICdieXBhc3MnXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGRlY29kZXIgaXMgZGlzYWJsZWQgYW5kIGJ5cGFzcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCBzdHJlYW0gdG8gdGhlIG91dHB1dC4gU2V0dGluZyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlIHRvICdhbWJpc29uaWMnIGFjdGl2YXRlcyB0aGUgZGVjb2Rlci5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGVuIHRoZSBtb2RlIGlzICdvZmYnLCBhbGwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZyBpcyBjb21wbGV0ZWx5IHR1cm5lZCBvZmYgc2F2aW5nXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIENQVSBwb3dlci5cblx0ICovXG5cdEZPQVJlbmRlcmVyLnByb3RvdHlwZS5zZXRSZW5kZXJpbmdNb2RlID0gZnVuY3Rpb24gKG1vZGUpIHtcblx0ICBpZiAobW9kZSA9PT0gdGhpcy5fcmVuZGVyaW5nTW9kZSlcblx0ICAgIHJldHVybjtcblxuXHQgIHN3aXRjaCAobW9kZSkge1xuXHQgICAgLy8gQnlwYXNzIG1vZGU6IFRoZSBjb252b2x1dGlvbiBwYXRoIGlzIGRpc2FibGVkLCBkaXNjb25uZWN0ZWQgKHRodXMgY29uc3VtZVxuXHQgICAgLy8gbm8gQ1BVKS4gVXNlIGJ5cGFzcyBnYWluIG5vZGUgdG8gcGFzcy10aHJvdWdoIHRoZSBpbnB1dCBzdHJlYW0uXG5cdCAgICBjYXNlICdieXBhc3MnOlxuXHQgICAgICB0aGlzLl9yZW5kZXJpbmdNb2RlID0gJ2J5cGFzcyc7XG5cdCAgICAgIHRoaXMuX2ZvYUNvbnZvbHZlci5kaXNhYmxlKCk7XG5cdCAgICAgIHRoaXMuX2J5cGFzcy5jb25uZWN0KHRoaXMub3V0cHV0KTtcblx0ICAgICAgYnJlYWs7XG5cblx0ICAgIC8vIEFtYmlzb25pYyBtb2RlOiBVc2UgdGhlIGNvbnZvbHV0aW9uIGFuZCBzaHV0IGRvd24gdGhlIGJ5cGFzcyBwYXRoLlxuXHQgICAgY2FzZSAnYW1iaXNvbmljJzpcblx0ICAgICAgdGhpcy5fcmVuZGVyaW5nTW9kZSA9ICdhbWJpc29uaWMnO1xuXHQgICAgICB0aGlzLl9mb2FDb252b2x2ZXIuZW5hYmxlKCk7XG5cdCAgICAgIHRoaXMuX2J5cGFzcy5kaXNjb25uZWN0KCk7XG5cdCAgICAgIGJyZWFrO1xuXG5cdCAgICAvLyBPZmYgbW9kZTogU2h1dCBkb3duIGFsbCBzb3VuZCBmcm9tIHRoZSByZW5kZXJlci5cblx0ICAgIGNhc2UgJ29mZic6XG5cdCAgICAgIHRoaXMuX3JlbmRlcmluZ01vZGUgPSAnb2ZmJztcblx0ICAgICAgdGhpcy5fZm9hQ29udm9sdmVyLmRpc2FibGUoKTtcblx0ICAgICAgdGhpcy5fYnlwYXNzLmRpc2Nvbm5lY3QoKTtcblx0ICAgICAgYnJlYWs7XG5cblx0ICAgIGRlZmF1bHQ6XG5cdCAgICAgIC8vIFVuc3VwcG9ydGVkIG1vZGUuIElnbm9yZSBpdC5cblx0ICAgICAgVXRpbHMubG9nKCdSZW5kZXJpbmcgbW9kZSBcIicgKyBtb2RlICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG5cdCAgICAgIHJldHVybjtcblx0ICB9XG5cblx0ICBVdGlscy5sb2coJ1JlbmRlcmluZyBtb2RlIGNoYW5nZWQuICgnICsgbW9kZSArICcpJyk7XG5cdH07XG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZPQVJlbmRlcmVyO1xuXG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9ub2RlX21vZHVsZXMvYml0bW92aW4tcGxheWVyLXVpL3NyYy90cy9wbGF5ZXIuZC50cycgLz5cclxuaW1wb3J0IFBsYXllckV2ZW50ID0gYml0bW92aW4uUGxheWVyQVBJLlBsYXllckV2ZW50O1xyXG5pbXBvcnQgQXVkaW9UcmFjayA9IGJpdG1vdmluLlBsYXllckFQSS5BdWRpb1RyYWNrO1xyXG5pbXBvcnQgQXVkaW9DaGFuZ2VkRXZlbnQgPSBiaXRtb3Zpbi5QbGF5ZXJBUEkuQXVkaW9DaGFuZ2VkRXZlbnQ7XHJcbmltcG9ydCBNZWRpYVRyYWNrUm9sZSA9IGJpdG1vdmluLlBsYXllckFQSS5NZWRpYVRyYWNrUm9sZTtcclxuaW1wb3J0IFZSVmlld2luZ0RpcmVjdGlvbkNoYW5nZUV2ZW50ID0gYml0bW92aW4uUGxheWVyQVBJLlZSVmlld2luZ0RpcmVjdGlvbkNoYW5nZUV2ZW50O1xyXG5pbXBvcnQge0FtYmlzb25pY3NJbXBsZW1lbnRhdGlvbn0gZnJvbSAnLi9BbWJpc29uaWNzSW1wbGVtZW50YXRpb24nO1xyXG5pbXBvcnQge09tbml0b25lRk9BUmVuZGVyZXJJbXBsZW1lbnRhdGlvbn0gZnJvbSAnLi9PbW5pdG9uZUZPQVJlbmRlcmVySW1wbGVtZW50YXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBbWJpc29uaWNzQ29uZmlnIHtcclxuICAvKipcclxuICAgKiBUZWxscyBpZiB0aGUgZmlyc3QgQW1iaXNvbmljIGF1ZGlvIHRyYWNrLCBpZiBleGlzdGluZywgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgc2VsZWN0ZWQgZm9yIGEgVlIgc291cmNlLlxyXG4gICAqIERlZmF1bHQ6IHRydWVcclxuICAgKi9cclxuICBhdXRvU2VsZWN0QW1iaXNvbmljQXVkaW8/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBvZmZzZXQgYXJvdW5kIHRoZSB5LWF4aXMgaW4gcmFkaWFucy4gQ2FuIGJlIHVzZWQgdG8gYXBwbHkgYSByb3RhdGlvbiBvZmZzZXQgdG8gYWRqdXN0XHJcbiAgICogdGhlIGF1ZGlvIHRvIHRoZSB2aWRlbyBmaWVsZC5cclxuICAgKiBEZWZhdWx0OiAwXHJcbiAgICovXHJcbiAgeWF3T2Zmc2V0PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW1iaXNvbmljcyB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIFZSX1NDSEVNRV9JRF9VUkkgPSAnaHR0cHM6Ly9iaXRtb3Zpbi5jb20vMDgyMDE3L3ZyJztcclxuICBwcml2YXRlIHN0YXRpYyBWUl9TQ0hFTUVfVkFMVUVfRk9BID0gJ2FtYmlzb25pYy1mbyc7XHJcblxyXG4gIHByaXZhdGUgcGxheWVyOiBiaXRtb3Zpbi5QbGF5ZXJBUEk7XHJcbiAgcHJpdmF0ZSBjb25maWc6IEFtYmlzb25pY3NDb25maWc7XHJcbiAgcHJpdmF0ZSBtZWRpYUVsZW1lbnQ6IEhUTUxNZWRpYUVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBhdWRpb0NvbnRleHQ6IEF1ZGlvQ29udGV4dDtcclxuICBwcml2YXRlIGltcGxlbWVudGF0aW9uOiBBbWJpc29uaWNzSW1wbGVtZW50YXRpb247XHJcbiAgcHJpdmF0ZSBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwbGF5ZXI6IGJpdG1vdmluLlBsYXllckFQSSwgY29uZmlnOiBBbWJpc29uaWNzQ29uZmlnID0ge30pIHtcclxuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgdGhpcy5jb25maWcuYXV0b1NlbGVjdEFtYmlzb25pY0F1ZGlvID0gY29uZmlnLmF1dG9TZWxlY3RBbWJpc29uaWNBdWRpbyB8fCB0cnVlO1xyXG4gICAgdGhpcy5jb25maWcueWF3T2Zmc2V0ID0gY29uZmlnLnlhd09mZnNldCB8fCAwO1xyXG5cclxuICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCB0aGlzLm9uUGxheWVyUmVhZHkpO1xyXG4gICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQVVESU9fQ0hBTkdFRCwgdGhpcy5vblBsYXllckF1ZGlvQ2hhbmdlZCk7XHJcblxyXG4gICAgLy8gSW4gY2FzZSB0aGlzIGluc3RhbmNlIHdhcyBjcmVhdGVkIGFmdGVyIGEgc291cmNlIGhhcyBiZWVuIGxvYWRlZCBpbnRvIHRoZSBwbGF5ZXIsIHdlIGRvIG5vdCB3YWl0IGZvciB0aGUgbmV4dFxyXG4gICAgLy8gT05fU09VUkNFX0xPQURFRCBldmVudCBidXQgaW5pdGlhbGl6ZSBkaXJlY3RseS5cclxuICAgIGlmIChwbGF5ZXIuaXNSZWFkeSgpKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGUoKTtcclxuICAgIHRoaXMucGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9SRUFEWSwgdGhpcy5vblBsYXllclJlYWR5KTtcclxuICAgIHRoaXMucGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9BVURJT19DSEFOR0VELCB0aGlzLm9uUGxheWVyQXVkaW9DaGFuZ2VkKTtcclxuICAgIHRoaXMuaW1wbGVtZW50YXRpb24ucmVsZWFzZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XHJcbiAgICB0aGlzLm1lZGlhRWxlbWVudCA9ICg8YW55PnRoaXMucGxheWVyKS5nZXRWaWRlb0VsZW1lbnQoKTtcclxuXHJcbiAgICBpZiAoQW1iaXNvbmljcy5pc1ZyQ29udGVudCh0aGlzLnBsYXllcikgJiYgdGhpcy5jb25maWcuYXV0b1NlbGVjdEFtYmlzb25pY0F1ZGlvKSB7XHJcbiAgICAgIGNvbnN0IGF1ZGlvVHJhY2tzID0gdGhpcy5wbGF5ZXIuZ2V0QXZhaWxhYmxlQXVkaW8oKTtcclxuICAgICAgY29uc3QgYW1iaXNvbmljQXVkaW9UcmFjayA9IEFtYmlzb25pY3MuZmluZEZpcnN0QW1iaXNvbmljVHJhY2soYXVkaW9UcmFja3MpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coYXVkaW9UcmFja3MsIGFtYmlzb25pY0F1ZGlvVHJhY2spO1xyXG5cclxuICAgICAgaWYgKGFtYmlzb25pY0F1ZGlvVHJhY2spIHtcclxuICAgICAgICB0aGlzLnBsYXllci5zZXRBdWRpbyhhbWJpc29uaWNBdWRpb1RyYWNrLmlkKTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKCdBdXRvc2VsZWN0ZWQgZmlyc3QgQW1iaXNvbmljcyBhdWRpbyB0cmFjaycsIGFtYmlzb25pY0F1ZGlvVHJhY2spO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVuYWJsZSgpOiB2b2lkIHtcclxuICAgIGlmICghQW1iaXNvbmljcy5pc1ZyQ29udGVudCh0aGlzLnBsYXllcikpIHtcclxuICAgICAgLy8gRG9uJ3QgZW5hYmxlIEFtYmlzb25pY3MgZm9yIG5vbi1WUiBjb250ZW50IGJlY2F1c2UgaXQgZG9lcyBub3QgbWFrZSBhbnkgc2Vuc2VcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWxyZWFkeSBlbmFibGVkXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgdGhlIEZPQVJlbmRlcmVyIG9ubHkgdGhlIGZpcnN0IHRpbWUgaXQgaXMgcmVxdWlyZWQsIHRoZW4gd2UgcmV1c2UgaXRcclxuICAgIGlmICghdGhpcy5pbXBsZW1lbnRhdGlvbikge1xyXG4gICAgICB0aGlzLmltcGxlbWVudGF0aW9uID0gbmV3IE9tbml0b25lRk9BUmVuZGVyZXJJbXBsZW1lbnRhdGlvbigpO1xyXG4gICAgICB0aGlzLmltcGxlbWVudGF0aW9uLnN0YXJ0KHRoaXMuYXVkaW9Db250ZXh0LCB0aGlzLm1lZGlhRWxlbWVudCkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gUmUtZW5hYmxlIEFtYmlzb25pY3MgcHJvY2Vzc2luZyAoaW4gY2FzZSBpdCBoYXMgYmVlbiBkaXNhYmxlZCBlYXJsaWVyKVxyXG4gICAgICB0aGlzLmltcGxlbWVudGF0aW9uLmVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGxheWVyLmFkZEV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9WUl9WSUVXSU5HX0RJUkVDVElPTl9DSEFOR0UsXHJcbiAgICAgIHRoaXMub25QbGF5ZXJWclZpZXdpbmdEaXJlY3Rpb25DaGFuZ2UpO1xyXG5cclxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc2FibGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhbHJlYWR5IGRpc2FibGVkXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXNhYmxlIHJvdGF0aW9uIGhhbmRsaW5nXHJcbiAgICB0aGlzLnBsYXllci5yZW1vdmVFdmVudEhhbmRsZXIodGhpcy5wbGF5ZXIuRVZFTlQuT05fVlJfVklFV0lOR19ESVJFQ1RJT05fQ0hBTkdFLFxyXG4gICAgICB0aGlzLm9uUGxheWVyVnJWaWV3aW5nRGlyZWN0aW9uQ2hhbmdlKTtcclxuXHJcbiAgICAvLyBEaXNhYmxlIEFtYmlzb25pY3MgcHJvY2Vzc2luZ1xyXG4gICAgdGhpcy5pbXBsZW1lbnRhdGlvbi5kaXNhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBpc1ZyQ29udGVudChwbGF5ZXI6IGJpdG1vdmluLlBsYXllckFQSSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gV2UgY2FuJ3QgdXNlIHRoaXMgaW4gT05fUkVBRFkgYXMgdGhlIFZSIGhhbmRsZXIgaXMgbm90IHlldCBsb2FkZWQgaW4gdGhlcmUuXHJcbiAgICAvLyBXZSBhbHNvIGNhbid0IGNoZWNrIHBsYXllci52ciBuYW1lc3BhY2UgYXZhaWxhYmlsaXR5IGZvciB0aGUgc2FtZSByZWFzb24uXHJcbiAgICAvLyByZXR1cm4gcGxheWVyLmdldFZSU3RhdHVzKCkuY29udGVudFR5cGUgIT09ICdub25lJztcclxuXHJcbiAgICAvLyBBcyBhIHdvcmthcm91bmQsIHdlIGNoZWNrIHRoZSBzb3VyY2UgY29uZmlnIGJlY2F1c2UgdGhlIHBsYXllciB0cmVhdHMgZXZlcnkgc291cmNlIGFzIFZSXHJcbiAgICAvLyBzb3VyY2Ugd2hlbiB0aGUgdnIgcHJvcGVydHkgaW4gdGhlIHNvdXJjZSBpcyBzZXQuXHJcbiAgICAvLyBUT0RPIHVzZSBtZXRob2QgYWJvdmUgb25jZSBPTl9SRUFEWSBpcyBmaXhlZFxyXG4gICAgcmV0dXJuICEhcGxheWVyLmdldENvbmZpZygpLnNvdXJjZSAmJiAhIXBsYXllci5nZXRDb25maWcoKS5zb3VyY2UudnI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBpc0FtYmlzb25pY1RyYWNrKGF1ZGlvVHJhY2s6IEF1ZGlvVHJhY2spOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGF1ZGlvVHJhY2tSb2xlczogTWVkaWFUcmFja1JvbGVbXSA9ICg8YW55PmF1ZGlvVHJhY2spLnJvbGU7XHJcblxyXG4gICAgaWYgKGF1ZGlvVHJhY2tSb2xlcyAmJiBhdWRpb1RyYWNrUm9sZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBmb3IgKGxldCBhdWRpb1RyYWNrUm9sZSBvZiBhdWRpb1RyYWNrUm9sZXMpIHtcclxuICAgICAgICBpZiAoYXVkaW9UcmFja1JvbGUuc2NoZW1lSWRVcmkgPT09IEFtYmlzb25pY3MuVlJfU0NIRU1FX0lEX1VSSVxyXG4gICAgICAgICAgJiYgYXVkaW9UcmFja1JvbGUudmFsdWUgPT09IEFtYmlzb25pY3MuVlJfU0NIRU1FX1ZBTFVFX0ZPQSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZmluZEZpcnN0QW1iaXNvbmljVHJhY2soYXVkaW9UcmFja3M6IEF1ZGlvVHJhY2tbXSk6IEF1ZGlvVHJhY2sge1xyXG4gICAgLy8gV2UgaXRlcmF0ZSBvdmVyIGFsbCBhdmFpbGFibGUgYXVkaW8gdHJhY2tzIGFuZCBjaGVjayB0aGVpciByb2xlcyB0byBzZWUgaWYgb25lIGlzIGFuIEFtYmlzb25pY3MgdHJhY2suXHJcbiAgICBmb3IgKGNvbnN0IGF1ZGlvVHJhY2sgb2YgYXVkaW9UcmFja3MpIHtcclxuICAgICAgaWYgKEFtYmlzb25pY3MuaXNBbWJpc29uaWNUcmFjayhhdWRpb1RyYWNrKSkge1xyXG4gICAgICAgIHJldHVybiBhdWRpb1RyYWNrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyB5YXcvcGl0Y2gvcm9sbCBpbnRvIGEgM3gzIHJvdGF0aW9uIG1hdHJpeC5cclxuICAgKiBAcGFyYW0ge2JpdG1vdmluLlBsYXllckFQSS5WUi5WaWV3aW5nRGlyZWN0aW9ufSBkaXJlY3Rpb24gdGhlIHZpZXdpbmcgZGlyZWN0aW9uIGZyb20gdGhlIHBsYXllclxyXG4gICAqIEBwYXJhbSB7QW1iaXNvbmljc0NvbmZpZ30gY29uZmlnXHJcbiAgICogQHJldHVybiB7bnVtYmVyW119IDN4MyByb3RhdGlvbiBtYXRyaXhcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBnZXRSb3RhdGlvbk1hdHJpeChkaXJlY3Rpb246IGJpdG1vdmluLlBsYXllckFQSS5WUi5WaWV3aW5nRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZzogQW1iaXNvbmljc0NvbmZpZyk6IG51bWJlcltdIHtcclxuICAgIC8vIENvbnZlcnQgZGVncmVlcyB0byByYWRpYW5zXHJcbiAgICBjb25zdCBkZWdUb1JhZCA9IE1hdGguUEkgLyAxODA7XHJcbiAgICBjb25zdCB5YXcgPSBkaXJlY3Rpb24ueWF3ICogZGVnVG9SYWQ7XHJcbiAgICBjb25zdCBwaXRjaCA9IGRpcmVjdGlvbi5waXRjaCAqIGRlZ1RvUmFkO1xyXG4gICAgY29uc3Qgcm9sbCA9IGRpcmVjdGlvbi5yb2xsICogZGVnVG9SYWQ7XHJcblxyXG4gICAgLy8gVGhlIEJpdG1vdmluIHBsYXllciBhc3N1bWVzIDAgZGVncmVlIGF0IHRoZSBsZWZ0IG9mIHRoZSBlcXVpcmVjdGFuZ3VsYXIgcHJvamVjdGlvbixcclxuICAgIC8vIHdoaWxlIHRoZSBzb3VyY2UgYXNzdW1lcyBpdCBpbiB0aGUgY2VudGVyLCBzbyB3ZSBtdXN0IGNvcnJlY3Qgb3VyIGFuZ2xlcyBmb3IgdGhlXHJcbiAgICAvLyBBbWJpc29uaWNzIGF1ZGlvIHRvIG1hdGNoIHRoZSBWUiB2aWRlbyB2aWV3cG9ydC5cclxuICAgIGNvbnN0IGNvcnJlY3RlZFlhdyA9IHlhdyArIGNvbmZpZy55YXdPZmZzZXQ7XHJcbiAgICBjb25zdCBjb3JyZWN0ZWRQaXRjaCA9IHBpdGNoO1xyXG4gICAgY29uc3QgY29ycmVjdGVkUm9sbCA9IHJvbGw7XHJcblxyXG4gICAgLy8gQ29udmVydCB5YXcvcGl0Y2gvcm9sbCB0byBtYXRyaXg6IGh0dHA6Ly9wbGFubmluZy5jcy51aXVjLmVkdS9ub2RlMTAyLmh0bWxcclxuICAgIGNvbnN0IGFscGhhID0gY29ycmVjdGVkWWF3OyAvLyB6LWF4aXNcclxuICAgIGNvbnN0IGJldGEgPSBjb3JyZWN0ZWRQaXRjaDsgLy8geS1heGlzXHJcbiAgICBjb25zdCBnYW1tYSA9IGNvcnJlY3RlZFJvbGw7IC8vIHgtYXhpc1xyXG4gICAgY29uc3Qgc2luQWxwaGEgPSBNYXRoLnNpbihhbHBoYSk7XHJcbiAgICBjb25zdCBjb3NBbHBoYSA9IE1hdGguY29zKGFscGhhKTtcclxuICAgIGNvbnN0IHNpbkJldGEgPSBNYXRoLnNpbihiZXRhKTtcclxuICAgIGNvbnN0IGNvc0JldGEgPSBNYXRoLmNvcyhiZXRhKTtcclxuICAgIGNvbnN0IHNpbkdhbW1hID0gTWF0aC5zaW4oZ2FtbWEpO1xyXG4gICAgY29uc3QgY29zR2FtbWEgPSBNYXRoLmNvcyhnYW1tYSk7XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgY29zQWxwaGEgKiBjb3NCZXRhLFxyXG4gICAgICBjb3NBbHBoYSAqIHNpbkJldGEgKiBzaW5HYW1tYSAtIHNpbkFscGhhICogY29zR2FtbWEsXHJcbiAgICAgIGNvc0FscGhhICogc2luQmV0YSAqIGNvc0dhbW1hICsgc2luQWxwaGEgKiBzaW5HYW1tYSxcclxuICAgICAgc2luQWxwaGEgKiBjb3NCZXRhLFxyXG4gICAgICBzaW5BbHBoYSAqIHNpbkJldGEgKiBzaW5HYW1tYSArIGNvc0FscGhhICogY29zR2FtbWEsXHJcbiAgICAgIHNpbkFscGhhICogc2luQmV0YSAqIGNvc0dhbW1hIC0gY29zQWxwaGEgKiBzaW5HYW1tYSxcclxuICAgICAgLXNpbkJldGEsXHJcbiAgICAgIGNvc0JldGEgKiBzaW5HYW1tYSxcclxuICAgICAgY29zQmV0YSAqIGNvc0dhbW1hLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25QbGF5ZXJSZWFkeSA9IChldmVudDogUGxheWVyRXZlbnQpID0+IHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgb25QbGF5ZXJBdWRpb0NoYW5nZWQgPSAoZXZlbnQ6IEF1ZGlvQ2hhbmdlZEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBpc09sZEF1ZGlvVHJhY2tBbWJpc29uaWMgPSBBbWJpc29uaWNzLmlzQW1iaXNvbmljVHJhY2soZXZlbnQuc291cmNlQXVkaW8pO1xyXG4gICAgY29uc3QgaXNOZXdBdWRpb1RyYWNrQW1iaXNvbmljID0gQW1iaXNvbmljcy5pc0FtYmlzb25pY1RyYWNrKGV2ZW50LnRhcmdldEF1ZGlvKTtcclxuXHJcbiAgICBpZiAoIWlzT2xkQXVkaW9UcmFja0FtYmlzb25pYyAmJiBpc05ld0F1ZGlvVHJhY2tBbWJpc29uaWMpIHtcclxuICAgICAgY29uc29sZS5kZWJ1ZygnQWN0aXZhdGVkIEFtYmlzb25pY3MgYXVkaW8nLCBldmVudC50YXJnZXRBdWRpbyk7XHJcbiAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICB9IGVsc2UgaWYgKGlzT2xkQXVkaW9UcmFja0FtYmlzb25pYyAmJiAhaXNOZXdBdWRpb1RyYWNrQW1iaXNvbmljKSB7XHJcbiAgICAgIGNvbnNvbGUuZGVidWcoJ0RlYWN0aXZhdGVkIEFtYmlzb25pY3MgYXVkaW8nLCBldmVudC50YXJnZXRBdWRpbyk7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgb25QbGF5ZXJWclZpZXdpbmdEaXJlY3Rpb25DaGFuZ2UgPSAoZXZlbnQ6IFZSVmlld2luZ0RpcmVjdGlvbkNoYW5nZUV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnVlJWaWV3aW5nRGlyZWN0aW9uQ2hhbmdlJywgZXZlbnQuZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gQW1iaXNvbmljcy5nZXRSb3RhdGlvbk1hdHJpeChldmVudC5kaXJlY3Rpb24sIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuaW1wbGVtZW50YXRpb24udXBkYXRlKHJvdGF0aW9uTWF0cml4KTtcclxuICB9O1xyXG59IiwiaW1wb3J0IHtBbWJpc29uaWNzSW1wbGVtZW50YXRpb259IGZyb20gJy4vQW1iaXNvbmljc0ltcGxlbWVudGF0aW9uJztcclxuaW1wb3J0IHtGT0FSZW5kZXJlciwgT21uaXRvbmV9IGZyb20gJ29tbml0b25lJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIEFtYmlzb25pYyBkZWNvZGluZyB3aXRoIE9tbml0b25lJ3MgRk9BUmVuZGVyZXJcclxuICogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9vbW5pdG9uZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9tbml0b25lRk9BUmVuZGVyZXJJbXBsZW1lbnRhdGlvbiBpbXBsZW1lbnRzIEFtYmlzb25pY3NJbXBsZW1lbnRhdGlvbiB7XHJcblxyXG4gIHByaXZhdGUgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgcHJpdmF0ZSBhdWRpb1NvdXJjZTogTWVkaWFFbGVtZW50QXVkaW9Tb3VyY2VOb2RlO1xyXG4gIHByaXZhdGUgZm9hUmVuZGVyZXI6IEZPQVJlbmRlcmVyO1xyXG5cclxuICBzdGFydChjb250ZXh0OiBBdWRpb0NvbnRleHQsIG1lZGlhRWxlbWVudDogSFRNTE1lZGlhRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShtZWRpYUVsZW1lbnQpO1xyXG5cclxuICAgIHRoaXMuZm9hUmVuZGVyZXIgPSBPbW5pdG9uZS5jcmVhdGVGT0FSZW5kZXJlcih0aGlzLmF1ZGlvQ29udGV4dCwge1xyXG4gICAgICBIUklSVXJsOiAnaHR0cHM6Ly9jZG4ucmF3Z2l0LmNvbS9Hb29nbGVDaHJvbWUvb21uaXRvbmUvOTYyMDg5Y2EvYnVpbGQvcmVzb3VyY2VzL3NoX2hyaXJfb18xLndhdicsXHJcbiAgICAgIC8vIFJlbWFwIGNoYW5uZWxzIGZyb20gRnVNYSBvcmRlcmluZyAoVyxYLFksWikgdG8gQUNOXHJcbiAgICAgIGNoYW5uZWxNYXA6IFswLCAzLCAxLCAyXSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmZvYVJlbmRlcmVyLmluaXRpYWxpemUoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZm9hUmVuZGVyZXIuaW5wdXQpO1xyXG4gICAgICB0aGlzLmZvYVJlbmRlcmVyLm91dHB1dC5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5hdWRpb1NvdXJjZS5kaXNjb25uZWN0KHRoaXMuZm9hUmVuZGVyZXIuaW5wdXQpO1xyXG4gICAgdGhpcy5mb2FSZW5kZXJlci5vdXRwdXQuZGlzY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb2FSZW5kZXJlci5zZXRSZW5kZXJpbmdNb2RlKCdhbWJpc29uaWMnKTtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmZvYVJlbmRlcmVyLnNldFJlbmRlcmluZ01vZGUoJ2J5cGFzcycpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHJvdGF0aW9uTWF0cml4OiBudW1iZXJbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5mb2FSZW5kZXJlci5zZXRSb3RhdGlvbk1hdHJpeChyb3RhdGlvbk1hdHJpeCk7XHJcbiAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nT21uaXRvbmUuZC50cycgLz5cclxuXHJcbmltcG9ydCB7QW1iaXNvbmljc30gZnJvbSAnLi9BbWJpc29uaWNzJztcclxuXHJcbi8vIEV4cG9ydCBBbWJpc29uaWNzIGludGVncmF0aW9uIHRvIGdsb2JhbCBuYW1lc3BhY2VcclxubGV0IHcgPSAod2luZG93IGFzIGFueSk7XHJcbncuYml0bW92aW4gPSB3LmJpdG1vdmluIHx8IHt9O1xyXG53LmJpdG1vdmluLnBsYXllciA9IHcuYml0bW92aW4ucGxheWVyIHx8IHt9O1xyXG53LmJpdG1vdmluLnBsYXllci52ciA9IHcuYml0bW92aW4ucGxheWVyLnZyIHx8IHt9O1xyXG53LmJpdG1vdmluLnBsYXllci52ci5BbWJpc29uaWNzID0gQW1iaXNvbmljcztcclxuIl19
