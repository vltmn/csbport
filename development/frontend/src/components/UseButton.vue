<template>
    <button class="button is-fullwidth" :disabled="done" v-bind:class="buttonClass" v-on:click="submit" type="button">
        <span v-if="error">An error occured</span>
        <span v-else-if="done">Request used!</span>
        <span v-else>Use</span>
    </button>
</template>
<script>
import {useRequest} from '@/api.js';
export default {
    props: ['requestId'],
    data() {
        return {
            loading: false,
            error: false,
            done: false
        }
    },
    computed: {
        buttonClass: function() {
            return {
                'is-primary': !this.error && !this.done,
                'is-warning': this.error,
                'is-success': !!this.done,
                'is-loading': this.loading
            }
        }
    },
    methods: {
        submit: function() {
            this.loading = true;
            useRequest(this.requestId)
                .then((resp) => {
                    this.loading = false
                    this.done = true;
                }).catch(err => {
                    this.loading = false;
                    this.error = err.response.data;
                })
        }
    }
}
</script>
