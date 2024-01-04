<template>
  <div :class="{ dark: darkMode }">
    <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center md:p-5">
      <div
        class="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-400 sm:rounded-xl shadow-lg overflow-hidden relative flex w-full sm:w-[414px] h-screen sm:h-[736px]"
      >
        <div class="flex flex-col justify-around h-full w-full p-4 overflow-y-auto">
          <!-- header -->
          <Header :darkMode="darkMode" @changeLanguage="changeLanguage" @toggleTheme="toggleTheme" />

          <!-- Content area -->
          <div class="flex justify-center items-center h-full">
            <!-- If no joke is loaded yet, show a preloader -->
            <div v-if="loading" class="relative flex items-center justify-center">
              <div class="w-10 h-10 rounded-full absolute border-[6px] border-dashed border-gray-200"></div>
              <div
                class="w-10 h-10 rounded-full animate-spin absolute border-[6px] border-dashed border-indigo-500 border-t-transparent"
              ></div>
            </div>

            <!-- Joke Card Contining a sigle joke -->
            <JokeCard v-else :joke="joke" />
          </div>

          <!-- Error msg on fetching jokes -->
          <div
            v-if="showError"
            class="absolute bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-2xl bg-red-500 text-center text-white text-xs transform"
          >
            {{ errorMsg }}
          </div>

          <!-- Clipboard Msg -->
          <span v-if="showMsg" class="absolute bg-indigo-500 bottom-20 left-7 px-3 py-2 rounded-2xl text-white text-xs">
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
          <!-- Footer -->
          <Footer @copyToClipboard="copyToClipboard" @getNewJoke="getNewJoke" />
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

const fetchJoke = async () => {
  loading.value = true;
  try {
    const res = await fetch('/api?lang=' + language.value);
    if (res.ok) {
      const cache = await caches.open('api-cache');
      await cache.put('/api?lang=' + language.value, res.clone());
    }
    const joke = await res.json();
    return joke;
  } catch (error) {
    const cache = await caches.open('api-cache');
    const cachedResponse = await cache.match('/api?lang=' + language.value);
    if (cachedResponse) {
      const joke = await cachedResponse.json();
      return joke;
    } else {
      return { error: true, message: 'No cached data available.' };
    }
  } finally {
    loading.value = false;
  }
};

const getNewJoke = async () => {
  if (!navigator.onLine) {
    errorMsg.value = 'You are offline!';
    showError.value = true;
    setTimeout(() => (showError.value = false), 1000);
  }
  const response = await fetchJoke();
  if (!response.error) {
    joke.value = response.type === 'single' ? response.joke : `${response.setup}\n\n\n${response.delivery}`;
  } else if (response.code === 106) {
    joke.value = 'Sorry, Jokes are not currently available in the selected language.';
  } else {
    joke.value = response.message || '...';
  }
  loading.value = false;
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
