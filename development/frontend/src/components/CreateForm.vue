<template>
    <span>
        <div class="content">
            <p class="has-text-dark">Please sign in with your account from the CSB homepage.</p>
        </div>
        <div class="field">
            <div class="control">
                <input type="text" :disabled="loading" v-model="username" class="input" placeholder="Username">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input type="password" :disabled="loading" v-model="password" class="input" placeholder="Password">
            </div>
        </div>
        <button class="button is-fullwidth" v-bind:class="buttonClass" v-on:click="submit" type="button">
            <span v-if="unauthorized">Bad login</span>
            <span v-else-if="error">An error occured</span>
            <span v-else>Sign in</span>
        </button>
    </span>

</template>

<script>
import {getDoors, createRequest, getPubKey} from '@/api.js';
export default {
    props: ['gotDoorsCallback'],
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            error: false,
            unauthorized: false
        }
    },
    computed: {
        buttonClass: function() {
            return {
                'is-info': !this.error && !this.unauthorized,
                'is-warning': this.error || this.unauthorized,
                'is-loading': this.loading
            }
        }
    },
    methods: {
        async submit() {
            const {username, password} = this;
            this.loading = true;
            let doors;
            try {
                const pubKey = await getPubKey();
                const resp = await getDoors(username, password, pubKey);
                doors = resp.data;
            } catch(e) {
                this.loading = false;
                if(e.response.status == 401) {
                    this.unauthorized = true;
                    return;
                }
                this.error = e;
                return;
            }
            this.loading = false;
            this.gotDoorsCallback({doors, username, password});
        }
    }
}
</script>
