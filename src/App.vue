<template>
  <div id="app" @click="hideContextMenu()">
    <form-questions @openContextMenu="openContextMenu"/>
    <footer>
      <div class="copyright"><a href="http://copyright.ru" target="_blank"><img src="http://copyright.ru/images/TMCIMG/copyright_1.gif" alt ="www.copyright.ru" title ="Copyright защита прав"></a> <span class="name">Николай Матусевич</span> <span>{{new Date().getFullYear()}}</span></div>
    </footer>

    <ki-context
        ref="kiContext"
        minWidth='1em'
        maxWidth='15em'
        backgroundColor='#fbfbfb'
        fontSize='15px'
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
    openContextMenu(event, item) {
      console.log(item)
      let contextMenuItem = [
        {
          icon: "arrow-up",
          text: 'Default',
          click: () => {
            alert('Option0!')
          }
        },
        {
          icon: 'arrow-right',
          text: 'With divider',
          divider: true,
          click: () => {
            alert('Option2!')
          }
        },
        {
          icon: 'arrow-down',
          text: 'Disabled',
          disabled: true,
          click: () => {
            alert('Option3!')
          }
        }]

      this.$refs.kiContext.show(event, contextMenuItem);

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
  height: 100%;
  display: flex;
  flex-direction: column;
}
footer {
  padding-top: 10px;

}

.copyright {
  opacity: .5;
  display: flex;
  align-items: center;
}

.copyright:hover {
  opacity: 1;
}

.copyright a {
  margin-right: 5px;
}

.copyright .name{
  margin-right: 5px;
}
</style>
