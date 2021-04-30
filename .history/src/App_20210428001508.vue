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
  updated() {
    console.log("aaa");
  },
  methods: {
    addCount() {
      this.count++;
    },
  },
};
</script>

<style>
</style>
