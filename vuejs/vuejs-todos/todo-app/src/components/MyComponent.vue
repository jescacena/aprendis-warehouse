<template lang="pug">
  div.container
    span {{ message }}
    p El count bind to store: 
      b {{syncedCount}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "../store";


// The @Component decorator indicates the class is a Vue component
@Component({
  computed: {
    syncedCount: {
      get() {
        return store.state.count;
      },
      set(value) {
        this.$emit("update:count", value);
      }
    }
  }
})
export default class MyComponent extends Vue {
  public message: string = "Hello my Component!";

  created(): void {
    this.message = "Bye my Component!";
  }
};
</script>


<style lang="scss" scoped>
.container {
  border: 1px solid;
  background-color: cornflowerblue;
}
</style>
