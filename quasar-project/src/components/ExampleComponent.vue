<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @keydown.enter="increment" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  Ref,
} from 'vue'
import { Todo, Meta } from './models'

function useClickCount() {
  const clickCount = ref(0)
  function increment() {
    clickCount.value += 1
    return clickCount.value
  }

  return { clickCount, increment }
}

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length)
  return { todoCount }
}
const { clickCount, increment } = useClickCount()

interface Props {
  title: string;
  todos: Todo[];
  meta: Meta;
  active?: boolean;
}

const defaults = withDefaults(defineProps<Props>(), {
  todos: () => [],
})
const props = defaults
const { todoCount } = useDisplayTodo(ref(props.todos))

</script>
