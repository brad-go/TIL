/**
 * 브릿지 패턴이 디바이스들과 그들의 리모콘들을 관리하는 앱의 거대한
 * 코드 덩어리를 어떻게 나눌 수 있는지 나타내는 예제입니다.
 * Device 클래스들은 구현 계층을 나타내고, Remote 클래스는 추상 계층을 나타냅니다.
 *
 * 최상위 Reomte 클래스에는 Device 객체와 연결된 참조 필드를 선언합니다. 모든
 * Remote 객체들은 일반 Device 인터페이스를 통해 Device 객체들과 함께 동작합니다.
 * 따라서 동일한 Remote 클래스에서 여러 Device 타입과 함께 동작할 수 있습니다.
 *
 * Remote 클래스들을 Device 클래스들과 독립적으로 개발이 가능합니다. 새로운
 * Remote 하위 클래스를 만들기만 하면 됩니다. 예를 들어 최상위 Remote에는
 * 버튼 두개가 있을 수 있지만, 추가 배터리 또는 터치 스크린과 같은 기능을
 * 추가하면서 Remote 클래스를 확장할 수 있습니다.
 *
 * 클라이언트 코드는 Remote 클래스의 생성자를 통해 원하는 타입의 리모콘을
 * 특정 Deivce 객체(기기)와 연결합니다.
 */

/**
 * "추상화"계층은 두 클래스 계층의 "제어" 부분을 위한 인터페이스를 정의합니다.
 * 이는 "구현"계층의 객체에 대한 참조를 유지하고 해당 객체에게 모든 실제
 * 작업을 위임합니다.
 */
class RemoteControl {
  constructor(protected device: Device) {}

  togglePoswer() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

/**
 * Device 클래스들과는 독립적이게 추상 계층으로부터 확장이 가능합니다.
 */
class AdvancedRemoteControl extends RemoteControl {
  mute() {
    this.device.setVolume(0);
  }
}

/**
 * "구현" 인터페이스는 모든 구체적인 구현 클래스들을에서 사용할 메서드들을
 * 선언합니다. 추상화 계층의 인터페이스와 일치할 필요는 없습니다.
 * 사실, 두 인터페이스들은 완전히 다를 수 잇습니다. 대체적으로 구현 인터페이스는
 * 원시적인 동작을 제공하는 반면에, 추상 계층에는 이 원시적인 동작들을 기반으로 한
 * 고수준의 동작들을 정의합니다.
 */
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

/**
 * 모든 디바이스들은 동일한 인터페이스를 따릅니다.
 */
class Tv implements Device {
  isEnabled(): boolean {
    throw new Error("Method not implemented.");
  }
  enable(): void {
    throw new Error("Method not implemented.");
  }
  disable(): void {
    throw new Error("Method not implemented.");
  }
  getVolume(): number {
    throw new Error("Method not implemented.");
  }
  setVolume(percent: number): void {
    throw new Error("Method not implemented.");
  }
  getChannel(): number {
    throw new Error("Method not implemented.");
  }
  setChannel(channel: number): void {
    throw new Error("Method not implemented.");
  }
}

class Radio implements Device {
  isEnabled(): boolean {
    throw new Error("Method not implemented.");
  }
  enable(): void {
    throw new Error("Method not implemented.");
  }
  disable(): void {
    throw new Error("Method not implemented.");
  }
  getVolume(): number {
    throw new Error("Method not implemented.");
  }
  setVolume(percent: number): void {
    throw new Error("Method not implemented.");
  }
  getChannel(): number {
    throw new Error("Method not implemented.");
  }
  setChannel(channel: number): void {
    throw new Error("Method not implemented.");
  }
}

const tv = new Tv();
const remote = new RemoteControl(tv);
remote.togglePoswer();

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
