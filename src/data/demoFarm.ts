import {
  FarmZone,
  IoTDevice,
  WeatherData,
  SolarTelemetry,
  WaterTelemetry,
  PostHarvestTelemetry,
  FarmExpense,
  SmartAlert,
  FarmEvent
} from '../types';

export interface DemoFarmProfile {
  farmerName: string;
  farmName: string;
  location: string;
  totalAreaAcres: number;
  primaryCrop: string;
  soilType: string;
  irrigationType: string;
  solarSystem: string;
}

export const demoFarmProfile: DemoFarmProfile = {
  farmerName: 'Arun',
  farmName: 'Arun Sustainable Farms',
  location: 'Dharmapuri, Tamil Nadu, India',
  totalAreaAcres: 2.5,
  primaryCrop: 'Tomato (Hybrid Shivam)',
  soilType: 'Red Sandy Loam',
  irrigationType: 'Precision Drip & Fertigation',
  solarSystem: '5 kW Dual-Axis Ground Mount Array'
};

export const initialFarmZones: FarmZone[] = [
  {
    id: 'zone-a',
    name: 'Zone A - Main Field',
    crop: 'Tomato',
    areaAcres: 1.0,
    growthStage: 'Flowering & Fruit Set (Day 54)',
    soilMoisture: 32, // Low - triggers recommendation
    soilTemp: 28.4,
    cropHealth: 84,
    irrigationStatus: 'Required',
    ecLevel: 1.4,
    nitrogen: 142,
    phosphorus: 38,
    potassium: 210,
    recentIrrigation: 'Yesterday, 06:30 AM (280 L)'
  },
  {
    id: 'zone-b',
    name: 'Zone B - East Ridge',
    crop: 'Chilli (Guntur Sannam)',
    areaAcres: 0.6,
    growthStage: 'Vegetative Growth (Day 38)',
    soilMoisture: 46,
    soilTemp: 27.8,
    cropHealth: 88,
    irrigationStatus: 'Optimal',
    ecLevel: 1.2,
    nitrogen: 120,
    phosphorus: 34,
    potassium: 185,
    recentIrrigation: 'Today, 05:45 AM (180 L)'
  },
  {
    id: 'zone-c',
    name: 'Zone C - South Terraces',
    crop: 'Cotton (Bt Hybrid)',
    areaAcres: 0.5,
    growthStage: 'Squaring / Early Boll (Day 62)',
    soilMoisture: 41,
    soilTemp: 29.1,
    cropHealth: 82,
    irrigationStatus: 'Optimal',
    ecLevel: 1.3,
    nitrogen: 110,
    phosphorus: 28,
    potassium: 195,
    recentIrrigation: '2 days ago, 06:00 AM (220 L)'
  },
  {
    id: 'zone-d',
    name: 'Zone D - Agroforestry Border',
    crop: 'Groundnut & Pulses',
    areaAcres: 0.4,
    growthStage: 'Pod Development (Day 48)',
    soilMoisture: 50,
    soilTemp: 26.9,
    cropHealth: 90,
    irrigationStatus: 'Optimal',
    ecLevel: 1.1,
    nitrogen: 155,
    phosphorus: 42,
    potassium: 220,
    recentIrrigation: '3 days ago, 06:15 AM (140 L)'
  }
];

export const initialWeatherData: WeatherData = {
  temp: 29,
  condition: 'Partly Cloudy with Sunlight',
  humidity: 64,
  rainProbability: 24,
  windSpeed: 12,
  uvIndex: 6,
  heatStressIndex: 'Moderate',
  advisories: [
    'Rain probability is 24% — conditions are safe for precision drip irrigation.',
    'Moderate afternoon heat index expected (peak 32°C). Soil evaporation rate 4.2 mm/day.',
    'Wind speed 12 km/h favorable for foliar micronutrient spray in early evening.'
  ],
  forecast: [
    { day: 'Today', tempMax: 31, tempMin: 23, condition: 'Partly Cloudy', rainProb: 24, icon: 'sun' },
    { day: 'Tomorrow', tempMax: 32, tempMin: 24, condition: 'Sunny', rainProb: 15, icon: 'sun' },
    { day: 'Fri', tempMax: 30, tempMin: 22, condition: 'Scattered Clouds', rainProb: 35, icon: 'cloud-sun' },
    { day: 'Sat', tempMax: 28, tempMin: 21, condition: 'Light Rain', rainProb: 65, icon: 'cloud-rain' },
    { day: 'Sun', tempMax: 29, tempMin: 22, condition: 'Overcast', rainProb: 40, icon: 'cloud' },
    { day: 'Mon', tempMax: 31, tempMin: 23, condition: 'Sunny', rainProb: 10, icon: 'sun' },
    { day: 'Tue', tempMax: 32, tempMin: 24, condition: 'Clear Sky', rainProb: 12, icon: 'sun' }
  ]
};

