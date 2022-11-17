<template>
  <div>
    <transition-group name="list" tag="p">
      <div v-for="(question, idx) in questions" :key="question.id" :class="{'mt-30': question.more}">
        <p class="question__item">
        <span class="question__item__text">
          <span class="question__item__text__number">{{ idx + 1 }}.</span>
          <span class="question__item__text--editable" contenteditable="false"
                @dblclick="contentEditableOnChange($event)"
                @blur="contentEditableBlur($event, question)">{{ question.title }}</span>
        </span>
          <span>
            <span v-if="!question.more">
              <button class="btn"
                      @click="$emit('onClick', question)">Спросил(а)
              </button>
              <input
                  type="text"
                  class="input__result"
                  readonly
                  v-model="question.result"
                  @contextmenu.prevent.stop="$emit('onContext', $event, question)"
                  v-mask="'#####'"
                  @blur="$emit('onBlur', $event, question)"
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

        <ul v-if="question.more">
          <li v-for="(more, idx) in question.more" :key="more.title + '__' + idx">
            <p class="question__item">
              <span class="question__item__text">{{ more.title }}</span>
              <span>
              <button class="btn" @click="$emit('onClick', question, more)">Спросил(а)</button>
                <input type="text"
                       class="input__result"
                       readonly
                       v-model="more.result"
                       @contextmenu.prevent.stop="$emit('onContext', $event, question, more)"
                       v-mask="'#####'"
                       @blur="$emit('onBlur', $event, more)"
                >
            </span>
            </p>
          </li>
        </ul>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "question-item",
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    sumQuestions(question) {
      let sum = 0;
      sum = question.more.reduce((prev, curr) => {
        return prev + Number(curr.result)
      }, 0)

      return (typeof sum) === 'number' ? sum : 0
    },
    contentEditableOnChange(e) {
      const target = e.target
      target.setAttribute('contenteditable', true)
      target.focus()
    },
    contentEditableBlur(e, question) {
      const target = e.target
      target.setAttribute('contenteditable', false)

      if (target.innerText !== '' && !!target.innerText) {
        question.title = target.innerText
      } else {
        target.innerText = question.title
        console.log(e.target.innerText)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.question__item {
  overflow: hidden;
  font-family: 'Kaushan Script', cursive;

  &__text {
    margin-right: 7px;

    &-input {
      border: 2px solid transparent;
    }

    &__number {
      margin-right: 5px;
    }

    &--editable {
      cursor: pointer;

      &[contenteditable="true"] {
        padding: 5px 10px;
        cursor: text;
      }
    }

  }


  &:after {
    content: '...................................................................................................................................';
    display: block;
    white-space: nowrap;
    overflow: hidden;
  }

  & span:first-of-type {
    float: left;
    cursor: pointer;
  }

  & span:last-of-type {
    float: right;
  }

}

.mt-30 {
  margin-top: 25px;
}

ul {
  margin: 0 0 25px 0;
}

.input__result {
  width: 42px;
  margin-left: 10px;
  text-align: center;
  height: 26px;
  font-weight: 700;
  border: 2px solid gray;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;

  &-sum:focus-visible, &:focus-visible {
    outline: none;
  }

  &:not([readonly]):focus-visible {
    border-color: red;
  }

  &:hover {
    cursor: default;
  }

  &:not(&-sum):hover {
    border: 2px solid black;
    cursor: url("https://i.stack.imgur.com/ygtZg.png"), auto;
  }

}

.btn {
  padding: 3px 10px;
  cursor: pointer;
  margin-left: 5px;
}


.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}
</style>