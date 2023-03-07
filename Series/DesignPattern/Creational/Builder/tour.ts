/**
 * 여행 계획을 세우는 앱을 개발한다고 할 때, 다음과 같은 요구사항이 있다.
 * 요구사항 1: 여행 제목, 여행 출발 일, 몇 박 며칠 동안 어디서 머물지, n일차에 할 일을 기록
 * 요구사항 2: 당일치기는 n박 m일이 필요 없고, 어디서 머물지도 필요없다.
 *
 * 위의 요구사항을 만족하기 위해 필수적인 정보와 선택적인 정보로 optional한 속성들이 생겼을 때 어떻게 구현할까?
 *
 * 필요한 객체를 직접 생성하는 대신, 먼저 필수 인자들을 생성자에 전부 전달하여 빌더 객체를 만든다.
 * 선택 인자는 가독성이 좋은 코드로 인자로 넘길 수 있다.
 * setter가 없으므로 객체 일관성을 유지하여 불변 객체로 생성할 수 있다.
 */

interface TourPlanBuilder {
  setTitle(title: string): void;
  nightAndDays(nights: number, days: number): void;
  setStartDate(startDate: string): void;
  setPlaceToStay(placeToStay: string): void;
  addPlan(day: number, plan: string): void;
}

class DefaultTourBuilder implements TourPlanBuilder {
  private tourPlan!: TourPlan;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.tourPlan = new TourPlan();
  }

  setTitle(title: string): void {
    this.tourPlan.title = title;
  }

  setStartDate(startDate: string): void {
    this.tourPlan.startDate = startDate;
  }

  nightAndDays(nights: number, days: number): void {
    this.tourPlan.nights = nights;
    this.tourPlan.days = days;
  }

  setPlaceToStay(placeToStay: string): void {
    this.tourPlan.placeToStay = placeToStay;
  }

  addPlan(day: number, plan: string): void {
    if (this.tourPlan.plans === undefined) {
      this.tourPlan.plans = [];
    }

    this.tourPlan.plans.push(new DetailPlan(day, plan));
  }

  getPlan(): TourPlan {
    const plan = this.tourPlan;
    this.reset();
    return plan;
  }
}

class DetailPlan {
  constructor(private day: number, private plan: string) {}
}

class TourPlan {
  public title: string | undefined;
  public startDate: string | undefined;
  public nights: number | undefined;
  public days: number | undefined;
  public placeToStay: string | undefined;
  public plans: DetailPlan[] = [];
}

class TourDirector {
  private tourPlanBuilder!: TourPlanBuilder;

  setTourPlanBuilder(tourPlanBuilder: TourPlanBuilder) {
    this.tourPlanBuilder = tourPlanBuilder;
  }

  cancuTrip(): void {
    this.tourPlanBuilder.setTitle("칸쿤 여행");
    this.tourPlanBuilder.nightAndDays(2, 3);
    this.tourPlanBuilder.setStartDate(new Date("2020-12-9").toLocaleString());
    this.tourPlanBuilder.setPlaceToStay("리조트");
    this.tourPlanBuilder.addPlan(0, "체크인하고 짐 풀기");
    this.tourPlanBuilder.addPlan(0, "저녁 식사");
  }

  longBeachTrip(): void {
    this.tourPlanBuilder.setTitle("롱비치 여행");
    this.tourPlanBuilder.setStartDate(new Date("2021-7-15").toLocaleString());
  }
}

function makePlan(tourDirector: TourDirector) {
  const builder: DefaultTourBuilder = new DefaultTourBuilder();
  tourDirector.setTourPlanBuilder(builder);

  tourDirector.cancuTrip();
  console.log(builder.getPlan());
  console.log("");

  tourDirector.longBeachTrip();
  console.log(builder.getPlan());
}

const tourDirector = new TourDirector();
makePlan(tourDirector);