export const initialSolarTelemetry: SolarTelemetry = {
  generatedTodayKWh: 5.4,
  pumpConsumedKWh: 2.8,
  remainingCleanKWh: 2.6,
  currentOutputWatts: 3450,
  cleanEnergySharePercent: 88,
  carbonAvoidedKg: 4.8,
  generationHistory: [
    { time: '06:00', solarKw: 0.4, pumpKw: 0.0 },
    { time: '08:00', solarKw: 1.8, pumpKw: 0.0 },
    { time: '10:00', solarKw: 3.6, pumpKw: 1.5 },
    { time: '12:00', solarKw: 4.8, pumpKw: 2.2 },
    { time: '14:00', solarKw: 4.2, pumpKw: 0.0 },
    { time: '16:00', solarKw: 2.7, pumpKw: 0.0 },
    { time: '18:00', solarKw: 0.6, pumpKw: 0.0 }
  ]
};

export const initialWaterTelemetry: WaterTelemetry = {
  todayUsageLiters: 420,
  recommendedUsageLiters: 350,
  potentialSavingsLiters: 70,
  tankLevelPercent: 68,
  tankCapacityLiters: 5000,
  waterEfficiencyScore: 82,
  zoneConsumption: [
    { zone: 'Zone A (Tomato)', liters: 240 },
    { zone: 'Zone B (Chilli)', liters: 110 },
    { zone: 'Zone C (Cotton)', liters: 70 }
  ],
  weeklyHistory: [
    { day: 'Mon', actualL: 380, recommendedL: 340 },
    { day: 'Tue', actualL: 410, recommendedL: 360 },
    { day: 'Wed', actualL: 390, recommendedL: 350 },
    { day: 'Thu', actualL: 430, recommendedL: 370 },
    { day: 'Fri', actualL: 360, recommendedL: 340 },
    { day: 'Sat', actualL: 440, recommendedL: 350 },
    { day: 'Sun (Today)', actualL: 420, recommendedL: 350 }
  ]
};

export const initialPostHarvest: PostHarvestTelemetry = {
  warehouseName: 'Krishi Cold Storage Unit #3',
  storageTempCelsius: 18,
  targetTempCelsius: 16,
  humidityPercent: 62,
  targetHumidityPercent: 65,
  produceQuantityKg: 1200,
  storageCapacityKg: 1600,
  capacityUsedPercent: 75,
  condition: 'Good',
  spoilageRiskScore: 12, // Low
  co2Ppm: 580,
  ventilationStatus: 'Active'
};

export const initialIoTDevices: IoTDevice[] = [
  {
    id: 'dev-01',
    name: 'Soil Moisture & EC Sensor A1',
    type: 'soil',
    zoneId: 'zone-a',
    status: 'connected',
    battery: 92,
    signalStrength: 95,
    lastUpdated: '2 mins ago',
    value: '32% VWC'
  },
  {
    id: 'dev-02',
    name: 'Soil Moisture & EC Sensor B1',
    type: 'soil',
    zoneId: 'zone-b',
    status: 'connected',
    battery: 88,
    signalStrength: 90,
    lastUpdated: '4 mins ago',
    value: '46% VWC'
  },
  {
    id: 'dev-03',
    name: 'Micro-Weather Station',
    type: 'weather',
    status: 'connected',
    battery: 98,
    signalStrength: 98,
    lastUpdated: '1 min ago',
    value: '29°C | 64% RH'
  },
  {
    id: 'dev-04',
    name: 'Electromagnetic Water Flow Meter',
    type: 'flow',
    status: 'connected',
    battery: 84,
    signalStrength: 85,
    lastUpdated: 'Just now',
    value: '0 L/min (Idle)'
  },
  {
    id: 'dev-05',
    name: 'Ultrasonic Water Tank Sensor',
    type: 'tank',
    status: 'connected',
    battery: 90,
    signalStrength: 92,
    lastUpdated: '3 mins ago',
    value: '68% (3,400 L)'
  },
  {
    id: 'dev-06',
    name: 'Smart Solar Inverter Controller',
    type: 'solar',
    status: 'connected',
    battery: 100,
    signalStrength: 99,
    lastUpdated: '1 min ago',
    value: '3.45 kW Generating'
  },
  {
    id: 'dev-07',
    name: 'Smart Drip Solenoid Pump Relay',
    type: 'pump',
    status: 'connected',
    battery: 96,
    signalStrength: 94,
    lastUpdated: 'Just now',
    value: 'Status: OFF'
  }
];

