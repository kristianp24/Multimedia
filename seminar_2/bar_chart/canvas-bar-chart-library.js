class BarChart{

    /**
     * The canvas on which the bar chart will be displayed
     */
    #canvas  //motivul de # e pt ca asa se declara un atribut privat in javascript

    /**
     * Constructs a new instance
     * @param {HTMLCanvasElement} canvas   //ajuta la autocomplete pt JS
     */
    constructor(canvas){  //primim  c aparamentru canvas ul pe care o sa facem desenarea
        this.#canvas= canvas;
    }
 
    /**
     * Draws the bar chart
     * @param {Array<number>} values 
     */

    draw(values){
           const context = this.#canvas.getContext('2d');
           //metodele cu fill deseneaza forme pline, metodele stroke deseneaza doar conturul
           context.fillStyle = "#DEDEDE"  // rosu,verde,albastru
           context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

           // ... operatorul asta face conversia de la vector in valori separate, Spread syntax 
           const max = Math.max(...values)   //metoda nu poate lucra cu vector declarati intr o variabila
           const f = this.#canvas.height / max

           const barWidth = this.#canvas.width / values.length;

           context.fillStyle = 'red';// #FFrosu,verde, albastru
           for(let i = 0; i< values.length; i++){
               const barX = i * barWidth;
               const barHeight = values[i] * f;
               const barY = this.#canvas.height - barHeight;


               context.fillRect(barX, barY, barWidth/2, barHeight)
               context.strokeRect(barX,barY,barWidth/2,barHeight)
           }
    }
}