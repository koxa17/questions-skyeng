<template>

  <div class="form-questions">

    <h1>
      <span @contextmenu.prevent.stop="openResetList">Check-list!</span>
    </h1>
    <div class="screenshot" ref="screenshot">

      <question-item
          :questions="questions"
          @onClick="(question, more) => questionIncrement(question, more)"
          @onContext="(event, question, more) => openContextMenu(event, question, more)"
          @onBlur="(event, question) => saveContentInput(event, question)"
      />


            <div class="options-btns">
              <button class="btn-add"><font-awesome-icon icon="fa-plus" /></button>
            </div>


      <div class="wrapper">
        <input type="text" class="author" v-model="author"/>
        <div>
          <div class="date">{{ new Date().toLocaleDateString() }}.г</div>
        </div>
      </div>

    </div>
    <div class="questions__buttons">
      <button @click="formReset">Очистить <img src="../assets/images/clear_icon.png" alt=""></button>
      <button @click="getScreenshot($event)">Скриншот <img src="../assets/images/screenshot_icon.png" alt=""></button>
      <a href="#" ref="down" class="hidden">скачать</a>
    </div>


    <div class="timers" :class="{'timers-close': !timers}">
      <div class="icon__close" :class="{'icon__close-open': !timers}" @click="toggleTimers">
        <font-awesome-icon v-if="timers" icon="fa-circle-xmark"/>
        <div v-else class="icon__open">Показать таймер
          <font-awesome-icon icon="fa-clock-four"/>
        </div>
      </div>


      <v-timer
          v-show="timers"
          btn-run="Личный перерыв"
          btn-pause="Работаю"
          title-timer="Личный перерыв"
          @showContextMenuTimer="(event, contextMenuItem)=> $emit('showContextMenuTimer', event, contextMenuItem)"
          timer-id="break"
      />

      <v-timer
          v-show="timers"
          btn-run="Не работаю"
          btn-pause="Работаю"
          title-timer="Не работаю"
          @showContextMenuTimer="(event, contextMenuItem)=> $emit('showContextMenuTimer', event, contextMenuItem)"
          timer-id="work"
      />


    </div>


  </div>

</template>

<script>
import html2canvas from 'html2canvas';
import VTimer from "@/components/v-timer";
import {getDataFromLocalStorage, playAudio, removeKeyLocalStorage, saveDataToLocalStorage} from "@/assets/tools/script";
import QuestionItem from "@/components/question-item";
import {questionsDefault} from "@/data/script";

