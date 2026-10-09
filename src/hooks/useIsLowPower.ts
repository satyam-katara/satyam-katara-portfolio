"use client";

import { useEffect, useState } from "react";

/**
 * Detects low-power devices so we can simplify/disable heavy motion:
 * few CPU cores, data-saver mode, or coarse pointers on weak hardware.
 */
export function useIsLowPower(): boolean {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      hardwareConcurrency?: number;
      connection?: { saveData?: boolean };
    };
    const cores = nav.hardwareConcurrency ?? 8;
    const saveData = nav.connection?.saveData ?? false;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // Coarse pointer alone isn't low-power (modern phones are fast);
    // combine it with a weak signal.
    setLowPower(cores <= 4 || saveData || (coarsePointer && cores <= 6));
  }, []);

  return lowPower;
}
