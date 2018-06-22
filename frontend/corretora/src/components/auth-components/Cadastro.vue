<template>
    <div>
        <div class="container">
            <h1> Cadastro </h1>
            <b-alert
                class="alerta"
                dismissible 
                variant="danger" 
                :show="alerta" 
                @dismissed="alerta=false"
            >
                {{ errorMsg }}
            </b-alert>
            <div class="form-container">
                <form class="form-tag">
                    <div class="row">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" name="username" v-validate="'required'" class="form-control" id="cadastro-username" placeholder="Seu nome de usuario" v-model="user.username">
                            <span>{{ errors.first('username') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" name="password" v-validate="'required'" class="form-control" id="cadastro-password" placeholder="********" v-model="user.password">
                            <span>{{ errors.first('password') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" name="email" v-validate="'required|email'" class="form-control" id="cadastro-email" placeholder="cadastro@cadastro.com" v-model="user.email">
                            <span>{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="nome">Nome</label>
                            <input type="text" name="nome" v-validate="'required'" class="form-control" id="cadastro-nome" placeholder="Fulado de Tal" v-model="user.nome">
                            <span>{{ errors.first('nome') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="cpf">CPF</label>
                            <input type="text" name="cpf" v-validate="'required|numeric'" class="form-control" id="cadastro-cpf" placeholder="###.###.###-##" v-model="user.cpf">
                            <span>{{ errors.first('cpf') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="dataNascimento">Data de Nascimento</label>
                            <input type="text" name="dataNascimento" v-validate="'required|date_format:DD/MM/YYYY'" class="form-control" id="cadastro-dataNascimento" placeholder="dd/mm/yyyy" v-model="user.dataNascimento">
                            <span>{{ errors.first('dataNascimento') }}</span>
                        </div>
                        <div class="form-group">
                            <label>FGTS</label>
                            <input type="number" name="fgts" v-validate="'required|numeric'" class="form-control" id="cadastro-fgts" placeholder="R$" v-model="user.fgts">
                            <span>{{ errors.first('fgts') }}</span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success" v-on:click="enviarDados">Submit</button>
                </form>
            </div>
        </div>

        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Cadastro',
    data() {
        return {
            user: {
                username: null,
                password: null,
                email: null,
                nome: null,
                cpf: null,
                dataNascimento: null,
                fgts: null,
            },
            errorMsg: '',
            alerta: false
        }
    },
    methods: {
        enviarDados(e) {
            e.preventDefault();
            this.$validator.validate().then(result => {
                if(result) {
                    let user = this.user;
                    this.$emit('handleCarregando', true);
                    axios.post(
                        "http://localhost:8000/api/auth/register",
                        user
                    ).then(response => {
                        console.log(response);
                        let userToken = response.data.token;
                        localStorage.setItem('userToken', userToken);
                        this.$emit('handleCarregando', false);
                        this.$emit('handleAuth', true); 
                    }).catch(error => { 
                        this.errorMsg = error.response.data;
                        this.alerta = true;
                    });
                }
            });
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
        width: 70%;
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

    .alerta {
        position: aboslute;
        top: 0;
    }
</style>
