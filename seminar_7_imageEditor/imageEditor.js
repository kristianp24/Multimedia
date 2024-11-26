export class ImageEditor{
   
    #visibleCanvas
    #visibleCanvasContext
    #offscreenCanvas
    #offscreenCanvasContext
    #effect

    constructor(visibleCanvas){
        this.#visibleCanvas = visibleCanvas;
        this.#offscreenCanvas = document.createElement('canvas')

        this.#visibleCanvasContext = this.#visibleCanvas.getContext('2d')
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext('2d')

    }

     /**
      * Changes the current image
      * @param {HTMLImageElement} img 
      */


    changeImg(img){
         this.#offscreenCanvas.width = this.#visibleCanvas.width = img.naturalWidth
         this.#offscreenCanvas.height = this.#visibleCanvas.height =  img.naturalHeight
         this.#offscreenCanvasContext.drawImage(img, 0, 0);
         this.changeEffect('normal')
    }

    saveImg(){
        const dataurl = this.#visibleCanvas.toDataUrl('image/webp');
        const a = document.createElement('a')
        a.href = dataurl
        a.download = 'image.webp'
        a.click();
        }
    changeEffect(effect){
       if(this.#effect !== effect){
          this.#effect = effect;
          this.#drawImage();
       }
    }
    
    #drawImage(){
        switch(this.#effect){
            case 'normal':
               this.#normal();
               break;
            
           case 'GrayScale':
                this.#grayscale();
                break;

            case 'threshold':
                this.#threshold(128);
                break;
            case 'sepia':
                this.#sepia();
                break;
            case 'darker':
                this.#darker();
                break;
            case 'invert':
                this.#invert();
                break;
            case 'pixel':
                this.#drawPixelFrame(10);
                break;
        }
    }

    #normal(){
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
    }

    #grayscale(){
       const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
       const data = imageData.data
       // din 4 in 4 pt ca fiecare vector are 4 valori, rosu,alb, verde, transparenta
       for (let i = 0; i<data.length; i+=4){
          data[i] = data[i+1] = data[i+2] = Math.round((data[i]+data[i+1]+data[i+2])/3);
       }
       this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #threshold(prag){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data
        for (let i = 0; i<data.length; i+=4){
                      //          rosu                 verde              albastru
            var media = (0.2126 * data[i] + 0.7152 * data[i+1] + 0.0722 * data[i+2]);
            if (media < prag){
                data[i] = data[i+1] = data[i+2] = 0
            }
            else{
                data[i] = data[i+1] = data[i+2] = 255
            }
         }
         this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #sepia(){
        const imageData = this.#offscreenCanvasContext.getImageData(0,0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data  = imageData.data
        
        for (let i = 0; i < data.length; i+=4){
            const r = data[i];
            const g = data[i+1]
            const b = data[i+2]
            data [i] = (r * 0.393) + (g * 0.796) + (b * 0.189);
            data[i+1] = (r* 0.349) + (g * 0.686) + (b * 0.168);
            data[i+2] = (r * 0.272) + (g * 0.534) + (b* 0.131);
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #darker(){
        const imageData = this.#offscreenCanvasContext.getImageData(0,0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data  = imageData.data
        const adjustment = 20;
        for (let i = 0; i < data.length; i+=4){
            data[i] = data[i] > adjustment ? data[i] - adjustment : 0;
            data[i+1] = data[i+1] > adjustment ? data[i+1] - adjustment : 0;
            data[i+2] = data[i+2] > adjustment ? data[i+2] - adjustment : 0;

        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }
    
    #invert(){
        const imageData = this.#offscreenCanvasContext.getImageData(0,0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data  = imageData.data
        
        for (let i = 0; i < data.length; i+=4){
            const r = data[i];
            const g = data[i+1]
            const b = data[i+2]
            data [i] = 255-r;
            data[i+1] = 255-g;
            data[i+2] = 255-b;
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #drawPixelFrame(blocksize) {
		for(var x = 1; x < this.#offscreenCanvas.width; x += blocksize)

		{

			for(var y = 1; y < this.#offscreenCanvas.height; y += blocksize)

			{

				const imageData = this.#offscreenCanvasContext.getImageData(x, y, 1, 1)
                const data = imageData.data;

                const r = data[0]
                const g = data[1]
                const b = data[2]

                this.#visibleCanvasContext.fillStyle = "rgb("+r+","+g+","+b+")";
                this.#visibleCanvasContext.fillRect(x, y, blocksize, blocksize)

			}

            
		}

	}

}