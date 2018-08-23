<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo.is-small(src='@/assets/thinc_logo.png')
    div(style='height: 3em')
    div(v-if = "loading") Loading...
    div(v-else)
      div.column.figure.square.image
        img.is-rounded(src="https://scontent.fbkk5-8.fna.fbcdn.net/v/t1.0-9/27973655_1682647955130051_2651645178200390804_n.jpg?_nc_cat=0&_nc_eui2=AeELNwn8ksGaurog36CAb85Uy1KB0DszN3phZ8FJa9jJlL-sWBQIMQgm1Dxnhf5G-otEreccpzKpsEmTpI2uWryaZiWM8j9HG_1ynfOoFkKoog&oh=fa5ef47d2206f090fac27684d92b8386&oe=5C0099CC")
      div(style='height: 3rem')
      div.column.white.is-pull-left
        | fname : Krist
        | lname : Pornpairin dw wer e rt
      div(v-if="randomed")
        ul(v-for="(group, index) in groups")
          li Group - {{ index + 1 }} 
          li(v-for="member in group") {{ member }}
      ul(v-else)
        li(v-for="member in members") {{ member }}

</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { db } from '@/common/firebase';

@Component({
  components: {}
})
export default class Home extends Vue {
  members: any[] = ['Loading...'];
  loading: boolean = true;
  randomed: boolean = false;
  groups: string[][] = [];

  mounted() {
    const membersRef = db.collection('members');
    db
      .collection('status')
      .doc('current')
      .onSnapshot(doc => {
        this.loading = true;
        const { random } = doc.data() as any;
        this.randomed = random;
        if (random) {
          membersRef.get().then(docs => {
            this.updateGroups(docs);
            this.updateMembers(docs);
            this.loading = false;
            this.$forceUpdate();
          });
        } else {
          membersRef.get().then(docs => {
            this.updateMembers(docs);
            this.loading = false;
          });
        }
        this.loading = false;
      });
    db.collection('members').onSnapshot(docs => {
      if (this.randomed) {
        this.updateGroups(docs);
        this.updateMembers(docs);
      }
    });
  }
  private updateGroups(docs: firebase.firestore.QuerySnapshot): void {
    this.groups = Array(8)
      .fill(undefined)
      .map(() => []);
    docs.forEach(doc => {
      const { name, group } = doc.data() as any;
      this.randomed && group && this.groups[group - 1].push(name);
    });
  }
  private updateMembers(docs: firebase.firestore.QuerySnapshot): void {
    const newMembers: string[] = [];
    docs.forEach(doc => {
      newMembers.push(doc.data().name);
    });
    this.members = newMembers;
  }
}
</script>

<style>
.image.square img {
  width: 300px;
}
</style>