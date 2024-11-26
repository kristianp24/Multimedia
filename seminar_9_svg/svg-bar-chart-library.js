export class BarChart{
    

    #svg
    #svgNS
    /**
     * Creates a new bar cart
     * @param {HTMLDivElement} divElement 
     */
    constructor(divElement){
        // SPECIFICAM SI NAMESPACE UL IN CARE ESTE ACEST ELEMENT
        // crearea elementului svg
        this.#svgNS = "http://www.w3.org/2000/svg"
      this.#svg = document.createElementNS(this.#svgNS, 'svg');
      this.#svg.style.backgroundColor = 'WhiteSmoke';
      this.#svg.style.borderWidth = '1px'
      this.#svg.style.borderColor = 'black'
      this.#svg.style.borderStyle = 'solid'
      divElement.appendChild(this.#svg);
    }
    
    /**
     * 
     * @param {Array<Number>} values 
     */
    draw(values){
       const barWidth =this.#svg.clientWidth / values.length;

       for(let i = 0; i < values.length; i++){
          const bar = document.createElementNS(this.#svgNS, 'rect')
        //   bar.setAttribute('y', barY)
        //   bar.setAttribute('x', barX)
        //   bar.setAttribute('width', barWidth)
        //   bar.setAttribute('height', barHEIGHT)
       }
    }
}