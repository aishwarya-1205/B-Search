import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DynamicSky = ({ onThemeChange }: { onThemeChange: (isDark: boolean) => void }) => {
  const [timeInfo, setTimeInfo] = useState(() => getTimeInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInfo(getTimeInfo());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onThemeChange(timeInfo.isDark);
  }, [timeInfo.isDark, onThemeChange]);

  // Sun/moon position: arcs across the upper sky from top-left to top-right
  const { progress, isDark } = timeInfo;
  const x = 5 + progress * 90; // 5% to 95% horizontal
  const arcHeight = Math.sin(progress * Math.PI) * 30; // 0-30% vertical arc
  const topPercent = 5 + (30 - arcHeight); // peaks at 5% from top, rests at 35%

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Stars - only visible at night */}
      {isDark && (
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-foreground/60"
              style={{
                width: Math.random() * 2.5 + 1,
                height: Math.random() * 2.5 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun or Moon */}
      <motion.div
        className="absolute"
        style={{
          left: `${x}%`,
          top: `${topPercent}%`,
          transform: "translateX(-50%) translateY(-50%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {isDark ? <Moon /> : <Sun />}
      </motion.div>

      {/* Drifting clouds */}
      <Clouds isDark={isDark} />

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: isDark
            ? "linear-gradient(to top, hsl(230 30% 6% / 0.6), transparent)"
            : `linear-gradient(to top, hsl(${timeInfo.glowHue} 60% 85% / 0.5), transparent)`,
        }}
      />
    </div>
  );
};

const CLOUD_CONFIGS = [
  { top: "12%", duration: 80, delay: 0, scale: 1, opacity: 0.7 },
  { top: "22%", duration: 120, delay: -40, scale: 0.7, opacity: 0.5 },
  { top: "8%", duration: 100, delay: -70, scale: 0.85, opacity: 0.6 },
  { top: "18%", duration: 90, delay: -20, scale: 0.6, opacity: 0.45 },
  { top: "28%", duration: 110, delay: -55, scale: 0.75, opacity: 0.55 },
];

function Clouds({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {CLOUD_CONFIGS.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: cloud.top, scale: cloud.scale }}
          initial={{ x: "-20%" }}
          animate={{ x: "120vw" }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: "linear",
          }}
        >
          <svg
            width="180"
            height="70"
            viewBox="0 0 180 70"
            fill="none"
            style={{ opacity: isDark ? cloud.opacity * 0.3 : cloud.opacity }}
          >
            <ellipse cx="70" cy="45" rx="70" ry="25" fill={isDark ? "hsl(220 20% 40%)" : "hsl(0 0% 100%)"} />
            <ellipse cx="45" cy="35" rx="40" ry="30" fill={isDark ? "hsl(220 20% 40%)" : "hsl(0 0% 100%)"} />
            <ellipse cx="110" cy="38" rx="50" ry="22" fill={isDark ? "hsl(220 20% 40%)" : "hsl(0 0% 100%)"} />
            <ellipse cx="80" cy="25" rx="35" ry="25" fill={isDark ? "hsl(220 20% 38%)" : "hsl(0 0% 98%)"} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function Sun() {
  return (
    <div className="relative">
      {/* Glow */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(45 100% 60% / 0.3), transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Sun body */}
      <div
        className="w-16 h-16 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, hsl(48 100% 72%), hsl(35 100% 55%))",
          boxShadow: "0 0 40px hsl(45 100% 60% / 0.5), 0 0 80px hsl(45 100% 60% / 0.2)",
        }}
      />
      {/* Rays */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            width: 2,
            height: 10,
            background: "hsl(45 100% 65% / 0.6)",
            borderRadius: 2,
            transformOrigin: "center -20px",
            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`,
          }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function Moon() {
  return (
    <div className="relative">
      {/* Moon glow */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(220 40% 80% / 0.25), transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      {/* Moon body */}
      <div
        className="w-14 h-14 rounded-full relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 40% 40%, hsl(220 20% 92%), hsl(220 15% 78%))",
          boxShadow: "0 0 30px hsl(220 30% 80% / 0.4), 0 0 60px hsl(220 30% 80% / 0.15)",
        }}
      >
        {/* Craters */}
        <div
          className="absolute rounded-full"
          style={{
            width: 8, height: 8, top: 10, left: 18,
            background: "hsl(220 10% 72% / 0.5)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 5, height: 5, top: 28, left: 10,
            background: "hsl(220 10% 72% / 0.4)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 6, height: 6, top: 18, left: 34,
            background: "hsl(220 10% 72% / 0.35)",
          }}
        />
      </div>
    </div>
  );
}

function getTimeInfo() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  // Sunrise at 6am (360min), sunset at 18pm (1080min)
  const sunriseMin = 360;
  const sunsetMin = 1080;
  const dayLength = sunsetMin - sunriseMin;

  let progress: number;
  let isDark: boolean;

  if (totalMinutes >= sunriseMin && totalMinutes <= sunsetMin) {
    // Daytime: progress 0 to 1
    progress = (totalMinutes - sunriseMin) / dayLength;
    isDark = false;
  } else {
    // Nighttime
    isDark = true;
    const nightLength = 1440 - dayLength;
    if (totalMinutes > sunsetMin) {
      progress = (totalMinutes - sunsetMin) / nightLength;
    } else {
      progress = (totalMinutes + (1440 - sunsetMin)) / nightLength;
    }
  }

  // Glow hue shifts through the day (warm sunrise -> blue midday -> warm sunset)
  const glowHue = progress < 0.2
    ? 30 + progress * 100
    : progress > 0.8
    ? 30 + (1 - progress) * 100
    : 210;

  return { progress, isDark, glowHue };
}

export default DynamicSky;
