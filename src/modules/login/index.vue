<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    div(style='height: 15vh')
    img.thinc-logo(src='@/assets/thinc_logo.png')
    div(style='height: 2em')
    button.button.is-info.is-rounded.is-large.fb(@click="handleLogin()" v-if="!isAuth")
      span.icon
        i.fa.fa-facebook
      span login with facebook
    h3(v-else) You're logged in !
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
@Component({
  components: {}
})
export default class Login extends Vue {
  @Getter('currentUser') user: any;
  @Getter('isAuthenticated') isAuth: any;
  @Action public login: any;

  private handleLogin(): void {
    this.login();
  }
}
</script>

<style>
.fb {
  background-color: #3b5998 !important;
  border-width: 0px 0px 2px 0px !important;
  border-color: #082b6f !important;
}
</style>
