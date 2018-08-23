<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo(src='@/assets/thinc_logo.png')
    div(style='height: 3em')
    button.button.cyc(
      :class='btnClass'
      @click='handleClick()'
    ) {{ !randomed ? 'SPIN' : 'RESET'}} 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setTimeout } from 'timers';
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
export default class Login extends Vue {
  public isloading: boolean = true;
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
      this.loading = false;
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
  protected handleClick() {
    this.loading = true;
    if (!this.randomed) {
      this.goRandom();
    } else {
      this.reset();
    }
    setTimeout(() => {
      this.loading = false;
      this.$forceUpdate();
    }, 3000);
  }
  private get btnClass() {
    return {
      'is-loading': this.loading,
      'is-danger': this.randomed,
      'is-success': !this.randomed
    };
  }
}
</script>

<style lang='stylus'>
$size = 300px;

.button.cyc {
  width: $size;
  height: $size;
  border-radius: $size;
  font-size: 5rem;
  font-weight: bold;
  overflow: hidden;

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
    width: 200px;
    height: ($size * 2);
    transform: translate(0px, 160px) rotate(60deg);
  }
}

.button.is-loading::after {
  position: absolute;
  content: 'Loading' !important;
  height: $size !important;
  width: $size !important;
  left: 0 !important;
  top: 0 !important;
  position: absolute !important;
  border: 0.3em solid #dbdbdb !important;
}
</style>