<template lang="pug">
  div(v-if="!loading")
    button( @click="goRandom()") Click to random !
    button( v-if="randomed" @click="reset()") Click to reset
    ul(v-if="groups" v-for="(group, index) in groups")
      li Group - {{ index + 1 }} 
      li(v-for="member in group") {{ member.name }}
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
    for (let i = 0, j = 0; i < this.members.length; i++) {
      this.groups[j] = !this.groups[j] ? [] : this.groups[j];
      this.groups[j].push(this.members[i]);
      j = j > 7 ? 0 : j + 1;
    }
    db
      .collection('status')
      .doc('current')
      .set({
        random: true
      });
  }

  public reset(): void {
    this.groups = [];
    db
      .collection('status')
      .doc('current')
      .set({
        random: false
      });
  }
}
</script>
