<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo.is-small(src='@/assets/thinc_logo.png')
    div(style='height: 3rem')
    div(v-if="isAuth" align='center')
      div.field.is-grouped(style='justify-content: center')
        p.control: input.input.is-inline(v-model="name" placeholder='name')
        p.control.select
          select(v-model="gender")
            option(value="male") Male
            option(vaule="female") Female
        p.control: button.button.is-success(@click="addMember") Add
    div(v-else) You're not logged in
    div(style='height: 3rem')
    div.tags
      div.tag.is-size-6(v-for="member in members") {{ member }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { db } from '@/common/firebase';

@Component({
  components: {}
})
export default class Add extends Vue {
  name: string = '';
  gender: string = 'male';
  members: string[] = [];
  @Getter('isAuthenticated') isAuth: any;

  mounted() {
    this.fetchMembers();
  }

  private fetchMembers(): void {
    db
      .collection('members')
      .get()
      .then(data => {
        this.members = data.docs.map(e => e.data().name);
      });
  }
  private addMember(): void {
    db
      .collection('members')
      .doc()
      .set({
        name: this.name,
        gender: this.gender
      })
      .then(() => {
        this.name = '';
        this.fetchMembers();
      });
  }

  private removeMember(): void {}
}
</script>

<style scoped>
.section {
  max-width: 800px;
}
</style>
