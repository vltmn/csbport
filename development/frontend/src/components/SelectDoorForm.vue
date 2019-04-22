<template>
  <span>
    <div class="content">
      <p class="has-text-dark">Please select the door you want to create a link for.</p>
    </div>

    <div class="columns is-centered">
      <div v-bind:key="door.code" class="column is-one-third" v-for="door in doors">
        <button
          v-bind:key="door.code"
          class="button is-fullwidth"
          v-bind:class="buttonClass(door.code)"
          @click="onClick(door.code)"
          v-bind:disabled="disabled"
        >{{door.text}}</button>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  props: ["doors", "onDoorClicked"],
  data() {
    return {
      clickedDoor: undefined
    };
  },
  computed: {
    disabled: function() {
      return !!this.clickedDoor;
    }
  },
  methods: {
    buttonClass(doorCode) {
      return {
        "is-info": !this.clickedDoor,
        "is-loading": this.clickedDoor && doorCode == this.clickedDoor
      };
    },
    onClick(doorCode) {
      this.clickedDoor = doorCode;
      this.onDoorClicked(doorCode);
    }
  }
};
</script>

