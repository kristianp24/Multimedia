class Chart{
   #canvas
   #context

   /**
    * 
    * @param {HTMLCanvasElement} canvas 
    */
   constructor(canvas){
    this.#canvas =canvas
   }

   /**
    * 
    * @param {Array<Number>} values 
    */
    

   setContext(){
    //luam contextul
    this.#context = this.#canvas.getContext('2d')

    //cream rect
    this.#context.fillStyle = 'grey'
    this.#context.fillRect(0,0,this.#canvas.width,this.#canvas.height)
   }

   draw(values){
         this.#context.clearRect(0,0,this.#canvas.width,this.#canvas.height)
        this.setContext()
  
    //gasim  max din vector
    const maxVal = Math.max(...values)

    //gasim o const astfel incat orice coloana sa fie < decat max
    const aux = this.#canvas.height / maxVal

    //gasim o alta constanta pt width
    const colomunsWidth = this.#canvas.width / values.length

    this.#context.fillStyle = 'blue'
    
    for(let i = 0;i<values.length;i++){
        const X =  colomunsWidth*i
        const barHeight = values[i] * aux
        const Y = this.#canvas.height - barHeight

        this.#context.fillRect(X,Y,colomunsWidth / 2,barHeight)
        this.#context.strokeRect(X,Y,colomunsWidth / 2,barHeight)

    }
    
   }
   




}