<template>
  <div>
    Hi
    {{ test }}
  </div>
</template>

<script>
export default {
  name: 'KaznacheyIndex',

  data() {
    return {
      test: null
    };
  },

  async mounted() {
    this.test = await $fetch('/api/test')
  },

  methods: {
    
  },
};
</script>
