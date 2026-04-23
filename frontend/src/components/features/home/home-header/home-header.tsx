import { GuideMessage } from "./guide-message";
import { HomeHeaderTitle } from "./home-header-title";

export function HomeHeader() {
  return (
    <header className="flex flex-col items-center gap-6 text-center pb-2">
      <GuideMessage />
      <HomeHeaderTitle />
    </header>
  );
}
