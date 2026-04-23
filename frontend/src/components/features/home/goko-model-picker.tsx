/* eslint-disable i18next/no-literal-string */
/**
 * Goko AI — Quick Model Picker
 * Top 10 coding-focused AI models via OpenRouter.
 * Saves selection to localStorage and Settings API.
 */
import React from "react";
import { useSaveSettings } from "#/hooks/mutation/use-save-settings";
import { useSettings } from "#/hooks/query/use-settings";

interface GokoModel {
  id: string;         // LiteLLM / OpenRouter model ID
  label: string;      // Display name
  provider: string;   // Provider badge text
  color: string;      // Accent color (CSS)
  badge?: string;     // Optional badge (e.g. "Best")
  icon: string;       // Emoji icon
}

// Top 10 coding AI models available via OpenRouter
export const GOKO_CODING_MODELS: GokoModel[] = [
  {
    id: "openrouter/anthropic/claude-sonnet-4-5",
    label: "Claude Sonnet 4.5",
    provider: "Anthropic",
    color: "#d97706",
    badge: "Best",
    icon: "✦",
  },
  {
    id: "openrouter/anthropic/claude-opus-4-5",
    label: "Claude Opus 4.5",
    provider: "Anthropic",
    color: "#b45309",
    icon: "◈",
  },
  {
    id: "openrouter/google/gemini-2.5-pro",
    label: "Gemini 2.5 Pro",
    provider: "Google",
    color: "#0ea5e9",
    icon: "◆",
  },
  {
    id: "openrouter/google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    provider: "Google",
    color: "#38bdf8",
    badge: "Fast",
    icon: "⚡",
  },
  {
    id: "openrouter/deepseek/deepseek-r1",
    label: "DeepSeek R1",
    provider: "DeepSeek",
    color: "#6366f1",
    icon: "◉",
  },
  {
    id: "openrouter/deepseek/deepseek-chat-v3-0324",
    label: "DeepSeek V3",
    provider: "DeepSeek",
    color: "#818cf8",
    badge: "New",
    icon: "◎",
  },
  {
    id: "openrouter/openai/gpt-4.1",
    label: "GPT-4.1",
    provider: "OpenAI",
    color: "#22c55e",
    icon: "◇",
  },
  {
    id: "openrouter/openai/o4-mini",
    label: "o4-mini",
    provider: "OpenAI",
    color: "#4ade80",
    badge: "Reasoning",
    icon: "◐",
  },
  {
    id: "openrouter/qwen/qwen3-235b-a22b",
    label: "Qwen3 235B",
    provider: "Alibaba",
    color: "#f59e0b",
    icon: "◑",
  },
  {
    id: "openrouter/meta-llama/llama-4-scout",
    label: "Llama 4 Scout",
    provider: "Meta",
    color: "#3b82f6",
    icon: "◒",
  },
];

const LS_KEY = "goko_selected_model";

function getStoredModel(): string | null {
  try {
    return localStorage.getItem(LS_KEY);
  } catch {
    return null;
  }
}

function storeModel(modelId: string) {
  try {
    localStorage.setItem(LS_KEY, modelId);
  } catch {
    // ignore
  }
}

interface GokoModelPickerProps {
  compact?: boolean;
}

