import { ScrollProgressBar } from "./ScrollProgressBar";
import { Navbar } from "./Navbar";
import { BackToTop } from "./BackToTop";
import { JSX } from "react/jsx-runtime";
export function SiteChrome(): JSX.Element {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <BackToTop />
    </>
  );
}
