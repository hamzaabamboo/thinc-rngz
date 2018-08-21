<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo(src='@/assets/thinc_logo.png')
    div(style='height: 3em')
    button.button.cyc(
      :class='btnClass'
      @click='submit'
    ) SPIN
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setTimeout } from 'timers';

@Component({
  components: {}
})
export default class Login extends Vue {
  public isloading = false;
  public isdownloaded = false;
  protected submit() {
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
      this.isdownloaded = true;
      this.$forceUpdate();
    }, 3000);
  }
  private get btnClass() {
    return {
      'is-loading': this.isloading,
      'is-danger': !this.isdownloaded,
      'is-success': this.isdownloaded
    };
  }
}
</script>

<style lang='stylus'>

$size = 300px;

.button.cyc {
  width:  $size;
  height: $size;
  border-radius: $size;
  font-size: 5rem;
  font-weight: bold;
  overflow hidden;
  &.is-danger {
    -webkit-box-shadow: 0 0 0 0.13em rgba(255, 56, 96, 0.25);
    box-shadow: 0 0 0 0.13em rgba(255, 56, 96, 0.25);
  }
  &.is-success {
    -webkit-box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);
    box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);
  }
  &:before {
    content: '';
    color: red;
    position: absolute;
    background-color: #3334;
    width 200px;
    height: ($size * 2);
    transform: translate(0px, 160px) rotate(60deg);
  }
}

.button.is-loading::after {
    position: absolute;
    content: 'Loading' !important;
    height: $size !important;
    width:  $size !important;
    left: 0 !important;
    top: 0 !important;
    position: absolute !important;
    border: .3em solid #dbdbdb !important;
}
</style>