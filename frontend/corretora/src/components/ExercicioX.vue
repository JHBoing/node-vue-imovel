<template>
    <div>
        <div v-if="!auth">
            <Login v-on:handleAuth="handleAuth"/>
            <Cadastro v-on:handleAuth="handleAuth" />
        </div>
        <div v-if="auth">
        
        </div>
    </div>
</template>
<script>
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
        }
    },
    methods: {
        handleAuth(authRecebido) {
            console.log(authRecebido);
            this.auth = authRecebido;
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


