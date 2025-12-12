<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'white';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'blue'
});

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
};

const colorClasses = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  white: 'text-white'
};
</script>

<template>
  <div class="flex items-center justify-center">
    <svg 
      :class="[
        'animate-spin',
        sizeClasses[size],
        colorClasses[color]
      ]"
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        class="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        stroke-width="4"
      ></circle>
      <path 
        class="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>