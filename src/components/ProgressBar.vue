<template>
  <div
    v-show="!isHidden"
    :class="{ hidden: isHidden, error: hasError }"
    :style="{ width: `${percent}%` }"
  />
</template>

<script>
export default {
  data () {
    return {
      isHidden: true,
      hasError: false,
      percent: 0
    }
  },
  methods: {
    start () {
      this.percent = 0
      this.isHidden = false
      this.timer = setInterval(() => {
        this.percent++
      }, 100)
    },
    finish () {
      this.percent = 100
      this.isHidden = true
      clearInterval(this.timer)
    },
    fail () {
      this.hasError = true
      this.percent = 100
    }
  }
}
</script>

<style scoped>
  div {
    height: 1.5rem;
    background: linear-gradient(
      to right,
      #1f005c,
      #5b0060,
      #870160,
      #ac255e,
      #ca485c,
      #e16b5c,
      #f39060,
      #ffb56b
    );
    background-size: 100vw;
  }
</style>
