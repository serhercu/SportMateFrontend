<template>
    <div class="custom-stepper-content">
      <div class="progress-bar">
        <div
          v-for="n in pTotalSteps"
          :key="n"
          class="block"
          :class="{ active: n <= pStep }"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pStep: {
        type: Number,
        required: true,
      },
      pTotalSteps: {
        type: Number,
        required: true,
      }
    },
    watch: {
      pStep(newVal) {
        if (newVal > 3) {
          const blocks = document.querySelectorAll(".block");
          blocks.forEach((block, index) => {
            if (index < 3) {
              block.classList.add("orange");
            }
          });
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .custom-stepper-content {
    position: relative;
  }
  
  .progress-bar {
    display: flex;
    margin-bottom: 10px;
  }
  
  .block {
    flex: 1;
    height: 10px;
    margin-right: 10px;
    background-color: #ccc;
  }
  
  .block.active {
    background-color: #007bff;
  }
  </style>
  