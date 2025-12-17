import { defineStore } from "pinia";
import { ref } from "vue";

import {
  GeneticAlgorithm,
  type Individual,
  type Goal,
} from "@/utils/GeneticEngine";

export const useGaStore = defineStore("ga", () => {
  const config = ref({
    a: 26,
    b: 6,
    c: -93,
    d: 2,
    minX: -10,
    maxX: 53,
    popSize: 20,
    mutationRate: 0.1,
  });

  const goal = ref<Goal>("max");
  const isRunning = ref(false);
  const isFinished = ref(false); // Флаг, что мы закончили

  const gaInstance = ref<GeneticAlgorithm | null>(null);
  const population = ref<Individual[]>([]);
  const generation = ref(0);
  const bestSolution = ref<Individual | null>(null);
  const functionData = ref<{ x: number; y: number }[]>([]);

  const stabilityCount = ref(0);
  const lastBestY = ref<number | null>(null);

  const init = () => {
    gaInstance.value = new GeneticAlgorithm(config.value);
    updateState();

    stabilityCount.value = 0;
    lastBestY.value = bestSolution.value?.y || null;
    isFinished.value = false;
  };

  const updateState = () => {
    if (!gaInstance.value) return;
    population.value = gaInstance.value.getPopulation();
    generation.value = gaInstance.value.getGeneration();
    bestSolution.value = gaInstance.value.getBest(goal.value);

    if (functionData.value.length === 0) {
      functionData.value = gaInstance.value.getFunctionPoints();
    }
  };

  const step = () => {
    if (!gaInstance.value || isFinished.value) return;

    gaInstance.value.nextGeneration(goal.value);
    updateState();
    checkConvergence();
  };

  const checkConvergence = () => {
    const currentY = bestSolution.value?.y;

    if (currentY === lastBestY.value) {
      stabilityCount.value++;
    } else {
      stabilityCount.value = 0;
      lastBestY.value = currentY || null;
    }

    if (stabilityCount.value >= 30) {
      stopAuto();
      isFinished.value = true;
      // alert(`Алгоритм сошелся на поколении ${generation.value}!`);
    }
  };

  let timer: ReturnType<typeof setInterval>;

  const startAuto = () => {
    if (isRunning.value || isFinished.value) return;
    isRunning.value = true;
    timer = setInterval(step, 50);
  };

  const stopAuto = () => {
    isRunning.value = false;
    clearInterval(timer);
  };

  const reset = () => {
    stopAuto();
    init();
  };

  return {
    config,
    goal,
    isRunning,
    isFinished,
    population,
    generation,
    bestSolution,
    functionData,
    init,
    step,
    startAuto,
    stopAuto,
    reset,
  };
});
