// Mock data for PRAGATI Dashboard

export const mockStationData = [
  {
    id: 'INDB',
    name: 'Indore Junction',
    code: 'INDB',
    position: 0,
    platforms: [
      { id: 1, status: 'occupied', train: '12919', estimatedClearTime: '10:45' },
      { id: 2, status: 'free' },
      { id: 3, status: 'free' },
      { id: 4, status: 'maintenance' }
    ],
    loopLines: 2,
    coordinates: { lat: 22.7196, lng: 75.8577 }
  },
  {
    id: 'MYG',
    name: 'Mangliya Gaon',
    code: 'MYG',
    position: 15,
    platforms: [
      { id: 1, status: 'free' },
      { id: 2, status: 'free' }
    ],
    loopLines: 1,
    coordinates: { lat: 22.7500, lng: 75.9000 }
  },
  {
    id: 'DCY',
    name: 'Dakachiya',
    code: 'DCY',
    position: 28,
    platforms: [
      { id: 1, status: 'free' }
    ],
    loopLines: 1,
    coordinates: { lat: 22.8000, lng: 76.0000 }
  },
  {
    id: 'DWX',
    name: 'Dewas Junction',
    code: 'DWX',
    position: 45,
    platforms: [
      { id: 1, status: 'occupied', train: '19303', estimatedClearTime: '11:20' },
      { id: 2, status: 'free' },
      { id: 3, status: 'free' }
    ],
    loopLines: 2,
    coordinates: { lat: 22.9659, lng: 76.0507 }
  },
  {
    id: 'NJP',
    name: 'Naranjipura',
    code: 'NJP',
    position: 58,
    platforms: [
      { id: 1, status: 'free' }
    ],
    loopLines: 1,
    coordinates: { lat: 23.0500, lng: 76.1500 }
  },
  {
    id: 'UDS',
    name: 'Undasa',
    code: 'UDS',
    position: 72,
    platforms: [
      { id: 1, status: 'free' }
    ],
    loopLines: 1,
    coordinates: { lat: 23.1200, lng: 76.2000 }
  },
  {
    id: 'VKN',
    name: 'Vikramnagar',
    code: 'VKN',
    position: 85,
    platforms: [
      { id: 1, status: 'free' }
    ],
    loopLines: 1,
    coordinates: { lat: 23.1800, lng: 76.2500 }
  },
  {
    id: 'UJN',
    name: 'Ujjain Junction',
    code: 'UJN',
    position: 100,
    platforms: [
      { id: 1, status: 'free' },
      { id: 2, status: 'free' },
      { id: 3, status: 'occupied', train: '09351', estimatedClearTime: '12:15' },
      { id: 4, status: 'free' },
      { id: 5, status: 'free' }
    ],
    loopLines: 3,
    coordinates: { lat: 23.1815, lng: 75.7772 }
  }
];

