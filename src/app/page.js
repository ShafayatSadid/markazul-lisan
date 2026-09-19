import HeroCarousel from "@/components/home/HeroCarousel";
import StatsBar from "@/components/home/StatsBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroCarousel />
      <StatsBar />
    </div>
  );
}
