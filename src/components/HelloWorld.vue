<template>
  <div>
    <div>attr event</div>
    <slot name="header" c="C"></slot>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <slot :item="item" :index="index"></slot>
      </li>
    </ul>
    <input type="text" :value="foo" @input="$emit('update:foo', $event.target.value)" />

    <input type="text" :value="message" @input="oninput" />

    <input type="text" :value="modelValue" @input="emitValue" />
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    message: {
      type: String
    },
    foo: {
      type: String
    },
    modelValue: String,
    modelModifiers: {
      default: () => ({ capitalize: false })
    }
  },
  setup(props) {
    console.log(props);
    const list = ["slotProps - 1", "Buy milk"];
    return {
      list
    };
  },
  created() {
    console.log(this.modelModifiers); // { capitalize: true }
  },
  methods: {
    oninput(e: any) {
      let value: any = e.target.value;
      value = value.charAt(0).toUpperCase() + value.slice(1);
      this.$emit("update:message", value);
    },
    emitValue(e: any) {
      let value: any = e.target.value;
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      this.$emit("update:modelValue", value);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
