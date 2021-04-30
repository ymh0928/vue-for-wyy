<template>
  <!-- <router-view></router-view> -->
  <div>
    <div>{{ count }}</div>
    <button @click="addCount">count+1</button>
  </div>
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
      this.data.count++;
    },
  },
};
</script>

<style>
</style>
