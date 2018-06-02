<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" role="tab" v-on:click="showTab(1)" aria-selected="true">Exercicio 2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" role="tab" v-on:click="showTab(2)" aria-selected="false">Exercicio 4</a>
            </li>
        </ul>
        <div v-if="this.tab == 1">
            <Exercicio2 />
        </div>
        <div v-if="this.tab == 2">
            <Exercicio4 />
        </div>
    </div>
</template>
<script>
import Exercicio2 from './Exercicio2';
import Exercicio4 from './Exercicio4';

export default {
    name: 'Index',
    components: {
        Exercicio2,
        Exercicio4,
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
