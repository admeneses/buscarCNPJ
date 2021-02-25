import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Internet {

  private _rede;

  constructor(private network: Network,
              public toastCtrl: ToastController,
              ) {
  }

  getConnection(){
    let type = this.network.type;

    //console.log("Connection type: ", this.network.type);
    // tenta e encontra o status da conexão do dispositivo
    if(type == "unknown" || type == "none" || type == undefined){
      console.log("Dispositivo Offline");
      this._rede = false;
    }else{
      console.log("Dispositivo Online!");
      this._rede = true;
    }
    
    // esperando uma desconexão
    this.network.onDisconnect().subscribe(async () => {
      this._rede = false;
      const toast = this.toastCtrl.create({
        message: 'Sem conexão com internet',
        duration: 2000
      });
      toast.present();

      console.log('Offilne ', this._rede);
    });

    // esperando uma conexão
    this.network.onConnect().subscribe(async () => {
      this._rede = true;

      const toast = this.toastCtrl.create({
        message: 'Conexão com internet estabelecida',
        duration: 2000
      });
      toast.present();

      setTimeout(() => {
        if (this.network.type === 'wifi') {
        //   console.log('conexão Wifi');
        }
      }, 3000);
    });
  }

  get rede(){
    return this._rede;
  }

}
