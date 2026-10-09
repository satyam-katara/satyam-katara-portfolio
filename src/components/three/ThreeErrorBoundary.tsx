"use client";

import { Component, type ReactNode } from "react";

/** Catches WebGL/scene runtime errors and swaps in the static fallback. */
export class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  render(): ReactNode {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
