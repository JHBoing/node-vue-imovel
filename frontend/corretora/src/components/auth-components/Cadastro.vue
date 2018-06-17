<template>
    <div class="container">
        <h1> Cadastro </h1>
        <div class="form-container">
            <form class="form-tag row">
                <div class="form-group col-md-6">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="cadastro-username" placeholder="Seu nome de usuario" v-model="user.username">
                </div>
                <div class="form-group col-md-6">
                    <label for="password">Senha</label>
                    <input type="password" class="form-control" id="cadastro-password" placeholder="********" v-model="user.password">
                </div>
                <div class="form-group col-md-6">
                    <label for="email">E-mail</label>
                    <input type="email" class="form-control" id="cadastro-email" placeholder="cadastro@cadastro.com" v-model="user.email">
                </div>
                <div class="form-group col-md-6">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" id="cadastro-nome" placeholder="Fulado de Tal" v-model="user.nome">
                </div>
                <div class="form-group col-md-6">
                    <label for="cpf">CPF</label>
                    <input type="text" class="form-control" id="cadastro-cpf" placeholder="###.###.###-##" v-model="user.cpf">
                </div>
                <div class="form-group col-md-6">
                    <label for="dataNascimento">Data de Nascimento</label>
                    <input type="text" class="form-control" id="cadastro-dataNascimento" placeholder="dd/mm/yyyy" v-model="user.dataNascimento">
                </div>
                <div class="form-group col-md-6">
                    <label>FGTS</label>
                    <input type="number" class="form-control" id="cadastro-fgts" placeholder="R$" v-model="user.fgts">
                </div>
                <button type="submit" class="btn btn-success" v-on:click="enviarDados">Submit</button>
            </form>
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
            }
        }
    },
    methods: {
        enviarDados(e) {
            e.preventDefault();
            let user = this.user;
            this.$emit('handleCarregando', true);
            axios.post(
                "http://localhost:8000/api/auth/register",
                user
            ).then((response) => {
                let userToken = response.data.token;
                localStorage.setItem('userToken', userToken);
                this.$emit('handleCarregando', false);
                this.$emit('handleAuth', true); 
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
        width: 60%;
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
