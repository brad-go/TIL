/**
 * 가구 매장 시뮬레이터를 만들고 있다고 생각해보자.
 * ArtDeco, Victorian, Modern 세 가구회사가 있습니다.
 * Chair, Sofa, Coffee Table 세 가구가 있습니다.
 *
 * 이때, 고객은 동일한 브랜드의 가구를 장만하길 원합니다. 그러므로 동일한 브랜드의
 * 다른 가구와 일치하도록 개별 가구 객체를 작성하는 방법이 필요합니다.
 */

// Abstract factory
interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createCoffeeTable(): CoffeeTable;
}

// Concrete factory 1
class ArtDecoFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ArtDecoChair();
  }
  createSofa(): Sofa {
    return new ArtDecoSofa();
  }
  createCoffeeTable(): CoffeeTable {
    return new ArtDecoCoffeeTable();
  }
}

// Concrete factory 2
class VictorianFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new VictorianChair();
  }
  createSofa(): Sofa {
    return new VictorianSofa();
  }
  createCoffeeTable(): CoffeeTable {
    return new VictorianCoffeeTable();
  }
}

// Concrete factory 3
class ModernFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }
  createSofa(): Sofa {
    return new ModernSofa();
  }
  createCoffeeTable(): CoffeeTable {
    return new ModernCoffeeTable();
  }
}

// Abstract product A
interface Chair {
  hasLegs(): boolean;
  sitOn(): string;
}

// Concrete product A1
class ArtDecoChair implements Chair {
  hasLegs(): boolean {
    return true;
  }
  sitOn(): string {
    return "ArtDeco 의자에 앉으셨습니다. ";
  }
}

// Concrete product A2
class VictorianChair implements Chair {
  hasLegs(): boolean {
    return true;
  }
  sitOn(): string {
    return "Victorian 의자에 앉으셨습니다. ";
  }
}

// Concrete product A3
class ModernChair implements Chair {
  hasLegs(): boolean {
    return false;
  }
  sitOn(): string {
    return "Modern 의자에 앉으셨습니다. ";
  }
}

// Abstract product B
interface Sofa {
  hasLegs(): boolean;
  sitOn(): string;
}

// Concrete product B1
class ArtDecoSofa implements Sofa {
  hasLegs(): boolean {
    return true;
  }
  sitOn(): string {
    return "ArtDeco 소파에 앉으셨습니다. ";
  }
}

// Concrete product B2
class VictorianSofa implements Sofa {
  hasLegs(): boolean {
    return true;
  }
  sitOn(): string {
    return "Victorian 소파에 앉으셨습니다. ";
  }
}

// Concrete product B3
class ModernSofa implements Sofa {
  hasLegs(): boolean {
    return false;
  }
  sitOn(): string {
    return "Modern 소파에 앉으셨습니다. ";
  }
}

// Abstract product C
interface CoffeeTable {
  hasLegs(): boolean;
}

// Concrete product C1
class ArtDecoCoffeeTable implements CoffeeTable {
  hasLegs(): boolean {
    return false;
  }
}

// Concrete product C2
class VictorianCoffeeTable implements CoffeeTable {
  hasLegs(): boolean {
    return true;
  }
}

// Concrete product C3
class ModernCoffeeTable implements CoffeeTable {
  hasLegs(): boolean {
    return false;
  }
}

// Client code
function orderFurniture(furnitureFactory: FurnitureFactory) {
  const chair = furnitureFactory.createChair();
  const sofa = furnitureFactory.createSofa();
  const coffeeTable = furnitureFactory.createCoffeeTable();

  console.log(chair.hasLegs());
  console.log(chair.sitOn());
  console.log(sofa.hasLegs());
  console.log(sofa.sitOn());
  console.log(coffeeTable.hasLegs());
}

console.log("Client: ArtDeco 가구를 주세요!");
orderFurniture(new ArtDecoFurnitureFactory());
console.log("");

console.log("Client: Victorian 가구를 주세요!");
orderFurniture(new VictorianFurnitureFactory());
console.log("");

console.log("Client: Modern 가구를 주세요!");
orderFurniture(new ModernFurnitureFactory());
