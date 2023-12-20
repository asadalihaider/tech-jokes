<template>
  <div :class="{ dark: darkMode }">
    <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center md:p-5">
      <div
        class="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-400 md:rounded-xl shadow-lg overflow-hidden relative flex mobileBox w-full"
      >
        <div class="flex flex-col justify-around h-full w-full p-3 md:p-6 overflow-y-auto">
          <!-- header -->
          <Header :darkMode="darkMode" @changeLanguage="changeLanguage" @toggleTheme="toggleTheme" />

          <!-- Content area -->
          <div class="flex justify-center items-center h-full">
            <!-- Joke Card Contining a sigle joke -->
            <div>
              <h3>content section</h3>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center">Footer area</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/HeaderComponent.vue';

const darkMode = ref(false);
const language = ref('en');

const changeLanguage = (selectedLanguage) => {
  language.value = selectedLanguage;
};
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
};
</script>

<style scoped>
.mobileBox {
  height: 736px;
}

@media only screen and (max-width: 600px) {
  .mobileBox {
    height: 100vh;
  }
}

@media only screen and (min-width: 600px) {
  .mobileBox {
    width: 414px;
  }
}
</style>
