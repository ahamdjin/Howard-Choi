export type SiteLocale = "en" | "ko";

export const brand = {
  name: "Buena Park Injury Lawyer",
  attorney: "Howard Choi",
  phoneDisplay: "714-690-0007",
  phoneHref: "tel:+17146900007",
  address: "6301 Beach Blvd, Buena Park, CA 90621",
};

export const practiceAreas = [
  {
    slug: "car-accidents",
    title: "Car Accidents",
    koTitle: "자동차 사고",
    description: "Focused representation after collisions involving cars, intersections, freeways, and disputed insurance claims.",
    koDescription: "자동차 충돌, 교차로 사고, 고속도로 사고 및 보험 책임 분쟁 이후의 상해 청구를 집중적으로 다룹니다.",
    intro: "A serious crash can turn into an insurance, medical, and financial problem at the same time. The goal is to protect the evidence, understand the available coverage, and build the claim around the real effect of the injury.",
    koIntro: "큰 교통사고는 보험, 치료, 경제적 손실 문제가 동시에 시작될 수 있습니다. 중요한 것은 증거를 보존하고 적용 가능한 보험 범위를 확인하며 부상이 실제 생활에 미친 영향을 중심으로 청구를 준비하는 것입니다.",
    issues: ["Rear-end and intersection collisions", "Hit-and-run claims", "Uninsured and underinsured motorists", "Disputed fault and insurance coverage"],
    koIssues: ["후방 추돌 및 교차로 사고", "뺑소니 사고", "무보험·저보험 운전자 사고", "과실 및 보험 적용 범위 분쟁"],
  },
  {
    slug: "truck-accidents",
    title: "Truck Accidents",
    koTitle: "트럭 사고",
    description: "Claims involving commercial trucks, delivery vehicles, and collisions where multiple companies or policies may be involved.",
    koDescription: "상업용 트럭, 배송 차량 및 여러 회사나 보험이 관련될 수 있는 사고 청구를 다룹니다.",
    intro: "Commercial-vehicle cases can involve more than the driver alone. Ownership, maintenance, employment relationships, company records, and different insurance policies can all matter, making early preservation of evidence especially important.",
    koIntro: "상업용 차량 사고는 운전자 한 사람만의 문제가 아닐 수 있습니다. 차량 소유, 정비, 고용 관계, 회사 기록 및 여러 보험이 함께 문제될 수 있어 초기 증거 보존이 특히 중요합니다.",
    issues: ["Commercial truck collisions", "Delivery and fleet vehicles", "Company and driver responsibility", "Serious and catastrophic injuries"],
    koIssues: ["상업용 트럭 충돌", "배송 및 법인 차량 사고", "회사와 운전자 책임", "중상 및 중대한 상해"],
  },
  {
    slug: "motorcycle-accidents",
    title: "Motorcycle Accidents",
    koTitle: "오토바이 사고",
    description: "Representation for riders facing serious injuries, disputed visibility, and insurance issues after a crash.",
    koDescription: "사고 후 중상, 시야·인지 여부에 관한 과실 다툼, 보험 문제를 겪는 오토바이 운전자를 지원합니다.",
    intro: "Motorcycle crashes often cause injuries that are far more serious than the vehicle damage suggests. A strong claim should document the collision carefully and show the full medical, work, and day-to-day impact of the injury.",
    koIntro: "오토바이 사고는 차량 손상 정도보다 훨씬 심각한 부상을 일으킬 수 있습니다. 사고 경위를 정확히 기록하고 치료, 업무, 일상생활에 미친 영향을 충분히 보여주는 것이 중요합니다.",
    issues: ["Lane-change and turning collisions", "Roadway and visibility disputes", "Serious orthopedic injuries", "Insurance and liability claims"],
    koIssues: ["차선 변경 및 회전 차량 충돌", "도로·시야 관련 책임 분쟁", "중대한 정형외과적 부상", "보험 및 책임 청구"],
  },
  {
    slug: "pedestrian-accidents",
    title: "Pedestrian Accidents",
    koTitle: "보행자 사고",
    description: "Injury claims for pedestrians struck in crosswalks, parking areas, intersections, and other public roadways.",
    koDescription: "횡단보도, 주차장, 교차로 및 도로에서 차량에 충돌한 보행자의 상해 청구를 다룹니다.",
    intro: "Pedestrians have little physical protection in a collision. These cases often turn on careful reconstruction of where the impact occurred, what each person could see, and what evidence exists from cameras, witnesses, vehicles, and medical records.",
    koIntro: "보행자는 충돌 시 신체를 보호할 장치가 거의 없습니다. 사고 지점, 시야, 영상, 목격자, 차량 및 의료기록을 종합해 사고 경위를 정확히 파악하는 것이 중요합니다.",
    issues: ["Crosswalk collisions", "Parking-lot incidents", "Intersection crashes", "Severe and long-term injuries"],
    koIssues: ["횡단보도 충돌", "주차장 사고", "교차로 사고", "중상 및 장기적 후유증"],
  },
  {
    slug: "rideshare-accidents",
    title: "Rideshare Accidents",
    koTitle: "우버·리프트 사고",
    description: "Claims involving Uber, Lyft, and other app-based transportation where coverage can depend on the driver's status.",
    koDescription: "우버, 리프트 등 앱 기반 운송 서비스 사고에서 운전자의 운행 상태와 보험 적용 범위를 검토합니다.",
    intro: "Rideshare accidents can create an extra coverage question: what the driver was doing in the app at the time of the crash. Identifying the correct policies and preserving trip information can be an important early step.",
    koIntro: "승차공유 사고에서는 사고 당시 운전자가 앱에서 어떤 운행 상태였는지에 따라 보험 문제가 달라질 수 있습니다. 관련 보험과 운행 기록을 조기에 확인하는 것이 중요합니다.",
    issues: ["Uber and Lyft collisions", "Passenger injury claims", "Driver-status and coverage questions", "Multiple insurance policies"],
    koIssues: ["우버·리프트 사고", "승객 상해 청구", "운행 상태와 보험 적용 문제", "복수 보험 관련 청구"],
  },
  {
    slug: "slip-and-fall",
    title: "Slip & Fall",
    koTitle: "미끄러짐·넘어짐 사고",
    description: "Premises-liability claims involving unsafe property conditions, falls, and preventable hazards.",
    koDescription: "위험한 시설 상태, 낙상 및 예방 가능했던 위험요소와 관련된 건물·시설 책임 청구를 다룹니다.",
    intro: "A fall case is rarely just about the fact that someone fell. The condition of the property, how long a hazard existed, inspections, warnings, photographs, video, and medical documentation may all become important.",
    koIntro: "낙상 사고는 단순히 넘어졌다는 사실만으로 판단되지 않습니다. 시설 상태, 위험요소가 존재한 기간, 점검 기록, 경고 표시, 사진·영상 및 의료기록 등이 중요할 수 있습니다.",
    issues: ["Unsafe walking surfaces", "Store and business premises", "Poor lighting or maintenance", "Evidence preservation and notice"],
    koIssues: ["위험한 보행 표면", "상점 및 사업장 사고", "조명·관리 문제", "증거 보존 및 위험 인지 여부"],
  },
  {
    slug: "wrongful-death",
    title: "Wrongful Death",
    koTitle: "부당 사망",
    description: "Sensitive representation for families dealing with a fatal accident and the legal issues that follow.",
    koDescription: "치명적인 사고로 가족을 잃은 유가족에게 필요한 법적 절차를 신중하게 지원합니다.",
    intro: "A fatal accident creates legal questions at the same time a family is dealing with loss. The work should be handled carefully, with attention to responsibility, available evidence, insurance, and the different ways the loss affects the family.",
    koIntro: "치명적인 사고 이후 유가족은 큰 상실과 동시에 법적 문제를 마주하게 됩니다. 책임, 증거, 보험 및 가족에게 미친 손실을 신중하게 검토해야 합니다.",
    issues: ["Fatal motor-vehicle collisions", "Loss affecting a family", "Evidence and liability investigation", "Insurance and responsible parties"],
    koIssues: ["치명적인 차량 사고", "유가족에게 발생한 손실", "증거 및 책임 조사", "보험 및 책임 당사자 확인"],
  },
  {
    slug: "serious-injuries",
    title: "Serious Injuries",
    koTitle: "중대 상해",
    description: "Claims involving brain, spinal, orthopedic, and other injuries with significant long-term consequences.",
    koDescription: "뇌, 척추, 정형외과적 부상 등 장기적인 영향을 남길 수 있는 중대한 상해 청구를 다룹니다.",
    intro: "When an injury changes a person's ability to work, move, care for family, or live normally, the claim needs to account for more than the first medical bill. Long-term treatment, limitations, future needs, and the complete human impact matter.",
    koIntro: "부상으로 인해 일, 이동, 가족 돌봄 또는 일상생활이 달라진 경우 단순한 초기 치료비만으로는 손실을 설명할 수 없습니다. 장기 치료, 기능 제한, 향후 필요와 생활 전반의 영향을 함께 살펴야 합니다.",
    issues: ["Brain and head injuries", "Neck and spinal injuries", "Fractures and orthopedic trauma", "Long-term medical and functional impact"],
    koIssues: ["뇌 및 두부 손상", "목·척추 부상", "골절 및 정형외과적 외상", "장기 치료와 기능 제한"],
  },
] as const;

