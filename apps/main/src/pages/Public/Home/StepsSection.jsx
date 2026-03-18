import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Lock, Camera, Type, Send } from "lucide-react";

export default function StepsSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: "01",
      icon: Lock,
      title: "Sign In",
      description: "Log in with your Locket account to start using the camera features.",
    },
    {
      number: "02",
      icon: Camera,
      title: "Capture",
      description: "Open the camera directly in your browser and capture the moment.",
    },
    {
      number: "03",
      icon: Type,
      title: "Add Caption",
      description: "Write a unique caption or choose from pre-made options to personalize your moment.",
    },
    {
      number: "04",
      icon: Send,
      title: "Share",
      description: "Post to Locket or save it as a memory to cherish forever.",
    },
  ];

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-wider bg-base-200 text-base-content/70 rounded-full mb-4">
            How it works
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
            Simple as 1, 2, 3, 4
          </h2>
          <p className="text-lg text-base-content/60">
            Create and share beautiful moments in just four easy steps.
          </p>
        </div>

        {/* Mobile: Manual navigation */}
        <div className="block lg:hidden">
          <div className="bg-base-200/50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-bold text-base-content/40">
                {steps[currentStep].number}
              </span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            <div className="flex justify-center mb-6">
              {(() => {
                const Icon = steps[currentStep].icon;
                return <Icon className="w-16 h-16 text-base-content" strokeWidth={1.5} />;
              })()}
            </div>

            <h3 className="text-xl font-semibold text-base-content mb-3 text-center">
              {steps[currentStep].title}
            </h3>
            <p className="text-base-content/60 text-center">
              {steps[currentStep].description}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                className="p-3 rounded-xl border border-base-300 disabled:opacity-30 hover:bg-base-300 transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentStep ? "bg-base-content" : "bg-base-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
                }
                disabled={currentStep === steps.length - 1}
                className="p-3 rounded-xl border border-base-300 disabled:opacity-30 hover:bg-base-300 transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-base-200/50 rounded-2xl p-8 hover:bg-base-200 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-bold text-base-content/40">
                    {step.number}
                  </span>
                  <div className="flex-1 h-px bg-base-300"></div>
                </div>

                <div className="mb-6">
                  <Icon className="w-12 h-12 text-base-content" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-base-content mb-2">
                  {step.title}
                </h3>
                <p className="text-base-content/60 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-base-content text-base-100 font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
