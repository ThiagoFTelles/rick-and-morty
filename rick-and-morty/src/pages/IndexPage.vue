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
          @click="setPage"
        />
      </div>
      <q-infinite-scroll @load="loadData" :initial-index="1">
        <q-item
          class="flex flex-center col-md-3 col-sm-4 col-12 q-my-md q-pa-md character"
          v-for="(item, key) in charactersList"
          :key="key"
          :to="`/character/${item.id}`"
        >
          <CharacterCard :character="item" />
        </q-item>
      </q-infinite-scroll>
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
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS } from '../apollo/queries'
import CharacterCard from '../components/Characters/CharacterCard.vue'
import { ICharacter } from '../components/models'

const current = ref<number>(1)
const charactersList = ref<ICharacter[]>([])

const { result, loading, error, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
  page: current,
})

const setPage = async () => {
  if (fetchMore) {
    fetchMore({
      variables: {
        page: current,
      },
    })?.then((e: { data: { characters: { results: number } } }) => {
      if (e.data.characters.results >= 1) {
        result.value = e.data
      }
    })
  }
}

const loadData = async (index: any, done: any) => {
  current.value += 1
  await fetchMore({
    variables: {
      page: current,
    },
  })?.then((e: { data: { characters: { results: number } } }) => {
    if (e.data.characters.results >= 1) {
      result.value = e.data
    }
  })
  done()
}

watch(result, newValue => {
  if (newValue) {
    newValue.characters.results.forEach(
      (char: {
        id: string
        name: string
        image: string
        status: string
        gender: string
        species?: string | undefined
        episode?: { id: string; name: string }[] | undefined
      }) => {
        charactersList.value.push(char)
      },
    )
  }
})
</script>