export const mockTrainData = [
  {
    id: '12919',
    name: 'Malwa SF Express',
    type: 'Superfast',
    status: 'running',
    currentPosition: 25,
    destination: 'UJN',
    origin: 'INDB',
    delay: 5,
    speed: 95,
    nextStation: 'DCY',
    estimatedArrival: '10:55',
    priority: 9,
    direction: 'up',
    coaches: 22,
    locomotive: 'WAP-7 30311',
    crew: 'Crew A-1',
    platformAssigned: null,
    route: ['INDB', 'MYG', 'DCY', 'DWX', 'NJP', 'UDS', 'VKN', 'UJN']
  },
  {
    id: '19303',
    name: 'Indore-Bhopal Express',
    type: 'Express',
    status: 'running',
    currentPosition: 42,
    destination: 'BPL',
    origin: 'INDB',
    delay: 12,
    speed: 78,
    nextStation: 'DWX',
    estimatedArrival: '11:10',
    priority: 7,
    direction: 'up',
    coaches: 18,
    locomotive: 'WAP-4 22683',
    crew: 'Crew B-2',
    platformAssigned: 1,
    route: ['INDB', 'MYG', 'DCY', 'DWX']
  },
  {
    id: '22911',
    name: 'Shipra Express',
    type: 'Superfast',
    status: 'approaching',
    currentPosition: 18,
    destination: 'UJN',
    origin: 'INDB',
    delay: -3,
    speed: 110,
    nextStation: 'DCY',
    estimatedArrival: '10:48',
    priority: 9,
    direction: 'up',
    coaches: 20,
    locomotive: 'WAP-7 30286',
    crew: 'Crew A-3',
    platformAssigned: 3,
    route: ['INDB', 'MYG', 'DCY', 'DWX', 'NJP', 'UDS', 'VKN', 'UJN']
  },
  {
    id: '09351',
    name: 'Ujjain-Indore Passenger Special',
    type: 'Passenger',
    status: 'halted',
    currentPosition: 100,
    destination: 'INDB',
    origin: 'UJN',
    delay: 8,
    speed: 0,
    nextStation: 'VKN',
    estimatedArrival: '12:15',
    priority: 4,
    direction: 'down',
    coaches: 12,
    locomotive: 'WDM-3A 16578',
    crew: 'Crew C-1',
    platformAssigned: 3,
    route: ['UJN', 'VKN', 'UDS', 'NJP', 'DWX', 'DCY', 'MYG', 'INDB']
  },
  {
    id: 'GOODS001',
    name: 'Freight Service',
    type: 'Goods',
    status: 'running',
    currentPosition: 65,
    destination: 'UJN',
    origin: 'INDB',
    delay: 25,
    speed: 55,
    nextStation: 'UDS',
    estimatedArrival: '13:30',
    priority: 2,
    direction: 'up',
    coaches: 45,
    locomotive: 'WAG-9 31024',
    crew: 'Crew D-1',
    platformAssigned: null,
    route: ['INDB', 'MYG', 'DCY', 'DWX', 'NJP', 'UDS', 'VKN', 'UJN']
  }
];

export const mockConflictData = [
  {
    id: 'CONF001',
    type: 'overtake',
    priority: 'high',
    timeToConflict: 18,
    trains: ['22911', '19303'],
    location: 'Between DCY and DWX',
    description: 'Shipra Express will overtake Indore-Bhopal Express',
    recommendation: 'Halt Indore-Bhopal Express at Dewas loop line for 7 minutes',
    impact: {
      delayTrain1: 0,
      delayTrain2: 9,
      networkDelay: 9
    },
    status: 'pending'
  },
  {
    id: 'CONF002',
    type: 'platform',
    priority: 'medium',
    timeToConflict: 45,
    trains: ['22911'],
    location: 'UJN Platform 3',
    description: 'Platform 3 occupied by Passenger Special during Shipra Express arrival',
    recommendation: 'Re-assign Shipra Express to Platform 5',
    impact: {
      delayTrain1: 0,
      delayTrain2: 0,
      networkDelay: 0
    },
    status: 'pending'
  },
  {
    id: 'CONF003',
    type: 'crossing',
    priority: 'low',
    timeToConflict: 120,
    trains: ['GOODS001', '09351'],
    location: 'VKN',
    description: 'Goods train and Passenger Special crossing',
    recommendation: 'Priority to Passenger Special, goods train to use loop',
    impact: {
      delayTrain1: 15,
      delayTrain2: 0,
      networkDelay: 15
    },
    status: 'monitoring'
  }
];

export const mockAssetData = [
  {
    id: 'WAP-7-30311',
    type: 'locomotive',
    train: '12919',
    health: 92,
    status: 'good',
    alerts: [],
    metrics: {
      powerConsumption: 2840,
      efficiency: 94,
      temperature: 68,
      vibration: 'normal'
    }
  },
  {
    id: 'WAP-4-22683',
    type: 'locomotive',
    train: '19303',
    health: 78,
    status: 'warning',
    alerts: ['Higher power consumption on inclines', 'Slower acceleration than average'],
    metrics: {
      powerConsumption: 3200,
      efficiency: 86,
      temperature: 75,
      vibration: 'elevated'
    }
  },
  {
    id: 'WAP-7-30286',
    type: 'locomotive',
    train: '22911',
    health: 96,
    status: 'excellent',
    alerts: [],
    metrics: {
      powerConsumption: 2650,
      efficiency: 97,
      temperature: 64,
      vibration: 'normal'
    }
  }
];

export const mockWeatherData = {
  current: {
    condition: 'Clear',
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 10
  },
  forecast: [
    { time: '12:00', condition: 'Partly Cloudy', temp: 30 },
    { time: '15:00', condition: 'Sunny', temp: 33 },
    { time: '18:00', condition: 'Clear', temp: 29 }
  ],
  alerts: []
};