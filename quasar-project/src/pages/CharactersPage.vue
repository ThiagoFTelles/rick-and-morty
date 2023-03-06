<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-table
      ref="tableRef"
      grid
      title="Personagens"
      :rows="characters"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      :visible-columns="visibleColumns"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <q-card class="my-card q-ma-md">
          <img alt="as" :src="props.row.image" />
          <q-card-section>
            <div class="text-h6 name">{{ props.row.name }}</div>
            <div class="text-subtitle2">{{ props.row.gender }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ props.row.status }}
          </q-card-section>
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTable, QTableColumn, QCard } from 'quasar'

interface ICharacter {
  id: string
  name: string
  image: string
  status: string
  gender: string
}

const filter = ref('')

const columns: QTableColumn<ICharacter>[] = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (row: { name: string }) => row.name,
    format: (val: string) => val,
    sortable: true,
  },
  {
    name: 'image',
    align: 'center',
    label: 'Foto',
    field: 'image',
    format: (val: string) => val,
    sortable: false,
  },
]

// Remove a coluna 'image' da busca
const visibleColumns: string[] = ['name']

const characters: ICharacter[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'Alive',
    gender: 'Male',
  },
  {
    id: '3',
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    status: 'Alive',
    gender: 'Female',
  },
  {
    id: '4',
    name: 'Beth Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    status: 'Alive',
    gender: 'Female',
  },
  {
    id: '5',
    name: 'Jerry Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    status: 'Alive',
    gender: 'Male',
  },
  {
    id: '6',
    name: 'Abadango Cluster Princess',
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    status: 'Alive',
    gender: 'Female',
  },
  {
    id: '7',
    name: 'Abradolf Lincler',
    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    status: 'unknown',
    gender: 'Male',
  },
  {
    id: '8',
    name: 'Adjudicator Rick',
    image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    status: 'Dead',
    gender: 'Male',
  },
  {
    id: '9',
    name: 'Agency Director',
    image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
    status: 'Dead',
    gender: 'Male',
  },
  {
    id: '10',
    name: 'Alan Rails',
    image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    status: 'Dead',
    gender: 'Male',
  },
  {
    id: '11',
    name: 'Albert Einstein',
    image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
    status: 'Dead',
    gender: 'Male',
  },
  {
    id: '12',
    name: 'Alexander',
    image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
    status: 'Dead',
    gender: 'Male',
  },
  {
    id: '13',
    name: 'Alien Googah',
    image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
    status: 'unknown',
    gender: 'unknown',
  },
  {
    id: '14',
    name: 'Alien Morty',
    image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
    status: 'unknown',
    gender: 'Male',
  },
  {
    id: '15',
    name: 'Alien Rick',
    image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
    status: 'unknown',
    gender: 'Male',
  },
  {
    id: '16',
    name: 'Amish Cyborg',
    image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg',
    status: 'Dead',
    gender: 'Male',
  },
  {
    id: '17',
    name: 'Annie',
    image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg',
    status: 'Alive',
    gender: 'Female',
  },
  {
    id: '18',
    name: 'Antenna Morty',
    image: 'https://rickandmortyapi.com/api/character/avatar/18.jpeg',
    status: 'Alive',
    gender: 'Male',
  },
  {
    id: '19',
    name: 'Antenna Rick',
    image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
    status: 'unknown',
    gender: 'Male',
  },
  {
    id: '20',
    name: 'Ants in my Eyes Johnson',
    image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
    status: 'unknown',
    gender: 'Male',
  },
]
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}
</style>
