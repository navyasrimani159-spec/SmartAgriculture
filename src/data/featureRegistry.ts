import { FeatureModule } from '../types';

export const featureRegistry: FeatureModule[] = [
  {
    id: 'smart-irrigation',
    icon: 'Droplets',
    titleKey: 'smart_irrigation',
    descriptionKey: 'smart_irrigation_desc',
    status: 'Action Recommended',
    route: '/irrigation',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'crop-health',
    icon: 'Sprout',
    titleKey: 'crop_health',
    descriptionKey: 'crop_health_desc',
    status: '86% Healthy',
    route: '/crop-health',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'weather-intelligence',
    icon: 'CloudSunRain',
    titleKey: 'weather_intelligence',
    descriptionKey: 'weather_intelligence_desc',
    status: '29°C / Rain 24%',
    route: '/weather',
    isPinned: true,
    category: 'intelligence'
  },
  {
    id: 'solar-energy',
    icon: 'SunMedium',
    titleKey: 'solar_energy',
    descriptionKey: 'solar_energy_desc',
    status: '5.4 kWh Generating',
    route: '/solar',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'water-management',
    icon: 'Waves',
    titleKey: 'water_management',
    descriptionKey: 'water_management_desc',
    status: 'Score: 82/100',
    route: '/water',
    isPinned: true,
    category: 'core'
  },
  {
    id: 'post-harvest',
    icon: 'Package',
    titleKey: 'post_harvest',
    descriptionKey: 'post_harvest_desc',
    status: 'Optimal 18°C',
    route: '/post-harvest',
    isPinned: false,
    category: 'management'
  },
  {
    id: 'farm-operations',
    icon: 'Tractor',
    titleKey: 'farm_operations',
    descriptionKey: 'farm_operations_desc',
    status: '2 Tasks Scheduled',
    route: '/calendar',
    isPinned: false,
    category: 'operations'
  },
  {
    id: 'farm-analytics',
    icon: 'BarChart3',
    titleKey: 'farm_analytics',
    descriptionKey: 'farm_analytics_desc',
    status: 'Trends & Efficiency',
    route: '/analytics',
    isPinned: false,
    category: 'intelligence'
  },
  {
    id: 'field-monitoring',
    icon: 'MapPin',
    titleKey: 'field_monitoring',
    descriptionKey: 'field_monitoring_desc',
    status: '4 Zones Active',
    route: '/farm-map',
    isPinned: false,
    category: 'operations'
  },
  {
    id: 'crop-planner',
    icon: 'Wheat',
    titleKey: 'crop_planner',
    descriptionKey: 'crop_planner_desc',
    status: 'Tomato / Cotton',
    route: '/calendar',
    isPinned: false,
    category: 'operations'
  },
  {
    id: 'expense-tracker',
    icon: 'Coins',
    titleKey: 'expense_tracker',
    descriptionKey: 'expense_tracker_desc',
    status: '₹24,500 Total',
    route: '/expenses',
    isPinned: false,
    category: 'management'
  },
  {
    id: 'market-information',
    icon: 'TrendingUp',
    titleKey: 'market_information',
    descriptionKey: 'market_information_desc',
    status: 'APMC Trends (Demo)',
    route: '/market',
    isPinned: false,
    category: 'intelligence'
  },
  {
    id: 'smart-alerts',
    icon: 'Bell',
    titleKey: 'smart_alerts',
    descriptionKey: 'smart_alerts_desc',
    status: '1 Unread Alert',
    route: '/alerts',
    isPinned: true,
    category: 'intelligence'
  },
  {
    id: 'iot-devices',
    icon: 'Cpu',
    titleKey: 'iot_devices',
    descriptionKey: 'iot_devices_desc',
    status: '7 Devices Online',
    route: '/iot-devices',
    isPinned: false,
    category: 'operations'
  },
  {
    id: 'soil-intelligence',
    icon: 'FlaskConical',
    titleKey: 'soil_intelligence',
    descriptionKey: 'soil_intelligence_desc',
    status: 'Score: 78/100',
    route: '/soil',
    isPinned: false,
    category: 'intelligence'
  },
  {
    id: 'farm-calendar',
    icon: 'Calendar',
    titleKey: 'farm_calendar',
    descriptionKey: 'farm_calendar_desc',
    status: 'Weekly Cycle',
    route: '/calendar',
    isPinned: false,
    category: 'operations'
  },
  {
    id: 'reports',
    icon: 'FileText',
    titleKey: 'reports',
    descriptionKey: 'reports_desc',
    status: 'Weekly Ready',
    route: '/reports',
    isPinned: false,
    category: 'management'
  },
  {
    id: 'offline-mode',
    icon: 'WifiOff',
    titleKey: 'offline_mode',
    descriptionKey: 'offline_mode_desc',
    status: 'Synced 10m ago',
    route: '/offline',
    isPinned: false,
    category: 'operations'
  },
  {
    id: 'farm-settings',
    icon: 'Settings',
    titleKey: 'farm_settings',
    descriptionKey: 'farm_settings_desc',
    status: 'Configure Farm',
    route: '/settings',
    isPinned: false,
    category: 'management'
  }
];
