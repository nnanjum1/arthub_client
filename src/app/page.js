import Image from "next/image";
import Banner from "./components/Banner";
import TopArtists from "./components/TopArtists";
import ArtCategories from "./components/ArtCategories";
import Dynamic from "./components/Dynamic";

export default function Home() {
  return (
    <div>
      <Banner />
      <Dynamic />
      <TopArtists />
      <ArtCategories />
    </div>
  );
}
