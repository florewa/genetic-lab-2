<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'main';

interface Props {
  variant?: Variant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
});
</script>

<template>
  <button :class="['button', `button--${props.variant}`]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  font-weight: 600;
  font-size: 64px;
  line-height: 100%;
  letter-spacing: 0.03em;
  border-radius: 48px;
  padding: 48px;
  cursor: pointer;
  border: none;

  &--primary {
    color: var(--just-white);
    background: var(--accent);
  }
  &--secondary {
    border: 4px solid var(--accent);
    color: var(--accent);
  }

  &--main{
    border: 8px solid var(--just-white);
    border-radius: 112px;
    padding: 40px 80px;
    backdrop-filter: blur(32px);
    background: rgba(163, 61, 37, 0.5);
    font-weight: 600;
    font-size: 64px;
    color: var(--just-white);
  }
}
</style>
