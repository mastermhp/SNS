"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, X, Loader2, Tag, Copy } from "lucide-react";
import Image from "next/image";
import ComingSoon from "./ComingSoon";

const games = [
  { id: "apex", name: "Apex Legends", image: "/games/apex.png" },
  {
    id: "cod-bo7",
    name: "Call of Duty: Black Ops 7",
    image: "/games/codm.png",
  },
  {
    id: "cod-warzone",
    name: "Call of Duty: Warzone",
    image: "/games/codm.png",
  },
  { id: "chess", name: "Chess", image: "/games/chess.png" },
  { id: "cs2", name: "Counter-Strike 2", image: "/games/csgo.png" },
  { id: "crossfire", name: "Crossfire", image: "/games/cf.jpeg" },
  { id: "dota2", name: "Dota 2", image: "/games/dota2.png" },
  { id: "fc26-pc", name: "FC26 - PC", image: "/games/fifapc.png" },
  {
    id: "fc26-consoles",
    name: "FC26 - Consoles",
    image: "/games/fcconsole.png",
  },
  { id: "fc26-mobile", name: "FC26 - Mobile", image: "/games/fcmobile.png" },
  {
    id: "efootball-pc",
    name: "eFootball - PC",
    image: "/games/efootballpc.png",
  },
  {
    id: "efootball-consoles",
    name: "eFootball - Consoles",
    image: "/games/efootballconsole.png",
  },
  {
    id: "efootball-mobile",
    name: "eFootball - Mobile",
    image: "/games/efootballmobile.png",
  },
  {
    id: "fatal-fury",
    name: "Fatal Fury: City of the Wolves",
    image: "/games/ff.jpeg",
  },
  { id: "freefire", name: "Free Fire", image: "/games/freefire.png" },
  { id: "hok", name: "Honor of Kings", image: "/games/hk.jpeg" },
  { id: "lol", name: "League of Legends", image: "/games/lol.png" },
  { id: "mlbb", name: "Mobile Legends: Bang Bang", image: "/games/mlbb.png" },
  { id: "overwatch2", name: "Overwatch 2", image: "/games/overwatch.png" },
  { id: "pubg", name: "PUBG / PUBG: Battlegrounds", image: "/games/pubg.png" },
  { id: "pubg-mobile", name: "PUBG Mobile", image: "/games/pubg.png" },
  { id: "r6x", name: "Rainbow Six Siege X", image: "/games/r6.jpeg" },
  { id: "sf6", name: "Street Fighter 6", image: "/games/sf6.png" },
  { id: "tft", name: "Teamfight Tactics", image: "/games/tt.jpeg" },
  { id: "valorant", name: "VALORANT", image: "/games/valorant.png" },
  {
    id: "valorant-mobile",
    name: "VALORANT Mobile",
    image: "/games/valorant.png",
  },
  { id: "coc", name: "Clash of Clans", image: "/games/coc.png" },
];

const AnimatedInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
  onPaste,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={onPaste}
        disabled={disabled}
        className={`w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 pt-6 rounded-lg outline-none transition-all peer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        required={required}
      />
      <motion.label
        className={`absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 ${
          isFocused || hasValue
            ? "top-1.5 text-xs text-purple-400 font-medium"
            : "top-3.5 text-base"
        }`}
        initial={false}
        animate={{
          y: isFocused || hasValue ? 0 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
        }}
      >
        {label} {required && <span className="text-pink-500">*</span>}
      </motion.label>
    </div>
  );
};

export default function SignupModal({
  isOpen,
  onClose,
  showPayment = false,
  eventType = "",
  price = 0,
  flowType = "default",
  showPlanSelection = false,
  showBrandDealType = false,
  showScrimsDuration = false,
}) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBrandType, setSelectedBrandType] = useState(null);
  const [selectedScrimsDuration, setSelectedScrimsDuration] = useState(null);
  const [selectedGames, setSelectedGames] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    University: "",
    district: "",
    fbUrl: "",
    youtubeUrl: "",
    trnxId: "",
    trnxIdConfirm: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeData, setPromoCodeData] = useState(null); // Stores validated promo data
  const [promoCodeError, setPromoCodeError] = useState("");
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [qrImageError, setQrImageError] = useState(false);
  const [qrImageError2, setQrImageError2] = useState(false);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    console.log("Copied:", value); // replace with toast if you want
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedPlan(null);
      setSelectedBrandType(null);
      setSelectedScrimsDuration(null);
      setSelectedGames([]);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        University: "",
        district: "",
        fbUrl: "",
        youtubeUrl: "",
        trnxId: "",
        trnxIdConfirm: "",
      });
      setPromoCode("");
      setPromoCodeData(null);
      setPromoCodeError("");
      setDiscountedPrice(null);
      setQrImageError(false);
      setQrImageError2(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmTrnxPaste = (e) => {
    e.preventDefault();
    showNotification(
      "error",
      "Please type the Transaction ID manually. Copy-paste is not allowed for confirmation.",
    );
  };

  const formatPhoneNumber = (phone) => {
    let cleaned = phone.replace(/[\s-]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "+880" + cleaned.substring(1);
    } else if (cleaned.startsWith("880") && !cleaned.startsWith("+880")) {
      cleaned = "+" + cleaned;
    } else if (!cleaned.startsWith("+")) {
      cleaned = "+880" + cleaned;
    }
    return cleaned;
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
      if (type === "success") {
        onClose();
      }
    }, 5000); // Increased timeout for better readability
  };

  const getMaxGamesAllowed = () => {
    if (selectedPlan === "free" || selectedPlan === "premium") return 3;
    if (selectedBrandType === "solo") return 5;
    if (selectedBrandType === "team") return 10;
    if (flowType === "tournament" || flowType.includes("tournament")) return 1;
    if (flowType === "scrims" || flowType.includes("scrims")) return 2;
    return 1;
  };

  const getDurationValue = () => {
    if (selectedScrimsDuration === "7days") return 7;
    if (selectedScrimsDuration === "15days") return 15;
    if (selectedScrimsDuration === "30days") return 30;
    if (flowType.includes("tournament")) return 30;
    return null;
  };

  const getEventTypeForPromo = () => {
    if (selectedBrandType) return "Brand Deal";
    if (flowType.includes("tournament")) return "Tournament";
    if (flowType.includes("scrims") || selectedScrimsDuration) return "Scrims";
    return null;
  };

  const getBasePrice = () => {
    if (selectedPlan === "premium") return 99;
    if (selectedPlan === "free") return 0;
    if (selectedBrandType === "solo") return 499; // Updated price
    if (selectedBrandType === "team") return 999; // Updated price
    if (selectedScrimsDuration === "7days") return 199;
    if (selectedScrimsDuration === "15days") return 349;
    if (selectedScrimsDuration === "30days") return 499;
    if (flowType.includes("tournament")) return 499;
    return price;
  };

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoCodeError("Please enter a promo code");
      return;
    }

    setIsValidatingPromo(true);
    setPromoCodeError("");
    setPromoCodeData(null);
    setDiscountedPrice(null);

    try {
      const eventType = getEventTypeForPromo();
      let url = `https://api.slicenshare.com/api/v2/public/events/promo-code/validate?code=${encodeURIComponent(
        promoCode.trim(),
      )}`;
      if (eventType) {
        url += `&eventType=${encodeURIComponent(eventType)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      console.log("[v0] Promo code validation response:", data);

      if (data.success && data.data?.valid) {
        setPromoCodeData(data.data);

        // Calculate discounted price
        const basePrice = getBasePrice();
        let newPrice = basePrice;

        if (data.data.discountType === "percentage") {
          newPrice = basePrice - (basePrice * data.data.discountValue) / 100;
        } else if (data.data.discountType === "fixed") {
          newPrice = Math.max(0, basePrice - data.data.discountValue);
        } else if (data.data.discountType === "free") {
          newPrice = 0;
        }

        setDiscountedPrice(Math.round(newPrice));
        showNotification(
          "success",
          `Promo code applied! You get ${
            data.data.discountType === "percentage"
              ? data.data.discountValue + "%"
              : data.data.discountType === "free"
                ? "100%"
                : "৳" + data.data.discountValue
          } off!`,
        );
      } else {
        setPromoCodeError(
          data.data?.error || data.message || "Invalid promo code",
        );
        setPromoCodeData(null);
        setDiscountedPrice(null);
      }
    } catch (error) {
      console.error("[v0] Promo code validation error:", error);
      setPromoCodeError("Failed to validate promo code. Please try again.");
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoCodeData(null);
    setPromoCodeError("");
    setDiscountedPrice(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentPrice =
      discountedPrice !== null ? discountedPrice : getBasePrice();
    if (currentPrice > 0) {
      if (formData.trnxId !== formData.trnxIdConfirm) {
        showNotification(
          "error",
          "Transaction IDs do not match. Please enter the same Transaction ID in both fields.",
        );
        return;
      }
      if (!formData.trnxId.trim()) {
        showNotification("error", "Please enter your Transaction ID.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formattedPhone = formatPhoneNumber(formData.phone);

      if (
        selectedPlan &&
        (selectedPlan === "free" || selectedPlan === "premium")
      ) {
        const payload = {
          name: formData.fullName,
          email: formData.email,
          phone: formattedPhone,
          tier: selectedPlan,
          games: selectedGames.map((g) => g.name),
          interests: ["gaming", "esports"],
          source: "website",
        };

        if (selectedPlan === "premium" && currentPrice > 0) {
          payload.trnxId = formData.trnxId;
        }

        // Keeping this for future compatibility

        console.log("[v0] Newsletter subscription payload:", payload);

        const res = await fetch(
          "https://api.slicenshare.com/api/v2/public/newsletter/subscribe",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        const responseText = await res.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { message: responseText || "Unknown error occurred" };
        }

        console.log("[v0] Newsletter API response:", res.status, responseData);

        if (res.ok) {
          showNotification(
            "success",
            responseData.message ||
              "Subscription successful! Please check your email to verify.",
          );
        } else {
          const errorMsg = responseData.errors
            ? responseData.errors.map((e) => e.message || e.msg || e).join(", ")
            : responseData.message || "Something went wrong. Please try again.";
          showNotification("error", errorMsg);
        }
      } else if (
        selectedBrandType ||
        flowType.includes("tournament") ||
        flowType.includes("scrims") ||
        selectedScrimsDuration
      ) {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formattedPhone,
          University: formData.University,
          district: formData.district,
          trnxId: formData.trnxId,
          games: selectedGames.map((g) => g.name),
          eventName: eventType || "Event Signup",
        };

        if (formData.fbUrl) payload.fbUrl = formData.fbUrl;
        if (formData.youtubeUrl) payload.youtubeUrl = formData.youtubeUrl;

        if (promoCodeData?.valid && promoCode.trim()) {
          payload.promoCode = promoCode.trim().toUpperCase();
        }

        if (selectedBrandType) {
          payload.eventType = "Brand Deal";
          payload.participantType = selectedBrandType;
        } else if (flowType.includes("tournament")) {
          payload.eventType = "Tournament";
          payload.duration = getDurationValue() || 30;
        } else if (flowType.includes("scrims") || selectedScrimsDuration) {
          payload.eventType = "Scrims";
          payload.duration = getDurationValue();
        }

        console.log("[v0] Event signup payload:", payload);

        const res = await fetch(
          "https://api.slicenshare.com/api/v2/public/events/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        const responseText = await res.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { message: responseText || "Unknown error occurred" };
        }

        console.log("[v0] Event API response:", res.status, responseData);

        if (res.ok) {
          const successMsg =
            responseData.message ||
            "Registration successful! Check your email for Discord invite link and further instructions.";
          showNotification("success", successMsg);
        } else {
          let errorMsg = "Something went wrong. Please try again.";

          if (responseData.errors && Array.isArray(responseData.errors)) {
            errorMsg = responseData.errors
              .map((e) => e.message || e.msg || e)
              .join(", ");
          } else if (responseData.message) {
            errorMsg = responseData.message;
          } else if (responseData.error) {
            errorMsg = responseData.error;
          }

          showNotification("error", errorMsg);
        }
      } else {
        // Default newsletter flow
        const payload = {
          name: formData.fullName,
          email: formData.email,
          phone: formattedPhone,
          tier: "free",
          games:
            selectedGames.length > 0
              ? selectedGames.map((g) => g.name)
              : ["General"],
          interests: ["gaming", "esports"],
          source: "website",
        };

        console.log("[v0] Default newsletter payload:", payload);

        const res = await fetch(
          "https://api.slicenshare.com/api/v2/public/newsletter/subscribe",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        const responseText = await res.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { message: responseText || "Unknown error occurred" };
        }

        console.log(
          "[v0] Default newsletter API response:",
          res.status,
          responseData,
        );

        if (res.ok) {
          showNotification(
            "success",
            responseData.message ||
              "Thanks for subscribing! We'll keep you updated.",
          );
        } else {
          const errorMsg = responseData.errors
            ? responseData.errors.map((e) => e.message || e.msg || e).join(", ")
            : responseData.message || "Something went wrong. Please try again.";
          showNotification("error", errorMsg);
        }
      }
    } catch (error) {
      console.error("[v0] Signup error:", error);
      showNotification(
        "error",
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isNewsletterMode =
    selectedPlan === "free" || selectedPlan === "premium";
  const isMonthlySubscription =
    flowType.includes("tournament") || flowType.includes("scrims");
  const maxGames = getMaxGamesAllowed();

  const basePrice = getBasePrice();
  const dynamicPrice = discountedPrice !== null ? discountedPrice : basePrice;
  const hasDiscount = discountedPrice !== null && discountedPrice < basePrice;

  const showPromoCodeField =
    (selectedBrandType ||
      flowType.includes("tournament") ||
      flowType.includes("scrims") ||
      selectedScrimsDuration) &&
    selectedGames.length > 0;

  if (showPlanSelection && !selectedPlan) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden p-8"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#111827, #111827), linear-gradient(135deg, #8117EE, #E91E63, #FF6B35)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-50"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Select Your Plan
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Choose between Free and Premium access to Slice N Share Network
            </p>

            <div className="grid md:grid-cols-1 gap-6">
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-green-500 transition-all bg-gradient-to-br from-gray-800 to-gray-900"
                onClick={() => setSelectedPlan("free")}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    Free Plan
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get started with basic features
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">৳0</div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ Daily Gaming News </li>
                    <li>✓ Industry Updates</li>
                    <li>✓ Weekly Tournament News globally </li>
                    <li>✓ Monthly Tournament Announcement </li>
                    <li>✓ Meetup Updates globally </li>
                    <li>✓ Jobs & Income Insights</li>
                  </ul>
                </div>
              </motion.div> */}
              <ComingSoon />
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-purple-500 transition-all bg-gradient-to-br from-purple-900/30 to-gray-900"
                onClick={() => setSelectedPlan("premium")}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">
                    Premium Plan
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Unlock all premium features
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">৳99</div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ Daily Gaming News - based on your profile </li>
                    <li>✓ Exclusive Gaming Job Alerts</li>
                    <li>✓ Brand Deal Offer </li>
                    <li>
                      ✓ Weekly National & Global Tournament Info (Premium
                      Exclusive)
                    </li>
                    <li>✓ Monthly National & Tournament Announcements </li>
                    <li>✓ Exclusive Meetup Opportunities</li>
                  </ul>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (showBrandDealType && !selectedBrandType) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden p-8"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#111827, #111827), linear-gradient(135deg, #8117EE, #E91E63, #FF6B35)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-50"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Select Brand Deal Type
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Choose between Solo or Team/Organization sponsorship
            </p>
            <ComingSoon />

            {/* <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-blue-500 transition-all bg-gradient-to-br from-gray-800 to-gray-900"
                onClick={() => setSelectedBrandType("solo")}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    Solo
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Individual player sponsorship
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">৳499</div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ Personal brand earning</li>
                    <li>✓ Individual brand deals</li>
                    <li>✓ Free tournament entries</li>
                    <li>✓ Exclusive invitations</li>
                    <li>✓ Device support (T&C)</li>
                    <li>✓ Content studio access</li>
                    <li className="text-green-400 font-medium">
                      💰 Earning: 5,000 BDT to a few lakhs
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-purple-500 transition-all bg-gradient-to-br from-purple-900/30 to-gray-900"
                onClick={() => setSelectedBrandType("team")}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">
                    Team
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Team or organization sponsorship
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">৳999</div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ Team-based brand earning</li>
                    <li>✓ Guaranteed team brand deals</li>
                    <li>✓ Sponsorship pipeline (jersey, bootcamp, gear)</li>
                    <li>✓ Free team tournament access</li>
                    <li>✓ VIP event invites</li>
                    <li>✓ Multi-device/gear support</li>
                    <li>✓ Full team content studio access</li>
                    <li className="text-green-400 font-medium">
                      💰 Earning: 15,000 BDT to several lakhs/month
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div> */}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (showScrimsDuration && !selectedScrimsDuration) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-5xl relative overflow-hidden p-8 max-h-[90vh] overflow-y-auto"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#111827, #111827), linear-gradient(135deg, #8117EE, #E91E63, #FF6B35)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-50"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Select Scrims Duration
            </h2>

            {/* <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg p-6 mb-8 border border-purple-500/30"> */}
              {/* <h3 className="text-xl font-bold text-white mb-3">
                Why Monthly Subscription?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our scrims subscription model ensures consistent, high-quality
                practice sessions with dedicated matchmaking. Subscribers get
                priority access to scrims, regular practice schedules,
                performance analytics, and continuous improvement tracking. This
                commitment helps build better teams and enhances competitive
                readiness month after month.
              </p> */}

              {/* Bangla Translation */}
              {/* <h3 className="text-xl font-bold text-white mb-4 mt-6">
                স্ক্রিমের জন্য মাসিক সাবস্ক্রিপশন কেন?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                আমাদের স্ক্রিম সাবস্ক্রিপশন মডেল আপনাকে ধারাবাহিক ও উচ্চমানের
                প্র্যাকটিস সেশন নিশ্চিত করে, যেখানে থাকে ডেডিকেটেড ম্যাচমেকিং
                এবং উচ্চ্যমূল্যের প্রাইজপুল ম্যাচ। সাবস্ক্রাইবাররা পায় স্ক্রিমে
                প্রাধান্যভিত্তিক অ্যাক্সেস, নিয়মিত প্র্যাকটিস সূচি,
                পারফরম্যান্স অ্যানালিটিক্স এবং ধারাবাহিক উন্নয়ন ট্র্যাকিং। এই
                ধারাবাহিকতা দলকে আরও শক্তিশালী করে এবং প্রতি মাসে
                প্রতিযোগিতামূলক প্রস্তুতিকে আরও উন্নত করে।
              </p>
              <br />
              <p className="font-bold">
                বিঃ দ্রঃ প্রতি মাসের প্রাইজপুল ম্যাচ শুরুর আগে জানানো হয়। যেখানে
                কয়েক হাজার টাকা এবং গেমিং , জার্সি সহ অনেক কিছু গিফট থাকবে।
              </p> */}
            {/* </div> */}
            <ComingSoon />

            {/* <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-green-500 transition-all bg-gradient-to-br from-gray-800 to-gray-900"
                onClick={() => setSelectedScrimsDuration("7days")}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    7 Days
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Weekly subscription
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">
                    ৳199<span className="text-lg text-gray-400"></span>
                  </div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ 7-day access</li>
                    <li>
                      ✓ Just put Daiy Scrim (1 Mini Tournament with prizpool)
                    </li>
                    <li>✓ Gifts and Real Money</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-blue-500 transition-all bg-gradient-to-br from-blue-900/30 to-gray-900"
                onClick={() => setSelectedScrimsDuration("15days")}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    15 Days
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Bi-weekly subscription
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">
                    ৳349<span className="text-lg text-gray-400"></span>
                  </div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ 15-day access</li>
                    <li>✓ Priority scrims</li>
                    <li>✓ 2 Mini Tournament </li>
                    <li>✓ Gift , Prizepool Tournament </li>
                    <li>✓ Free Meetup </li>
                    <li>✓ Brand Deal Offer Based on your Skill </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-xl p-6 border-2 border-gray-700 hover:border-purple-500 transition-all bg-gradient-to-br from-purple-900/30 to-gray-900 relative"
                onClick={() => setSelectedScrimsDuration("30days")}
              >
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">
                    1 Month
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Monthly subscription
                  </p>
                  <div className="text-4xl font-bold text-white mb-4">
                    ৳499<span className="text-lg text-gray-400"></span>
                  </div>
                  <ul className="text-left text-sm text-gray-300 space-y-2">
                    <li>✓ Full month access</li>
                    <li>✓ VIP scrims priority</li>
                    <li>✓ 1 Mini Prizepool Scrims </li>
                    <li>✓ Larger Prizepool 1 Tournament </li>
                    <li>✓ Exclusive Event Invitation </li>
                    <li>✓ Brand Deal offer </li>
                    <li>✓ Stable Earning Offer </li>
                    <li>✓ Studio Support if you need </li>
                    <li>
                      ✓ Opportunity to be Full Time Professional Players
                      (Coaching Support){" "}
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div> */}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const handleGameSelect = (game) => {
    const isSelected = selectedGames.find((g) => g.id === game.id);

    if (isSelected) {
      setSelectedGames(selectedGames.filter((g) => g.id !== game.id));
    } else {
      if (selectedGames.length < maxGames) {
        setSelectedGames([...selectedGames, game]);
      } else {
        showNotification(
          "error",
          `You can select maximum ${maxGames} game${maxGames > 1 ? "s" : ""}.`,
        );
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          style={{
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(#111827, #111827), linear-gradient(135deg, #8117EE, #E91E63, #FF6B35)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-50"
          >
            <X size={28} />
          </button>

          {basePrice > 0 && selectedGames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="absolute top-6 right-16 z-40"
            >
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-600"></div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-gray-600"></div>

                <div
                  className="relative w-28 h-28 flex items-center justify-center"
                  style={{
                    background: hasDiscount
                      ? "linear-gradient(135deg, #10B981, #059669, #047857)"
                      : "linear-gradient(135deg, #8117EE, #E91E63, #FF6B35)",
                    clipPath:
                      "polygon(50% 0%, 61% 8%, 73% 5%, 82% 15%, 90% 10%, 95% 22%, 100% 30%, 98% 43%, 100% 55%, 95% 67%, 90% 73%, 82% 78%, 73% 85%, 61% 82%, 50% 90%, 39% 82%, 27% 85%, 18% 78%, 10% 73%, 5% 67%, 0% 55%, 2% 43%, 0% 30%, 5% 22%, 10% 10%, 18% 15%, 27% 5%, 39% 8%)",
                    boxShadow: hasDiscount
                      ? "0 10px 25px rgba(16, 185, 129, 0.5), 0 5px 15px rgba(5, 150, 105, 0.3)"
                      : "0 10px 25px rgba(129, 23, 238, 0.5), 0 5px 15px rgba(233, 30, 99, 0.3)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-white">
                    {hasDiscount && (
                      <span className="text-xs line-through opacity-70">
                        ৳{basePrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold leading-tight">
                      ৳{dynamicPrice}
                    </span>
                    {isMonthlySubscription && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">
                        /month
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="text-[9px] font-bold uppercase tracking-wide text-yellow-300">
                        DISCOUNT!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {notification.show && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md"
              >
                <div
                  className={`px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 ${
                    notification.type === "success"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-red-500 to-pink-600"
                  }`}
                >
                  {notification.type === "success" ? (
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  )}
                  <p className="font-semibold text-sm">
                    {notification.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-6 md:p-8">
            {flowType.includes("tournament") && selectedGames.length === 0 && (
              <>
                <ComingSoon />
                {/* Championship Banner */}
                {/* <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src="/News/championship-banner.png"
                    alt="Slice N Share Championship"
                    className="w-full h-auto"
                  />
                </div> */}

                {/* Why Monthly Subscription - Bilingual */}
                {/* <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg p-6 mb-6 border border-purple-500/30"> */}
                  {/* <h3 className="text-xl font-bold text-white mb-4">
                    Why Monthly Subscription for Tournaments?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Our tournament subscription gives you unlimited access to
                    all monthly tournaments with guaranteed slots, priority
                    registration, exclusive rewards, and consistent competitive
                    experience. Build your ranking, improve your skills, and
                    compete regularly with the best players every month.
                  </p> */}

                  {/* Bangla Translation */}
                  {/* <h3 className="text-xl font-bold text-white mb-4 mt-6">
                    টুর্নামেন্টের জন্য মাসিক সাবস্ক্রিপশন কেন?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    আমাদের টুর্নামেন্ট সাবস্ক্রিপশন আপনাকে সকল মাসিক
                    টুর্নামেন্টে নিশ্চিত স্লট, অগ্রাধিকার নিবন্ধন, এক্সক্লুসিভ
                    পুরস্কার এবং ধারাবাহিক প্রতিযোগিতামূলক অভিজ্ঞতার সাথে
                    সীমাহীন অ্যাক্সেস দেয়। আপনার র‍্যাঙ্কিং তৈরি করুন, আপনার
                    দক্ষতা উন্নত করুন এবং প্রতি মাসে সেরা খেলোয়াড়দের সাথে
                    নিয়মিত প্রতিদ্বন্দ্বিতা করুন।
                  </p> */}
                {/* </div> */}

                {/* Prize Pool Section */}
                {/* <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-6 mb-8 border border-green-500/30">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-400 mb-2">
                      Total 1 Lacs+ BDT Prizepool Monthly & MVP Gift
                    </h3>
                    <p className="text-xl text-white font-semibold">
                      In total 15 lacs on next 12 months
                    </p>
                  </div>
                </div> */}
              </>
            )}

            {/* {selectedGames.length === 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Select Your Game{maxGames > 1 ? "s" : ""}
                </h2>
                <p className="text-center text-gray-400 mb-6 text-sm">
                  {maxGames === 1
                    ? "Select 1 game"
                    : `Select up to ${maxGames} games`}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
                  {games.map((game) => {
                    const isSelected = selectedGames.find(
                      (g) => g.id === game.id
                    );
                    return (
                      <motion.div
                        key={game.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all h-full flex flex-col ${
                          isSelected
                            ? "border-purple-500 ring-2 ring-purple-400"
                            : "border-gray-700 hover:border-purple-500"
                        }`}
                        onClick={() => handleGameSelect(game)}
                      >
                        <div className="relative flex-shrink-0">
                          {isSelected && (
                            <div className="absolute top-1 right-1 z-10 bg-purple-500 rounded-full p-1">
                              <CheckCircle size={16} />
                            </div>
                          )}
                          <Image
                            src={game.image || "/placeholder.svg"}
                            alt={game.name}
                            width={200}
                            height={120}
                            className="object-cover w-full h-24"
                          />
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-gray-800 min-h-[48px] p-2">
                          <p className="text-center text-xs md:text-sm font-medium line-clamp-2">
                            {game.name}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {selectedGames.length > 0 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {}}
                      className="px-8 py-3 rounded-full font-bold text-white transition bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Continue with {selectedGames.length} game
                      {selectedGames.length > 1 ? "s" : ""}
                    </button>
                  </div>
                )}
              </div>
            )} */}

            {selectedGames.length > 0 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    {selectedGames.map((game) => (
                      <div key={game.id} className="relative">
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={game.name}
                          width={80}
                          height={48}
                          className="rounded-lg shadow-lg border-2 border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedGames(
                              selectedGames.filter((g) => g.id !== game.id),
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {selectedGames.map((g) => g.name).join(", ")}{" "}
                    {isNewsletterMode ? "Subscription" : "Registration"}
                  </h3>
                  {eventType && !isMonthlySubscription && (
                    <p className="text-gray-400 text-sm mt-1">{eventType}</p>
                  )}
                  {eventType && isMonthlySubscription && (
                    <p className="text-gray-400 text-sm mt-1">
                      {eventType} - Monthly Subscription
                    </p>
                  )}
                </div>

                {isNewsletterMode ? (
                  <div className="space-y-4">
                    <AnimatedInput
                      label="Full Name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />

                    <AnimatedInput
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    <AnimatedInput
                      label="Phone Number (01XXXXXXXXX)"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />

                    {selectedPlan === "premium" && (
                      <>
                        <div className="space-y-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
                          {/* Payment Instructions */}
                          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 border border-purple-500/20">
                            <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Payment Instructions
                            </h3>
                            <ol className="space-y-2 text-sm text-gray-300">
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                  1
                                </span>
                                <span>
                                  Put the amount{" "}
                                  <span className="font-bold text-purple-400">
                                    {dynamicPrice} BDT
                                  </span>{" "}
                                  (As your package)
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                  2
                                </span>
                                <span>
                                  Turn ON the{" "}
                                  <span className="font-semibold text-pink-400">
                                    bKash Cash Out Charge
                                  </span>{" "}
                                  feature on your mobile app (bKash will deduct
                                  it automatically)
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                  3
                                </span>
                                <span>Send Money (to our personal number)</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                  4
                                </span>
                                <span>Enter the Transaction ID (Trx ID)</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                  5
                                </span>
                                <span>Submit</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                  6
                                </span>
                                <span>
                                  You will get Email as Confirmation. (If you
                                  dont get email, send your Transaction ID proof
                                  to our Facebook page, Admin will confirm)
                                </span>
                              </li>
                            </ol>
                          </div>

                          {/* QR Codes Section */}
                          <div className="space-y-6">
                            <p className="text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              Scan & Pay ৳{dynamicPrice}
                            </p>

                            <div className="flex justify-center">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
                                {/* Primary QR Block */}
                                <div className="flex flex-col items-center">
                                  <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                                    {/* Glow */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>

                                    {/* QR Container */}
                                    <div className="relative bg-white rounded-xl border-2 border-purple-400 shadow-xl w-full h-full flex items-center justify-center p-4">
                                      {qrImageError ? (
                                        <div className="w-[180px] h-[180px] flex items-center justify-center text-center bg-gray-100 rounded-lg">
                                          <div>
                                            <p className="text-gray-600 text-sm font-semibold mb-1">
                                              QR Code 1
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                              Add /public/qr.jpeg
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <Image
                                          src="/qr.jpeg"
                                          alt="Primary Payment QR Code"
                                          width={180}
                                          height={180}
                                          className="rounded-lg object-contain"
                                          onError={() => setQrImageError(true)}
                                        />
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-sm font-semibold text-purple-300 mt-3 text-center">
                                    Primary QR Code
                                  </p>
                                  <p className="text-xs text-gray-400 text-center mb-1">
                                    Scan with bKash
                                  </p>

                                  <p className="text-xs text-gray-400 text-center mb-2">
                                    OR
                                  </p>
                                  <p className="text-md font-bold flex items-center gap-2 text-gray-400 text-center cursor-pointer">
                                    {/* 01710789995 */}
                                    Number coming soon
                                    {/* <Copy
                                      size={13}
                                      onClick={() => handleCopy("01710789995")}
                                      className="cursor-pointer"
                                    /> */}
                                  </p>
                                </div>

                                {/* Secondary QR Block */}
                                <div className="flex flex-col items-center">
                                  <div className="relative w=[220px] h-[220px] flex items-center justify-center">
                                    {/* Glow */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-md opacity-50"></div>

                                    {/* QR Container */}
                                    <div className="relative bg-white rounded-xl border-2 border-pink-400 shadow-xl w-full h-full flex items-center justify-center p-4">
                                      {qrImageError2 ? (
                                        <div className="w-[180px] h-[180px] flex items-center justify-center text-center bg-gray-100 rounded-lg">
                                          <div>
                                            <p className="text-gray-600 text-sm font-semibold mb-1">
                                              QR Code 2
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <Image
                                          src="/qr2.png"
                                          alt="Backup Payment QR Code"
                                          width={180}
                                          height={180}
                                          className="rounded-lg object-contain"
                                          onError={() => setQrImageError2(true)}
                                        />
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-sm font-semibold text-pink-300 mt-3 text-center">
                                    Backup QR Code
                                  </p>
                                  <p className="text-xs text-gray-400 text-center mb-1">
                                    Use if primary doesn&#39;t work
                                  </p>
                                  <p className="text-xs text-gray-400 text-center mb-2">
                                    OR
                                  </p>
                                  <p className="text-md font-bold flex items-center gap-2 text-gray-400 text-center cursor-pointer">
                                    {/* 01317267498 */}
                                    Number Coming Soon
                                    {/* <Copy
                                      size={13}
                                      onClick={() => handleCopy("01317267498")}
                                      className="cursor-pointer"
                                    /> */}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Note */}
                            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-4">
                              <p className="text-sm text-yellow-200 font-semibold mb-2">
                                Important Note:
                              </p>
                              <p className="text-xs text-gray-300 leading-relaxed">
                                If the first QR code doesn’t work, use the
                                second QR code. For any issues, message us on
                                Facebook — we will reply within 24 hours.
                              </p>
                            </div>
                          </div>
                        </div>

                        <AnimatedInput
                          label="Transaction ID"
                          type="text"
                          name="trnxId"
                          value={formData.trnxId}
                          onChange={handleInputChange}
                          required
                        />
                        <AnimatedInput
                          label="Confirm Transaction ID (Type again, no copy-paste)"
                          type="text"
                          name="trnxIdConfirm"
                          value={formData.trnxIdConfirm}
                          onChange={handleInputChange}
                          onPaste={handleConfirmTrnxPaste}
                          required
                        />
                        {formData.trnxId &&
                          formData.trnxIdConfirm &&
                          formData.trnxId !== formData.trnxIdConfirm && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                              <AlertCircle size={14} /> Transaction IDs do not
                              match
                            </p>
                          )}
                        {formData.trnxId &&
                          formData.trnxIdConfirm &&
                          formData.trnxId === formData.trnxIdConfirm && (
                            <p className="text-green-400 text-sm flex items-center gap-1">
                              <CheckCircle size={14} /> Transaction IDs match
                            </p>
                          )}
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <AnimatedInput
                        label="Full Name"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />

                      <AnimatedInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />

                      <AnimatedInput
                        label="Phone Number (01XXXXXXXXX)"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />

                      <AnimatedInput
                        label="University"
                        type="text"
                        name="University"
                        value={formData.University}
                        onChange={handleInputChange}
                        required
                      />

                      <AnimatedInput
                        label="District"
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                      />

                      <AnimatedInput
                        label="Facebook URL (Optional)"
                        type="url"
                        name="fbUrl"
                        value={formData.fbUrl}
                        onChange={handleInputChange}
                      />

                      <AnimatedInput
                        label="YouTube URL (Optional)"
                        type="url"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleInputChange}
                      />
                    </div>

                    {showPromoCodeField && (
                      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag size={18} className="text-purple-400" />
                          <span className="text-sm font-medium text-gray-300">
                            Have a Promo Code?
                          </span>
                        </div>

                        {promoCodeData?.valid ? (
                          <div className="flex items-center justify-between bg-green-900/30 border border-green-500/50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                size={18}
                                className="text-green-400"
                              />
                              <span className="text-green-400 font-medium">
                                {promoCodeData.code}
                              </span>
                              <span className="text-gray-400 text-sm">
                                (
                                {promoCodeData.discountType === "percentage"
                                  ? `${promoCodeData.discountValue}% off`
                                  : promoCodeData.discountType === "free"
                                    ? "FREE"
                                    : `৳${promoCodeData.discountValue} off`}
                                )
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removePromoCode}
                              className="text-red-400 hover:text-red-300 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => {
                                setPromoCode(e.target.value.toUpperCase());
                                setPromoCodeError("");
                              }}
                              placeholder="Enter promo code"
                              className="flex-1 bg-gray-700 border border-gray-600 focus:border-purple-500 p-3 rounded-lg outline-none text-white placeholder-gray-500 uppercase"
                            />
                            <button
                              type="button"
                              onClick={validatePromoCode}
                              disabled={isValidatingPromo || !promoCode.trim()}
                              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {isValidatingPromo ? (
                                <>
                                  <Loader2 size={16} className="animate-spin" />
                                  Checking...
                                </>
                              ) : (
                                "Apply"
                              )}
                            </button>
                          </div>
                        )}

                        {promoCodeError && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle size={14} /> {promoCodeError}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
                      {/* Payment Instructions */}
                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 border border-purple-500/20">
                        <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Payment Instructions
                        </h3>
                        <ol className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                              1
                            </span>
                            <span>
                              Put the amount{" "}
                              <span className="font-bold text-purple-400">
                                {dynamicPrice} BDT
                              </span>{" "}
                              (As your package)
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                              2
                            </span>
                            <span>
                              Turn ON the{" "}
                              <span className="font-semibold text-pink-400">
                                bKash Cash Out Charge
                              </span>{" "}
                              feature on your mobile app (bKash will deduct it
                              automatically)
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                              3
                            </span>
                            <span>Send Money (to our personal number)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                              4
                            </span>
                            <span>Enter the Transaction ID (Trx ID)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                              5
                            </span>
                            <span>Submit</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                              6
                            </span>
                            <span>
                              You will get Email as Confirmation. (If you dont
                              get email, send your Transaction ID proof to our
                              Facebook page, Admin will confirm)
                            </span>
                          </li>
                        </ol>
                      </div>

                      {/* QR Codes Section */}
                      <div className="space-y-8">
                        <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          Scan & Pay ৳{dynamicPrice}
                        </p>

                        <div className="flex justify-center">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
                            {/* QR ITEM — 1 */}
                            <div className="flex flex-col items-center w-[260px]">
                              <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                                {/* Glow Ring */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-60"></div>

                                {/* QR Container */}
                                <div className="relative bg-white p-4 rounded-xl border-2 border-purple-400 shadow-xl w-full h-full flex items-center justify-center">
                                  <Image
                                    src="/qr.jpeg"
                                    alt="Primary QR Code"
                                    width={180}
                                    height={180}
                                    className="rounded-lg object-contain"
                                  />
                                </div>
                              </div>

                              {/* Text */}
                              <p className="text-center text-sm font-semibold text-purple-300 mt-3">
                                Primary QR Code
                              </p>
                              <p className="text-center text-xs text-gray-400 mb-1">
                                Scan with bKash
                              </p>
                              <p className="text-xs text-gray-400 text-center mb-2">
                                OR
                              </p>
                              <p className="text-md font-bold flex items-center gap-2 text-gray-400 text-center cursor-pointer">
                                {/* 01710789995 */}
                                Number Coming Soon
                                {/* <Copy
                                      size={13}
                                      onClick={() => handleCopy("01710789995")}
                                      className="cursor-pointer"
                                    /> */}
                              </p>
                            </div>

                            {/* QR ITEM — 2 */}
                            <div className="flex flex-col items-center w-[260px]">
                              <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                                {/* Glow Ring */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-md opacity-60"></div>

                                {/* QR Container */}
                                <div className="relative bg-white p-4 rounded-xl border-2 border-pink-400 shadow-xl w-full h-full flex items-center justify-center">
                                  <Image
                                    src="/qr2.png"
                                    alt="Backup QR Code"
                                    width={180}
                                    height={180}
                                    className="rounded-lg object-contain"
                                  />
                                </div>
                              </div>

                              {/* Text */}
                              <p className="text-center text-sm font-semibold text-pink-300 mt-3">
                                Backup QR Code
                              </p>
                              <p className="text-center text-xs text-gray-400 mb-1">
                                Use if primary doesn’t work
                              </p>
                              <p className="text-xs text-gray-400 text-center mb-2">
                                OR
                              </p>
                              <p className="text-md font-bold flex items-center gap-2 text-gray-400 text-center cursor-pointer">
                                {/* 01317267498 */}
                                Number Coming Soon
                                {/* <Copy
                                      size={13}
                                      onClick={() => handleCopy("01317267498")}
                                      className="cursor-pointer"
                                    /> */}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Note Box */}
                        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-5">
                          <p className="text-sm text-yellow-200 font-semibold mb-2">
                            Important Note:
                          </p>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            If the first QR code doesn’t work, use the second.
                            For any issues, message us on Facebook — we will
                            reply within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>

                    {dynamicPrice > 0 && (
                      <>
                        <AnimatedInput
                          label="Transaction ID"
                          type="text"
                          name="trnxId"
                          value={formData.trnxId}
                          onChange={handleInputChange}
                          required
                        />
                        <AnimatedInput
                          label="Confirm Transaction ID (Type again, no copy-paste)"
                          type="text"
                          name="trnxIdConfirm"
                          value={formData.trnxIdConfirm}
                          onChange={handleInputChange}
                          onPaste={handleConfirmTrnxPaste}
                          required
                        />
                        {formData.trnxId &&
                          formData.trnxIdConfirm &&
                          formData.trnxId !== formData.trnxIdConfirm && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                              <AlertCircle size={14} /> Transaction IDs do not
                              match
                            </p>
                          )}
                        {formData.trnxId &&
                          formData.trnxIdConfirm &&
                          formData.trnxId === formData.trnxIdConfirm && (
                            <p className="text-green-400 text-sm flex items-center gap-1">
                              <CheckCircle size={14} /> Transaction IDs match
                            </p>
                          )}
                      </>
                    )}

                    {dynamicPrice === 0 && hasDiscount && (
                      <div className="text-center mt-4 p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                        <CheckCircle
                          size={32}
                          className="mx-auto mb-2 text-green-400"
                        />
                        <p className="text-lg font-semibold text-green-400">
                          100% Discount Applied!
                        </p>
                        <p className="text-gray-400 text-sm">
                          No payment required with your promo code
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGames([]);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        University: "",
                        district: "",
                        fbUrl: "",
                        youtubeUrl: "",
                        trnxId: "",
                        trnxIdConfirm: "",
                      });
                      setPromoCode("");
                      setPromoCodeData(null);
                      setPromoCodeError("");
                      setDiscountedPrice(null);
                    }}
                    className="flex-1 py-3 rounded-full font-bold text-white transition border-2 border-purple-500 hover:bg-purple-500/10"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      (dynamicPrice > 0 &&
                        formData.trnxId !== formData.trnxIdConfirm)
                    }
                    className="flex-1 py-3 rounded-full font-bold text-white transition bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
