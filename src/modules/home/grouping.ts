interface Member {
    name: string;
    gender: string;
}
import _ from 'lodash';
function grouping(members: Member[]): any {
    let res = [[], [], [], [], [], [], [], []]
    for (let x in members) {
        // console.log(x);
        res[x % 8].push(members[x]);
    }
    console.log(res)
    return res
}

export { grouping };
