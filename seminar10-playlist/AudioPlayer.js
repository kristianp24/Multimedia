export class AudioPlayer{
    #audio;
    #tracks;
    #ulTracks;

    constructor(){
        this.#audio = document.getElementById('audio');
        this.#ulTracks = document.getElementById('ul-tracks');

        const btnPlayPause = document.getElementById('btn-play-pause');
        btnPlayPause.addEventListener('click', ()=>{
            if(this.#audio.paused){
                if(this.#audio.src === '')
                    this.play(this.#tracks[0]);
                else
                    this.#audio.play();
            }
                
            else
                this.#audio.pause();
        })

        this.#audio.addEventListener('play', ()=>{
           btnPlayPause.children[0].classList.add('bi-pause-fill')
           btnPlayPause.children[0].classList.remove('bi-play-fill');
            
        })
        this.#audio.addEventListener('pause', ()=>{
           btnPlayPause.children[0].classList.replace('bi-pause-fill', 'bi-play-fill')
        })

        const spanDuration = document.getElementById('duration');
        
        const spanCurrentTime = document.getElementById('current-time');

        this.#audio.addEventListener('durationchange', ()=>{
            //spanDuration.textContent = this.#audio.duration;
            spanDuration.textContent = this.afisareMMss(this.#audio.duration)
        })
        this.#audio.addEventListener('timeupdate', ()=>{
            //spanCurrentTime.textContent = this.#audio.currentTime;
            spanCurrentTime.textContent = this.afisareMMss(this.#audio.currentTime)
        })

        //this.#audio.src ="media/Mozilla Firefox Test.ogg";
    }

    afisareMMss(duration){
       let min = Math.floor(duration / 60);
       let ss = Math.floor(duration % 60);
       return min.toString() +":"+ ss.toString();
    }

    /**
     * Changes the current tracks
     * @param {Array<object>} tracks 
     */
    loadTracks(tracks){
        this.#tracks = tracks;

        for(let i = 0; i < this.#tracks.length; i++){
            const track = this.#tracks[i];
            const li = document.createElement('li');
            li.textContent = track.title;
            li.dataset.url = track.url;
            li.addEventListener('click', () => {
                this.play(this.#tracks[i]);
            })
            li.classList.add('list-group-item');
            this.#ulTracks.appendChild(li);
        }
    }

    play(track){  
        const currentActiveLi = document.querySelector('[data-url].active');
        if(currentActiveLi != null)
            currentActiveLi.classList.remove('active');

        this.#audio.src = track.url;
        this.#audio.play();
        document.querySelector(`[data-url="${track.url}"]`).classList.add('active');
    }
}