export function GokoModelPicker({ compact = false }: GokoModelPickerProps) {
  const { data: settings } = useSettings("personal");
  const { mutate: saveSettings } = useSaveSettings();

  // Determine active model: current settings > localStorage > first model
  const currentSettingsModel = settings?.llm_model ?? null;
  const [activeModelId, setActiveModelId] = React.useState<string>(() => {
    const stored = getStoredModel();
    // Find if stored model matches one of ours
    if (stored && GOKO_CODING_MODELS.some((m) => m.id === stored)) {
      return stored;
    }
    if (
      currentSettingsModel &&
      GOKO_CODING_MODELS.some((m) => m.id === currentSettingsModel)
    ) {
      return currentSettingsModel;
    }
    return GOKO_CODING_MODELS[0].id;
  });

  // Sync active model with settings when they load
  React.useEffect(() => {
    if (
      currentSettingsModel &&
      GOKO_CODING_MODELS.some((m) => m.id === currentSettingsModel)
    ) {
      setActiveModelId(currentSettingsModel);
    }
  }, [currentSettingsModel]);

  const handleSelect = React.useCallback(
    (model: GokoModel) => {
      setActiveModelId(model.id);
      storeModel(model.id);

      // Save to settings API using agent_settings format — persists across sessions
      saveSettings({
        agent_settings: {
          llm: {
            model: model.id,
            base_url: "https://openrouter.ai/api/v1",
          },
        },
      } as unknown as Parameters<typeof saveSettings>[0]);
    },
    [saveSettings],
  );

  const activeModel =
    GOKO_CODING_MODELS.find((m) => m.id === activeModelId) ??
    GOKO_CODING_MODELS[0];

  if (compact) {
    // Compact pill dropdown for sidebar or header
    return (
      <div className="relative group flex items-center gap-2">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
          style={{
            background: "rgba(129,140,248,0.08)",
            border: "1px solid rgba(129,140,248,0.2)",
          }}
          title={`Active model: ${activeModel.label}`}
        >
          <span style={{ fontSize: "12px" }}>{activeModel.icon}</span>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            {activeModel.label}
          </span>
          <span style={{ color: "rgba(139,143,168,0.5)", fontSize: "10px" }}>
            {"▾"}
          </span>
        </div>

        {/* Dropdown on hover */}
        <div
          className="absolute top-full left-0 mt-2 z-50 min-w-[220px] rounded-xl overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200"
          style={{
            background: "rgba(10,10,30,0.97)",
            border: "1px solid rgba(129,140,248,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {GOKO_CODING_MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => handleSelect(model)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
              style={{
                background:
                  model.id === activeModelId
                    ? "rgba(129,140,248,0.12)"
                    : "transparent",
                borderBottom: "1px solid rgba(129,140,248,0.06)",
              }}
              onMouseOver={(e) => {
                if (model.id !== activeModelId) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(129,140,248,0.06)";
                }
              }}
              onMouseOut={(e) => {
                if (model.id !== activeModelId) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }
              }}
            >
              <span style={{ fontSize: "14px" }}>{model.icon}</span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-medium truncate"
                  style={{
                    color:
                      model.id === activeModelId ? "#a5b4fc" : "#c5c8e0",
                  }}
                >
                  {model.label}
                </div>
                <div
                  className="text-[10px]"
                  style={{ color: "rgba(139,143,168,0.6)" }}
                >
                  {model.provider}
                </div>
              </div>
              {model.badge && (
                <span
                  className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: `${model.color}22`,
                    color: model.color,
                    border: `1px solid ${model.color}44`,
                  }}
                >
                  {model.badge}
                </span>
              )}
              {model.id === activeModelId && (
                <span style={{ color: "#818cf8", fontSize: "12px" }}>{"✓"}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Full card grid for home screen
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center gap-2 text-xs font-medium"
        style={{ color: "rgba(139,143,168,0.7)" }}
      >
        <span
          className="inline-block w-3 h-px"
          style={{ background: "rgba(129,140,248,0.4)" }}
        />
        {"Active Model"}
        <span
          className="inline-block flex-1 h-px"
          style={{ background: "rgba(129,140,248,0.1)" }}
        />
      </div>

      {/* Model grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {GOKO_CODING_MODELS.map((model) => {
          const isActive = model.id === activeModelId;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => handleSelect(model)}
              className="group relative flex flex-col gap-1.5 p-3 rounded-xl text-left transition-all duration-200"
              style={{
                background: isActive
                  ? `${model.color}15`
                  : "rgba(255,255,255,0.02)",
                border: isActive
                  ? `1px solid ${model.color}50`
                  : "1px solid rgba(129,140,248,0.08)",
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-between"
              >
                <span
                  className="text-lg leading-none"
                  style={{ color: isActive ? model.color : "rgba(139,143,168,0.5)" }}
                >
                  {model.icon}
                </span>
                {model.badge && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: `${model.color}20`,
                      color: model.color,
                      border: `1px solid ${model.color}40`,
                    }}
                  >
                    {model.badge}
                  </span>
                )}
              </div>

              {/* Model name */}
              <div
                className="text-[11px] font-semibold leading-tight"
                style={{ color: isActive ? "#e2e3f0" : "rgba(197,200,224,0.7)" }}
              >
                {model.label}
              </div>

              {/* Provider */}
              <div
                className="text-[10px]"
                style={{ color: isActive ? model.color : "rgba(139,143,168,0.4)" }}
              >
                {model.provider}
              </div>

              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                  style={{ background: model.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
