import React from "react";
import { MoonLoader } from "react-spinners";

const Spinner = ({ size = 24, className = "" }) => {
  // We can try to get the accent color from CSS variable or just hardcode a default
  // react-spinners needs a color string.
  // Let's use a standard blue-ish color or try to read getComputedStyle if we want to be fancy,
  // but for now let's just use a nice default that matches our theme (usually blue/purple).
  // Or we can rely on a specific prop.
  // Let's default to a hex that matches 'var(--accent)' if possible,
  // or just use a standard color like '#4f46e5' (Indigo 600) for now.
  const color = "#4f46e5";

  return (
    <div className={className}>
      <MoonLoader color={color} size={size} loading={true} />
    </div>
  );
};

export default Spinner;
