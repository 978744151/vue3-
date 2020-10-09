<template>
  <div>
    <input type="text" :value="foo" @input="$emit('update:foo', $event.target.value)" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRef, computed } from "vue";

export default defineComponent({
  props: {
    foo: {
      type: String
    },
    fooModifiers: {
      type: String
    }
  },
  created() {
    console.log(this.fooModifiers); // { capitalize: true }
  }
});
</script>

<style>
</style>