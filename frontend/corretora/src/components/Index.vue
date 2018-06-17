<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="exercicio2" data-toggle="tab" role="tab" v-on:click="showTab(1)" aria-selected="true">Exercicio 2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="exercicio4" data-toggle="tab" role="tab" v-on:click="showTab(2)" aria-selected="false">Exercicio 4</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="exercicioX" data-toggle="tab" role="tab" v-on:click="showTab(3)" aria-selected="false">Exercicio X</a>
            </li>
        </ul>
        <div v-if="this.tab == 1">
            <Exercicio2 />
        </div>
        <div v-if="this.tab == 2">
            <Exercicio4 />
        </div>
        <div v-if="this.tab == 3">
            <ExercicioX />
        </div>
    </div>
</template>
<script>
import Exercicio2 from './Exercicio2';
import Exercicio4 from './Exercicio4';
import ExercicioX from './ExercicioX';

export default {
    name: 'Index',
    components: {
        Exercicio2,
        Exercicio4,
        ExercicioX,
    },
    data() {
        return {
            tab: '1',
        }
    },
    methods: {
        showTab(numero) {
            this.tab = numero;
        }
    }
}

</script>