export default {
  name: "form-questions",
  components: {QuestionItem, VTimer},
  props: {},
  mounted() {
    let questions = getDataFromLocalStorage("questions")
    let author = getDataFromLocalStorage("author")
    let showTimers = getDataFromLocalStorage("showTimers")


    if (questions) {
      this.questions = questions
    } else {
      saveDataToLocalStorage("questions", this.questions)
    }


    if (author) {
      this.author = author
    }

    if (showTimers) {
      this.timers = showTimers
    }

  },
  data() {
    return {
      questions: questionsDefault,
      options: {
        divider: true
      },
      author: "Кристина Матусевич",
      timers: false,
    }
  },
  methods: {
    questionIncrement(question, more, operation = true) {
      let indexElement = this.questions.findIndex(item => {
        return item === question
      })

      if (more) {
        let moreIndexElement = this.questions[indexElement].more.findIndex(moreItem => {
          return moreItem === more
        })
        const result = parseInt(this.questions[indexElement].more[moreIndexElement].result)
        this.$set(this.questions[indexElement].more[moreIndexElement], 'result', operation ? result + 1 : result - 1)
      } else {
        const result = parseInt(this.questions[indexElement].result)
        this.$set(this.questions[indexElement], 'result', operation ? result + 1 : result - 1)
      }
    },
    formReset() {
      let questions = []
      let onOk = () => {

        questions = this.questions = this.questions.map(item => {
          if (item.result > 0 || !isNaN(item.result)) {
            item.result = 0
          }

          if (item.more) {
            item.more.map(itemMore => {
              if (itemMore.result > 0 || !isNaN(itemMore.result)) {
                itemMore.result = 0
              }
            })

          }
          return item
        })
        this.$set(this.questions, '', questions)
        saveDataToLocalStorage("questions", questions)

        this.$awn.success("Форма была очищенна!", {
          labels: {
            success: ''
          }
        })

      };

      this.$awn.confirm(
          "Вы уверенны что хотите очистить форму?",
          onOk,
          () => {},
          {
            labels: {
              confirm: 'Очиска формы',
              confirmOk: "Да",
              confirmCancel: 'Отмена'
            }
          }
      )

    },
    async getScreenshot() {
      playAudio()
      const canvas = await html2canvas(this.$refs.screenshot)
      this.$refs.down.download = 'filename.png';
      this.$refs.down.href = canvas.toDataURL()
      this.$refs.down.click();
    },
    openContextMenu(event, question, more) {
      let disabled = parseInt(question.result || more.result) === 0

      let contextMenuItem = [
        {
          icon: 'fa-pen',
          text: 'Редактировать',
          divider: true,
          click: () => {
            const input = event.target
            input.removeAttribute('readonly')
            input.focus()
            input.selectionStart = input.value.length;
          }
        },
        {
          icon: "fa-minus",
          text: 'Минус 1',
          disabled: disabled,
          click: () => {
            if (question.result > 0 || more.result > 0) {
              this.questionIncrement(question, more ? more : false, false)
            }
          }
        }]

      this.$emit("showContextMenu", event, contextMenuItem)
    },
    saveContentInput(event, question) {
      const input = event.target

      if (event.target.value.length > 1) {
        question.result = event.target.value = event.target.value.replace(/^0+/, '')
      }

      if (!event.target.value) {
        event.target.value = 0
        question.result = 0
      }


      input.setAttribute('readonly', 'readonly')
    },
    toggleTimers() {
      this.timers = !this.timers
      if (this.timers) {
        saveDataToLocalStorage('showTimers', true)
      } else {
        removeKeyLocalStorage('showTimers')
      }

    },
    openResetList(event) {
      let thisRoot = this
      let contextMenuItem = [
        {
          icon: 'fa-eraser',
          text: 'Сбросить список',
          divider: true,
          click: () => {
            this.$awn.confirm(
                "Вы уверенны что хотите сбросить список?",
                onOk,
                () => {},
                {
                  labels: {
                    confirm: 'Сброс списка',
                    confirmOk: "Да",
                    confirmCancel: 'Отмена'
                  }
                }
            )

            function onOk() {
              debugger;
              thisRoot.questions = questionsDefault;

              thisRoot.$awn.success("Список был сброшен!", {
                labels: {
                  success: ''
                }
              })

            }

          }
        }
      ]
      this.$emit("showContextMenu", event, contextMenuItem)
    }
  },
  watch: {
    questions: {
      handler(newValue) {
        saveDataToLocalStorage("questions", newValue)
      },
      deep: true,
    },
    author(newValue) {
      saveDataToLocalStorage("author", newValue)
    }
  }
}
</script>

<style scoped lang="scss">


.form-questions {
  width: 600px;
  margin: 0 auto 15px auto;
  flex: 1 1;

  & h1 {
    text-align: center;
    margin: 5px 0 0 0;
    font-family: 'Kaushan Script', cursive;

    span {
      cursor: url(https://i.stack.imgur.com/ygtZg.png), auto;
    }
  }
}

.screenshot {
  padding: 10px;
}


.questions__buttons {
  margin-top: 30px;
  display: flex;
  align-items: start;
  justify-content: space-between;

  & button {
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    background: none;
    font-size: 14px;
    justify-content: center;
    flex-basis: 33%;
  }

  & button:hover {
    background: rgba(128, 128, 128, 0.35);
  }

  & button img {
    width: 25px;
    margin-left: 10px;
  }
}


.date {
  font-size: 18px;
  text-align: right;
}

a.hidden {
  display: none;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.author {
  font-size: 18px;
  font-style: italic;
  flex: 1 1;
  cursor: pointer;
  border: none;
}

.timers {
  display: flex;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
  position: relative;

  & .timers-close {
    border-color: transparent;
  }

  &.timers-close {
    border: none;
  }

  & .icon__close {
    position: absolute;
    left: 10px;
    cursor: pointer;

    &.icon__close-open {
      left: 0;
    }
  }

  & .icon__open {
    border: 2px solid black;
    padding: 6px;
    border-radius: 10px;
  }
}

.options-btns {
  width: 100%;
  margin-bottom: 5px;
  text-align: right;
}

.btn-add {
  width: 42px;
  height: 26px;
  border: 1px solid black;
  opacity: .4;

  &:hover {
    opacity: 1;
  }
}

</style>

<style>
.awn-toast-content {
  font-size: 18px;
}
</style>