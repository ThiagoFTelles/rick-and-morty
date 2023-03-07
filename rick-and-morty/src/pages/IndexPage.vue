<template>
  <q-page class="flex-center row">
    <div class="q-pa-sm text-white text-center">
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
            <div class="text-h6">
              Erro: Verifique sua conexão com a internet e tente novamente
              {{ error.message }}
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <p v-if="result && result.characters" class="q-ma-none">
        Pagina {{ current }}
      </p>
    </div>

    <div class="q-pa-md row" v-if="result && result.characters">
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
      <div
        class="col-md-3 col-sm-12 col-12 q-pa-md character"
        v-for="(item, key) in result.characters.results"
        :key="key"
      >
        <CharacterCard :character="item" />
      </div>
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
import { GET_ALL_CHARACTERS } from '../apollo/queries'
// import { ICharacter } from '../components/models'
import CharacterCard from '../components/Characters/CharacterCard.vue'

// const characters = ref<ICharacter[]>([])
const current = ref<number>(1)

const { result, loading, error, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
  page: current,
})

const setPage = async (val: any) => {
  // const { fetchMore, result } = useQuery(GET_ALL_CHARACTERS, {
  //   variables: { page: val },
  //   fetchPolicy: 'network-only',
  // })

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

// const page = ref<number>(1)
// const { result } = useQuery(GET_ALL_CHARACTERS, { page })
// watch(result, newValue => {
//   characters.value = newValue.characters.results
// })
</script>
