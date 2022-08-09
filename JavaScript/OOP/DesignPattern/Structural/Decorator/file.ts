/**
 * 데코레이터 패턴을 사용해서 실제로 사용하는 코드와 독립적으로
 * 민감한 데이터를 압축하고 암호화하는 예제입니다.
 *
 * 어플리케이션은 DataSource 객체를 한 쌍의 데코레이터로 감쌉니다.
 * 두 Wrapper 모두 디스크에 데이터를 읽고 쓰는 방식을 변경합니다.
 *
 * - 데이터가 디스크에 기록되기 직전에 데코레이터는 데이터를 암호화하고 압축합니다. 기존
 * 클래스는 변경 사항을 모른채 암호화되고 보호된 데이터를 파일에 작성합니다.
 * - 디스크에서 데이터를 읽은 직후 데코레이터를 거쳐 압축을 풀고 디코딩합니다.
 *
 * Decorator와 DataSource 클래스는 동일한 인터페이스를 구현하므로 클라이언트
 * 코드에서 모두 상호 교환이 가능합니다.
 */

import fs from "fs";
import CryptoJS from "crypto-js";
import LZString from "lz-string";

/**
 * Component
 * Component 인터페이스는 데코레이터가 변경할 수 있는 작업을 정의합니다.
 */
interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

/**
 * Concrete Component
 * 메서드에 대한 기본 구현을 작성합니다.
 * 프로그램에서 이러한 클래스의 여러 변형이 있을 수 있습니다.
 */
class FileDataSource implements DataSource {
  constructor(private filename: string) {}

  writeData(data: string): void {
    // 데이터를 저장하는 코드
    fs.writeFileSync(`./${this.filename}`, data);
  }

  readData(): string {
    // 데이터를 읽어오는 코드
    const data = fs.readFileSync(`./${this.filename}`, "utf8");
    return data;
  }
}

/**
 * 최상위 데코레이터 클래스는 다른 Components들과 동일한 인터페이스를 따릅니다.
 * 이 클래스의 주된 목적은 모든 구체적인 데코레이터 클래스들을 위한 인터페이스를
 * 정의하는 것입니다. 감싸는 코드의 기본 구현에는 감싸진 컴포넌트를 저장하기 위한
 * 필드를 포함할 수 있고, 이는 초기화를 의미합니다.
 */
class DataSourceDecorator implements DataSource {
  protected wrappee: DataSource;

  constructor(source: DataSource) {
    this.wrappee = source;
  }

  /**
   * 최상위 데코레이터는 단순히 모든 작업을 감싼 구성 요소(Component)에게 위임합니다.
   * 추가 행위는 구체적인 데코레이터 클래스에서 추가될 수 있습니다.
   */
  writeData(data: string): void {
    this.wrappee.writeData(data);
  }

  /**
   * 구체적인 데코레이터들은 감싼 객체를 직접 호출하는 것 대신에 부모가 구현한
   * 동작을 호출할 것입니다. 이 접근은 데코레이터 클래스의 확장을 단순화합니다.
   */
  readData(): string {
    return this.wrappee.readData();
  }
}

/**
 * 구체적인 데코레이터들은 감싼 객체에서 메서드를 호출해야 하지만, 결과에
 * 그들만의 무언가를 추가할 수 있습니다. 데코레이터는 감싸진 객체에 대한 호출
 * 전이나 후에 추가된 동작을 실행할 수 있습니다.
 */
class EncryptionDecorator extends DataSourceDecorator {
  private readonly SECRET_KEY = "secret key";

  writeData(data: string): void {
    // CryptoJS를 이용해서 AES 알고리즘을 통한 암호화
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.SECRET_KEY
    ).toString();
    // 부모의 메서드를 직접 호출하는 것이 아닌 감싼 객체를 통해 호출 및 파일에 암호화된 저장하기
    super.writeData(encrypted);
  }

  readData(): string {
    // 파일에 있는 데이터 읽어오기, 부모 직접 호출 x 감싼 객체를 통해 호출
    const encrypted = super.readData();
    // AES 알고리즘 복호화 - 복구 키 필요(암호화 시 지정한 암호 키)
    const bytes = CryptoJS.AES.decrypt(encrypted, this.SECRET_KEY);
    // 인코딩, 문자열로 변환, JSON 변환 - 사실 이 코드에서는 text 데이터를 다루므로 JSON으로 stringify 및 parse 가 필요 x
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decrypted;
  }
}

class CompressDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    // LZString을 이용한 문자열 데이터 압축하기
    const compressed = LZString.compress(data);
    super.writeData(compressed);
  }

  readData(): string {
    // 감싼 객체를 통해 압축한 데이터 읽어오기
    const compressed = super.readData();
    // 압축 해제하기
    const decompressed = LZString.decompress(compressed)!;
    return decompressed;
  }
}

/**
 * 사용 예시 1
 */
function dumbUsageExample() {
  let source: DataSource = new FileDataSource("sample.txt");
  source.writeData("hello");
  // 파일에 데이터가 그대로 저장됩니다.

  source = new CompressDecorator(source);
  source.writeData("hello");
  // 파일에 압축된 데이터가 저장됩니다.

  source = new EncryptionDecorator(source);
  // source 변수는 이제 다음과 같습니다.
  // Encryption > Compression > FileDataSource
  source.writeData("hello");
  // 파일에 압축되고 암호화된 데이터가 저장됩니다.
}

dumbUsageExample();

/**
 * 사용 예시 2
 * 클라이언트 코드는 외부 데이터 소스를 사용합니다.
 * SalaryManger 객체는 데이터 저장소에 대한 세부 사항을 알지 못하고
 * 신경 쓰지 않습니다.앱 설정으로부터 사전 구성된 데이터 소스와 동작합니다.
 */
class SalaryManger {
  constructor(private source: DataSource) {}

  load(): string {
    return this.source.readData();
  }

  save(): void {
    this.source.writeData("hello");
    // 다른 유용한 메서드들...
  }
}

/**
 * 앱은 런타임 시에 데코레이터들을 다르게 조합할 수 있고, 설정이나 환경에 의존합니다.
 */
let enabledEncryption = true; // 설정
let enabledCompression = true; // 설정

function configurationExample() {
  let source: DataSource = new FileDataSource("sample.txt");

  if (enabledCompression) source = new CompressDecorator(source);
  if (enabledEncryption) source = new EncryptionDecorator(source);

  const logger = new SalaryManger(source);
  const salary = logger.load(); // hello
}

configurationExample();
