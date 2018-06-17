<template>
    <div>
        <div v-if="!auth">
            <Login v-on:handleAuth="handleAuth" v-on:handleCarregando="handleCarregando" />
            <Cadastro v-on:handleAuth="handleAuth" v-on:handleCarregando="handleCarregando" />
        </div>
        <div class="container" v-if="auth">
            <h2> Bem vindo {{user.nome}} </h2>
            <div class="form-container">
                <form class="form-tag">
                    <div class="form-group">
                        <label for="valorImovel">Valor imovel</label>
                        <input type="number" class="form-control" id="valorImovel"  placeholder="R$" v-model="form.valorImovel">
                    </div>
                    <div class="form-group">
                        <label for="taxa">Taxa</label>
                        <input type="number" class="form-control" id="taxa" placeholder="%" v-model="form.taxa">
                    </div>
                    <div class="form-group">
                        <label for="parcelas">N° de Parcelas</label>
                        <input type="number" class="form-control" id="parcelas" placeholder="N° de Parcelas" v-model="form.numeroParcelas">
                    </div>
                    <div class="form-group">
                        <label for="parcelas">% de Entrada</label>
                        <input type="number" class="form-control" id="parcelas" placeholder="% de entrada" v-model="form.porcentagemEntrada">
                    </div>
                    <div class="form-group">
                        <label for="salario">Salario</label>
                        <input type="number" class="form-control" id="salario" placeholder="%" v-model="form.salario">
                    </div>
                    <div class="form-group">
                        <label for="dataInicio">Data de inicio</label>
                        <input type="text" class="form-control" id="dataInicio" placeholder="dd/mm/yyyy" v-model="form.dataInicio">
                    </div>
                    <button type="submit" class="btn btn-success" v-on:click="enviarDados">Submit</button>
                </form>
            </div>
            <div v-if="recebido">
                <table class="table table-striped table-bordered">
                    <thead>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col" class="text-center">Saldo devedor</th>
                        <th scope="col" class="text-center">Juros</th>
                        <th scope="col" class="text-center">Valor</th>
                        <th scope="col" class="text-center">Data de vencimento</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in lista" :key="item.numero">
                            <th scope="row">{{item.numero}}</th>
                            <td>{{item.saldoDevedor}}</td>
                            <td>{{item.juros}}</td>
                            <td>{{item.valorParcela}}</td>
                            <td>{{item.dataParcela}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Cadastro from './auth-components/Cadastro';
import Login from './auth-components/Login';

export default {
    name: 'ExercicioX',
    components: {
        Cadastro,
        Login,
    },
    data() {
        return {
            auth: false,
            carregando: false,
            user: {
                _id: null,
                nome: '',
            },
            form: {
                valorImovel: '',
                taxa: '',
                numeroParcelas: '',
                salario: '',
                porcentagemEntrada: '',
                dataInicio: ''
            },
            recebido: false,
        }
    },
    methods: {
        handleAuth(authRecebido) {
            this.auth = authRecebido;
            if (this.auth === true) {
                this.buscaPessoa();
            }
        },
        handleCarregando(carregandoRecebido) {
            this.carregando = carregandoRecebido;
        },
        buscaPessoa() {
            let token = localStorage.getItem('userToken');
            axios.get(
                "http://localhost:8000/api/auth/me",
                {
                    headers: { 'x-access-token': token }
                }
            ).then((response) => {
                this.user.nome = response.data.nome;
                this.user._id = response.data._id;
                this.user.email = response.data.email;
            });
        },
        enviarDados(e) {
            e.preventDefault();
            let form = this.form;
            let user = this.user;         
            if ((this.form.numeroParcelas/12) > 45 ) {
                this.formErrors.numeroParcelas = "O numero de parcelas equivale a mais que 45 anos."
            } else {
                this.carregando = true;
                axios.post(
                    "http://localhost:8000/api/exerciciox",
                    {
                        form,
                        user
                    }
                )
                .then((response) => {
                    this.carregando = false;
                    this.lista = response.data;
                    this.recebido = true;
                }, (error) => {
                    this.carregando = false;
                    console.log(error);
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


