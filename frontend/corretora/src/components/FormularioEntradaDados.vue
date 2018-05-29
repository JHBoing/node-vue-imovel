<template>
    <div class="container">
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
                <button type="submit" class="btn btn-success" v-on:click="enviarDados">Submit</button>
            </form>
        </div>
        <div v-if="carregando">
            Carregando...
        </div>
        <div>
            <p>{{ lista }}</p>
        </div>
    </div>  
</template>

<script>
import axios from 'axios';

export default {
    name: 'FormularioEntradaDados',
    data () {
        return {
            form: {
                valorImovel: '',
                taxa: '',
                numeroParcelas: '',
                porcentagemEntrada: '',
            },
            lista: '',
            carregando: false,
        }
    },
    methods: {
        enviarDados(e) {
            e.preventDefault();
            let form = this.form;
            this.carregando = true;
            axios.post(
                "http://localhost:8000/api/",
                form
            )
            .then((response) => {
                this.carregando = false;
                this.lista = response.data;
            }, (error) => {
                this.carregando = false;
                console.log("erro");
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
