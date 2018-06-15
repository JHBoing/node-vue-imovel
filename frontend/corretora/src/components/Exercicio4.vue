<template>
    <div class="container">
        <div class="form-container">
            <form class="form-tag">
                <div class="form-group">
                    <label for="valorImovel">Valor imovel</label>
                    <input type="number" class="form-control" id="valorImovel"  placeholder="R$" v-model="form.valorImovel">
                    <span v-if='this.formErrors.valorImovel'>{{this.formErrors.valorImovel}}</span>
                </div>
                <div class="form-group">
                    <label for="salario">Salario</label>
                    <input type="number" class="form-control" id="salario" placeholder="%" v-model="form.salario">
                    <span v-if='this.formErrors.salario'>{{this.formErrors.salario}}</span>
                </div>
                <div class="form-group">
                    <label for="parcelas">N° de Parcelas</label>
                    <input type="number" class="form-control" id="parcelas" placeholder="N° de Parcelas" v-model="form.numeroParcelas">
                    <span>{{this.formErrors.numeroParcelas}}</span>
                </div>
                <div class="form-group">
                    <label for="dataInicio">Data de inicio</label>
                    <input type="text" class="form-contrl" id="dataInicio" placeholder="dd/mm/yyyy" v-model="form.dataInicio">
                    <span>{{this.formErrors.dataInicio}}</span>
                </div>
                <button type="submit" class="btn btn-success" v-on:click="enviarDados">Submit</button>
            </form>
        </div>
        <div v-if="carregando">
            Carregando...
        </div>
        <div v-if="erroServidor">
            {{this.mensagemErroServidor}}
        </div>
        <div v-if="recebido">
            <table class="table table-striped table-bordered">
                <thead>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Saldo devedor</th>
                    <th scope="col" class="text-center">Juros</th>
                    <th scope="col" class="text-center">Valor</th>
                </thead>
                <tbody>
                    <tr v-for="item in lista" :key="item.numero">
                        <th scope="row">{{item.numero}}</th>
                        <td>{{item.saldoDevedor}}</td>
                        <td>{{item.juros}}</td>
                        <td>{{item.valorParcela}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Exercicio4',
    data() {
        return {
            form: {
                valorImovel: null,
                taxa: '10',
                numeroParcelas: null,
                porcentagemEntrada: '20',
                salario: null,
                dataInicio: '',
            },
            lista: [],
            carregando: false,
            recebido: false,
            formErrors:[ {
                valorImovel: null,
                numeroParcelas: null,
                salario: null,
            }],
            erroServidor: false,
            mensagemErroServidor: null,
        }
    },
    methods: {
        enviarDados(e) {
            e.preventDefault();
            let form = this.form;            
            if ((this.form.numeroParcelas/12) > 45 ) {
                this.formErrors.numeroParcelas = "O numero de parcelas equivale a mais que 45 anos."
            } else {
                this.carregando = true;
                axios.post(
                    "http://localhost:8000/api/exercicio3",
                    form
                )
                .then((response) => {
                    this.carregando = false;
                    if (typeof response.data === 'string') {
                        this.mensagemErroServidor = response.data;
                        this.erroServidor = true;
                    } else {
                        this.erroServidor = false;
                        this.lista = response.data;
                        this.recebido = true;
                    }
                }, (error) => {
                    this.carregando = false;
                    console.log("erro");
                })
            }
        }
    }
}


</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .form-container {
        background: #35495E;
        margin: 10px auto;
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
    }

    .form-tag {
        padding: 30px 0 30px 0; 
        width: 80%;
    }

    .form-tag label {
        color: white;
    }

    .form-tag button {
        background: #41B883;
    }

    span {
        color: white;
    }
</style>
