import Marquee from "react-fast-marquee";
import { Camera, Type, Share2, Smartphone, Bell, Calendar } from "lucide-react";

const FEATURES = [
  {
    icon: Camera,
    title: "Capture Moments",
    description:
      "Record photos and videos directly in your browser. No complex app installation required.",
  },
  {
    icon: Type,
    title: "Creative Captions",
    description:
      "Add personalized captions with emotion and unique style. Make each moment truly yours.",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description:
      "Share moments with friends instantly with a single tap. No downloads, no complicated steps.",
  },
  {
    icon: Smartphone,
    title: "WebApp Ready",
    description:
      "Access all features directly from your browser. PWA support for smooth offline experience.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Get notified when there's a new moment or important update. Never miss what matters.",
  },
  {
    icon: Calendar,
    title: "Moment History",
    description:
      "Easily browse and organize your past moments. Every memory preserved and accessible.",
  },
];

const FeatureCardMarquee = () => {
  return (
    <div className="relative overflow-hidden">
      <Marquee speed={30} gradient={false}>
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="relative p-6 rounded-2xl mx-3 bg-base-100 border border-base-300 w-[280px] h-[200px] flex-shrink-0 flex flex-col"
            >
              <div className="w-12 h-12 bg-base-200 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-base-content" />
              </div>
              <h3 className="text-base font-semibold text-base-content mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-base-content/60 leading-relaxed line-clamp-3">
                {feature.description}
              </p>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default FeatureCardMarquee;
