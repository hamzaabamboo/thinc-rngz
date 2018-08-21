<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo.is-small(src='@/assets/thinc_logo.png')
    div(style='height: 3em')

    div
      div.column.figure.square.image
        img.is-rounded(src="https://scontent.fbkk5-8.fna.fbcdn.net/v/t1.0-9/27973655_1682647955130051_2651645178200390804_n.jpg?_nc_cat=0&_nc_eui2=AeELNwn8ksGaurog36CAb85Uy1KB0DszN3phZ8FJa9jJlL-sWBQIMQgm1Dxnhf5G-otEreccpzKpsEmTpI2uWryaZiWM8j9HG_1ynfOoFkKoog&oh=fa5ef47d2206f090fac27684d92b8386&oe=5C0099CC")
      div(style='height: 3rem')
      div.column.white.is-pull-left
        | fname : Krist
        | lname : Pornpairin dw wer e rt
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style>
.image.square img {
  width: 300px;
}
</style>