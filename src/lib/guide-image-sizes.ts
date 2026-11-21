import { guidePhotography as photos } from "@/data/guidePhotography";
import rideHero from "@/assets/editorial-library/responsive/pickup-5356284.webp";
import rideApp from "@/assets/editorial-library/responsive/navigation-30954662.webp";
import rideScene from "@/assets/editorial-library/responsive/street-36275141.webp";
import rideCall from "@/assets/editorial-library/responsive/records-6172482.webp";
import rideRoad from "@/assets/editorial-library/responsive/highway-8783583.webp";
import rideRearview from "@/assets/editorial-library/responsive/drive-5835306.webp";
import rideInsurance from "@/assets/editorial-library/responsive/paperwork-8441775.webp";
import rideStreet from "@/assets/editorial-library/responsive/street-7385401.webp";
import rideRecords from "@/assets/editorial-library/responsive/paperwork-8111889.webp";
import brainHero from "@/assets/editorial-library/responsive/care-4226219.webp";
import brainBefore from "@/assets/editorial-library/responsive/routine-3985056.webp";
import brainObserve from "@/assets/editorial-library/responsive/records-8715933.webp";
import brainVisit from "@/assets/editorial-library/responsive/care-7089619.webp";
import brainCare from "@/assets/editorial-library/responsive/recovery-5793687.webp";
import brainNotes from "@/assets/editorial-library/responsive/records-7581018.webp";
import brainReturn from "@/assets/editorial-library/responsive/physical-20860624.webp";
import brainImaging from "@/assets/editorial-library/responsive/care-7089286.webp";
import skidHero from "@/assets/editorial-library/responsive/rain-3953145.webp";
import skidCurve from "@/assets/editorial-library/responsive/road-5982902.webp";
import skidGrip from "@/assets/editorial-library/responsive/tires-116676.webp";
import skidRain from "@/assets/editorial-library/responsive/rain-1765286.webp";
import skidCheck from "@/assets/editorial-library/responsive/tires-3807695.webp";
import skidRoad from "@/assets/editorial-library/responsive/road-6294614.webp";
import skidDriver from "@/assets/editorial-library/responsive/drive-14826023.webp";
import discussion from "@/assets/editorial-library/responsive/consultation-8111887.webp";
import junction from "@/assets/editorial-library/responsive/highway-8783845.webp";
import rideScreen from "@/assets/editorial-library/responsive/navigation-5025655.webp";
import calendar from "@/assets/editorial-library/responsive/records-19915781.webp";
import therapy from "@/assets/editorial-library/responsive/physical-20860594.webp";
import clinicalReview from "@/assets/editorial-library/responsive/care-39192372.webp";
import familyRoutine from "@/assets/editorial-library/responsive/routine-3985092.webp";
import meeting from "@/assets/editorial-library/responsive/consultation-7841456.webp";
import dashboard from "@/assets/editorial-library/responsive/navigation-8305346.webp";
import rainView from "@/assets/editorial-library/responsive/rain-32542783.webp";
import treadGauge from "@/assets/editorial-library/responsive/tires-34357282.webp";
import writtenNotes from "@/assets/editorial-library/responsive/records-28353113.webp";

