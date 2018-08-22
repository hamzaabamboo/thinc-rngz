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
  loading: boolean = false;
  randomed: boolean = false;
  members: string[] = [];
  @Getter('isAuthenticated') isAuth: any;

  mounted() {
    this.fetchMembers();
  }

  private fetchMembers(): void {
    db
      .collection('status')
      .doc('current')
      .onSnapshot(doc => {
        this.loading = true;
        const { random } = doc.data() as any;
        this.randomed = random;
      });
    db
      .collection('members')
      .get()
      .then(data => {
        this.members = data.docs.map(e => e.data().name);
      });
    this.groupNo();
  }
  private async addMember(): Promise<void> {
    if (this.randomed) {
      db
        .collection('members')
        .doc()
        .set({
          name: this.name,
          gender: this.gender,
          group: await this.groupNo()
        })
        .then(() => {
          this.name = '';
          this.fetchMembers();
        });
    } else {
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
  }
  async groupNo(): Promise<any> {
    const groupCount = Array(8).fill(0);
    const docs = await db.collection('members').get();
    return new Promise((resolve, reject) => {
      docs.forEach(doc => {
        groupCount[doc.data().group - 1] += 1;
      });
      for (let i = 0; i < groupCount.length; i++) {
        if (i == groupCount.length) continue;
        else {
          if (groupCount[i] > groupCount[i + 1]) {
            resolve(i + 2);
          }
        }
      }
    });
  }
  private removeMember(): void {}
}
</script>
