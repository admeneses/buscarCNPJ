import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { CallNumber } from '@ionic-native/call-number';
import { SQLiteObject } from '@ionic-native/sqlite';
import { EmpresaPage } from '../empresa/empresa';
import { Empresa } from '../../interfaces/empresa';

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  public dados;
  public empresas = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {

                //receber dados da tela anterior
                this.dados = this.navParams.get('dados');
                for (var i = 0; i < this.dados.rows.length; i++) {
                  let values = this.dados.rows.item(i);
                  //salvando dados no Array para exibir
                  this.empresas.push({ abertura: values.abertura,
                                        bairro: values.bairro,
                                        cep: values.cep,
                                        cnpj: values.cnpj,
                                        complemento: values.complemento,
                                        email: values.email,
                                        fantasia: values.fantasia,
                                        logradouro: values.logradouro,
                                        municipio: values.municipio,
                                        natureza_juridica: values.natureza_juridica,
                                        nome: values.nome,
                                        numero: values.numero,
                                        porte: values.porte,
                                        situacao: values.situacao,
                                        telefone: values.telefone,
                                        tipo: values.tipo,
                                        uf: values.uf});
                }

  }

  //função e opções para navegar até a página de Dados da Empresa buscada
  abrirDadosEmpresa(empresa){
    empresa.botaoSalvar = false;

    this.navCtrl.push(EmpresaPage.name, {
      dados: empresa
    });
  }

}
