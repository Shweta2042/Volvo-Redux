import '@fontsource/roboto';
import type { Metadata } from "next";
import MainPage from "./main";

export default function IndexPage() {
  return (
   <MainPage />);
}

export const metadata: Metadata = {
  title: "Volvo cars",
};