export type PracticeArea = (typeof practiceAreas)[number];
export const getPracticeArea = (slug: string) => practiceAreas.find((practice) => practice.slug === slug);

export const serviceLocations = [
  {
    slug: "buena-park",
    name: "Buena Park",
    koName: "부에나파크",
    description: "The firm's home base and primary local focus, serving injured people in Buena Park and nearby North Orange County communities.",
    koDescription: "로펌의 중심 지역으로, 부에나파크와 북부 오렌지카운티 인근에서 사고로 부상을 입은 분들을 지원합니다.",
  },
  {
    slug: "fullerton",
    name: "Fullerton",
    koName: "풀러턴",
    description: "Personal-injury representation for people living, working, studying, or traveling through Fullerton and surrounding communities.",
    koDescription: "풀러턴과 인근 지역에서 생활하거나 일하고, 통학·이동 중 사고를 당한 분들을 위한 상해 법률지원을 제공합니다.",
  },
  {
    slug: "anaheim",
    name: "Anaheim",
    koName: "애너하임",
    description: "Accident and injury counsel for residents, workers, visitors, and families across Anaheim and the surrounding Orange County area.",
    koDescription: "애너하임 및 인근 오렌지카운티 지역의 주민, 근로자, 방문객과 가족을 위한 사고·상해 법률지원을 제공합니다.",
  },
  {
    slug: "cerritos",
    name: "Cerritos",
    koName: "세리토스",
    description: "Representation for accident claims involving people in Cerritos and the nearby communities connecting Los Angeles and Orange counties.",
    koDescription: "세리토스와 로스앤젤레스·오렌지카운티 경계 인근 지역에서 발생한 사고 상해 청구를 지원합니다.",
  },
  {
    slug: "la-mirada",
    name: "La Mirada",
    koName: "라미라다",
    description: "Local injury-law support for people involved in collisions and other preventable accidents in and around La Mirada.",
    koDescription: "라미라다 및 인근 지역에서 교통사고나 예방 가능했던 사고로 부상을 입은 분들을 지원합니다.",
  },
  {
    slug: "la-habra",
    name: "La Habra",
    koName: "라하브라",
    description: "Personal-injury counsel for La Habra residents and families dealing with the consequences of a serious accident.",
    koDescription: "라하브라 주민과 가족이 큰 사고 이후 겪는 상해 청구와 법적 문제를 지원합니다.",
  },
] as const;

export type ServiceLocation = (typeof serviceLocations)[number];
export const getServiceLocation = (slug: string) => serviceLocations.find((location) => location.slug === slug);
