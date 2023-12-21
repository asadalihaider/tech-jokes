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
            <!-- If no joke is loaded yet, show a preloader -->
            <img v-if="loading" class="w-10" src="./assets/loading.gif" alt="Loading" />

            <!-- Joke Card Contining a sigle joke -->
            <JokeCard v-else :joke="joke" />
          </div>

          <!-- Footer -->
          <div class="text-center">Footer area</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/HeaderComponent.vue';
import JokeCard from './components/JokeCard.vue';

const darkMode = ref(false);
const language = ref('en');
const loading = ref(false);
const joke = ref('');

const changeLanguage = (selectedLanguage) => {
  language.value = selectedLanguage;
};
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
};
const getNewJoke = async () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  joke.value = 'Hello world';
};

onMounted(() => {
  getNewJoke();
});
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
