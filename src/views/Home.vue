<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>
      {{age}}
      <br />
      {{setups}}
      <br />
      {{year}}
      <br />
      {{state}}
      <br />
      computer {{twiceTheCounter}}
      <br />
    </p>
    <div v-for="(item,index) in stateArr" :key="index">{{item}}</div>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, name,index) in myObject" :key="name">{{ name }}: {{ value }} : {{index}}</li>
    </ul>
    <p>{{greetingUppercased}}</p>

    <button @click="change">change message</button>

    <div>{{ count }} {{ object.foo }}</div>
    <button @click="add">attr</button>
    <!-- v-model新特性，具名插槽 -->
    <HelloWorld v-model:foo="fooValue" v-model:message="msg" v-model.capitalize="myText">
      <template v-slot:header>
        <h1>header-{{fooValue}}</h1>
      </template>
      <template v-slot:footer="slotProp">
        <h1>footer-{{msg}}{{slotProp.c}}</h1>
      </template>
      <template v-slot="slotProps">
        <p>123</p>
        <span class="green">{{ slotProps.item }}</span>
      </template>
    </HelloWorld>
    <p>{{fooValue}} {{msg}} {{myText}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, computed } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { useRoute } from "vue-router";
interface Person {
  title: string;
  author: string;
  publishedAt: number;
}
interface Book {
  title: string;
  year?: number;
}
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      myObject: {
        title: "How to do lists in Vue",
        author: "Jane Doe",
        publishedAt: 10
      } as Person,
      message: "hello"
    };
  },
  setup(props) {
    const router = useRouter();
    console.log(router);
    const setups = "setupsss";
    const year = ref<string | number>("2020");
    const refValue = ref({ a: 1, b: 3 });
    const fooValue = ref<string | number>("string"); // foo's type: Ref<string | number>
    fooValue.value = 123; // ok!

    const book: Book = reactive({ title: "Vue 3 Guide" });
    // console.log(year);
    // const result = year.value.split(""); // => Property 'split' does not exist on type 'number'

    const count = ref("0");

    const object = reactive({ foo: "bar" });
    const age = ref(18);
    const myText = ref(22);
    //to foo
    const state = reactive({
      foo: 1,
      bar: 2
    });
    // reactive  深度监听
    const stateArr = reactive([{ a: 1 }, 3, 4]);

    const fooRef = toRef(state, "bar");
    // console.log(fooRef.value);
    const twiceTheCounter = computed(() => fooRef.value * 2);

    function add() {
      age.value++; //想改变值或获取值 必须.value
      state.bar++;
      (stateArr[0] as any).a++;
      fooRef.value++;
    }
    const msg = ref("msg");
    // 暴露到template中
    return {
      myText,
      msg,
      count,
      object,
      age,
      add,
      setups,
      year,
      refValue,
      twiceTheCounter,
      state,
      stateArr,
      fooValue,
      zdyVal: ref("msg")
    };
  },
  methods: {
    change() {
      console.log(11);
      this.message = this.message + "a";
      this.fooValue = "fooValue change";
      // this.setups = "1221";
    }
  },
  computed: {
    // 需要注释
    greeting(): string {
      return this.message + "!";
    },

    // 在使用setter进行计算时，需要对getter进行注释
    greetingUppercased: {
      get(): string {
        return this.message.toUpperCase();
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase();
      }
    }
  }
});
</script>
