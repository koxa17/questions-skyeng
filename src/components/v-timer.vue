<template>
  <div class="timer">

    <div class="timer__break">
      <h3>{{ titleTimer }}</h3>

      <div class="timer__app" :class="{border: statusTimer}" @contextmenu.prevent.stop="openContextMenuTimer($event)">
        <template v-if="time.hours">
          <span class="time__app__minutes">{{ time.hours }}</span>
          <span class="time__app__divider">:</span>
        </template>
        <span class="time__app__minutes">{{ time.minutes < 10 ? `0${time.minutes}` : time.minutes }}</span>
        <span class="time__app__divider">:</span>
        <span class="time__app__seconds">{{ time.seconds < 10 ? `0${time.seconds}` : time.seconds }}</span>
      </div>

      <div class="timer__buttons">
        <button v-if="!statusTimer" class="btn btn__run" @click="timeGo(true)">{{ btnRun }}</button>
        <button v-else class="btn btn__pause" @click="timeGo(false)">{{ btnPause }}</button>
      </div>

    </div>

  </div>
</template>

<script>
import {saveDataToLocalStorage} from "@/assets/tools/script";

export default {
  name: "v-timer",
  props: {
    btnRun: {
      type: String,
      default: "Старт"
    },
    btnPause: {
      type: String,
      default: "Пауза"
    },
    titleTimer: {
      type: String,
      default: "Таймер"
    },
    timerId: {
      type: String,
      default: 'defaultTimer'
    }
  },
  mounted() {
    const storageTimer = JSON.parse(localStorage.getItem(this.timerId))

    if (storageTimer && typeof storageTimer === 'object') {
      this.time = storageTimer
    }

  },
  data() {
    return {
      statusTimer: false,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      timerSetIntervalId: '',
    }
  },
  methods: {
    openContextMenuTimer(event) {

      let contextMenuItem = [
        {
          icon: 'fa-clock',
          text: 'Сбросить',
          click: () => {
            clearInterval(this.timerSetIntervalId)
            this.statusTimer = false

            this.time = {
              hours: 0,
              minutes: 0,
              seconds: 0,
            }

            saveDataToLocalStorage(this.timerId, this.time)
          }
        }]

      this.$emit("showContextMenuTimer", event, contextMenuItem)
    },
    timeGo(status) {

      saveDataToLocalStorage(this.timerId, this.time)

      if (status) {
        this.statusTimer = true
        this.timerSetIntervalId = setInterval(() => {
          if (this.time.seconds >= 59) {

            this.time.seconds = 0

            if (this.time.minutes >= 59) {
              this.time.minutes = 0

              if (this.time.hours >= 23) {
                this.time.hours = 0
              } else {
                this.time.hours++
              }

            } else {
              this.time.minutes++
            }

          } else {
            this.time.seconds++
          }

        }, 1000)

      }

      if (!status) {
        clearInterval(this.timerSetIntervalId)
        this.statusTimer = false
      }

    },

  },
  watch: {
    time: {
      handler(newValue){
        saveDataToLocalStorage(this.timerId, newValue)
      },
        deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.timer {
  margin: 15px 0;
}

.timer__break {
  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    margin: 0;
  }
}

.timer__app {
  font-size: 26px;
  font-weight: bold;
  border: 1px solid;
  margin-bottom: 10px;
  padding: 11px;
  border-radius: 5px;
  margin-top: 10px;
  width: 116px;
  text-align: center;
  &:hover {
    cursor: url(https://i.stack.imgur.com/ygtZg.png), auto;
    border-color: #0057ec;
  }
}

.btn {
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 600;
  width: 140px;
}

.border {
  outline: 2px solid green;
}

</style>