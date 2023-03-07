export abstract class MilitaryUnit {
  protected superiorUnit!: MilitaryUnit | null;

  constructor(protected leader: string) {}

  getLeader(): string {
    return this.leader;
  }

  getSuperiorUnit(): MilitaryUnit | null {
    return this.superiorUnit;
  }

  setSuperiorUnit(superiorUnit: MilitaryUnit | null): void {
    this.superiorUnit = superiorUnit;
  }

  isSuperior(): boolean {
    return false;
  }

  addSubordinateUnit(unit: MilitaryUnit): void {}
  abstract getNumbers(): number;
}

export class SubordinateUnit extends MilitaryUnit {
  getNumbers(): number {
    return Math.floor(Math.random() * 7) + 8; // 8 - 15명 중 랜덤
  }
}

export class SuperiorUnit extends MilitaryUnit {
  protected units: MilitaryUnit[] = [];

  addSubordinateUnit(unit: MilitaryUnit): void {
    this.units.push(unit);
  }

  isSuperior(): boolean {
    return true;
  }

  getNumbers(): number {
    return this.units.reduce((numbers, unit) => numbers + unit.getNumbers(), 0);
  }
}

function getNumberOfUnits(militaryUnit: MilitaryUnit) {
  console.log(`총원: ${militaryUnit.getNumbers()}`);
}

const squad1 = new SubordinateUnit("Gordon");
const sqaud2 = new SubordinateUnit("Martin");
const sqaud3 = new SubordinateUnit("Robert");
const squad4 = new SubordinateUnit("Jane");
const squad5 = new SubordinateUnit("Lukas");
const squad6 = new SubordinateUnit("Brian");
const squad7 = new SubordinateUnit("Peter");
const squad8 = new SubordinateUnit("Ruseel");
const squad9 = new SubordinateUnit("Max");

console.log(`${squad1.getLeader()}의 분대`); // Gordon의 분대
getNumberOfUnits(squad1); // 총원: 14

const platoon1 = new SuperiorUnit("Samuel");
platoon1.addSubordinateUnit(squad1);
platoon1.addSubordinateUnit(sqaud2);
platoon1.addSubordinateUnit(sqaud3);
console.log(`${platoon1.getLeader()}의 소대`); // Samuel의 소대
getNumberOfUnits(platoon1); // 총원: 29

const platoon2 = new SuperiorUnit("Martin");
const platoon3 = new SuperiorUnit("Robert");

platoon2.addSubordinateUnit(squad4);
platoon2.addSubordinateUnit(squad5);
platoon2.addSubordinateUnit(squad6);
platoon3.addSubordinateUnit(squad7);
platoon3.addSubordinateUnit(squad8);
platoon3.addSubordinateUnit(squad9);

const company = new SuperiorUnit("Peter");
company.addSubordinateUnit(platoon1);
company.addSubordinateUnit(platoon2);
company.addSubordinateUnit(platoon3);
console.log(`${company.getLeader()}의 중대`); // Peter의 중대
getNumberOfUnits(company); // 총원: 98
console.log("");

function getNumberOfUnits2(unit1: MilitaryUnit, unit2: MilitaryUnit) {
  if (unit1.isSuperior()) {
    unit1.addSubordinateUnit(unit2);
  }
  console.log(`총원: ${unit1.getNumbers()}`);
}

getNumberOfUnits2(company, squad1); // 총원: 114
