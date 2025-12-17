export interface Individual {
  id: string;
  genes: number[]; // Массив 0 и 1 (длина 6)
  x: number; // Значение фенотипа (число от -10 до 53)
  y: number; // Значение фитнес-функции f(x)
}

export type Goal = "max" | "min";

// Конфигурация алгоритма
interface GAConfig {
  a: number;
  b: number;
  c: number;
  d: number;
  minX: number;
  maxX: number;
  popSize: number;
  mutationRate: number; // 0.0 - 1.0
}

export class GeneticAlgorithm {
  private population: Individual[] = [];
  private config: GAConfig;
  private generation = 0;

  constructor(config: GAConfig) {
    this.config = config;
    this.initPopulation();
  }

  // Целевая функция: a + bx + cx^2 + dx^3
  private f(x: number): number {
    const { a, b, c, d } = this.config;
    return a + b * x + c * x * x + d * x * x * x;
  }

  // Декодирование: Биты -> Число [-10, 53]
  // 6 бит: 0..63. Смещаем на minX (-10).
  private decode(genes: number[]): number {
    const decimal = parseInt(genes.join(""), 2);
    return this.config.minX + decimal;
  }

  // 1. Инициализация (Случайные биты)
  private initPopulation() {
    this.population = [];
    this.generation = 0;

    // Определяем длину хромосомы (для 64 шагов нужно 6 бит)
    const range = this.config.maxX - this.config.minX + 1;
    const geneLength = Math.ceil(Math.log2(range)); // Должно быть 6

    for (let i = 0; i < this.config.popSize; i++) {
      const genes = Array.from({ length: geneLength }, () =>
        Math.random() > 0.5 ? 1 : 0,
      );
      const x = this.decode(genes);

      // Проверка границ (на случай если диапазон не степень двойки)
      if (x > this.config.maxX) {
        i--;
        continue;
      }

      this.population.push({
        id: Math.random().toString(36).substring(7),
        genes,
        x,
        y: this.f(x),
      });
    }
  }

  // 2. Селекция (Турнирный отбор)
  private select(goal: Goal): Individual {
    const tournamentSize = 3;
    let best: Individual | null = null;

    for (let i = 0; i < tournamentSize; i++) {
      const randomInd =
        this.population[Math.floor(Math.random() * this.population.length)];
      if (!best) {
        best = randomInd;
      } else {
        if (goal === "max" && randomInd.y > best.y) best = randomInd;
        if (goal === "min" && randomInd.y < best.y) best = randomInd;
      }
    }
    return best!;
  }

  // 3. Кроссовер (Одноточечный)
  private crossover(p1: Individual, p2: Individual): number[] {
    const point = Math.floor(Math.random() * p1.genes.length);
    // Берем начало от первого, конец от второго
    return [...p1.genes.slice(0, point), ...p2.genes.slice(point)];
  }

  // 4. Мутация (Инверсия бита)
  private mutate(genes: number[]): number[] {
    return genes.map((bit) => {
      if (Math.random() < this.config.mutationRate) {
        return bit === 1 ? 0 : 1;
      }
      return bit;
    });
  }

  // --- ГЛАВНЫЙ ЦИКЛ (Эволюция) ---
  public nextGeneration(goal: Goal) {
    const newPop: Individual[] = [];

    // Элитизм: сохраняем лучшего без изменений
    const bestCurrent = this.getBest(goal);
    newPop.push(bestCurrent);

    while (newPop.length < this.config.popSize) {
      // Селекция
      const p1 = this.select(goal);
      const p2 = this.select(goal);

      // Размножение
      let childGenes = this.crossover(p1, p2);

      // Мутация
      childGenes = this.mutate(childGenes);

      // Создание особи
      const x = this.decode(childGenes);

      // Валидация границ (если вылетели за 53)
      if (x >= this.config.minX && x <= this.config.maxX) {
        newPop.push({
          id: Math.random().toString(36).substring(7),
          genes: childGenes,
          x,
          y: this.f(x),
        });
      }
    }

    this.population = newPop;
    this.generation++;
  }

  // --- Getters ---
  public getPopulation() {
    return this.population;
  }

  public getGeneration() {
    return this.generation;
  }

  public getBest(goal: Goal): Individual {
    return this.population.reduce((prev, curr) => {
      if (goal === "max") return curr.y > prev.y ? curr : prev;
      return curr.y < prev.y ? curr : prev;
    });
  }

  // Для отрисовки графика функции (справочно)
  public getFunctionPoints() {
    const points = [];
    for (let x = this.config.minX; x <= this.config.maxX; x++) {
      points.push({ x, y: this.f(x) });
    }
    return points;
  }
}
