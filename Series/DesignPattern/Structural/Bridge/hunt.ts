// 추상화 계층
class Animal {
  constructor(
    protected hunting: HuntingHandler,
    private name: string,
    private power: number
  ) {}

  getName() {
    return this.name;
  }

  getPower() {
    return this.power;
  }

  hunt(animals: Animal[]): void {
    console.log("사냥을 시작합니다.");
  }
}

// 추상화 계층 확장
class Tiger extends Animal {
  hunt(animals: Animal[]) {
    const quarries: Animal[] = this.hunting.findQuarry(animals, this);
    const quarry: Animal = this.hunting.detectedQuarry(quarries);
    console.log(`호랑이가 ${quarry.getName()} 사냥을 시작합니다.`);
    this.hunting.attack(quarry);
  }
}

// 추상화 계층 확장
class Bird extends Animal {
  hunt(animals: Animal[]) {
    const quarries: Animal[] = this.hunting.findQuarry(animals, this);
    const quarry: Animal = this.hunting.detectedQuarry(quarries);
    console.log(`새가 ${quarry.getName()} 사냥을 시작합니다.`);
    this.hunting.attack(quarry);
  }
}

// 추상화 계층 확장
class Rabbit extends Animal {
  hunt(animals: Animal[]) {
    const quarries: Animal[] = this.hunting.findQuarry(animals, this);
    const quarry: Animal = this.hunting.detectedQuarry(quarries);
    console.log(`새가 ${quarry.getName()} 사냥을 시작합니다.`);
    this.hunting.attack(quarry);
  }
}

// 구현 계층 인터페이스
interface HuntingHandler {
  findQuarry(animals: Animal[], hunter: Animal): Animal[];
  detectedQuarry(quaries: Animal[]): Animal;
  attack(animal: Animal): void;
}

// 구체적인 구현부
class HuntingMethod1 {
  findQuarry(animals: Animal[], hunter: Animal): Animal[] {
    return animals;
  }

  detectedQuarry(quarries: Animal[]): Animal {
    const quarryIndex = Math.floor(Math.random() * quarries.length - 1) + 1;
    console.log(quarries[quarryIndex], quarryIndex);
    return quarries[quarryIndex];
  }

  attack(quarry: Animal) {
    console.log(`${quarry.getName()}를 공격합니다.`);
  }
}

// 구체적인 구현부
class HuntingMethod2 {
  findQuarry(animals: Animal[], hunter: Animal): Animal[] {
    const quarries: Animal[] = [];

    animals.forEach((animal) => {
      if (animal.getPower() < hunter.getPower()) quarries.push(animal);
    });

    return quarries;
  }

  detectedQuarry(quarries: Animal[]): Animal {
    const quarryIndex = Math.floor(Math.random() * quarries.length - 1) + 1;

    return quarries[quarryIndex];
  }

  attack(quarry: Animal) {
    console.log(`${quarry.getName()}를 공격합니다.`);
  }
}

const predetor = new HuntingMethod1();
const prey = new HuntingMethod2();

const tiger = new Tiger(predetor, "호랑이", 90);
const bird = new Bird(prey, "새", 30);
const rabbit = new Rabbit(prey, "토끼", 20);

const animals = [tiger, bird, rabbit];
tiger.hunt(animals);

// Tiger { hunting: HuntingMethod1 {}, name: '호랑이', power: 90 } 0
// 호랑이가 호랑이 사냥을 시작합니다.
// 호랑이를 공격합니다.
