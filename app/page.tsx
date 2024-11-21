import Footer from "@/components/Footer/Footer";
import Properties from "@/components/PropertyCards/Properties";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
   <div>
        <Properties />
        <Separator className="bg-emerald-500" />
        <Footer/>
   </div>
  );
}
