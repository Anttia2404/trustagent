export interface LexAgentConfig {
  v?: number;
  seed?: string;
  core?: Record<string, unknown>;
  agents?: Record<string, unknown>;
  scene?: Record<string, unknown>;
  frame?: Record<string, unknown>;
  color?: Record<string, unknown>;
}

export interface LexAgentEngineOptions {
  interactive?: boolean;
  pointerTarget?: EventTarget;
  maxDpr?: number;
}

export interface LexAgentEngine {
  setConfig(next: LexAgentConfig, opts?: { rebuild?: boolean }): void;
  getConfig(): LexAgentConfig;
  rebuild(): void;
  setPaused(paused: boolean): void;
  isPaused(): boolean;
  setRunning(on: boolean): void;
  setInsets(insets: { right?: number; top?: number; bottom?: number }): void;
  snapshot(): string;
  resetView(): void;
  canvas: HTMLCanvasElement;
  dispose(): void;
}

export function createLexAgentEngine(container: HTMLElement, config: LexAgentConfig, opts?: LexAgentEngineOptions): LexAgentEngine;
