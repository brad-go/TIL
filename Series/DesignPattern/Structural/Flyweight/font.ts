/**
 * 편집기에 글쓰기
 * 편집기니까 한 글자마다 폰트와 글씨, 색, 크기를 변경할 수 있어야합니다.
 * 그러므로 각 글자마다 위의 4가지 속성이 필요합니다. 그러나 메모리를 아끼기 위해
 * 다른 방법을 생각해봅시다. 자주 변하는 속성(공유 불가), 자주 변하지 않는 속성(공유)를
 * 분류해보려고 합니다.
 * - 자주 변하는 속성: 문자와 색
 * - 자주 변하지 않는 속성: 글자 폰트와 크기
 */

/**
 * Flyweight
 *
 * 자주 변하지 않아서 공유할 수 있는 속성으로 분류했던 글자 폰트와 크기 속성을
 * Font클래스로 선언합니다. 생성자에서만 초기화하고 변경할 수 없습니다.
 */
class Font {
  constructor(private family: string, private size: number) {}

  getFamily(): string {
    return this.family;
  }

  getSize(): number {
    return this.size;
  }
}

/**
 * FlyweightFactory
 *
 * Font 생성을 관리해주는 팩토리르 생성합니다.
 * getFont() 메서드를 통해 이미 생성된 폰트가 있는지 검사합니다. 기존에 생성한
 * 폰트 인스턴스가 있다면, 새로 생성하지 않고 인스턴스를 반환하고, 아니라며 새로
 * 생성한 인스턴스를 반환합니다.
 */
class FontFactory {
  private cache = new Map<string, Font>();

  getFont(font: string): Font {
    if (this.cache.has(font)) {
      return this.cache.get(font)!;
    } else {
      const split: string[] = font.split(":");
      // 폰트 이름, 폰트 사이즈 분리
      const newFont = new Font(split[0], parseInt(split[1]));
      this.cache.set(font, newFont);
      return newFont;
    }
  }
}

class Character {
  constructor(
    private char: string,
    private color: string,
    private font: Font
  ) {}
}

const fontFactory = new FontFactory();

function addCharacter(
  ff: FontFactory,
  char: string,
  color: string,
  family: string,
  size: number
) {
  const font = ff.getFont(`${family}:${size}`);
  const character = new Character(char, color, font);

  console.log(character);
  return character;
}

addCharacter(fontFactory, "h", "white", "nanum", 12);
addCharacter(fontFactory, "e", "black", "nanum", 20);
