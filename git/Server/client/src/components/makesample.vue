<template>
  <div id="dynamic-component-demo" class="demo">
  <button
    v-for="tab in tabs"
    v-bind:key="tab"
    v-bind:class="['tab-button', { active: currentTab === tab }]"
    v-on:click="currentTab = tab"
  >{{ tab }}</button>

  <component
    v-bind:is="currentTabComponent"
    class="tab"
  ></component>
</div>
</template>

<script>
import home from "./home.vue"
import drawimage from "./drawimage.vue"

export default {
  components: {
    home,
    drawimage
  },
  data: function () {
    return {
    currentTab: 'home',
    tabs: ['home', 'drawimage']
  }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab
    }
  }
}
</script>

<style>
</style>
