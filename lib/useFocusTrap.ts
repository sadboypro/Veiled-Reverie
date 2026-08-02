"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus inside `ref` while `active`, and restores focus to the
 * element that was focused before activation when it closes. Used by the
 * lightbox and the mobile menu so Tab can't wander behind an open overlay.
 *
 * The container should carry `tabIndex={-1}` so it can hold focus when it has
 * no focusable children of its own.
 */
export function useFocusTrap(active: boolean, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getItems = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
      );

    // Move focus into the overlay.
    const items = getItems();
    (items[0] ?? container).focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = getItems();
      if (focusables.length === 0) {
        e.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === first || activeEl === container)) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus to the trigger for a clean keyboard journey.
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, ref]);
}
