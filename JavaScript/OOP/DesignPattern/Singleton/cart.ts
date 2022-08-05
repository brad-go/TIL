/**
 * 세 명의 손님이 함께 장을 보러 왔다고 해봅시다. 카트는 한 대를 이용하고,
 * 카트의 용량만큼 물건을 넣을 수 있습니다.카트의 용량이 넘는 개수의 물건을
 * 넣는 것은 불가능합니다.
 */

class Cart {
  private static instance: Cart;

  private cart: Item[] = [];
  private capacity = 10;

  private constructor() {}

  // 카트의 인스턴스를 반환하는 싱글톤 클래스의 생성자
  static getInstance(): Cart {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }

    return Cart.instance;
  }

  // 카트에 물건 담기
  addItem(item: Item): void {
    const currentItemcount = this.getCurrentItemsCount();

    if (currentItemcount + item.count > this.capacity) {
      console.log(
        `카트가 가득 찼습니다. 현재 넣을 수 있는 물건의 개수: ${
          this.capacity - currentItemcount
        }`
      );
      return;
    }

    this.cart.push(item);
  }

  // 현재 카트에 담긴 물건들의 개수를 반환하는 함수
  private getCurrentItemsCount(): number {
    return this.cart.reduce((total, item) => {
      return total + item.count;
    }, 0);
  }
}

class Item {
  constructor(public name: string, public count: number) {}
}

const item1 = new Item("라면", 5);
const item2 = new Item("콜라", 3);
const item3 = new Item("우유", 4);

// 초기 상태
console.log(Cart.getInstance()); // Cart { cart: [], capacity: 10 }

// 첫번째 고객
const customer1 = Cart.getInstance();
customer1.addItem(item1);
console.log(Cart.getInstance()); // Cart { cart: [ Item { name: '라면', count: 5 } ], capacity: 10 }

// 두번째 고객
const customer2 = Cart.getInstance();
customer2.addItem(item2);
console.log(Cart.getInstance()); // Cart { cart: [ Item { name: '라면', count: 5 }, Item { name: '콜라', count: 3 } ], capacity: 10 }

// 세번째 고객
const customer3 = Cart.getInstance();
customer3.addItem(item3); // 카트가 가득 찼습니다. 현재 넣을 수 있는 물건의 개수: 2
