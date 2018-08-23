<template lang="pug">
section.hero.is-fullheight.thinc-bg
  div.section.center
    img.thinc-logo.is-small(src='@/assets/thinc_logo.png')
    div(style='height: 4em')
    div(v-if="loading") Loading...
    div(v-else-if="randomed").columns.is-multiline
      div.column.is-one-quarter(v-for='(grp, grpID) in groups') 
        ul.box
          h1.pop-title {{grpID + 1}}
          li.is-size-5(
            v-for='member in grp' 
            :style='{color: member.gender == "male" ? "green" : "red"}'
          ) {{member.name}}
    div(v-else)
      div.tags
        div.tag.is-size-6(v-for='member in members') {{member.name}}

</template>

<script lang="ts">
import * as _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { db } from '@/common/firebase';
import { grouping } from './grouping';

interface Member {
    name: string;
    gender: string;
}
@Component({
  components: {}
})
export default class Home extends Vue {
  public members: Member[] = [];
  public loading: boolean = true;
  public randomed: boolean = false;
  public groups: any[][] = [];

  public mounted() {
    console.log('/home mounted');
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
    const docsList: Member[] = [];
    docs.forEach((doc: any) => {
      docsList.push(doc.data());
    });
    console.log(docsList);
    this.groups = grouping(docsList);
    // console.log(docs)
    // this.groups = Array(8)
    //   .fill(undefined)
    //   .map(() => []);
    // docs.forEach(doc => {
    //   console.log('updateGroup', doc.data());
    //   const { name, group } = doc.data() as any;
    //   if (this.randomed && group) {
    //     this.groups[group - 1].push(name);
    //   }
    // });
    this.$forceUpdate();
  }
  private get grouping(): Member[][] {
    return grouping(this.members);
  }
  private updateMembers(docs: firebase.firestore.QuerySnapshot): void {
    const newMembers: any[] = [];
    docs.forEach(doc => {
      newMembers.push(doc.data());
    });
    this.members = newMembers;
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
.pop-title {
  position: absolute;
  background-color: rgb(255, 255, 255);
  border-radius: 10000px;
  font-size: 2rem;
  width: 50px;
  margin: -3.5rem auto 0 0px;
  box-shadow: 2px 2px 10px #222;
}
.box {
  margin-top: 3rem;
  padding-top: 2rem !important;
}
</style>