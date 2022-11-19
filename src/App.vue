<template>
  <div id="app" @click="hideContextMenu()">
    <form-questions @showContextMenu="showContextMenu" @showContextMenuTimer="showContextMenuTimer"/>
    <footer>
      <div class="copyright">
        <a href="https://koxa17.github.io/myPortfolio/" target="_blank">
          &#169;
          <span class="name"> {{ new Date().getFullYear() === 2022 ? '2022' : `2022 - ${new Date().getFullYear()}` }} Николай Матусевич </span>
        </a>
      </div>
    </footer>

    <ki-context
        ref="kiContext"
        backgroundColor='#fbfbfb'
        fontSize='15px'
        textColor='#35495e'
        iconColor='#41b883'
        borderRadius='0.1'
        maxWidth='15em'
    />
    <audio src="./assets/audio/screenshot__sound.ogg" id="sound"></audio>

    <!--    <div class="what-btn">-->
    <!--      <a href="#" class="what-circle-button question" @click.prevent="openModalWhatToDo"></a>-->
    <!--    </div>-->

  </div>
</template>

<script>


import FormQuestions from "@/components/form-questions";

export default {
  name: 'App',
  components: {
    FormQuestions
  },
  methods: {
    showContextMenu(event, menu) {
      this.$refs.kiContext.show(event, menu);
    },
    showContextMenuTimer(event, menu) {
      this.$refs.kiContext.show(event, menu);
    },
    hideContextMenu() {
      this.$refs.kiContext.hide();
    },
    openModalWhatToDo() {

      this.$awn.modal(
          `
          <div class="modal-instruction">
      <h1>Привет я твой чек лист?</h1>
      <h4>Давай посмотрим что я умею</h4>
      <ul>
        <li>1. Добавлять</li>
        <li>2. УДалять</li>
        <li>3. Редактировать</li>
        <li>4. Сосать</li>
        <li>5. Лизать</li>
        <li>6. Сохрнаять</li>
      </ul>
    </div>
          `
      )
    }
  }
}
</script>

<style lang="scss">
*, *::after, *::before {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  padding-top: 10px;
  font-size: 12px;
}

.copyright {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 5px;
  margin-left: 5px;
}

.copyright a:hover {
  opacity: 1;
  text-decoration: underline;
}

.copyright a {
  color: black;
  text-decoration: none;
  margin-right: 5px;
  opacity: .5;
}

.copyright .name {
  margin-right: 5px;
}

.what-btn {
  position: fixed;
  bottom: 0;
  right: 0;

  .what-circle-button {
    background: #74d0ff;
    border-radius: 50%;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, .3), inset 0 4px 1px 1px white, inset 0px -3px 1px 1px rgba(204, 198, 197, .5);
    height: 70px;
    margin: 0 30px 30px 0;
    position: relative;
    width: 70px;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    text-align: center;
    float: left;
    opacity: .5;
  }

  .what-circle-button:after {
    color: #e9e6e4;
    content: "";
    display: block;
    font-size: 30px;
    height: 30px;
    text-decoration: none;
    text-shadow: 0px -1px 1px #bdb5b4, 1px 1px 1px white;
    position: absolute;
    width: 30px;
    animation: pulsate 1.2s linear infinite 5s;
  }

  .question:after {
    content: "?";
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }

  .what-circle-button:hover {
    background-image: -webkit-linear-gradient(top, #fff, #f4f1ee);
    background-image: linear-gradient(top, #fff, #f4f1ee);
    color: #0088cc;
    opacity: 1;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
  }

  .question:hover:after {
    color: #f1ab00;
    text-shadow: 0 0 6px #f1ab00;
    animation-play-state: paused;
  }


}

@keyframes pulsate {
  50% {
    color: yellow;;
    text-shadow: 0 -1px rgba(0, 0, 0, .3), 0 0 5px #ffd, 0 0 8px #fff;
  }
}


</style>
