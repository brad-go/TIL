/**
 * 복잡한 비디오 변환 프레임워크와의 상호작용을 퍼사드 패턴으로 단순화하는 예제입니다.
 *
 * 단일 퍼사드 클래스 내에서 여러 의존성을 격리합니다.
 *
 * 코드가 수십 개의 프레임워크 클래스와 직접 작동하도록 하는 대신 해당 기능을 캡슐화하고,
 * 코드의 나머지 부분에서 숨기는 퍼사드 클래스를 만듭니다. 이 구조는 프레임워크의 향후
 * 버전으로 업데이트나 다른 프레임워크로 교체하는 노력을 최소화하는 데 도움이 됩니다. 앱에서
 * 변경해야 하는 유일한 것은 퍼사드의 메서드 구현 뿐입니다.
 */

/**
 * 이것들은 복잡한 타사 동영상 변환 프레임워크의 일부입니다.
 * 우리는 해당 코드를 제어하지 않으므로, 이것을 단순화할 수 없습니다.
 */

class VideoFile {}
class OggCompressionCodec {}
class MPEG4ompressionCodec {}
class CodecFactory {}
class BitrateReader {}
class AudioMixer {}

/**
 * 우리는 퍼사드 클래스를 만들고, 프레임워크의 복잡성을 간단한 인터페이스 뒤로
 * 숨길 수 있습니다. 이것은 기능성과 단순함의 트레이드 오프 관계라고 볼 수 있습니다.
 */
class VideoConverter {
  convert(filename: string, format: string): File {
    const file = new VideoFile(filename);
    const sourceCodec = new CodecFactory().extract(file);

    let destinationCodec;
    if (format === "mp4") destinationCodec = new MPEG4ompressionCodec();
    else destinationCodec = new OggCompressionCodec();

    const buffer = BitrateReader.read(filename, sourceCodec);
    let result = BitrateReader.convert(buffer, destinationCodec);
    result = new AudioMixer().fix(result);

    return new File(result);
  }
}

/**
 * 어플리케이션 클래스는 복잡한 프레임워크에서 제공되는 엄청난 양의 클래스들에
 * 의존하지 않습니다. 또, 프레임워크를 바꾸기로 결정했다면, 퍼사드 클래스만을
 * 다시 작성하면 됩니다.
 */
const converter = new VideoConverter();
const mp4 = converter.convert("funny-cats-video.ogg", "mp4");
mp4.save();
