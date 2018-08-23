<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo.is-small(src='@/assets/thinc_logo.png')
    div(style='height: 3rem')
    div(v-if="isAuth" align='center')
      div.field.is-grouped(style='justify-content: center')
        p.control: input.input.is-inline(v-model="name" placeholder='name' maxLength='15')
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
  @Getter('isAuthenticated') public isAuth: any;
  private name: string = '';
  private gender: string = 'male';
  private loading: boolean = false;
  private randomed: boolean = false;
  private members: string[] = [];

  public mounted() {
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
    // this.groupNo();
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
  private async groupNo(): Promise<any> {
    const groupCount = Array(8).fill(0);
    const docs = await db.collection('members').get();
    return new Promise((resolve, reject) => {
      docs.forEach(doc => {
        groupCount[doc.data().group - 1] += 1;
      });
      for (let i = 0; i < groupCount.length; i++) {
        if (i === groupCount.length) {
          continue;
        } else {
          if (groupCount[i] > groupCount[i + 1]) {
            resolve(i + 2);
          }
        }
      }
    });
  }
  // private removeMember(): void {}
}
</script>

<style scoped>
.section {
  max-width: 800px;
}
</style>
