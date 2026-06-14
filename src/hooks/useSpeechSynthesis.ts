"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SpeechSynthesisState } from "@/types";

/* ═══════════════════════════════════════
   useSpeechSynthesis Hook
   Wraps the Web Speech API SpeechSynthesis
   ═══════════════════════════════════════ */

export function useSpeechSynthesis(): SpeechSynthesisState & {
  speak: (text: string, voiceIndex?: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
} {
  const [state, setState] = useState<SpeechSynthesisState>({
    isSpeaking: false,
    isPaused: false,
    voices: [],
    isSupported: false,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    setState((prev) => ({ ...prev, isSupported: true }));

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setState((prev) => ({ ...prev, voices }));
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string, voiceIndex: number = 0) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      // Cancel any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Select a natural-sounding English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter((v) =>
        v.lang.startsWith("en")
      );
      if (englishVoices.length > voiceIndex) {
        utterance.voice = englishVoices[voiceIndex];
      }

      utterance.onstart = () =>
        setState((prev) => ({ ...prev, isSpeaking: true, isPaused: false }));
      utterance.onend = () =>
        setState((prev) => ({
          ...prev,
          isSpeaking: false,
          isPaused: false,
        }));
      utterance.onerror = () =>
        setState((prev) => ({
          ...prev,
          isSpeaking: false,
          isPaused: false,
        }));
      utterance.onpause = () =>
        setState((prev) => ({ ...prev, isPaused: true }));
      utterance.onresume = () =>
        setState((prev) => ({ ...prev, isPaused: false }));

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    []
  );

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setState((prev) => ({
      ...prev,
      isSpeaking: false,
      isPaused: false,
    }));
  }, []);

  const pause = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.pause();
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.resume();
  }, []);

  return { ...state, speak, stop, pause, resume };
}
