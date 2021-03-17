<template>
  <div
    :class="{ hidden: isHidden, error: hasError }"
    :style="{ width: `${percent}%` }"
  />
</template>

<script>
  export default {
    data() {
      return {
        isHidden: true,
        hasError: false,
        percent: 0
      };
    },
    methods: {
      start() {
        this.percent = 0;
        this.isHidden = false;
        this.timer = setInterval(() => {
          this.percent++;
        }, 100);
      },
      finish() {
        this.percent = 100;
        this.isHidden = true;
        clearInterval(this.timer);
      },
      fail() {
        this.hasError = true;
        this.percent = 100;
      }
    }
  };
</script>
