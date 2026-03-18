import { useEffect, useRef, useState } from "react";

const statsData = [
  {
    value: 10000,
    display: "10K+",
    label: "Active Users",
  },
  {
    value: 1.7,
    display: "1.7M+",
    label: "Photos & Videos Created",
  },
  {
    value: 30,
    display: "30GB+",
    label: "Daily Data Usage",
  },
  {
    value: 4.8,
    display: "4.8/5",
    label: "Average Rating",
  },
];

const AnimatedNumber = ({ value, display }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const duration = 1200;
          const start = performance.now();

          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            setCount(progress * value);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      {display.includes("K")
        ? `${Math.round(count / 1000)}K+`
        : display.includes("GB")
        ? `${Math.round(count)}GB+`
        : display.includes("/5")
        ? `${count.toFixed(1)}/5`
        : display.includes("M")
        ? `${count.toFixed(1)}M+`
        : Math.round(count)}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="w-full py-20 bg-base-200/50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
            Trusted by thousands
          </h2>
          <p className="text-lg text-base-content/60">
            Join our growing community of users sharing moments every day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-base-content mb-2">
                <AnimatedNumber value={stat.value} display={stat.display} />
              </div>
              <p className="text-base-content/60 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
