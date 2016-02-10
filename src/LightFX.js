function LightFX() {
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.tempCanvas = undefined;
  this.imageData = undefined;
  this.cachedImageData = undefined;
}

LightFX.prototype.createCanvas = function(width, height, imageData, ox, oy) {
  var data,
      canvas,
      ctx;
  if (imageData !== undefined) {
    data = imageData.data || imageData;
  }
  canvas = document.createElement("canvas");
  ctx    = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imageData, ox, oy);
  this.canvas = canvas;
  this.ctx = ctx;
};

LightFX.prototype.replaceCanvas = function(foreignCanvas) {
  this.canvas = foreignCanvas;
  this.ctx = foreignCanvas.getContext("2d");
};

LightFX.prototype.resize = function(width, height) {
  this.canvas.width = width;
  this.canvas.heght = height;
};

LightFX.prototype.resizeTo = function(element) {
  this.canvas.width = element.offsetWidth || element.naturalWidth;
  this.canvas.height = element.offsetHeight || element.naturalHeight;
  console.log(element.offsetWidth, element.naturalWidth);
};

LightFX.prototype.styleAsBackground = function(parent, image) {
  this.canvas.style.position = "absolute";
  this.canvas.style.top = "0";
  this.canvas.style.left = "0";
  this.resizeTo(parent);
  parent.insertBefore(this.canvas, parent.firstChild);
  this.drawCover(image);
};

LightFX.prototype.createCanvasAndResizeTo = function(imageData, ox, oy) {
  var canvasParent = this.canvas.parentNode,
      canvasParentDims = { width  : canvasParent.offsetWidth
                         , height : canvasParent.offsetHeight };
  createCanvas(canvasParentDims.width
              ,canvasParentDims.height
              ,imageData
              ,ox
              ,oy);
};

LightFX.prototype.putImageData = function(imageData, x, y) {
  this.ctx.putImageData(imageData, x, y);
  this.imageData = imageData;
};

LightFX.prototype.cacheImageData = function() {
  // Breaking change: cache was originally sent to
  // this.imageData, but I'm going to deprecate that
  // property entirely because it's stupid
  this.cachedImageData = this.ctx.getImageData(0
                                              ,0
                                              ,this.canvas.width
                                              ,this.canvas.height);
};

