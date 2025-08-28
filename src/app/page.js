import Hero from "@/components/Hero";
import Reviews from "@/components/Review";
import TrendingCollection from "@/components/TrendingCollection";
import ProductsPage from "./products/page";
import About from "./about/page";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <ProductsPage></ProductsPage>
      <TrendingCollection></TrendingCollection>
      <About></About>
<Reviews></Reviews>
    </div>
  );
}
