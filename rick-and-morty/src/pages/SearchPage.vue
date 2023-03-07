<template>
  <q-page class="flex-center row">
    <div class="q-pa-sm text-black text-center">
      <h2>Personagens da série Rick and Morty</h2>
      <q-dialog v-model="loading">
        <q-card class="text-center bg-black text-white">
          <q-card-section>
            <div class="text-h6">Carregando personagens...</div>
            <q-circular-progress
              indeterminate
              size="50px"
              color="lime"
              class="q-ma-md"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-if="error">
        <q-card class="text-center bg-black text-white">
          <q-card-section>
            <div class="text-h6">Erro: {{ error.message }}</div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <p v-if="result && result.characters" class="q-ma-none">
        {{ result.characters.info.count }} resultados
      </p>
      <p v-if="result && result.characters" class="q-ma-none">
        Pagina {{ current }}
      </p>
    </div>
    <div
      class="q-pa-md row items-start justify-center"
      v-if="result?.characters"
    >
      <div class="q-pa-sm flex flex-center col-12 bg-secondary">
        <q-pagination
          class="pagination"
          v-model="current"
          :max="result.characters.info.pages"
          :max-pages="8"
          boundary-numbers
          direction-links
          @click="setPage(current)"
        />
      </div>
      <q-item
        class="flex flex-center col-md-3 col-sm-4 col-12 q-my-md q-pa-md character"
        v-for="(item, key) in result.characters.results"
        :key="key"
        :to="`/character/${item.id}`"
      >
        <CharacterCard :character="item" />
      </q-item>
      <div class="q-pa-sm flex flex-center col-12 bg-secondary">
        <q-pagination
          class="pagination primary"
          v-model="current"
          :max="result.characters.info.pages"
          :max-pages="8"
          boundary-numbers
          direction-links
          @click="setPage"
        />
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
      :duration="800"
    >
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script setup lang="ts" context="module">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'
import { GET_CHARACTERS_BY_NAME } from '../apollo/queries'
import CharacterCard from '../components/Characters/CharacterCard.vue'

const current = ref<number>(1)

const route = useRoute()
const { name } = route.params

const { result, loading, error, fetchMore } = useQuery(GET_CHARACTERS_BY_NAME, {
  page: current,
  name,
})

const setPage = async (val: any) => {
  if (fetchMore) {
    fetchMore({
      variables: {
        page: val,
      },
    })?.then((e: { data: { characters: { results: number } } }) => {
      if (e.data.characters.results >= 1) {
        console.log(e.data)
        result.value = e.data
      }
    })
  }
}

// watch(name, newValue => {
//   if (newValue) {
//     console.log(newValue)
//     router.push({ path: '/search', params: { name: newValue } })
//   }
// })
</script>
