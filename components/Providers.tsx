"use client";

import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
