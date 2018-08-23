<template lang="pug">
  div(v-if="!loading")
    button( @click="goRandom()") Click to random !
    button( v-if="randomed" @click="reset()") Click to reset
    ul(v-for="member in members")
      li {{ member.name }}
  div(v-else) Loading...
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { db } from '@/common/firebase';

function shuffle(array: any[]): any[] {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

@Component({
  components: {}
})
export default class Control extends Vue {
  randomed: boolean = false;
  loading: boolean = true;
  members: any[] = ['Loading...'];
  groups: string[][] = [];

  mounted() {
    db
      .collection('status')
      .doc('current')
      .onSnapshot(doc => {
        const { random } = doc.data() as any;
        this.randomed = random;
        this.loading = false;
      });
    db.collection('members').onSnapshot(snapshot => {
      const newMembers: any[] = [];
      snapshot.forEach(doc => {
        newMembers.push({ ...doc.data(), id: doc.id }); //gender
      });
      this.members = newMembers;
      this.$forceUpdate();
    });
  }

  public goRandom(): void {
    this.groups = [];
    this.members = shuffle(this.members);
    const membersRef = db.collection('members');
    const batch = db.batch();
    for (let i = 0, j = 0; i < this.members.length; i++) {
      this.groups[j] = !this.groups[j] ? [] : this.groups[j];
      this.groups[j].push(this.members[i]);
      const { name, gender } = this.members[i];
      batch.set(membersRef.doc(this.members[i].id), {
        name,
        gender,
        group: j + 1
      });
      j = j > 6 ? 0 : j + 1;
    }
    batch.commit();
    db
      .collection('status')
      .doc('current')
      .set({
        random: true
      });
  }

  public reset(): void {
    db
      .collection('status')
      .doc('current')
      .set({
        random: false
      });
    this.groups = [];
    const membersRef = db.collection('members');
    const batch = db.batch();
    this.members.forEach(member => {
      const { name, gender } = member;
      batch.set(membersRef.doc(member.id), {
        name,
        gender
      });
    });
    batch.commit();
  }
}
</script>
