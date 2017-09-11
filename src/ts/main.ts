/// <reference path='../../node_modules/bitmovin-player-ui/src/ts/player.d.ts' />

import {Ambisonics} from './Ambisonics';

// Export Ambisonics integration to global namespace
let w = (window as any);
w.bitmovin = w.bitmovin || {};
w.bitmovin.player = w.bitmovin.player || {};
w.bitmovin.player.vr = w.bitmovin.player.vr || {};
w.bitmovin.player.vr.Ambisonics = Ambisonics;
