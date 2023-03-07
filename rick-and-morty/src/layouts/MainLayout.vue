<template>
  <q-layout view="hHh LpR fff">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img
              alt="Mr. Poopybutt"
              src="https://rickandmortyapi.com/api/character/avatar/244.jpeg"
            />
          </q-avatar>
          Mr. Poopybutt Files
        </q-toolbar-title>
        <q-space />
        <q-input
          label="Pesquisar Personagem"
          dense
          debounce="300"
          v-model="name"
          placeholder="digite um nome"
          clearable
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Links </q-item-label>

        <q-item tag="a" to="/characters">Characters Link</q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img
              alt="logo"
              src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { ILink } from '../components/models'

const linksList: ILink[] = [
  {
    title: 'Characters',
    caption: 'lista de personagens',
    icon: 'public',
    link: '/characters',
  },
  {
    title: 'Github',
    caption: 'github.com/ThiagoFTelles/',
    icon: 'code',
    link: 'https://github.com/ThiagoFTelles/',
  },
  {
    title: 'With love by',
    caption: 'Thiago F Telles',
    icon: 'favorite',
    link: '#',
  },
]
const leftDrawerOpen = ref<boolean>(false)

const essentialLinks = linksList
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const name = ref<string>('')

const router = useRouter()

watch(name, newValue => {
  if (newValue) {
    router.push({ path: `/characters/${newValue}` })
  }
})
</script>
