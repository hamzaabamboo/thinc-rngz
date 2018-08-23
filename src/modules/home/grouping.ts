import _ from 'lodash';
interface Member {
    name: string;
    gender: string;
}
export function grouping(members: Member[]): Member[][] {
    const groups: Member[][] = Array(8).fill(undefined).map(() => []);
    _.shuffle(members).forEach((member: Member, idx: number) => {
        groups[idx % 8].push(member);
    });
    return _.shuffle(groups);
}
