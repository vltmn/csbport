<template>
  <hero color="is-primary">
    <h1 class="title">Create a new Port request</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <transition name="slide" mode="out-in">
            <div v-if="step == 1" key="step1">
              <create-form v-bind:got-doors-callback="createCallback"></create-form>
            </div>
            <div v-if="step == 2" key="step2">
              <select-door-form
                v-bind:doors="availableDoors"
                v-bind:on-door-clicked="onDoorClicked"
              ></select-door-form>
            </div>
            <div v-if="step == 3" key="step4">
              <request-link v-bind:request-id="requestId"></request-link>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </hero>
</template>

<style lang="scss" scoped>
.box {
  overflow-x: hidden;
  transition: all 0.3s;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(200%);
}

.slide-leave-to {
  transform: translateX(-200%);
}
</style>

<script>
import CreateForm from "@/components/CreateForm.vue";
import SelectDoorForm from "@/components/SelectDoorForm.vue";
import Hero from "@/components/Hero.vue";
import RequestLink from '@/components/RequestLink.vue';
import {createRequest,getPubKey} from '@/api.js';
export default {
  data() {
    return {
      step: 1,
      validatedUser: undefined,
      availableDoors: undefined,
      requestId: undefined
    };
  },
  methods: {
    createCallback(data) {
      this.step = 2;
      this.validatedUser = {
        username: data.username,
        pw: data.password
      };
      this.availableDoors = data.doors;
    },
    onDoorClicked(doorCode) {
      getPubKey().then((key) => {
        return createRequest(this.validatedUser.username, this.validatedUser.pw, doorCode, key)
      }).then(res => {
            this.requestId = res.data;
            this.step = 3;
        });
    }
  },
  components: {
    CreateForm,
    Hero,
    SelectDoorForm,
    RequestLink
  }
};
</script>

