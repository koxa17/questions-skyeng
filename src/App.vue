<template>
  <div id="app" @click="hideContextMenu()" >
    <form-questions @showContextMenu="showContextMenu" @showContextMenuTimer="showContextMenuTimer"/>
    <footer>
      <div class="copyright"><a href="https://koxa17.github.io/myPortfolio/" target="_blank">&#169;  <span class="name"> {{new Date().getFullYear()}} Николай Матусевич </span></a></div>
    </footer>

    <ki-context
        ref="kiContext"
        backgroundColor='#fbfbfb'
        fontSize='14px'
        textColor='#35495e'
        iconColor='#41b883'
        borderRadius='0.1'
    />

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
  }
}
</script>

<style lang="scss">
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

.copyright .name{
  margin-right: 5px;
}
</style>
