import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../../interfaces/empresa';


@Injectable()
export class ApiCnpj {

  //declarando minha URL global da API
  url: string = 'https://www.receitaws.com.br/v1/cnpj/';

  constructor(public http: HttpClient){
  }

  //função para receber as entradas e saídas do funcionário (Espelho Colaborador)
  buscaEmpresa(cnpj){
    return this.http.get<Empresa>(this.url + cnpj);
  }

}

    

