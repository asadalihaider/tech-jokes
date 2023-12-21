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
            <span
              v-if="showMsg"
              class="absolute bg-indigo-500 bottom-20 left-7 px-3 py-2 rounded-2xl text-white text-xs"
            >
              {{ msg }}
              <svg
                class="absolute h-2 w-full left-0 top-full text-indigo-500"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xml:space="preserve"
              >
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </span>

            <!-- If no joke is loaded yet, show a preloader -->
            <img v-if="loading" class="w-10" src="./assets/loading.gif" alt="Loading" />

            <!-- Joke Card Contining a sigle joke -->
            <JokeCard v-else :joke="joke" />
          </div>

          <!-- Footer -->
          <Footer @copyToClipboard="copyToClipboard" @getNewJoke="getNewJoke" />
          <div
            v-if="showError"
            class="absolute bottom-24 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-2xl bg-red-500 text-center text-white transform"
          >
            {{ errorMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/HeaderSection.vue';
import JokeCard from './components/JokeCard.vue';
import Footer from './components/FooterSection.vue';

const loading = ref(false);
const darkMode = ref(false);
const showError = ref(false);
const showMsg = ref(false);
const language = ref('en');
const errorMsg = ref('');
const joke = ref('');
const msg = ref('');

const changeLanguage = (selectedLanguage) => {
  language.value = selectedLanguage;
  getNewJoke();
};
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
};

const fetchAJoke = async () => {
  loading.value = true;
  const res = await fetch('/api' + language.value);
  const joke = await res.json();
  return joke;
};

const getNewJoke = async () => {
  if (navigator.onLine) {
    const response = await fetchAJoke();
    if (!response.error) {
      joke.value = response.type === 'single' ? response.joke : `${response.setup}\n\n\n${response.delivery}`;
    } else if (response.code === 106) {
      joke.value = 'Sorry, Jokes are not currently available in the selected language.';
    } else {
      joke.value = 'Sorry, something is not working fine.';
    }
    loading.value = false;
  } else {
    errorMsg.value = 'Check your internet connection!';
    showError.value = true;
    setTimeout(() => (showError.value = false), 1000);
  }
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(joke.value);
    msg.value = 'Copied!';
    showMsg.value = true;
    setTimeout(() => (showMsg.value = false), 800);
  } catch ($e) {
    errorMsg.value = "Your device doesn't support!";
    showError.value = true;
    setTimeout(() => (showError.value = false), 1000);
  }
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
