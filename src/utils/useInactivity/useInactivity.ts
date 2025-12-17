import { onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export function useInactivity(timeout = window.TIMEOUT || 60) {
  const router = useRouter();
  const route = useRoute();

  let time = 0;
  let interval: ReturnType<typeof setInterval>;

  const resetTimer = () => {
    time = 0;
  };

  const startTimer = () => {
    interval = setInterval(() => {
      time++;
      if (time >= timeout) {
        resetTimer();
        if (route.name !== "home") {
          router.push({ name: "home" });
        }
      }
    }, 1000);
  };

  const attachListeners = () => {
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("touchstart", resetTimer);
  };

  const removeListeners = () => {
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("keypress", resetTimer);
    document.removeEventListener("touchstart", resetTimer);
  };

  onMounted(() => {
    attachListeners();
    startTimer();
  });

  onUnmounted(() => {
    removeListeners();
    clearInterval(interval);
  });
}
