import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';
import { ConsultaPage } from '../consulta/consulta';
import { Internet } from '../../providers/internet/internet';
import { ApiCnpj } from '../../providers/api-cnpj/api-cnpj';
import { Empresa } from '../../interfaces/empresa';
import { HttpErrorResponse } from '@angular/common/http';
import { BancoDados } from '../../providers/banco-dados/banco-dados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //utilizando interface Empresa
  dadosEmpresa: Empresa;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private network: Internet,
              private apiCNPJ: ApiCnpj,
              private bancoDados: BancoDados) {
  }

  //função para buscar empresa de acordo com o CNPJ digitador
  buscarCNPJ(cnpj){
    //verifica se existe conexão com internet para buscar
    if(this.network.rede == true){
      //definindo carregamento e apresentando
      let loading = this.loadingCtrl.create({
        content: 'Buscando...'
      });

      loading.present();

      this.apiCNPJ.buscaEmpresa(cnpj)
        .subscribe(
          (res) => {
            this.dadosEmpresa = res;

            //desabilitando carregamento
            loading.dismiss();     

            //verifica dados recebidos
            if(this.dadosEmpresa.status == 'OK'){
              this.abrirDadosEmpresa(this.dadosEmpresa);
            }else{
              this.alertCtrl.create({
                title: this.dadosEmpresa.message,
                subTitle: 'Tente novamente!',
                buttons: [
                  { 
                    text: 'Ok',
                    handler: data => {
                      this.navCtrl.setRoot(HomePage);
                    }          
                  }
                ]
              }).present();
            }
              
          },
          (err: HttpErrorResponse) => {
            console.log(err);

            loading.dismiss();
          }
        );
    }else{
      this.alertCtrl.create({
        title: 'Não é possível buscar por CNPJ sem conexão com internet!',
        subTitle: 'Estabeleça uma conexão e tente novamente.',
        buttons: [
          { 
            text: 'Ok',
            handler: data => {
              this.navCtrl.setRoot(HomePage);
            }          
          }
        ]
      }).present();
    }
  }

  //função e opções para navegar até a página de Dados da Empresa buscada
  abrirDadosEmpresa(dados){
    dados.botaoSalvar = true;

    this.navCtrl.push(EmpresaPage.name, {
      dados: dados
    });
  }

  //função e opções para navegar até a página de Todas as empresas salvas
  consultarEmpresas(){
    this.bancoDados.buscaEmpresaSalva();
  }
}
