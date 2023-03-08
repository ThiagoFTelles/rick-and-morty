<template>
  <q-layout view="hHh LpR fff">
    <HeaderPage />
    <q-page-container class="bg-accent">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import HeaderPage from '../components/Page/HeaderPage.vue'
</script>
