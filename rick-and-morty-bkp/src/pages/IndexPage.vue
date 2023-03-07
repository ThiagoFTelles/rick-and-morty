<template>
  <q-page class="row items-center justify-evenly">
    <span>
      <h1>Characters</h1>
      <ul>
        <li v-for="character in characters" :key="character.id">
          {{ character.name }}
        </li>
      </ul>
    </span>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models'
import ExampleComponent from 'components/ExampleComponent.vue'
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const charactersQuery = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`
const characters: any = ref([])
const { result } = useQuery(charactersQuery)
watch(result, newValue => {
  characters.value = newValue.characters.results
})

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
])
const meta = ref<Meta>({
  totalCount: 1200,
})
</script>
