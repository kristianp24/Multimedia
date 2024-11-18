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

}