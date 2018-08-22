<template lang="pug">
  div
    h1 This is add page
    div(v-if="isAuth")
      input(v-model="name")
      button(@click="addMember") Add
      select(v-model="gender")
        option(value="male") Male
        option(vaule="female") Female
    div(v-else)
      span You're not logged in
    ul
      li(v-for="member in members") {{ member }}
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
