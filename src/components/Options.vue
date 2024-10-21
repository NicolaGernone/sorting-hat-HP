<template>
    <div class="options-container">
        <button
        v-for="(option, i) in options"
        :key="i"
        @click="handleClick(option)"
        class="option-button"
        >
        {{ option.title }}
        </button>
    </div>
</template>
  
<script>
import '@/styles/options.css';

export default {
    name: 'OptionsComponent',
    props: {
    options: Array,
    },
    methods: {
      handleClick(option) {
        this.$emit('select', option);
      },
    },
  };
  </script>