import { Injectable } from '@angular/core';
import { AlertController, App, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../../pages/home/home';
import { ConsultaPage } from '../../pages/consulta/consulta';


@Injectable()
export class BancoDados {

  constructor(public app: App,
              private sqlite: SQLite,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }
    
  //função para abrir o banco
  public getDB() {
  return this.sqlite.create({
      name: 'dbBuscaCNPJ',
      location: 'default'
  });
  }

  //função para criar o banco se não existir
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

      this.createTables(db);

      })
      .catch(e => console.log(e));
  }

  //função para criar tabelas
  private createTables(db: SQLiteObject) {

  db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS tbEmpresa (id INTEGER PRIMARY KEY AUTOINCREMENT, tipo TEXT, nome TEXT, uf TEXT, telefone TEXT, situacao TEXT, bairro TEXT, logradouro TEXT, numero INTEGER, cep TEXT, municipio TEXT, porte TEXT, abertura TEXT, natureza_juridica TEXT, fantasia TEXT, cnpj TEXT, complemento TEXT, email TEXT)']
  ])
      .then(() => console.log('tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  //função para salvar dados da Empresa ou atualizar, caso já esteja cadastrada
  salvarEmpresa(dados) {
    this.getDB()
      .then((db: SQLiteObject) => {

        let values = [dados.tipo, dados.nome, dados.uf, dados.telefone, dados.situacao, dados.bairro, dados.logradouro, dados.numero, dados.cep, dados.municipio, dados.porte, dados.abertura, dados.natureza_juridica, dados.fantasia, dados.cnpj, dados.complemento, dados.email];

        db.executeSql('SELECT * FROM tbEmpresa WHERE cnpj = "' + dados.cnpj + '"', [])
          .then((data: any) => {
            if (data.rows.length) {
              db.sqlBatch([
                ['UPDATE tbEmpresa SET tipo = "' + dados.tipo + '", nome = "' + dados.nome + '", uf = "' + dados.uf + '", telefone = "' + dados.telefone + '", situacao = "' + dados.situacao + '", bairro = "' + dados.bairro + '", logradouro = "' + dados.logradouro + '", numero = "' + dados.numero + '", cep = "' + dados.cep + '", municipio = "' + dados.municipio + '", porte = "' + dados.porte + '", abertura = "' + dados.abertura + '", natureza_juridica = "' + dados.natureza_juridica + '", fantasia = "' + dados.fantasia + '", complemento = "' + dados.complemento + '", email = "' + dados.email + '" WHERE cnpj = "' + dados.cnpj + '"']
              ])
                .then(() => {
                  this.alertCtrl.create({
                    title: 'Empresa atualizada no banco com sucesso!',
                    subTitle: 'Agora você pode consultar as empresas salvas sem internet!',
                    buttons: [
                      { 
                        text: 'Ok',
                        handler: data => {
                          let nav = this.app.getActiveNav();        
                          nav.setRoot(HomePage); 
                        }  
                      }
                    ]
                  }).present();
                })
                .catch(e => console.error('Erro ao atualizar Empresa no banco', e));
            } else {
              db.sqlBatch([
                ['INSERT OR REPLACE INTO tbEmpresa (tipo, nome, uf, telefone, situacao, bairro, logradouro, numero, cep, municipio, porte, abertura, natureza_juridica, fantasia, cnpj, complemento, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values]
              ])
                .then(() => {
                  this.alertCtrl.create({
                    title: 'Dados da Empresa incluídos com sucesso!',
                    subTitle: 'Agora você pode consultar as empresas salvas sem internet!',
                    buttons: [
                      { 
                        text: 'Ok',
                        handler: data => {
                          let nav = this.app.getActiveNav();        
                          nav.setRoot(HomePage); 
                        }  
                      }
                    ]
                  }).present();    
                })
                .catch(e => {
                  console.error('Erro ao incluir os dados da Empresa', e);
                });
            }
          }, err => {
            console.log('Error: ', err);
          });
      })
      .catch(e => console.log(e));
  }

  //função para buscar todas as empresas cadastradas
  buscaEmpresaSalva() {
    this.getDB()
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM tbEmpresa ORDER BY id', [])
          .then((data: any) => { 
            //definindo carregamento e apresentando
            let loading = this.loadingCtrl.create({
              content: 'Carregando...'
            });

            loading.present();

            //verifica se existe alguma empresa cadastrada, se sim envia os dados para a tela de Consulta
            if (data.rows.length > 0) {
              let nav = this.app.getActiveNav();        
              nav.push(ConsultaPage.name, {
                dados: data
              });

              //desabilita carregamento
              loading.dismiss();
            }else{
              //desabilita carregamento
              loading.dismiss();

              this.alertCtrl.create({
                title: 'Nenhuma Empresa salva!',
                subTitle: 'Busque uma empresa na tela principal por um CNPJ válido e tente novamente consultá-la.',
                buttons: [
                  { 
                    text: 'Ok',
                    handler: data => {
                      let nav = this.app.getActiveNav();        
                      nav.setRoot(HomePage); 
                    }  
                  }
                ]
              }).present();
            }
          }, err => {
            console.log('Error: ', err);
            this.alertCtrl.create({
                title: 'Nenhuma Empresa salva!',
                subTitle: 'Busque uma empresa na tela principal por um CNPJ válido. tente novamente consultá-la.',
                buttons: [
                  { text: 'Ok' }
                ]
              }).present();
          });
      })
      .catch(e => console.log(e));
    }
}