<template>
    <hero color="is-info">
        <span >
            <h1 class="title">Open port</h1>
            <div class="columns is-centered">
                <div class="column is-half">
                    <div v-if="data"  class="box">
                        <p class="p">Welcome to {{data.name}}. Click the button below to use your request and open the door. </p>
                        <use-button v-bind:request-id="requestId"></use-button>
                    </div>
                    <div class="box" v-else-if="loading">
                        <a class="button is-white is-loading" disabled></a>
                    </div>
                    <div v-else-if="!!error" class="box">
                        <p class="p" >{{error}}</p>
                    </div>
                </div>                
            </div>
        </span>
        
    </hero>
    
</template>
<script>
import Hero from '@/components/Hero.vue';
import UseButton from '@/components/UseButton.vue';
import {validateRequest} from '@/api.js';
export default {
    props: ['requestId'],
    components: {
        Hero, UseButton
    },
    data() {
        return {
            loading: true,
            error: false,
            data: false
        }
    },
    created: function() {
        validateRequest(this.requestId)
            .then(resp => {
                this.loading = false;
                this.data = resp.data;
            }).catch(err => {
                this.loading = false;
                this.error = err.response.data.data;
                if(this.error == 'NOT_FOUND') this.error = `The request has already been used or doesn't exist.`;
            })
    }
}
</script>

