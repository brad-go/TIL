/* 
물류 관리 프로그램을 만든다고 해보죠. 초기 버전에서는 트럭 운송만 처리할 수 있으므로 
대부분의 코드는 트럭 클래스 내부에 존재합니다. 그러나 앱이 유명해져서 매일 해상 운송 
회사로부터 해상 물류 앱에 통합해 달라는 요청을 받는다면 어떡할까요?

현재 대부분의 코드는 트럭 클래스와 결합되어 있습니다. 해상 물류를 위한 배 클래스를 
앱에 추가하려면 전체적인 코드 변경이 필요합니다. 거기다가 후에 다른 타입의 운송 수단을 
추가하기로 결정했다면 또다시 대부분의 코드의 변경이 필요하게 됩니다. 결과적으로 운송 객체의 
클래스에 따라 앱의 동작을 전환하는 조건부로 가득찬 더러운 코드가 될 것입니다.

예를 들어, `트럭`과 `배` 클래스 모두 운송이라는 메서드가 정의된 `운송수단`이라는 
인터페이스의 구현이 필요합니다. 각 클래스는 이 운송 메서드를 다르게 구현합니다. 
트럭은 땅에서 화물을 운송하고, 배는 바다에서 화물을 운송합니다.

팩토리 메서드를 사용하는 코드(다르게 클라이언트 코드라고 함)는 추상적인 `운송수단` 클래스로 
모든 제품을 다루게 되지만, 다양한 하위 클래스에서 반환된 실제 Product 간의 차이를 알지 못합니다. 
클라이언트는 모든 운송 수단 객체가 운송 메서드를 가지고 있다는 것을 알지만, 정확히 
어떻게 동작하는지 아는 것은 클라이언트에게 중요하지 않습니다.
*/

// Creator - 팩토리 메서드를 갖는 추상 클래스
abstract class Logistics {
  // 팩토리 메서드
  abstract createTransport(): Transport;

  planDelivery(): string {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

// Concrete Creator 1 - 팩토리 메서드를 구현하는 클래스로 Concrete Product 객체를 생성
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

// Concrete Creator 2 - 팩토리 메서드를 구현하는 클래스로 Concrete Product 객체를 생성
class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

// Product - 팩토리 메서드로 생성될 객체의 공통 인터페이스
interface Transport {
  deliver(): string;
}

// Concrete Product 1 - 객체를 생성
class Truck implements Transport {
  deliver(): string {
    return "트럭이 물품을 운반합니다.";
  }
}

// Concrete Product 2 - 객체를 생성
class Ship implements Transport {
  deliver(): string {
    return "배가 물품을 운반합니다.";
  }
}

function deliverProduct(logistics: Logistics) {
  console.log(logistics.planDelivery());
}

console.log("도로를 통해 운송이 시작됩니다. ");
deliverProduct(new RoadLogistics());
console.log("");

console.log("바다를 통해 운송이 시작됩니다. ");
deliverProduct(new SeaLogistics());

// 도로를 통해 운송이 시작됩니다.
// 트럭이 물품을 운반합니다.

// 바다를 통해 운송이 시작됩니다.
// 배가 물품을 운반합니다.
