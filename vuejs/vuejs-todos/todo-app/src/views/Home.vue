<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <HelloButton />
    <MyComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import HelloButton from '@/components/HelloButton.vue';
import MyComponent from '@/components/MyComponent.vue';

@Component({
  components: {
    HelloWorld,
    HelloButton,
    MyComponent
  },
})
export default class Home extends Vue {}
</script>
