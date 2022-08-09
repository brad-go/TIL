/**
 * 도로 표시 방법 조합하기
 *
 * 내비게이션 소프트웨어에서 도로를 표시하는 기능
 * 도로를 간단한 선으로 표시하는 기능(기본 기능)
 * 내비게이션 소프트웨어에 따라 도로의 차선을 표시하는 기능
 */

/**
 * Component Interface
 */
interface Display {
  draw(): void;
}

/**
 * Concrete Component
 * 기본 도로 표시 클래스
 */
class RoadDisplay implements Display {
  draw(): void {
    console.log("기본 도로 표시");
  }
}

/**
 * Base Decorator
 */
class DisplayDecorator implements Display {
  constructor(protected display: Display) {}

  draw(): void {
    return this.display.draw();
  }
}

/**
 * Concrete Decorator
 * 기본 도로 표시 + 부가 기능
 */
class LaneDecorator extends DisplayDecorator {
  draw(): void {
    super.draw(); // 설정된 기존 표시 기능 수행
    this.drawLane(); // 추가적으로 차선 표시
  }

  // 차선 표시 기능만 직접 제공
  drawLane(): void {
    console.log("\t차선 표시");
  }
}

class TrafficDecorator extends DisplayDecorator {
  draw(): void {
    super.draw(); // // 설정된 기존 표시 기능 수행
    this.drawTraffic(); // 추가적으로 교통량 표시
  }

  // 교통량 표시 기능만 직접 제공
  drawTraffic(): void {
    console.log("\t교통량 표시");
  }
}

class CrossingDecorator extends DisplayDecorator {
  draw(): void {
    super.draw(); // 설정된 기존 표시 기능 수행
    this.drawCrossing(); // 추가적으로 교차로 표시
  }

  // 교차로 표시 기능만 직접 제공
  drawCrossing(): void {
    console.log("\t교차로 표시");
  }
}

function client() {
  const road: Display = new RoadDisplay();
  road.draw(); // 기본 도로 표시

  const roadWithLane: Display = new LaneDecorator(road);
  roadWithLane.draw(); // 기본 도로 표시 + 차선 표시

  const roadWithTraffic: Display = new TrafficDecorator(road);
  roadWithTraffic.draw(); // 기본 도로 표시 + 교통량 표시

  const roadWithLaneAndTraffic: Display = new TrafficDecorator(roadWithLane);
  roadWithLaneAndTraffic.draw(); // 기본 도로 표시 + 차선 표시 + 교통량 표시

  const roadWithCrossingLaneAndTraffic: Display = new TrafficDecorator(
    roadWithLaneAndTraffic
  );
  roadWithCrossingLaneAndTraffic.draw(); // 기본 도로 표시 + 차선 표시 + 교통량 표시 + 교차로 표시
}

client();
