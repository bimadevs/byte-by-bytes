import { COMMUNITY_MEMBER_COUNT } from "@/lib/constant";
import { WHATSAPP_GROUP_LINK } from "@/lib/constant";
import { CommunityBanner } from "@/components/ui/CommunityBanner";
import { Metadata } from "next";
import { 
  AnimateOnScroll, 
  StaggerContainer, 
  StaggerItem, 
  HoverEffectCard 
} from "@/components/animations/page-transitions";

export const metadata: Metadata = {
  title: "Tentang Kami | ByteByByte",
  description: "Tentang platform e-learning ByteByByte dan misi kami",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Tentang ByteByByte</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Platform pembelajaran coding yang dirancang untuk membuat setiap langkah perjalanan belajar Anda terasa mudah dan menyenangkan.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <AnimateOnScroll animation="slideLeft">
            <div>
              <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
              <p className="text-muted-foreground mb-4">
                ByteByByte didirikan dengan misi untuk membuat pembelajaran coding menjadi lebih mudah diakses, lebih menyenangkan, dan lebih efektif. 
                Kami percaya bahwa setiap orang berhak mendapatkan pendidikan teknologi berkualitas tinggi tanpa hambatan.
              </p>
              <p className="text-muted-foreground">
                Kami berkomitmen untuk menyediakan materi pembelajaran yang terstruktur dengan baik, 
                proyek praktis berbasis dunia nyata, dan komunitas pendukung yang membantu setiap pelajar 
                berkembang dari pemula menjadi developer yang terampil.
              </p>
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="slideRight">
            <div className="bg-muted rounded-lg p-8 transition-transform hover:scale-[1.02] duration-500 hover:shadow-lg">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Nilai-Nilai Kami</h3>
                <StaggerContainer staggerChildren={0.1} className="space-y-4">
                  <StaggerItem>
                    <li className="flex gap-3 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">1</div>
                      <div>
                        <h4 className="font-bold group-hover:translate-x-1 transition-transform">Pendidikan Berkualitas</h4>
                        <p className="text-sm text-muted-foreground">Menyediakan konten yang akurat, up-to-date, dan mudah dipahami.</p>
                      </div>
                    </li>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <li className="flex gap-3 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">2</div>
                      <div>
                        <h4 className="font-bold group-hover:translate-x-1 transition-transform">Pembelajaran Praktis</h4>
                        <p className="text-sm text-muted-foreground">Menyediakan konten yang praktis dan mudah dipahami.</p>
                      </div>
                    </li>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <li className="flex gap-3 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">3</div>
                      <div>
                        <h4 className="font-bold group-hover:translate-x-1 transition-transform">Inklusivitas</h4>
                        <p className="text-sm text-muted-foreground">Membuat konten yang dapat diakses oleh semua orang dari berbagai latar belakang.</p>
                      </div>
                    </li>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Tim Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "BimaDev",
                role: "Founder & Lead Instructor",
                bio: "Developer dengan pengalaman bertahun-tahun di dunia programming"
              }
            ].map((member, index) => (
              <div key={index} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div> */}

        <AnimateOnScroll animation="fade" threshold={0.2}>
          <CommunityBanner
            whatsappLink={WHATSAPP_GROUP_LINK}
            memberCount={COMMUNITY_MEMBER_COUNT}
            variant="hero"
          />
        </AnimateOnScroll>
      </div>
    </div>
  );
}