export const initialExpenses: FarmExpense[] = [
  { id: 'exp-1', category: 'Seeds', description: 'Certified Tomato Hybrid Shivam F1', amountInr: 4200, date: '2026-08-15' },
  { id: 'exp-2', category: 'Fertilizer', description: 'Water-soluble NPK 19:19:19 + Micronutrients', amountInr: 6800, date: '2026-08-22' },
  { id: 'exp-3', category: 'Diesel', description: 'Backup generator auxiliary power for harvester', amountInr: 1800, date: '2026-09-02' },
  { id: 'exp-4', category: 'Labour', description: 'Field weeding, trellising and drip line inspection', amountInr: 5500, date: '2026-09-08' },
  { id: 'exp-5', category: 'Irrigation', description: 'Drip line replacement inline emitters & filters', amountInr: 2200, date: '2026-09-10' },
  { id: 'exp-6', category: 'Equipment', description: 'Solar sensor battery maintenance & mulch film', amountInr: 4000, date: '2026-09-12' }
];

export const initialAlerts: SmartAlert[] = [
  {
    id: 'alt-1',
    type: 'irrigation',
    title: 'Zone A Moisture Deficit Detected',
    message: 'Soil moisture dropped to 32% (below 35% threshold). Recommended 18 min drip cycle to reach 48%.',
    severity: 'high',
    timestamp: '15 mins ago',
    isRead: false,
    actionRoute: '/irrigation'
  },
  {
    id: 'alt-2',
    type: 'energy',
    title: 'Peak Solar Generation Active',
    message: 'Solar output exceeds 3.4 kW. Running water pump now utilizes 100% free green clean energy.',
    severity: 'medium',
    timestamp: '1 hour ago',
    isRead: false,
    actionRoute: '/solar'
  },
  {
    id: 'alt-3',
    type: 'heat',
    title: 'Afternoon Heat Stress Advisory',
    message: 'Ambient temp expected to reach 32°C between 13:00 and 15:30. Ensure adequate root hydration.',
    severity: 'low',
    timestamp: '3 hours ago',
    isRead: true,
    actionRoute: '/weather'
  }
];

export const initialEvents: FarmEvent[] = [
  {
    id: 'evt-1',
    title: 'Precision Drip Fertigation (Zone A)',
    category: 'Fertilization',
    date: '2026-09-17',
    zone: 'Zone A - Tomato',
    notes: 'Apply Calcium Nitrate & Potassium Sulphate via drip injector.',
    status: 'Scheduled'
  },
  {
    id: 'evt-2',
    title: 'Foliar Neem Oil Bio-spray (Zone B)',
    category: 'Spraying',
    date: '2026-09-19',
    zone: 'Zone B - Chilli',
    notes: 'Preventive thrips and mite control before flowering.',
    status: 'Scheduled'
  },
  {
    id: 'evt-3',
    title: 'First Picking & Grading',
    category: 'Harvesting',
    date: '2026-09-26',
    zone: 'Zone A - Tomato',
    notes: 'Estimated 800 kg firm red ripe produce for APMC Bangalore / Hosur.',
    status: 'Scheduled'
  },
  {
    id: 'evt-4',
    title: 'Cover Crop Sowing (Zone D)',
    category: 'Sowing',
    date: '2026-09-05',
    zone: 'Zone D - Agroforestry',
    notes: 'Sunhemp green manure intercropping completed.',
    status: 'Completed'
  }
];
