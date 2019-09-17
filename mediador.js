'use-strict'

  /** 
   * La clase ---->>> TorreDeControl servirá como mediadora entre los aviones que Despegarán y los Que Aterrisaran.
   * Para eso existen dos canales de comunicación con la clase mediadora TorreDeControl:
   * Canal_A: Este canal de comunicación manejará todo los aviones que esten listo para Despegar
   * Canal_B: Este canal de comunicación manejará todo los aviones que esten listo para Aterrisar
   * Y Por ultimo la clase ---->>> Aviones que serán todos los aviones que se subscripbirán a la Torre de Control.
  */

  /**
   * `---->>> Eres libre de mejorar este codigo si lo deseas hacer. Gracias`
   */

  // Class TorreDeControl --------------------------------------------------------------------------------
  class TorreDeControl {
      constructor () {
        
        this._aviones = {
          canal_A: [],
          canal_B: []
        }

        this._canalDeCominicacion = [ 'canal_A', 'canal_B' ]
        this._avionesPorDespegar = []
        this._avionesPorAterrisar = []

      }
      
      // ------>>> Metodo pulico para hacer subscripciones de los objetos (Aviones)
      subscribeteIdentificate ( canalComunicacion, avionIdentificate ) {

          if ( canalComunicacion === this._canalDeCominicacion[ 0 ] ) {
          this._aviones.canal_A.push( avionIdentificate )
        }
        else {
          this._aviones.canal_B.push( avionIdentificate )
        } 
      }

      // ------->>> Metodo publico para cancelar subscripción de los (Aviones)
      cancelarSubscripcion( canalComunicacion, avionIdentificate ) {
        if ( canalComunicacion === this._canalDeCominicacion [ 0 ]) {

          this._aviones.canal_A = this._aviones.canal_A.filter( _avion => {
            return _avion !== avionIdentificate
          } )

        }
        else {

          this._aviones.canal_B = this._aviones.canal_B.filter( _avion => {
            return _avion !== avionObjeto
          } )

        }

      }

      // ----->>> Metodo publico permite establecer comunicación con el avion
      comunicacionAvionATorreDeControl ( canalComunicacion, avionIdentificacion ) {
        let _arrayAvion = []
        if ( canalComunicacion === this._canalDeCominicacion[ 0 ] ) {
          avionIdentificacion.avion._avionPorDespegar( _arrayAvion, avionIdentificacion ) 
        }
        else {
          avionIdentificacion.avion._avionPorAterrisar( _arrayAvion, avionIdentificacion )
        }

      }

  }
  // Final clase TorreDeControl ---------------------------------------------------------------
  


  // Clase Aviones  ----------------------------------------------------------------------------
  class Aviones {

    constructor ( configuracion ) {

      this._configuracion = configuracion || {
        nombrePiloto: null,
        Apellido: null,
        haerolinia: null,
        torreDeControl: null,
        canalDeComunicacionAvion: null,
        horaDeSalidad: null
      }

      this._respuestaTorreDeControl = {
        avion: null,
        nombreAvionPilotoVuelo: null,
        mensajeDelPilotoTorreDeControl: null,
        mensajeDeConfirmacionPiloto: null,

      }

      this._buzonDeMensajesRespondidoDeLosAvionesContactado = []
      //----------------------------------------------------------------------------------------------------------------

      // ------->>> Metodo privado, revela la comunicacion entre la torre de control de los aviones en tierra
        this._mensajeAvionPorDespegar = ( _avionPorDespegar, avionesIdentificacion ) => {

          if ( this._configuracion.torreDeControl._avionesPorDespegar.length === 0 ) {

           this._configuracion.torreDeControl._avionesPorDespegar.push( avionesIdentificacion )

            avionesIdentificacion = {

              nombreAvionPilotoVuelo: _avionPorDespegar[ 0 ].nombreAvionPilotoVuelo,
              mensajeDelPilotoTorreDeControl: 'Ok',
              mensajeDeConfirmacionPiloto: _avionPorDespegar[ 0 ].mensajeDeConfirmacionPiloto,

            }

            console.log( avionesIdentificacion )

          } 
          else {
            let mensaje = {
              mensajeDeConfirmacionPiloto: avionesIdentificacion.mensajeDeConfirmacionPiloto
            }
            console.log( mensaje )
            this._configuracion.torreDeControl._avionesPorDespegar.pop()
            
          }

        }

        // ------->>> Metodo priado, revela la comunicacion entre la torre de control de los aviones en el aire
        this._mensajeAvionPorAterrisar = ( _avionPorAterrisar, avionesIdentificacion ) => {

          if ( this._configuracion.torreDeControl._avionesPorDespegar.length === 0 ) {

            if ( this._configuracion.torreDeControl._avionesPorAterrisar.length === 0 ) {

              this._configuracion.torreDeControl._avionesPorAterrisar.push(avionesIdentificacion)
              avionesIdentificacion = {

                nombreAvionPilotoVuelo: _avionPorAterrisar[0].nombreAvionPilotoVuelo,
                mensajeDelPilotoTorreDeControl: 'Ok',
                mensajeDeConfirmacionPiloto: _avionPorAterrisar[0].mensajeDeConfirmacionPiloto,

              }

              console.log( avionesIdentificacion )

            } 
            else {
              let mensaje = {
                mensajeDeConfirmacionPiloto: avionesIdentificacion.mensajeDeConfirmacionPiloto
              }
              console.log( mensaje )
              this._configuracion.torreDeControl._avionesPorAterrisar.pop()
      
            }

          } 
          else {
            console.log( 'Espera la pista no ha sido despejada' )
          }

        }

        // ------>>>> Metodo priado, Parecidos a los anteriores solo que a qui llamamos al metodo (_mensajeAvionPorDespegar)
        this._avionPorDespegar = ( _arrayAvion, avionesIdentificacion ) => {
    
          _arrayAvion = this._configuracion.torreDeControl._aviones.canal_A.filter( _avion => {
            return _avion === avionesIdentificacion.avion
          } )

          if ( _arrayAvion.length > 0 ) {
            this._mensajeAvionPorDespegar( this._configuracion.torreDeControl._avionesPorDespegar, avionesIdentificacion )
          }
           else {
            console.log( 'Debes indentificarte primero para establecer comunicación con la Torre de control' )
          }

        }

        // ----->>> Metodo priado, Parecidos a los anteriores solo que a qui llamamos al metodo(_mensajeAvionPorAterrisar)
        this._avionPorAterrisar = ( _arrayAvion, avionesIdentificacion ) => {

          _arrayAvion = this._configuracion.torreDeControl._aviones.canal_B.filter( _avion => {
            return _avion === avionesIdentificacion.avion
          } )

          if ( _arrayAvion.length > 0 ) {
            this._mensajeAvionPorAterrisar( this._configuracion.torreDeControl._avionesPorAterrisar, avionesIdentificacion )
          } 
          else {
            console.log( 'Debes indentificarte primero para establecer comunicación con la Torre de control' )
          }

        }

    }
    //------------------------------------------------------------------------------------------------------------------------


    // ------->>> Metodo publico, este metodo permite establecer la comunicación con la torre de control
    comunicacionAvionATorreDeControl ( canalDecomunicacion, mensajeAvion ) {
   
      this._respuestaTorreDeControl = {
        avion: this,
        nombreAvionPilotoVuelo: this._configuracion.nombrePiloto,
        mensajeDelPilotoTorreDeControl: null,
        mensajeDeConfirmacionPiloto: mensajeAvion

      }
      
      this._configuracion.torreDeControl
      .comunicacionAvionATorreDeControl( canalDecomunicacion, this._respuestaTorreDeControl )

    }

  }
  // Final clase Aviones --------------------------------------------------------------------------------

  // Configuracion TorreDeControl instanciando --------------------------------------------------------------
  let torreDeControl = new TorreDeControl()

  //--------------------------------------------------------------------------------------------------------


  // Confiuracion aviones instanciando ----------------------------------------------------------------------
  let avion = new Aviones( {
    nombrePiloto: 'Andres',
    Apellido: 'Gutierrez Salazar',
    haerolinia: 'Avianca',
    torreDeControl,
    canalDeComunicacionAvion: 'canal_A',
    horaDeSalidad: '00:30pm. horas'
  })

  let avionDos = new Aviones( {
    nombrePiloto: 'Camilo',
    Apellido: 'Gutierrez Salazar',
    haerolinia: 'Avianca',
    torreDeControl,
    canalDeComunicacionAvion: 'canal_B',
    horaDeLlega: '01:30pm. horas'
  } )

  // ------>>>> Prueva en consola y conozca lo que sucede
  torreDeControl.subscribeteIdentificate( avion._configuracion.canalDeComunicacionAvion, avion )
  torreDeControl.subscribeteIdentificate( avionDos._configuracion.canalDeComunicacionAvion, avionDos )
  avion.comunicacionAvionATorreDeControl( 'canal_A' , 'Estoy listo para despegar...' )
  avion.comunicacionAvionATorreDeControl( 'canal_A', 'Hemos despegado gracias.' )
  avionDos.comunicacionAvionATorreDeControl('canal_B', 'Estoy listo para aterrisar...')
  avionDos.comunicacionAvionATorreDeControl( 'canal_B', 'Ya hemos aterrisado' )