LightFX.prototype.getImageData = function() {
  return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.drawImage = function(image, x, y) {
  this.ctx.drawImage(image, x, y);
  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.draw = function(image) {
  this.ctx.drawImage(image, 0, 0);
  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.getDimensions = function(element) {
  if (element.nodeName === "IMG") {
    return {width  : element.naturalWidth
           ,height : element.naturalHeight};
  }
  if (element.nodeName === "CANVAS") {
    return {width  : element.width
           ,height : element.height};
  }
};

LightFX.prototype.getAspectRatio = function(element) {
  dims = this.getDimensions(element);
  return dims.width / dims.height;
};

// Methods prefixed with an underscore are loosely coupled and preserved
// in the case that they may need to be called elsewhere. The canvas is
// therefore parameterized here, and passed in by the public drawCover 
// API
LightFX.prototype._drawCover = function(canvas, image) {
  var ctx          = canvas.getContext("2d"),
      canvasDims   = this.getDimensions(canvas),
      imageDims    = this.getDimensions(image),
      aspectCanvas = this.getAspectRatio(canvas),
      aspectImage  = this.getAspectRatio(image),
      offset,
      scaledWidth;
  if ( aspectImage > aspectCanvas) {
    scaledWidth = (imgDims.width * ( canvasDims.height / imgDims.height));
    offset      = (canvasDims.width - scaledWidth) / 2;
    ctx.drawImage( img, offset, 0, scaledWidth, canvasDims.height );
  } else if ( aspectImage < aspectCanvas ) {
    scaledHeight = (imgDims.height * (canvasDims.width / imgDims.width));
    offset       = (canvasDims.height - scaledHeight) / 2;
    ctx.drawImage(image, 0, offset, canvasDims.width, scaledHeight);
  } else {
    ctx.drawImage(image, 0, 0, canvasDims.width, canvasDims.height);
  }
};

LightFX.prototype.drawCover = function(image) {
  this._drawCover(this.canvas, image);
  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

LightFX.prototype.createRoundedRect = function(ctx, x, y, width, height, radius) {
  var tlh = { x : x + radius, y : y + radius },
      trh = { x : x + width - radius, y : y + radius },
      brh = { x : x + width - radius, y : y + height - radius },
      blh = { x : x + radius, y : y + height - radius };
  ctx.save();
  ctx.beginPath();
  ctx.moveTo( tlh.x, y );
  ctx.lineTo( trh.x, y );
  ctx.arc( trh.x, trh.y, radius, Math.PI * 1.5, 0 );
  ctx.lineTo( x + width, brh.y );
  ctx.arc( brh.x, brh.y, radius, 0, Math.PI * 0.5 );
  ctx.lineTo( blh.x, y + height );
  ctx.arc( blh.x, blh.y, radius, Math.PI * 0.5, Math.PI );
  ctx.lineTo( x, trh.y );
  ctx.arc( tlh.x, tlh.y, radius, Math.PI, Math.PI * 1.5 );
  ctx.closePath();
};

LightFX.prototype.saturateP = function(imageData, satVal, width, height) {
  var data;
  data = imageData.data || imageData;
  var area;
  var lumR = (1 - satVal) * 0.3,
      lumG = (1 - satVal) * 0.6,
      lumB = (1 - satVal) * 0.1;
  var r, g, b;
  // A marginal performance increase exists if the
  // height and width values are passed in directly
  if ( width === undefined && height === undefined ) {
    area = data.length / 4;
  } else {
    area = width * height;
  }

  for (var i = 0; i < area; i++) {
    var j = i << 2;
    r = data[j];
    g = data[j + 1];
    b = data[j + 2];
    data[j] = ((lumR + satVal) * r) + (lumG * g) + (lumB * b);
    data[j + 1] = (lumR * r) + ((lumG + satVal) * g) + (lumB * b);
    data[j + 2] = (lumR * r) + (lumG * g) + ((lumB + satVal) * b);
  }
  return imageData;
};

LightFX.prototype.saturate = function(satVal, width, height) {
  var id = this.saturateP(this.imageData, satVal, width, height);
  this.ctx.putImageData(id, 0, 0);
};

LightFX.prototype._contrast = function(imageData, contrast) {
  var data = imageData.data;
  var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for(var i=0;i<data.length;i+=4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i+1] = factor * (data[i+1] - 128) + 128;
    data[i+2] = factor * (data[i+2] - 128) + 128;
  }
  return imageData;
};

LightFX.prototype.contrast = function(contrastVal) {
  var id = this._contrast(this.getImageData(), contrastVal);
  this.ctx.putImageData(id, 0, 0);
};

LightFX.prototype.blur = function(blurtype, radius) {
  var canvas = this.canvas;
  if (blurtype === "stackblur") {
    var imda = stackBlurCanvasRGB(canvas, 0, 0, canvas.width, canvas.height, radius);
    this.ctx.putImageData(imda.id, 0, 0);
  }
};

LightFX.prototype._lightness = function(imageData, lightnessVal) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] += lightnessVal;
    data[i+1] += lightnessVal;
    data[i+2] += lightnessVal;
  }
  return imageData;
};

LightFX.prototype.lightness = function(lightnessVal) {
  var id = this._lightness(this.imageData,lightnessVal);
  this.ctx.putImageData(id, 0, 0);
};

LightFX.prototype._createBlurStack = function() {
  if ( blurMethod === "stackblur" ) {
    var scaledCanvas = new EasyCanvas(),
        stack = [ clone ];
    scaledCanvas.canvas.width = this.canvas.width / 8 | 0;
    scaledCanvas.canvas.height = this.canvas.height / 8 | 0;
    scaledCanvas.ctx.drawImage( this.canvas,
                                0,
                                0,
                                scaledCanvas.canvas.width,
                                scaledCanvas.canvas.height );
    scaledCanvas.cacheImageData();

    // Why 6? It just seems to look nice.
    for ( i = 1; i < 6; i ++ ) {
        var iterationRadius;
        if (((radius / 8 | 0) / 6) * i < 1) {
          iterationRadius = 1;  
        } else {
          iterationRadius = ((radius / 8) / 6) * i;
        }

        var blurryImageData = stackBlurCanvasRGB( scaledCanvas.canvas, 
                                                  0,
                                                  0,
                                                  scaledCanvas.canvas.width,
                                                  scaledCanvas.canvas.height,
                                                  iterationRadius ).id;
        stack[i]        = new EasyCanvas();
        stack[i].width  = scaledCanvas.canvas.width;
        stack[i].height = scaledCanvas.canvas.height;
        stack[i].ctx.putImageData( blurryImageData, 0, 0 );
        stack[i].cacheImageData();
        stack[i].blurLayerId = i;
    }
    blurStack = stack;
  }
};

LightFX.prototype._quickblur = function(canvas) {
};

LightFX.prototype._createBlurStack$ = function() {
};

LightFX.prototype.createBlurStack = function() {
};
