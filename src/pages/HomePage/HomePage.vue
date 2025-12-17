<script setup lang="ts">
import { onMounted } from "vue";

import ChartViewer from "@/components/ChartViewer.vue";
import { useGaStore } from "@/stores/gaStore";

const store = useGaStore();

onMounted(() => {
  store.init();
});
</script>

<template>
  <div class="app-layout">
    <div class="card">
      <header class="header">
        <h1>🧬 Генетический алгоритм</h1>
        <p>
          Поиск экстремума функции:
          <b
            >{{ store.config.a }} + {{ store.config.b }}x +
            {{ store.config.c }}x² + {{ store.config.d }}x³</b
          >
        </p>
      </header>

      <div class="controls">
        <div class="control-group">
          <label>Цель:</label>
          <div class="toggle">
            <button
              :class="{ active: store.goal === 'max' }"
              @click="store.goal = 'max'"
            >
              MAX
            </button>
            <button
              :class="{ active: store.goal === 'min' }"
              @click="store.goal = 'min'"
            >
              MIN
            </button>
          </div>
        </div>

        <div class="control-group">
          <div class="stats">
            <div>
              Поколение: <b>{{ store.generation }}</b>
            </div>
            <div>
              Лучший X: <b>{{ store.bestSolution?.x }}</b>
            </div>
            <div>
              Лучший Y: <b>{{ store.bestSolution?.y.toFixed(2) }}</b>
            </div>
          </div>
        </div>
      </div>

      <ChartViewer />

      <div class="actions">
        <button
          class="btn btn-primary"
          @click="store.step"
          :disabled="store.isRunning"
        >
          👣 Шаг +1
        </button>
        <button
          class="btn"
          :class="store.isFinished ? 'btn-success' : 'btn-accent'"
          @click="store.isRunning ? store.stopAuto() : store.startAuto()"
          :disabled="store.isFinished"
        >
          <span v-if="store.isFinished">✅ Готово (Max найден)</span>
          <span v-else>{{
            store.isRunning ? "⏸ Стоп" : "▶️ Авто-запуск"
          }}</span>
        </button>
        <button class="btn btn-danger" @click="store.reset">🗑 Сброс</button>
      </div>

      <details class="details">
        <summary>Показать геномы текущего поколения</summary>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Гены (Bin)</th>
                <th>X (Dec)</th>
                <th>Fitness</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ind in store.population"
                :key="ind.id"
                :class="{ best: ind.id === store.bestSolution?.id }"
              >
                <td>{{ ind.id }}</td>
                <td class="mono">{{ ind.genes.join("") }}</td>
                <td>{{ ind.x }}</td>
                <td>{{ ind.y }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  </div>
</template>

<style lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  text-align: center;
  h1 {
    margin: 0;
    color: #6c63ff;
  }
  p {
    color: #888;
    margin: 5px 0 0;
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
}

.toggle {
  display: flex;
  background: #e0e0e0;
  border-radius: 8px;
  padding: 2px;
  button {
    border: none;
    padding: 5px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    &.active {
      background: white;
      color: #6c63ff;
      shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  }
}

.stats {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  b {
    color: #2d3436;
    font-size: 1.1rem;
  }
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
  &:active {
    transform: scale(0.98);
  }
  &-primary {
    background: #e0e0e0;
    color: #333;
  }
  &-accent {
    background: #6c63ff;
    color: white;
  }
  &-danger {
    background: #ff5252;
    color: white;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.details {
  margin-top: 10px;
  summary {
    cursor: pointer;
    color: #6c63ff;
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.table-wrap {
  max-height: 200px;
  overflow-y: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  th {
    text-align: left;
    border-bottom: 2px solid #eee;
    padding: 5px;
  }
  td {
    padding: 5px;
    border-bottom: 1px solid #eee;
  }
  .mono {
    font-family: monospace;
    letter-spacing: 2px;
  }
  .best {
    background: #e8f5e9;
    color: #2e7d32;
    font-weight: bold;
  }
}

.btn-success {
  background: #4caf50;
  color: white;
  cursor: default;
}
</style>
