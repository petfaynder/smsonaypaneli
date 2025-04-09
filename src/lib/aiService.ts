import { prisma } from './prisma';

interface AiConfig {
  enabled: boolean;
  apiKey: string | null;
  model: string;
}

let cachedConfig: AiConfig | null = null;

export async function getAiConfig(): Promise<AiConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const settings = await prisma.siteSettings.findFirst();
    
    cachedConfig = {
      enabled: settings?.aiEnabled || false,
      apiKey: settings?.openaiApiKey || null,
      model: settings?.openaiModel || 'gpt-3.5-turbo'
    };

    return cachedConfig;
  } catch (error) {
    console.error('AI konfigürasyonu alınırken hata oluştu:', error);
    return {
      enabled: false,
      apiKey: null,
      model: 'gpt-3.5-turbo'
    };
  }
}

export async function updateAiConfig(config: Partial<AiConfig>): Promise<void> {
  try {
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: {
        aiEnabled: config.enabled,
        openaiApiKey: config.apiKey,
        openaiModel: config.model
      },
      create: {
        id: 1,
        aiEnabled: config.enabled || false,
        openaiApiKey: config.apiKey || null,
        openaiModel: config.model || 'gpt-3.5-turbo'
      }
    });

    // Cache'i temizle
    cachedConfig = null;
  } catch (error) {
    console.error('AI konfigürasyonu güncellenirken hata oluştu:', error);
    throw error;
  }
} 