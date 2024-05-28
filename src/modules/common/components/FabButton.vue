<template>
  <button
    @click="$emit('click')"
    :class="['btn btn-circle btn-secondary fixed overflow-hidden', position]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type Props = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

defineEmits(['click']);
</script>

<style scoped>
scriptleft {
  @apply top-10 left-10;
}

.top-right {
  @apply top-10 right-10;
}

.bottom-left {
  @apply bottom-10 left-10;
}

.bottom-right {
  @apply bottom-10 right-10;
}
</style>
