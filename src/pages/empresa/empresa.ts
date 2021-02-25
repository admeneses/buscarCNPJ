import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { CallNumber } from '@ionic-native/call-number';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancoDados } from '../../providers/banco-dados/banco-dados';
import { Empresa } from '../../interfaces/empresa';

@IonicPage()
@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html',
})
export class EmpresaPage {
  //veriável global para armazenar dados da empresa buscada
  public dados: Empresa;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bancoDados: BancoDados) {
              
              //receber dados da tela anterior
              this.dados = this.navParams.get('dados');
  }

  //função para salvar dados da empresa no SQLite
  salvar(){
    this.bancoDados.salvarEmpresa(this.dados);
  }
}
