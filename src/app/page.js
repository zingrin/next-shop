import Hero from "@/components/hero/page";
import ProductsPage from "./products/page";
import TrendingCollection from "@/components/TrendingCollecton/page";
import About from "./about/page";
import Reviews from "@/components/Review/page";

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
