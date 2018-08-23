<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo.is-small(src='@/assets/thinc_logo.png')
    div(style='height: 4em')
    div.columns.is-multiline
      div.column.is-one-quarter(v-for='grp in grouping') 
        ul.box
          li.is-size-5(v-for='m in grp') {{m.name}}

</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { db } from '@/common/firebase';
import { grouping } from './grouping';
@Component({
  components: {}
})
export default class Home extends Vue {
  protected members: any[] = ['Loading...'];

  public mounted() {
    db.collection('members').onSnapshot((snapshot) => {
      const newMembers: any[] = [];
      snapshot.forEach((doc) => {
        newMembers.push(doc.data());
      });
      this.members = newMembers;
    });
    this.$forceUpdate();
  }
  get grouping(): any {
    return grouping(this.members);
  }
}
</script>

<style>
.image.square img {
  width: 300px;
}
.section {
  max-width: 1000px;
}
.column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>