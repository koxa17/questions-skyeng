<template>
  <div id="app">
    <form-questions/>
    <footer>
      <div class="copyright"><a href="http://copyright.ru" target="_blank"><img src="http://copyright.ru/images/TMCIMG/copyright_1.gif" alt ="www.copyright.ru" title ="Copyright защита прав"></a> <span class="name">Николай Матусевич</span> <span>{{new Date().getFullYear()}}</span></div>
    </footer>
  </div>
</template>

<script>


import FormQuestions from "@/components/form-questions";
export default {
  name: 'App',
  components: {
    FormQuestions
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
