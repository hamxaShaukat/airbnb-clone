import { auth } from "@/auth";
import Footer from "@/components/Footer/Footer";
import Properties from "@/components/PropertyCards/Properties";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
   <div>
        <Properties session={session} />
        <Separator className="bg-emerald-500" />
        <Footer/>
   </div>
  );
}
