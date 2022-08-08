// 부대 단위 - 구성 요소 인터페이스
interface MilitaryUnit {
  getLeader(): string;
  getNumbers(): number;
}

// 분대
class Squad implements MilitaryUnit {
  constructor(private leader: string) {}

  getLeader(): string {
    return this.leader;
  }

  getNumbers(): number {
    return 8; // 일반적으로 한 분대는 8명 정도
  }
}

// 소대
class Platoon implements MilitaryUnit {
  constructor(private leader: string, private squads: Squad[] = []) {}

  getLeader(): string {
    return this.leader;
  }

  getNumbers(): number {
    return this.squads.reduce((numbers, squad) => numbers + squad.getNumbers(), 0); // prettier-ignore
  }

  addSquad(squad: Squad): Platoon {
    this.squads.push(squad);
    return this;
  }
}

// 중대
class Company implements MilitaryUnit {
  constructor(private leader: string, private platoons: Platoon[] = []) {}

  getLeader(): string {
    return this.leader;
  }

  getNumbers(): number {
    return this.platoons.reduce((numbers, platoon) => numbers + platoon.getNumbers(), 0); // prettier-ignore
  }

  addPlatoon(platoon: Platoon): Company {
    this.platoons.push(platoon);
    return this;
  }
}

const squad1 = new Squad("James");
const squad2 = new Squad("Oliver");
const squad3 = new Squad("Tom");
const squad4 = new Squad("Jane");
const squad5 = new Squad("Lukas");
const squad6 = new Squad("Brian");
const squad7 = new Squad("Peter");
const squad8 = new Squad("Ruseel");
const squad9 = new Squad("Max");

const platoon1 = new Platoon("Gordon");
const platoon2 = new Platoon("Martin");
const platoon3 = new Platoon("Robert");

platoon1.addSquad(squad1).addSquad(squad2).addSquad(squad3);
platoon2.addSquad(squad4).addSquad(squad5).addSquad(squad6);
platoon3.addSquad(squad7).addSquad(squad8).addSquad(squad9);

const company = new Company("Edward");

company.addPlatoon(platoon1).addPlatoon(platoon2).addPlatoon(platoon3);

console.log(company.getLeader());
console.log(company.getNumbers());
console.log(platoon1.getNumbers());
