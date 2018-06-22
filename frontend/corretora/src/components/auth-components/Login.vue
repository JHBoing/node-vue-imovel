<template>
    <div class="container">
        <h1> Login </h1>
        <div class="form-container">
            <form class="form-tag row">
                <div class="form-group col-md-6">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="login-username" placeholder="Seu nome de usuario" v-model="form.username">
                </div>
                <div class="form-group col-md-6">
                    <label for="password">Senha</label>
                    <input type="password" class="form-control" id="login-password" placeholder="********" v-model="form.password">
                </div>
                <button type="submit" class="btn btn-success" v-on:click="enviarDados">Submit</button>
                <button type="button" class="btn brn-info" v-on:click="cadastro">Cadastro</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: null,
                password: null,
            },
        }
    },
    methods: {
        enviarDados(e) {
            e.preventDefault();
            let form = this.form;
            axios.post(
                "http://localhost:8000/api/auth/login",
                form
            ).then((response) => {
                let userToken = response.data.token;
                localStorage.setItem('userToken', userToken);
                this.$emit('handleCarregando', false);
                this.$emit('handleAuth', true); 
            });
        },
        cadastro(e) {
            e.preventDefault();
            this.$emit('handleCadastro', true);
        }
    }
}

</script>