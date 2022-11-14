<template>

  <div class="form-questions">
    <h1>Чек - лист!</h1>
    <div class="screenshot" ref="screenshot">
      <div class="question" v-for="question in questions" :key="question.id">
        <div class="question-btn">
          <p>
            <span>{{ question.id }}. {{ question.title }}</span>
            <span>
            <span v-if="!question.more">
              <button class="btn"
                      @click="questionIncrement(question)">Спросила!</button><input
                type="text" class="input__result" readonly v-model="question.result">
            </span>
          </span>
            <span v-if="question.more">
            <input type="text" class="input__result" readonly
                   :value="sumQuestions(question)">
          </span>
          </p>
        </div>
        <ul v-if="question.more">
          <li v-for="(more, idx) in question.more" :key="more.title + '__' + idx">
            <p>
              <span>{{ more.title }}</span>
              <span>
              <button class="btn" @click="questionIncrement(question, more)">Спросила!</button>
              <input type="text"
                     class="input__result"
                     readonly
                     v-model="more.result">
            </span>
            </p>
          </li>
        </ul>
      </div>
      <div class="date">{{ new Date().toLocaleDateString() }}.г</div>
    </div>
    <div class="footer">
      <button @click="formReset">Очистить форму! <img src="../assets/images/clear_icon.png" alt=""></button>
      <button @click="getScreenshot($event)">Скриншот! <img src="../assets/images/screenshot_icon.png" alt=""></button>
      <a href="#" ref="down" class="hidden">скачать</a>
    </div>

    <notifications position="bottom right"/>

  </div>

</template>

<script>
import html2canvas from 'html2canvas';
export default {
  name: "form-questions",
  props: {},
  mounted() {
    let localStore = localStorage.getItem("questions")
    if (localStore) {
      this.questions = JSON.parse(localStore)
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
      ]
    }
  },
  methods: {
    questionIncrement(question, more) {
      let indexElement = this.questions.findIndex(item => {
        return item === question
      })

      if (more) {
        let moreIndexElement = this.questions[indexElement].more.findIndex(moreItem => {
          return moreItem === more
        })
        this.$set(this.questions[indexElement].more[moreIndexElement], 'result', this.questions[indexElement].more[moreIndexElement].result + 1)
      } else {
        this.$set(this.questions[indexElement], 'result', this.questions[indexElement].result + 1)
      }
    },
    sumQuestions(question) {
      let sum = 0;
      sum = question.more.reduce((prev, curr) => {
        return prev + curr.result
      }, 0)

      return sum
    },
    formReset() {
      let answer = confirm("Вы уверенны что хотите очистить форму?")
      let questions = []
      if (answer) {
        questions = this.questions = this.questions.map(item => {
          if (item.result > 0) {
            item.result = 0
          }

          if (item.more) {
            item.more.map(itemMore => {
              console.log(itemMore)
              if (itemMore.result > 0) {
                itemMore.result = 0
              }
            })

          }
          return item
        })
        this.$set(this.questions, '', questions)
        localStorage.setItem("questions", JSON.stringify(questions))

        this.$notify({type: 'success', text: 'Форма была очищенна!'})

      }
    },
    async getScreenshot() {
      const canvas = await html2canvas(this.$refs.screenshot)
      this.$refs.down.download = 'filename.png';
      this.$refs.down.href = canvas.toDataURL()
      this.$refs.down.click();
    }
  },
  watch: {
    questions: {
      handler(newValue) {
        localStorage.setItem("questions", JSON.stringify(newValue))
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.form-questions {
  width: 600px;
  margin: 0 auto;
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

</style>

<style>
.vue-notification {
  font-size: 18px;
}
</style>