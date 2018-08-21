<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    div(style='height: 15vh')
    img.thinc-logo(src='@/assets/thinc_logo.png')
    div(style='height: 2em')
    button.button.is-info.is-rounded.is-large.fb
      span.icon
        i.fa.fa-facebook
      span login with facebook
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Login extends Vue {}
</script>

<style>
.fb {
  background-color: #3b5998 !important;
  border-width: 0px 0px 2px 0px !important;
  border-color: #082b6f !important;
}
</style>
