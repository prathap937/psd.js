goog.provide('PSD.AdditionalLayerInfo.EffectsLayer.iglw');

goog.require('PSD.AdditionalLayerInfo.EffectsLayer');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo.EffectsLayer['iglw'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.size;
  /** @type {number} */
  this.version;
  /** @type {number} */
  this.blur;
  /** @type {number} */
  this.intensity;
  /** @type {Array} */
  this.color;
  /** @type {string} */
  this.signature;
  /** @type {string} */
  this.blend;
  /** @type {boolean} */
  this.enabled;
  /** @type {number} */
  this.opacity;
  /** @type {boolean} */
  this.invert;
  /** @type {Array} */
  this.nativeColor;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo.EffectsLayer['iglw'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.size = stream.readUint32();
  this.version = stream.readUint32();

  this.blur = stream.readInt32();
  this.intensity = stream.readInt32();

  stream.seek(2);
  this.color = [
    stream.readUint32(),
    stream.readUint32()
  ];

  this.signature = stream.readString(4);
  this.blend = stream.readString(4);
  this.enabled = !!stream.readUint8();
  this.opacity = stream.readUint8();

  // version 2 only
  if (this.version === 2) {
    this.invert = !!stream.readUint8();

    stream.seek(2);
    this.nativeColor = [
      stream.readUint32(),
      stream.readUint32()
    ];
  }

  this.length = stream.tell() - this.offset;
};

// end of scope
});
