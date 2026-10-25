import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { errorMessage } from "../../core/api.js";
import { useAuth } from "../../hooks/useAuth.js";
import { roleHome } from "../../core/nav.js";
import AuthFrame from "../../components/auth/AuthFrame.jsx";
import {
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
} from "../../components/ui.jsx";

const RegisterNew = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const update = (key) => (event) =>
    setFormData((current) => ({ ...current, [key]: event.target.value }));

  const sendOtp = async () => {
    setError("");
    setNotice("");
    setLoading(true);
    try {
      await api.post("/otp/send", {
        email: formData.email.trim(),
        purpose: "register",
      });
      setOtpSent(true);
      setNotice(
        "We sent a 6-digit code to your email. Check your inbox and spam folder.",
      );
    } catch (err) {
      setError(
        errorMessage(
          err,
          "We could not send your code. Check the email address and try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setNotice("");
    setLoading(true);
    try {
      await api.post("/otp/verify", {
        email: formData.email.trim(),
        otp,
        purpose: "register",
      });
      setStep(2);
      setNotice("Email verified. Complete your parent account details.");
    } catch (err) {
      setError(
        errorMessage(err, "That code did not work. Check it and try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (formData.password !== formData.confirmPassword) {
      setError("The passwords do not match. Please enter them again.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const result = await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
      );
      if (!result.success) {
        setError(
          result.message ||
            "We could not create your account. Please try again.",
        );
        return;
      }
      navigate(roleHome(result.user.role), { replace: true });
    } catch (err) {
      setError(
        errorMessage(
          err,
          "We could not create your account. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFrame
      title="Sign up"
      description={
        step === 1
          ? "Create a parent account with a quick email check."
          : "Add your details to finish setting up your account."
      }
    >
      <div
        className="mb-6 flex items-center gap-2"
        aria-label={`Step ${step} of 2`}
      >
        {[1, 2].map((item) => (
          <div
            key={item}
            className={`h-1.5 flex-1 rounded-full transition-colors ${step >= item ? "bg-indigo-600" : "bg-slate-100"}`}
          />
        ))}
        <span className="ml-2 whitespace-nowrap text-xs font-semibold text-slate-500">
          Step {step} of 2
        </span>
      </div>
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {error}
        </div>
      )}
      {notice && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          {notice}
        </div>
      )}

      {step === 1 ? (
        <div className="space-y-5">
          <div>
            <label htmlFor="signup-email" className={labelClass}>
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              required
              disabled={otpSent || loading}
              value={formData.email}
              onChange={update("email")}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          {!otpSent ? (
            <button
              type="button"
              disabled={loading || !formData.email.trim()}
              onClick={sendOtp}
              className={`${btnPrimary} w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {loading ? "Sending code…" : "Send verification code"}
            </button>
          ) : (
            <>
              <div>
                <label htmlFor="signup-otp" className={labelClass}>
                  6-digit verification code
                </label>
                <input
                  id="signup-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className={`${inputClass} text-center font-mono text-lg tracking-[.4em]`}
                  placeholder="000000"
                />
              </div>
              <button
                type="button"
                disabled={loading || otp.length !== 6}
                onClick={verifyOtp}
                className={`${btnPrimary} w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {loading ? "Checking code…" : "Verify email"}
              </button>
              <div className="flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setNotice("");
                  }}
                  className="font-semibold text-slate-600 hover:text-slate-900"
                >
                  Change email
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={sendOtp}
                  className="font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  Resend code
                </button>
              </div>
            </>
          )}
          <p className="text-center text-xs text-slate-500">
            Only parent and guardian accounts can sign up here. Staff accounts
            are created by a school administrator.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-name" className={labelClass}>
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={80}
              required
              value={formData.name}
              onChange={update("name")}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className={labelClass}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
              value={formData.password}
              onChange={update("password")}
              className={inputClass}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label htmlFor="signup-confirm" className={labelClass}>
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
              value={formData.confirmPassword}
              onChange={update("confirmPassword")}
              className={inputClass}
              placeholder="Enter it once more"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimary} w-full justify-center py-3 disabled:cursor-wait disabled:opacity-60`}
          >
            {loading ? "Creating account…" : "Create parent account"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setStep(1);
              setNotice("");
              setError("");
            }}
            className={`${btnSecondary} w-full justify-center`}
          >
            Back to email verification
          </button>
        </form>
      )}
      <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-700 hover:text-indigo-900"
        >
          Login
        </Link>
      </p>
    </AuthFrame>
  );
};

export default RegisterNew;
