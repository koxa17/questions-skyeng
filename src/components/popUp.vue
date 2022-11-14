<template>
  <div class="popup" :style="`background-color: ${statuses[status].value}`">
    <div class="popup__message">
       {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: "popUp",
  props: {
    message: {
      type: String,
      default: 'Сообщение!'
    },
    status: {
      type: String,
      default: 'success!'
    }
  },
  data() {
    return {
      statuses: {
        success: {
          value: 'rgba(65, 187, 55, 0.5)'
        },
        danger: {
          value: 'rgba(175, 3, 49, 0.55)'
        },
        warning: {
          value: 'rgba(245, 204, 4, 0.55)'
        },
      }
    }
  }
}
</script>

<style scoped>
.popup {
  border-radius: 10px;
  border: 1px solid gray;
  background: rgba(154, 153, 150, 0.55);
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>