export const guideImageSizes: Record<string, { small: string; smallWidth: number; width: number; height: number }> = {
  [photos.rideHero.src]: { small: rideHero, smallWidth: 480, width: 1440, height: 960 },
  [photos.rideApp.src]: { small: rideApp, smallWidth: 480, width: 1440, height: 960 },
  [photos.rideScene.src]: { small: rideScene, smallWidth: 480, width: 1440, height: 987 },
  [photos.rideCall.src]: { small: rideCall, smallWidth: 480, width: 1440, height: 960 },
  [photos.rideRoad.src]: { small: rideRoad, smallWidth: 480, width: 1200, height: 799 },
  [photos.rideRearview.src]: { small: rideRearview, smallWidth: 480, width: 1440, height: 960 },
  [photos.rideInsurance.src]: { small: rideInsurance, smallWidth: 480, width: 1440, height: 961 },
  [photos.rideStreet.src]: { small: rideStreet, smallWidth: 480, width: 1440, height: 960 },
  [photos.rideRecords.src]: { small: rideRecords, smallWidth: 480, width: 1440, height: 961 },
  [photos.brainHero.src]: { small: brainHero, smallWidth: 480, width: 1440, height: 960 },
  [photos.brainBefore.src]: { small: brainBefore, smallWidth: 480, width: 1200, height: 800 },
  [photos.brainObserve.src]: { small: brainObserve, smallWidth: 480, width: 800, height: 1200 },
  [photos.brainVisit.src]: { small: brainVisit, smallWidth: 480, width: 1440, height: 960 },
  [photos.brainCare.src]: { small: brainCare, smallWidth: 480, width: 1440, height: 960 },
  [photos.brainNotes.src]: { small: brainNotes, smallWidth: 480, width: 1440, height: 960 },
  [photos.brainReturn.src]: { small: brainReturn, smallWidth: 480, width: 1440, height: 960 },
  [photos.brainImaging.src]: { small: brainImaging, smallWidth: 480, width: 1440, height: 960 },
  [photos.skidHero.src]: { small: skidHero, smallWidth: 480, width: 1440, height: 1080 },
  [photos.skidCurve.src]: { small: skidCurve, smallWidth: 480, width: 1000, height: 667 },
  [photos.skidGrip.src]: { small: skidGrip, smallWidth: 480, width: 1440, height: 810 },
  [photos.skidRain.src]: { small: skidRain, smallWidth: 480, width: 1200, height: 900 },
  [photos.skidCheck.src]: { small: skidCheck, smallWidth: 480, width: 1440, height: 947 },
  [photos.skidRoad.src]: { small: skidRoad, smallWidth: 480, width: 1200, height: 800 },
  [photos.skidDriver.src]: { small: skidDriver, smallWidth: 480, width: 1440, height: 960 },
  [photos.discussion.src]: { small: discussion, smallWidth: 480, width: 1440, height: 961 },
  [photos.junction.src]: { small: junction, smallWidth: 480, width: 1000, height: 666 },
  [photos.rideScreen.src]: { small: rideScreen, smallWidth: 480, width: 1440, height: 810 },
  [photos.calendar.src]: { small: calendar, smallWidth: 480, width: 800, height: 1200 },
  [photos.therapy.src]: { small: therapy, smallWidth: 480, width: 1440, height: 960 },
  [photos.clinicalReview.src]: { small: clinicalReview, smallWidth: 480, width: 1440, height: 810 },
  [photos.familyRoutine.src]: { small: familyRoutine, smallWidth: 480, width: 1440, height: 960 },
  [photos.meeting.src]: { small: meeting, smallWidth: 480, width: 1440, height: 960 },
  [photos.dashboard.src]: { small: dashboard, smallWidth: 480, width: 1440, height: 960 },
  [photos.rainView.src]: { small: rainView, smallWidth: 480, width: 1200, height: 820 },
  [photos.treadGauge.src]: { small: treadGauge, smallWidth: 480, width: 801, height: 1200 },
  [photos.writtenNotes.src]: { small: writtenNotes, smallWidth: 480, width: 900, height: 1200 },
  "/blog-images/november-21/street-36275141.webp": { small: "/blog-images/november-21/street-36275141-480.webp", smallWidth: 480, width: 1000, height: 685 },
  "/blog-images/november-21/street-11756145.webp": { small: "/blog-images/november-21/street-11756145-480.webp", smallWidth: 480, width: 500, height: 750 },
  "/blog-images/november-21/paperwork-8441775.webp": { small: "/blog-images/november-21/paperwork-8441775-480.webp", smallWidth: 480, width: 1000, height: 667 },
};
