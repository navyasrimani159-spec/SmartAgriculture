// Type definitions for SmartAgri Platform

export type LanguageCode =
  | 'en' // English
  | 'ta' // Tamil
  | 'hi' // Hindi
  | 'te' // Telugu
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'bn' // Bengali
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'pa' // Punjabi
  | 'as' // Assamese
  | 'or'; // Odia

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export type ConnectionStatus = 'online' | 'low' | 'offline';

export interface FarmZone {
  id: string;
  name: string;
  crop: string;
  areaAcres: number;
  growthStage: string;
  soilMoisture: number; // percentage
  soilTemp: number; // Celsius
  cropHealth: number; // percentage 0-100
  irrigationStatus: 'Required' | 'Optimal' | 'Active' | 'Postponed';
  ecLevel: number; // dS/m
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  recentIrrigation: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'soil' | 'weather' | 'flow' | 'tank' | 'solar' | 'pump';
  zoneId?: string;
  status: 'connected' | 'offline' | 'calibrating';
  battery: number; // percentage
  signalStrength: number; // percentage
  lastUpdated: string;
  value: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  uvIndex: number;
  heatStressIndex: 'Low' | 'Moderate' | 'High';
  advisories: string[];
  forecast: {
    day: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    rainProb: number;
    icon: string;
  }[];
}

export interface SolarTelemetry {
  generatedTodayKWh: number;
  pumpConsumedKWh: number;
  remainingCleanKWh: number;
  currentOutputWatts: number;
  cleanEnergySharePercent: number;
  carbonAvoidedKg: number;
  generationHistory: {
    time: string;
    solarKw: number;
    pumpKw: number;
  }[];
}

export interface WaterTelemetry {
  todayUsageLiters: number;
  recommendedUsageLiters: number;
  potentialSavingsLiters: number;
  tankLevelPercent: number;
  tankCapacityLiters: number;
  waterEfficiencyScore: number; // 0-100
  zoneConsumption: {
    zone: string;
    liters: number;
  }[];
  weeklyHistory: {
    day: string;
    actualL: number;
    recommendedL: number;
  }[];
}

export interface PostHarvestTelemetry {
  warehouseName: string;
  storageTempCelsius: number;
  targetTempCelsius: number;
  humidityPercent: number;
  targetHumidityPercent: number;
  produceQuantityKg: number;
  storageCapacityKg: number;
  capacityUsedPercent: number;
  condition: 'Good' | 'Fair' | 'Alert';
  spoilageRiskScore: number; // 0-100
  co2Ppm: number;
  ventilationStatus: 'Active' | 'Idle';
}

export interface FarmExpense {
  id: string;
  category: 'Seeds' | 'Fertilizer' | 'Electricity' | 'Diesel' | 'Labour' | 'Irrigation' | 'Equipment' | 'Transport';
  description: string;
  amountInr: number;
  date: string;
}

export interface MarketCommodity {
  id: string;
  crop: string;
  variety: string;
  market: string;
  state: string;
  pricePerQuintal: number;
  changeAmount: number;
  trend: 'Rising' | 'Falling' | 'Stable';
  isSimulatedDemo: boolean;
  updatedTime: string;
}

export interface SmartAlert {
  id: string;
  type: 'irrigation' | 'rain' | 'heat' | 'crop' | 'energy' | 'storage' | 'water';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  isRead: boolean;
  actionRoute?: string;
}

export interface FarmEvent {
  id: string;
  title: string;
  category: 'Sowing' | 'Irrigation' | 'Fertilization' | 'Spraying' | 'Harvesting';
  date: string;
  zone: string;
  notes: string;
  status: 'Completed' | 'Pending' | 'Scheduled';
}

export interface FeatureModule {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  status: string;
  route: string;
  isPinned?: boolean;
  category: 'core' | 'intelligence' | 'operations' | 'management';
}
