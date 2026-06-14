"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SpeechRecognitionState } from "@/types";

/* ═══════════════════════════════════════
   useSpeechRecognition Hook
   Wraps the Web Speech API SpeechRecognition
   ═══════════════════════════════════════ */

// Extend Window for vendor-prefixed API
interface WindowWithSpeech extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

export function useSpeechRecognition(): SpeechRecognitionState & {
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
} {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: "",
    interimTranscript: "",
    error: null,
    isSupported: false,
  });

  const recognitionRef = useRef<WindowWithSpeech["SpeechRecognition"] | null>(null);

  // Check browser support
  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as unknown as WindowWithSpeech;
    const SpeechRecognitionAPI =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      setState((prev) => ({ ...prev, isSupported: true }));

      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript + " ";
          } else {
            interim += result[0].transcript;
          }
        }

        setState((prev) => ({
          ...prev,
          transcript: prev.transcript + final,
          interimTranscript: interim,
        }));
      };

      recognition.onerror = (event: any) => {
        setState((prev) => ({
          ...prev,
          error: event.error,
          isListening: false,
        }));
      };

      recognition.onend = () => {
        setState((prev) => ({ ...prev, isListening: false }));
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      setState((prev) => ({
        ...prev,
        isListening: true,
        error: null,
        interimTranscript: "",
      }));
      recognitionRef.current.start();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to start speech recognition",
        isListening: false,
      }));
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      setState((prev) => ({
        ...prev,
        isListening: false,
        interimTranscript: "",
      }));
    } catch {
      // Ignore errors when stopping
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setState((prev) => ({
      ...prev,
      transcript: "",
      interimTranscript: "",
    }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
  };
}
