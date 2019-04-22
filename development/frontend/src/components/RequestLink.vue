<template>
  <span>
    <div class="content">
      <p class="has-text-dark">Here is a link to the request:</p>
    </div>
    <router-link tag="span" :to="{name: 'open', params: {requestId: requestId}}">
      <a class="button is-success">{{requestId}}</a>
    </router-link>
  </span>
</template>
<script>
export default {
  props: ["requestId"]
};
</script>

