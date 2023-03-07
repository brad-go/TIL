/**
 * 이 예는 프록시 패턴이 제 3자 유튜브 통합 라이브러리에 지연 초기화 및 캐싱을
 * 도입하는 것에 어떻게 도움이 되는지 보여줍니다. 프록시를 사용하여 서비스 결과를
 * 캐싱할 것입니다.
 *
 * 라이브러리는 비디오 다운로드 클래스를 제공합니다. 그러나 매우 비효율적이며, 클라이언트의
 * 어플리케이션이 동일한 비디오를 여러 번 요청하는 경우, 라이브러리는 처음 다운로드한 파일을
 * 캐싱하고 재사용하는 대신 계속해서 다운로드합니다.
 *
 * 프록시 클래스는 원래 다운로더와 동일한 인터페이스를 구현하고 모든 작업을 위임합니다. 그러나
 * 앱이 동일한 비디오를 여러 번 요청하면 다운로드한 파일을 추적하고 캐시된 결과를 반환합니다.
 */
interface Video {
  id: number;
}

/**
 * 원격 서비스의 인터페이스
 */
interface ThirdPartyYouTubeLib {
  listVideos(): Video[];
  getVideoInfo(id: number): Video;
  downloadVideo(id: number): void;
}

/**
 * 서비스 커넥터의 구체적인 구현부입니다. 이 클래스의 메서드는 유튜브로부터 정보를
 * 요청할 수 있습니다. 요청의 속도는 유튜브 뿐만 아니라 사요자의 인터넷 연결에도 달려
 * 있습니다. 동일한 정보를 요청하더라도 많은 요청이 동시에 발생하면 어플리케이션의
 * 속도가 느려집니다.
 */
class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
  listVideos(): Video[] {
    // 유튜브에 API 요청 보내기
  }

  getVideoInfo(id: number): Video {
    // 특정 비디오에 대한 메타데이터 가져오기
  }

  downloadVideo(id: number): void {
    // 유튜브로부터 비디오 파일 다운로드하기
  }
}

/**
 * 대역폭을 절약하기 위해 요청 결과를 캐시하여 일정 기간 보관할 수 있습니다. 그러나 이러한
 * 코드를 서비스 클래스에 직접 넣는 것을 불가능할 수 있습니다. 예를 들어 타사 라이브러리의
 * 일부로 제공되거나 'final'로 정의될 수 있습니다. 이것이 우리가 캐싱 코드를 서비스 클래스와
 * 동일한 인터페이스를 구현하는 새로운 프록시 클래스에 넣는 이유입니다. 실제 요청을 전송해야 하는
 * 경우에만 서비스 객체로 위임합니다.
 */
class CahchedYouTubeClass implements ThirdPartyYouTubeLib {
  private listCache: Video[];
  private videoCache: Video;
  public needReset: boolean;

  constructor(private service: ThirdPartyYouTubeLib) {}

  listVideos(): Video[] {
    if (this.listCache === null || this.needReset) {
      this.listCache = this.service.listVideos();
    }

    return this.listCache;
  }

  getVideoInfo(id: number): Video {
    if (this.videoCache === null || this.needReset) {
      this.videoCache = this.service.getVideoInfo(id);
    }

    return this.videoCache;
  }

  downloadVideo(id: number): void {
    if (!downloadExists(id) || this.needReset) {
      this.service.downloadVideo(id);
    }
  }
}

/**
 * 서비스 객체와 직접적으로 소통하는 GUI 클래스는 인터페이스를 통해 서비스 객체와
 * 작업하는 한 변경되지 않은 상태로 유지됩니다. 둘 다 동일한 인터페이스를 구현하기
 * 때문에 실제 서비스 객체 대신 프록시 객체를 안전하게 전달할 수 있습니다.
 */
class YoutubeManger {
  constructor(protected service: ThirdPartyYouTubeLib) {}

  renderVideoPage(id: number): void {
    const info = this.service.getVideoInfo(id);
    // 비디오 관련 페이지 렌더링
  }

  renderListPanel(): void {
    const list = this.service.listVideos();
    // 비디오 목록의 썸네일을 렌더링
  }

  reactOnUserInput() {
    this.renderVideoPage();
    this.renderListPanel();
  }
}

/**
 * 어플리케이션은 프록시를 즉시 구성할 수 있습니다.
 */
function init() {
  const aYouTubeService = new ThirdPartyYouTubeClass();
  const aYouTubeProxy = new CahchedYouTubeClass(aYouTubeService);
  const manager = new YoutubeManger(aYouTubeProxy);
  manager.reactOnUserInput();
}
