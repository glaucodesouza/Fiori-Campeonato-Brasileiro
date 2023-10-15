sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {

                /* comentado 
                // porque era para o modelo local... 

                // vamos criar um modelo
                //antes, as variaveis que vao dentro do modelo
                var dadosGerais = {
                    rodada: '89a',
                    campeonato: "Brasileirão 2023 Fiorinet (lido do Model local)"
                }; */

                //agora sim, vamos criar o modelo
                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                var view = this.getView(); //mesma coisa q usar Controller.getView();
                view.setModel(dadosModel, "ModeloDadosGerais");
                

                //------------------------------------
                //AULA BRASILEIRAO - INICIO DO VIDEO 3
                //------------------------------------
                //variaveis para os 3 novos modelos
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                //modelos - 1 para cada objeto
                //variavel denrto do parentesis, substitui o comando setData
                var dadosModel = new JSONModel(dadosGerais);
                var classificacaoModel = new JSONModel(classificacao);
                var partidasModel = new JSONModel(partidas);

                //atribuimo  3 modelos a tela (view)
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                this.buscarDadosGerais();
                this.buscarClassificacao();


            },
            buscarDadosGerais: function () {
                //obter o model a ser atualizado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

                //configuracoes igual do nosso teste no postman
                // url: preencher com a url da API externa
                // method: preencher com o tipo do metodo de busca dos dados,
                // async: preencher verdadeiro ou falso
                // crossDomain: preencher se a api tem um URL diferente do seu app,
                // headers: e onde tem as suas autorizacoes de autenticacao da API
                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_c01acd31e279debe09670e938d2cb1"
                    }
                };

                //fazemos a chamada da API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta) {
                    // debugger;
                    dadosModel2.setData(resposta);
                    this.buscarPartidas(resposta.rodada_atual.rodada);
                    //IMPORTANTE
                    //.bind(this) serve para a função atual
                    // reconhecer as funções globais no nível acima daqui.
                    //OBS.: SEM ISSO, não será reconhecida a função this.buscarPartidas().
                }.bind(this)) 

                //erro
                .fail(function(erro){
                    // debugger;
                })

                ;

            },
            buscarClassificacao: function () {
                //obter o model a ser atualizado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

                //configuracoes igual do nosso teste no postman
                // url: preencher com a url da API externa
                // method: preencher com o tipo do metodo de busca dos dados,
                // async: preencher verdadeiro ou falso
                // crossDomain: preencher se a api tem um URL diferente do seu app,
                // headers: e onde tem as suas autorizacoes de autenticacao da API
                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_c01acd31e279debe09670e938d2cb1"
                    }
                };

                //fazemos a chamada da API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta) {
                    // debugger;
                    classificacaoModel2.setData({"Classificacao" : resposta});
                })

                //erro
                .fail(function(erro){
                    // debugger;
                })

                ;

            },
            buscarPartidas: function (rodada) {
                //obter o model a ser atualizado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");

                //configuracoes igual do nosso teste no postman
                // url: preencher com a url da API externa
                // method: preencher com o tipo do metodo de busca dos dados,
                // async: preencher verdadeiro ou falso
                // crossDomain: preencher se a api tem um URL diferente do seu app,
                // headers: e onde tem as suas autorizacoes de autenticacao da API
                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_c01acd31e279debe09670e938d2cb1"
                    }
                };

                //fazemos a chamada da API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta) {
                    // debugger;
                    partidasModel2.setData(resposta);
                })

                //erro
                .fail(function(erro){
                    // debugger;
                })

                ;

            }
        });
    });
