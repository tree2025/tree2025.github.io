function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function generatePyramidMatrix(widthLimit) {
    pyramidMatrix = [];

    for (y=1; y < widthLimit; y += 2) {
        xPixels = [];
        whitePixelsLen = Math.floor((widthLimit - y) / 2);
        for (x = 0; x < widthLimit; x++) {
            if (whitePixelsLen <= x && x < (widthLimit - whitePixelsLen)) {
                if ((widthLimit - whitePixelsLen) % 2 == 1 && x % 2 == 1) {
                    xPixels[x] = 5;
                } else if (whitePixelsLen == x || x == (widthLimit - whitePixelsLen - 1)) {
                    xPixels[x] = 1;
                } else {
                    xPixels[x] = 2;
                }
                
            } else {
                xPixels[x] = 0;
            }
            
        }
        pyramidMatrix.push(xPixels)
    }
    return pyramidMatrix;
}

function generateRectangle(widthLimit, rectangle_width, height, color) {
    rectangle = [];

    for (y=0; y < height; y++) {
        xPixels = [];
        whitePixelsLen = Math.floor((widthLimit - rectangle_width) / 2);
        for (x = 0; x < widthLimit; x++) {
            if (whitePixelsLen <= x && x < (widthLimit - whitePixelsLen)) {
                xPixels[x] = color;
            } else {
                xPixels[x] = 0;
            }
            
        }
        rectangle.push(xPixels)
    }
    return rectangle;
}


function makeTree(pixel_canvas) {
    const canvas = document.getElementById(pixel_canvas);
    const ctx = canvas.getContext('2d');
    const pixelSize = Math.min(Math.floor((screen.width / 40) / 2) * 2, 16); 
    var pyramidesCount = getRndInteger(5, 9);
    var widthLimit = (Math.floor(getRndInteger(pyramidesCount * 3, pyramidesCount * 4) / 2) * 2) + 1;

    let pixelArt = [];

    m = generatePyramidMatrix(widthLimit);
    
    pixelArt = [];
    for (let n = 3; n <= pyramidesCount; n++) {
        pixelArt = pixelArt.concat(m.slice(((n > 3) ? Math.floor(widthLimit / 4) : 0), m.length - pyramidesCount + n));
    }
    pixelArt = pixelArt.concat(generateRectangle(widthLimit, 5, 2, 3));
    pixelArt = pixelArt.concat(generateRectangle(widthLimit, 7, 4, 4));

    ctx.canvas.width = pixelSize * widthLimit;
    ctx.canvas.height = pixelSize * pixelArt.length;

    // https://creativebooster.net/blogs/colors
    const lightsColors = ['#FF00FF', '#7AC74F', '#F5B700', '#00A1E4', '#DC0073', '#DE4D86', '#89FC00'];
    const needlesColors = ['#0A5C36', '#0F5132', '#14452F', '#18392B', '#1D2E28'];
    const stumpColors = ['#654B38', '#6B5B51'];
    const potColors = ['#FF946D','#FF7F50', '#FF8C28', '#FF9900', '#F77700'];
    const counturColor = '#202020';
    const voidColor = '#00000000';
	
    var lightsPixels = [];

    // Draw the pixel art
    for (let y = 0; y < pixelArt.length; y++) {
        for (let x = 0; x < pixelArt[y].length; x++) {
            pxl = pixelArt[y][x];
            switch(pxl) {
                case 0:
                    ctx.fillStyle = voidColor;
                    break;
                case 1:
                    ctx.fillStyle = counturColor;
                    break;
                case 2:
                    ctx.fillStyle = needlesColors[Math.floor(Math.random() * needlesColors.length)];
                    break;
                case 3:
                    ctx.fillStyle = stumpColors[Math.floor(Math.random() * stumpColors.length)];
                    break;
                case 4:
                    ctx.fillStyle = potColors[Math.floor(Math.random() * potColors.length)];
                    break;
                case 5:
                    lightsPixels.push([y, x]);
                    ctx.fillStyle = lightsColors[Math.floor(Math.random() * lightsColors.length)];
                    break;
                default:
                    ctx.fillStyle = pxl;
            }
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
    setInterval(function() { update_lights_pixels() }, 1000);
    function update_lights_pixels()
    {
       for (let z = 0; z < lightsPixels.length; z++) {
            ctx.fillStyle = lightsColors[Math.floor(Math.random() * lightsColors.length)];
            ctx.fillRect(lightsPixels[z][1] * pixelSize, lightsPixels[z][0] * pixelSize, pixelSize, pixelSize);
       }
    }
}

function createTree() {

    const canvas = document.createElement('canvas');
    canvas.id = 'christmasTree1';
	
	const treeContainer = document.getElementById('tree-container');
    treeContainer.appendChild(canvas);
    makeTree('christmasTree1');
}

function saveTree() {
    var link = document.createElement('a');
    link.download = 'tree.png';
    link.href = document.getElementById('christmasTree1').toDataURL()
    link.click();
    link.remove();
}

createTree();
