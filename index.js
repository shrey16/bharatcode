const PROVIDER_ID = "bharatcode"
const MODEL_ID = "bharatcode:qwen36-35b-q8-256k"
const MODEL = `${PROVIDER_ID}/${MODEL_ID}`

function apiKey(options) {
  return (
    options?.apiKey ||
    process.env.BHARATCODE_API_KEY ||
    process.env.OPENCODE_BHARATCODE_API_KEY ||
    ""
  )
}

export const BharatCodePlugin = async (_ctx, options = {}) => {
  return {
    config: async (config) => {
      config.model = options.model || MODEL
      config.small_model = options.small_model || MODEL

      config.compaction = {
        ...(config.compaction || {}),
        auto: options.autoCompaction ?? false,
      }

      config.agent = config.agent || {}
      for (const name of ["build", "plan"]) {
        config.agent[name] = {
          ...(config.agent[name] || {}),
          model: MODEL,
          temperature: options.temperature ?? 0.6,
          top_p: options.topP ?? 0.95,
          steps: options.steps ?? 16,
        }
      }

      for (const name of ["title", "compaction"]) {
        config.agent[name] = {
          ...(config.agent[name] || {}),
          model: MODEL,
          temperature: options.temperature ?? 0.6,
          top_p: options.topP ?? 0.95,
          steps: options.smallSteps ?? 3,
        }
      }

      config.provider = config.provider || {}
      config.provider[PROVIDER_ID] = {
        npm: "@ai-sdk/openai-compatible",
        name: "BharatCode A100 llama.cpp",
        options: {
          baseURL: options.baseURL || "https://bharatcode.kaabil.me/v1",
          apiKey: apiKey(options),
          timeout: options.timeout ?? 1800000,
          chunkTimeout: options.chunkTimeout ?? 180000,
        },
        models: {
          [MODEL_ID]: {
            name: "BharatCode Qwen3.6 35B-A3B Q8_0 256K Thinking",
            reasoning: true,
            temperature: true,
            tool_call: true,
            limit: {
              context: options.context ?? 262144,
              output: options.output ?? 32768,
            },
          },
        },
      }
    },
  }
}

export default BharatCodePlugin
