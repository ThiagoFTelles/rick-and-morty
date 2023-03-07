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
  </q-page>
</template>

<script setup lang="ts" context="module">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ICharacter } from '../components/models'
import { GET_ALL_CHARACTERS } from '../apollo/queries'

const characters = ref<ICharacter[]>([])

const page = ref<number>(1)
const { result } = useQuery(GET_ALL_CHARACTERS, { page })
watch(result, newValue => {
  characters.value = newValue.characters.results
})

// const meta = ref<Meta>({
//   totalCount: 1200,
// })
</script>
