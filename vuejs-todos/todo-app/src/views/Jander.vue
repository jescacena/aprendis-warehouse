<template lang="pug">
div
    h1 Hello world!
    p {{propMessage || 'Pug source code!'}}
    p Clander: {{clander}}
    p {{heavyOperationResult}}
    p Computed clander: 
        b {{computedClander}}
    button(@click='changeClander') Change clander
    p
      button(@click="increment") +
      button(@click="decrement") -
    MyComponent

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import store from "../store";
import MyComponent from "../components/MyComponent.vue";

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
  },
  components: {
    MyComponent
  }
})
export default class Jander extends Vue {
  clander = "El primer clander";
  heavyOperationResult = "loading";
  @Prop(String) readonly propMessage: string | undefined;

  created() {
    console.log("created", this);
  }

  changeClander() {
    this.clander = "El clander cambiado";
  }

  increment() {
    // store.commit("increment");
    // store.dispatch('incrementAsync');
    store.dispatch('incrementAsync2').then(() => {
    console.log('JES incrementAsync2 callback!!!');
    
    });
    console.log(store.state.count);
  }

  decrement() {
    store.commit("decrement");
    console.log(store.state.count);
  }

  @Watch("clander")
  onClanderChanged(val: string, oldVal: string) {}

  // The class component now treats beforeRouteEnter
  // and beforeRouteLeave as Vue Router hooks
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    setTimeout(() => {
      // access to component instance via `vm`
      next(vm => {
        vm.heavyOperationResult = "Hola caracola!!!!!";
      });
    }, 500);
  }

  mounted() {}

  get computedClander() {
    return "computed " + this.clander;
  }
}
</script>