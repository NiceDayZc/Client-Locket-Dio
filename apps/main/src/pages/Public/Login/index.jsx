import { useState, useEffect } from "react";
import * as utils from "@/utils";
import LoadingRing from "@/components/ui/Loading/ring";
import StatusServer from "@/components/ui/StatusServer";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { SonnerError, SonnerSuccess } from "@/components/ui/SonnerToast";
import { CONFIG } from "@/config";
import RotatingCircleText from "./RotatingCircleText";
import { ensureDBOwner } from "@/cache/configDB";
import { useAuthStore } from "@/stores";
import TurnstileCaptcha from "./TurnstileCaptcha";
import { Mail, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginWithEmail, loginWithPhone } from "@/services";
import { PhoneInput } from "./PhoneInput";

const Login = () => {
  const init = useAuthStore((s) => s.init);
  const hydrate = useAuthStore((s) => s.hydrate);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loginMethod, setLoginMethod] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    const stored = localStorage.getItem("rememberMe");
    return stored === null ? true : stored === "true";
  });

  const { useloading } = useApp();
  const { isStatusServer, isLoginLoading, setIsLoginLoading } = useloading;

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  }, [rememberMe]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (CONFIG.keys.turnstileKey && !captchaToken) {
      SonnerError("Please verify you're not a robot");
      return;
    }

    if (loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        SonnerError("Invalid email address");
        return;
      }
    } else {
      const phoneRegex = /^\+[1-9]\d{6,14}$/;
      if (!phoneRegex.test(identifier)) {
        SonnerError("Invalid phone number");
        return;
      }
    }
    setIsLoginLoading(true);

    try {
      const res =
        loginMethod === "email"
          ? await loginWithEmail({
              email: identifier,
              password,
              captchaToken,
            })
          : await loginWithPhone({
              phone: identifier,
              password,
              captchaToken,
            });

      if (!res?.data) throw new Error("Server did not return data");

      const { idToken, localId, refreshToken } = res.data;

      utils.saveToken({ idToken, localId, refreshToken }, rememberMe);
      await ensureDBOwner(localId);

      SonnerSuccess(
        "Login successful!",
        `Welcome back, ${res.data?.displayName || "User"}!`
      );

      init();
      hydrate();
    } catch (error) {
      if (error?.status) {
        switch (error.status) {
          case 400:
            SonnerError("Invalid email or password");
            break;
          case 401:
            SonnerError("Session expired. Please login again");
            break;
          case 429:
            SonnerError("Too many attempts. Please try again later");
            break;
          case 403:
            SonnerError("Access denied");
            window.location.href = "/login";
            break;
          case 500:
            SonnerError("Server error. Please try again later");
            break;
          default:
            SonnerError(error.message || "Login failed");
        }
      } else {
        SonnerError("Connection error. Please check your network");
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "email" ? "phone" : "email");
    setIdentifier("");
    setPassword("");
  };

  const isActiveLogin =
    isStatusServer !== true ||
    isLoginLoading ||
    (CONFIG.keys.turnstileKey && !captchaToken);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-base-100">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Login Card */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-8 shadow-sm">
          <div className="relative mb-8">
            <RotatingCircleText />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-base-content mb-2">
                Welcome back
              </h1>
              <p className="text-base-content/60 text-sm">
                Sign in to continue to your account
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email/Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content">
                {loginMethod === "email" ? "Email" : "Phone Number"}
              </label>
              <div className="relative">
                {loginMethod === "email" ? (
                  <input
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-base-content/20 transition-all"
                  />
                ) : (
                  <PhoneInput phone={identifier} onChange={setIdentifier} />
                )}
              </div>
              <button
                type="button"
                onClick={toggleLoginMethod}
                className="text-xs text-base-content/60 hover:text-base-content flex items-center gap-1 transition-colors"
              >
                {loginMethod === "email" ? (
                  <>
                    <Phone className="w-3 h-3" />
                    Use phone number instead
                  </>
                ) : (
                  <>
                    <Mail className="w-3 h-3" />
                    Use email instead
                  </>
                )}
              </button>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-base-content">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-base-content/60 hover:text-base-content transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-base-content/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 rounded border-base-300 text-base-content focus:ring-base-content/20"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-base-content/70 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isActiveLogin}
              className={`w-full py-3.5 px-4 bg-base-content text-base-100 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                isActiveLogin
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {isLoginLoading ? (
                <>
                  <LoadingRing size={20} stroke={3} speed={2} color="currentColor" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <TurnstileCaptcha onVerify={setCaptchaToken} />

            {/* Server Status */}
            <div className="pt-4 border-t border-base-300">
              <p className="text-xs text-base-content/50 mb-2">Server Status</p>
              <StatusServer />
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-base-content/50 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
