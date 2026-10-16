import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisteredSW() {
    console.log('Service worker has been registered.');
  },
  onOfflineReady() {
    console.log('Content has been cached for offline use.');
  },
  onRegisterError(error) {
    console.error('Error during service worker registration:', error);
  },
});
