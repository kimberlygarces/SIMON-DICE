            
            
            const btnEmpezar = document.getElementById('btnEmpezar')
            const overlay = document.getElementById('overlay')
            const gameboard = document.getElementById('gameboard')
            const celeste = document.getElementById('celeste')
            const violeta = document.getElementById('violeta')
            const naranja = document.getElementById('naranja')
            const verde = document.getElementById('verde')
            const puntaje = document.getElementById('puntos')
            const ULTIMO_NIVEL = 10

            class Juego {

                constructor() {
                    this.inicializar = this.inicializar.bind(this)
                    this.inicializar()
                    this.generarSecuencia()
                    setTimeout(() => this.siguienteNivel(), 500);

                }

                inicializar() {
                    // btnEmpezar.classList.add('hide')
                    this.siguienteNivel = this.siguienteNivel.bind(this)
                    this.elegirColor = this.elegirColor.bind(this)
                    this.cambiarNivel = this.cambiarNivel.bind(this)
                    this._this = this
                    this.toggleBtnEmpezar()
                    this.nivel = 1
                    this.puntos = 0
                    this.colores = {
                        celeste,
                        violeta,
                        naranja,
                        verde
                    }

                }

               toggleBtnEmpezar(){

                if(btnEmpezar.classList.contains('hide')){
                    btnEmpezar.classList.remove('hide')
                }else{
                    btnEmpezar.classList.add('hide')
                }
               }

                generarSecuencia() {
                    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
                }

                siguienteNivel() {

                    if (this.nivel === 1) this.cambiarNivel()
                    
                    else swal(`Nivel ${this.nivel - 1} superado`,`puntos: ${this.puntos}`, 'success')
                            .then(this.cambiarNivel)
                }

                cambiarNivel()
                {
                    this.subnivel = 0
                    this.iluminarSecuencia()
                    this.agregarEventoClick()
                }

                transformarNumeroAColor(numero) {
                    switch (numero) {
                        case 0:
                            return 'celeste'
                        case 1:
                            return 'violeta'
                        case 2:
                            return 'naranja'
                        case 3:
                            return 'verde'
                    }
                }

                transformarColorANumero(color) {
                    switch (color) {
                        case 'celeste':
                            return 0
                        case 'violeta':
                            return 1
                        case 'naranja':
                            return 2
                        case 'verde':
                            return 3
                    }
                }

                iluminarSecuencia() {
                    for (let i = 0; i < this.nivel; i++) {
                        let color = this.transformarNumeroAColor(this.secuencia[i])
                        setTimeout(() => this.iluminarColor(color), 1200 * i);
                    }
                }

                iluminarColor(color) {  
                    
                    this.colores[color].classList.add('light')
                    setTimeout(() => this.apagarColor(color), 350); 
                
                
                }

                apagarColor(color) {
                    this.colores[color].classList.remove('light')
                }

                agregarEventoClick() {
                    this.colores.celeste.addEventListener('click', this.elegirColor)
                    this.colores.verde.addEventListener('click', this.elegirColor)
                    this.colores.naranja.addEventListener('click', this.elegirColor)
                    this.colores.violeta.addEventListener('click', this.elegirColor)
                }

                eliminarEventoClick() {
                    this.colores.celeste.removeEventListener('click', this.elegirColor)
                    this.colores.verde.removeEventListener('click', this.elegirColor)
                    this.colores.naranja.removeEventListener('click', this.elegirColor)
                    this.colores.violeta.removeEventListener('click', this.elegirColor)
                }

                elegirColor(ev) {
                    const nombreColor = ev.target.dataset.color
                    const numeroColor = this.transformarColorANumero(nombreColor)
                    this.iluminarColor(nombreColor)
                    if (numeroColor === this.secuencia[this.subnivel]) {
                        this.subnivel++
                            this.puntos++
                            if (this.subnivel === this.nivel) {
                                this.nivel++
                                    this.eliminarEventoClick()
                                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                                    this.ganoElJuego()
                                } else {
                                    setTimeout(() => this.siguienteNivel(), 500);
                                }
                            }
                    } else {
                        this.perdioElJuego()
                    }
                }

                ganoElJuego() {
                    swal('Felicitaciones', `Obtuviste ${this.puntos} puntos`, 'success')
                        .then(this.inicializar)
                }

                perdioElJuego() {
                  
                        swal(':( Perdisite!!', `Obtuviste ${this.puntos} puntos`, 'error')
                            .then(() => {
                                this.eliminarEventoClick()
                                this.inicializar()
                            })
                    }
                    
                
                
            }


            function empezarJuego() {
                window.juego = new Juego()
            }
//Codigo para reproducir sonidos en js.. Función sonar y apagar

            window.addEventListener("load",function(){
                document.getElementById("celeste").addEventListener("click",sonarAudio);
                document.getElementById("violeta").addEventListener("click",sonarAudio);
                document.getElementById("naranja").addEventListener("click",sonarAudio);
                document.getElementById("verde").addEventListener("click",sonarAudio);
                document.getElementById("stop").addEventListener("click",callarAudio);			
            });
            
            function sonarAudio(){
                var sonido = document.createElement("iframe");
                sonido.setAttribute("src","audio/bajo1.mp3");
                document.body.appendChild(sonido);
                document.getElementById("btnEmpezar").removeEventListener("click",sonarAudio);
                inicializar()
            }
            
            function callarAudio(){
                var iframe = document.getElementsByTagName("iframe");
            
                if (iframe.length > 0){
                    iframe[0].parentNode.removeChild(iframe[0]);
                    document.getElementById("play").addEventListener("click",sonarAudio);
                }
            }