<script setup lang="ts">
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { computed } from "vue";
import { Scatter } from "vue-chartjs";

import { useGaStore } from "@/stores/gaStore";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
);

const store = useGaStore();

const chartData = computed(() => {
  return {
    datasets: [
      {
        label: "Функция f(x)",
        data: store.functionData,
        showLine: true,
        borderColor: "#6C63FF",
        pointRadius: 0,
        borderWidth: 2,
        order: 2,
      },
      {
        label: "Популяция",
        data: store.population.map((p) => ({ x: p.x, y: p.y })),
        backgroundColor: "#FF5252",
        pointRadius: 6,
        pointHoverRadius: 8,
        order: 1,
      },
      {
        label: "Лучший",
        data: store.bestSolution
          ? [{ x: store.bestSolution.x, y: store.bestSolution.y }]
          : [],
        backgroundColor: "#4CAF50",
        pointRadius: 10,
        pointStyle: "rectRot",
        order: 0,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  scales: {
    x: {
      type: "linear",
      min: -10,
      max: 53,
      title: { display: true, text: "X (Генотип)" },
    },
    y: { title: { display: true, text: "Y (Приспособленность)" } },
  },
};
</script>

<template>
  <div class="chart-container">
    <Scatter :data="chartData" :options="chartOptions as any" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 400px;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
