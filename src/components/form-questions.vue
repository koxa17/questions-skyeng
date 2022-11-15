<template>

  <div class="form-questions">
    <h1>Чек - лист!</h1>
    <div class="screenshot" ref="screenshot">
      <div class="question" v-for="(question) in questions" :key="question.id">
        <div class="question-btn">
          <p>
            <span>{{ question.id }}. {{ question.title }}</span>
            <span>
            <span v-if="!question.more">
              <button class="btn"
                      @click="questionIncrement(question)">Спросил(а)
              </button>
              <input
                  type="text"
                  class="input__result"
                  readonly
                  v-model="question.result"
                  @contextmenu.prevent.stop="openContextMenu($event, question)"
                  v-mask="'#####'"
                  @blur="saveContentInput($event, question)"
              >
            </span>
          </span>
            <span v-if="question.more">
            <input
                type="text"
                class="input__result input__result-sum"
                readonly
                :value="sumQuestions(question)"
                @contextmenu.prevent.stop
            >
          </span>
          </p>
        </div>
        <ul v-if="question.more">
          <li v-for="(more, idx) in question.more" :key="more.title + '__' + idx">
            <p>
              <span>{{ more.title }}</span>
              <span>
              <button class="btn" @click="questionIncrement(question, more)">Спросил(а)</button>
                <input type="text"
                       class="input__result"
                       readonly
                       v-model="more.result"
                       @contextmenu.prevent.stop="openContextMenu($event, question, more)"
                       v-mask="'#####'"
                       @blur="saveContentInput($event, more)"
                >
            </span>
            </p>
          </li>
        </ul>
      </div>
      <div class="wrapper">
        <input type="text" class="author" v-model="author"/>
        <div class="date">{{ new Date().toLocaleDateString() }}.г</div>
      </div>

    </div>
    <div class="footer">
      <button @click="formReset">Очистить форму <img src="../assets/images/clear_icon.png" alt=""></button>
      <button @click="getScreenshot($event)">Скриншот <img src="../assets/images/screenshot_icon.png" alt=""></button>
      <a href="#" ref="down" class="hidden">скачать</a>
    </div>

    <div class="timers" :class="{'timers-close': !timers}">
      <div class="icon__close" :class="{'icon__close-open': !timers}" @click="toggleTimers">
        <font-awesome-icon v-if="timers" icon="fa-circle-xmark"/>
        <div v-else class="icon__open">Показать таймер <font-awesome-icon  icon="fa-clock-four" /></div>
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

export default {
  name: "form-questions",
  components: {VTimer},
  props: {},
  mounted() {
    let questions = localStorage.getItem("questions")
    let author = localStorage.getItem("author")
    let showTimers = localStorage.getItem("showTimers")


    if (questions) {
      this.questions = JSON.parse(questions)
    } else {
      localStorage.setItem("questions", JSON.stringify(this.questions))
    }



    if (author) {
      this.author = JSON.parse(author)
    }

    if(showTimers.length) {
      this.timers = JSON.parse(showTimers)
    } else {
      localStorage.setItem("showTimers", JSON.stringify(this.timers))
    }

  },
  data() {
    return {
      questions: [
        {id: 1, title: "Уточнил Имя клиента", result: 0},
        {id: 2, title: "Задал открытый вопрос", result: 0},
        {id: 3, title: "Задал вопрос на цель использования", result: 0},
        {id: 4, title: "В презентации рассказал о 2-х прейиуществах", result: 0},
        {
          id: 5, title: "Отработка возражения №1:",
          more: [
            {title: "Уточняющий вопрос", result: 0},
            {title: "Аргумент с 2-мя преймущества", result: 0},
            {title: "Вопрос призыв", result: 0}
          ]
        },
        {
          id: 6, title: "Отработка возражения №2:",
          more: [
            {title: "Уточняющий вопрос", result: 0},
            {title: "Аргумент с 2-мя преймущества", result: 0},
            {title: "Вопрос призыв", result: 0}
          ],
        },
        {id: 7, title: "Спросил про детей!", result: 0},
        {id: 8, title: "Озвучил Акцию", result: 0},
        {id: 9, title: "Попрощался!", result: 0},
      ],
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
    sumQuestions(question) {
      let sum = 0;
      sum = question.more.reduce((prev, curr) => {
        return prev + Number(curr.result)
      }, 0)

      return (typeof sum) === 'number' ? sum : 0
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
        localStorage.setItem("questions", JSON.stringify(questions))

        this.$awn.success("Форма была очищенна!", {
          labels: {
            success: ''
          }
        })

      };

      let onCancel = () => {

      };

      this.$awn.confirm(
          "Вы уверенны что хотите очистить форму?",
          onOk,
          onCancel,
          {
            labels: {
              confirm: '',
              confirmOk: "Да",
              confirmCancel: 'Отмена'
            }
          }
      )

    },
    async getScreenshot() {
      const canvas = await html2canvas(this.$refs.screenshot)
      this.$refs.down.download = 'filename.png';
      this.$refs.down.href = canvas.toDataURL()
      this.$refs.down.click();
    },
    openContextMenu(event, question, more) {
      let disabled = parseInt(question.result) === 0

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
      localStorage.setItem('showTimers', JSON.stringify(this.timers))
    }
  },
  watch: {
    questions: {
      handler(newValue) {
        localStorage.setItem("questions", JSON.stringify(newValue))
      },
      deep: true,
    },
    author(newValue) {
      localStorage.setItem("author", JSON.stringify(newValue))
    }
  }
}
</script>

<style scoped lang="scss">

h1 {
  text-align: center;
  margin: 5px 0 0 0;
}

.form-questions {
  width: 600px;
  margin: 0 auto;
  flex: 1 1;
}

.screenshot {
  padding: 10px;
}

p {
  overflow: hidden;
}

p:after {
  content: '...................................................................................................................................';
  display: block;
  white-space: nowrap;
  overflow: hidden;
}

p span:first-of-type {
  float: left;
  cursor: pointer;
}

p span:last-of-type {
  float: right;
  margin-left: 10px;
}

button {
  padding: 3px 10px;
  cursor: pointer;
}

ul {
  padding-left: 50px;
  margin: 30px 0;
}

.input__result {
  width: 40px;
  margin-left: 10px;
  text-align: center;
  height: 20px;
  font-weight: bold;
  border: 2px solid gray;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
}

.input__result-sum:focus-visible, .input__result:focus-visible {
  outline: none;
}

.input__result:not([readonly]):focus-visible {
  border-color: red;
}

.input__result:hover {
  cursor: default;
}

.input__result:not(.input__result-sum):hover {
  border: 2px solid black;
  cursor: url("https://i.stack.imgur.com/ygtZg.png"), auto;
}


.footer {
  margin-top: 30px;
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.footer button {
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  background: none;
  font-size: 14px;
  width: 165px;
  justify-content: center;
}

.footer button:hover {
  background: rgba(128, 128, 128, 0.35);
}

.footer button img {
  width: 25px;
  margin-left: 5px;
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



</style>

<style>
.awn-toast-content {
  font-size: 18px;
}
</style>