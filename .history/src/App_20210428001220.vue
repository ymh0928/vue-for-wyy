<template>
  <!-- <router-view></router-view> -->
  <div>{{ count }}</div>
  <button @click="addCount">count+1</button>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    addCount() {
      count++;
    },
  },
};
</script>

<style>
</style>
