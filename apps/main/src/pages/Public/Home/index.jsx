import "./styles.css";
import { lazy, Suspense, useState } from "react";
import { ArrowRight, Download, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { COMMUNITY_CONFIG } from "@/config";

const StatsSection = lazy(() => import("./StatsSection"));
const NotificationPrompt = lazy(() =>
  import("@/components/ui/NotificationPrompt")
);
const FeatureCardMarquee = lazy(() => import("./FeatureCardMarquee"));
const StepsSection = lazy(() => import("./StepsSection"));

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-base-100">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center gap-6 text-left order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-medium tracking-wide uppercase bg-base-200 text-base-content/70 rounded-full">
                Photo Sharing Reimagined
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-base-content leading-[1.1] tracking-tight">
              <span className="block">Capture.</span>
              <span className="block">Share.</span>
              <span className="block text-base-content/60">Connect.</span>
            </h1>

            <p className="text-base-content/70 text-lg lg:text-xl leading-relaxed max-w-lg">
              Share moments with friends instantly. Add captions, send photos directly to their home screen widget. Simple, fast, personal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-base-content text-base-100 rounded-xl transition-all duration-300 hover:opacity-90 hover:gap-3"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/download"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold border-2 border-base-content/10 text-base-content rounded-xl transition-all duration-300 hover:bg-base-200"
              >
                <Download className="w-4 h-4" />
                Install App
              </Link>
            </div>

            <p className="text-base-content/50 text-sm mt-4">
              Free to use. No ads. Your privacy protected.
            </p>
          </div>

          {/* Right - Phone Preview */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-base-200 to-base-300 rounded-3xl blur-2xl opacity-50"></div>
              <img
                src="https://cdn.locket-dio.com/v1/images/double-phone-view-locketdio.webp"
                alt="Locket App Preview"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`relative w-full max-w-[320px] lg:max-w-[400px] h-auto object-contain transition-all duration-700 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-base-200/50">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
              Powerful features designed to make sharing moments effortless and meaningful.
            </p>
          </div>
          <Suspense fallback={null}>
            <FeatureCardMarquee />
          </Suspense>
        </div>
      </section>

      {/* Steps Section */}
      <Suspense fallback={null}>
        <StepsSection />
      </Suspense>

      {/* Stats Section */}
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>

      {/* CTA Section */}
      <section className="w-full py-24 bg-base-content text-base-100">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg lg:text-xl opacity-80 mb-10 max-w-2xl mx-auto">
            Join thousands of users sharing moments with the people they love. Download now and start connecting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/download"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-base-100 text-base-content rounded-xl transition-all duration-300 hover:opacity-90"
            >
              <Download className="w-5 h-5" />
              Download Free
            </Link>
            <a
              href={COMMUNITY_CONFIG.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold border-2 border-base-100/20 text-base-100 rounded-xl transition-all duration-300 hover:bg-base-100/10"
            >
              <Users className="w-5 h-5" />
              Join Community
            </a>
          </div>
        </div>
      </section>

      {/* Notification Prompt */}
      <Suspense fallback={null}>
        <NotificationPrompt />
      </Suspense>
    </div>
  );
};

export default Home;
