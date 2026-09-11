export type VehicleStatus = 'Available' | 'Reserved' | 'Sold' | 'Archived' | 'Draft'

export type Vehicle = {
  id: string
  slug: string
  brand: string
  model: string
  variant: string
  year: number
  registrationYear: number
  kilometres: number
  fuel: string
  transmission: string
  body: string
  colour: string
  seating: number
  engine: string
  power: string
  mileage: string
  ownership: string
  location: string
  insurance: string
  serviceHistory: string
  rcStatus: string
  nocStatus: string
  price: number
  originalPrice?: number
  status: VehicleStatus
  featured: boolean
  description: string
  features: string[]
  images: string[]
}

const img = (seed: string, w = 1600, h = 1100) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&q=85`

export const vehicles: Vehicle[] = [
  {
    id: 'VL-001',
    slug: '2022-volvo-xc60-b5-inscription',
    brand: 'Volvo',
    model: 'XC60',
    variant: 'B5 Inscription',
    year: 2022,
    registrationYear: 2022,
    kilometres: 28400,
    fuel: 'Petrol',
    transmission: 'Automatic',
    body: 'SUV',
    colour: 'Crystal White',
    seating: 5,
    engine: '2.0L',
    power: '250 bhp',
    mileage: '12.4 km/l',
    ownership: '1st Owner',
    location: 'Shimla',
    insurance: 'Valid till Aug 2027',
    serviceHistory: 'Full authorised service history',
    rcStatus: 'Verified',
    nocStatus: 'Clear',
    price: 4390000,
    originalPrice: 4690000,
    status: 'Available',
    featured: true,
    description:
      'A restrained luxury SUV with a beautifully maintained cabin, complete service history and a clean ownership record. Prepared for immediate test drive.',
    features: [
      '360° Camera',
      'Panoramic Roof',
      'Pilot Assist',
      'Nappa Leather',
      'Adaptive Cruise Control',
      'Apple CarPlay',
      'Heated Front Seats',
    ],
    images: [
      img('1557323137-bd6bd20fe022'),
      img('1494976388531-d1058494cdd8'),
      img('1549317661-bd32c8ce0db2'),
    ],
  },
  {
    id: 'VL-002',
    slug: '2021-bmw-3-series-330i-m-sport',
    brand: 'BMW',
    model: '3 Series',
    variant: '330i M Sport',
    year: 2021,
    registrationYear: 2021,
    kilometres: 31900,
    fuel: 'Petrol',
    transmission: 'Automatic',
    body: 'Sedan',
    colour: 'Black Sapphire',
    seating: 5,
    engine: '2.0L TwinPower Turbo',
    power: '258 bhp',
    mileage: '13.3 km/l',
    ownership: '1st Owner',
    location: 'Chandigarh',
    insurance: 'Valid till Nov 2026',
    serviceHistory: 'Service records available',
    rcStatus: 'Verified',
    nocStatus: 'Clear',
    price: 3890000,
    originalPrice: 4140000,
    status: 'Available',
    featured: true,
    description:
      'An M Sport specification 3 Series built for someone who still enjoys driving. Clean lines, sharp chassis and a carefully documented ownership history.',
    features: [
      'M Sport Package',
      'LED Headlights',
      'Harman Kardon',
      'Reverse Camera',
      'Electric Seats',
      'ConnectedDrive',
    ],
    images: [
      img('1555215695-3004980ad54e'),
      img('1511919884226-fd3cad34687c'),
      img('1492144534655-ae79c964c9d7'),
    ],
  },
  {
    id: 'VL-003',
    slug: '2023-toyota-fortuner-4x4-legender',
    brand: 'Toyota',
    model: 'Fortuner',
    variant: '4x4 Legender',
    year: 2023,
    registrationYear: 2023,
    kilometres: 17800,
    fuel: 'Diesel',
    transmission: 'Automatic',
    body: 'SUV',
    colour: 'Pearl White',
    seating: 7,
    engine: '2.8L',
    power: '204 bhp',
    mileage: '10.1 km/l',
    ownership: '1st Owner',
    location: 'Kullu',
    insurance: 'Valid till Feb 2027',
    serviceHistory: 'Authorised service history',
    rcStatus: 'Verified',
    nocStatus: 'Clear',
    price: 4190000,
    status: 'Available',
    featured: true,
    description:
      'A nearly-new Legender with very low kilometres, seven-seat practicality and the confidence of a fully verified ownership trail.',
    features: [
      '4x4',
      'Ventilated Seats',
      'Powered Tailgate',
      'JBL Audio',
      'ADAS',
      '7 Seats',
    ],
    images: [
      img('1742697167564-9571d0391c92'),
      img('1518987048-93e2966b31a8'),
      img('1533473359331-0135ef1b58bf'),
    ],
  },
  {
    id: 'VL-004',
    slug: '2020-mercedes-benz-c-class-c200',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    variant: 'C200 Progressive',
    year: 2020,
    registrationYear: 2020,
    kilometres: 42100,
    fuel: 'Petrol',
    transmission: 'Automatic',
    body: 'Sedan',
    colour: 'Iridium Silver',
    seating: 5,
    engine: '1.5L Turbo',
    power: '184 bhp',
    mileage: '13.8 km/l',
    ownership: '2nd Owner',
    location: 'Chandigarh',
    insurance: 'Valid till Dec 2026',
    serviceHistory: 'Service records available',
    rcStatus: 'Verified',
    nocStatus: 'Clear',
    price: 2990000,
    status: 'Reserved',
    featured: false,
    description:
      'Quiet, polished and comfortable. This C-Class balances understated luxury with strong everyday usability.',
    features: [
      'Panoramic Sunroof',
      'Ambient Lighting',
      'Reverse Camera',
      'Digital Cockpit',
      'LED High Performance',
    ],
    images: [
      img('1549399542-7e82138f3d54'),
      img('1553440569-bcc63803a83d'),
      img('1494976388531-d1058494cdd8'),
    ],
  },
  {
    id: 'VL-005',
    slug: '2022-hyundai-creta-sx-o',
    brand: 'Hyundai',
    model: 'Creta',
    variant: 'SX (O)',
    year: 2022,
    registrationYear: 2022,
    kilometres: 22600,
    fuel: 'Diesel',
    transmission: 'Automatic',
    body: 'SUV',
    colour: 'Titan Grey',
    seating: 5,
    engine: '1.5L CRDi',
    power: '115 bhp',
    mileage: '18.5 km/l',
    ownership: '1st Owner',
    location: 'Kullu',
    insurance: 'Valid till Apr 2027',
    serviceHistory: 'Full service history',
    rcStatus: 'Verified',
    nocStatus: 'Clear',
    price: 1840000,
    status: 'Available',
    featured: false,
    description:
      'An easy recommendation for daily driving: low kilometres, excellent equipment and a spotless documented history.',
    features: [
      'Panoramic Sunroof',
      'Bose Audio',
      'Ventilated Seats',
      'ADAS',
      '360° Camera',
    ],
    images: [
      img('1542362567-b07e54358753'),
      img('1605559424843-9e4c228bf1c2'),
      img('1606611013016-969c19ba27bb'),
    ],
  },
  {
    id: 'VL-006',
    slug: '2019-jeep-compass-limited-plus',
    brand: 'Jeep',
    model: 'Compass',
    variant: 'Limited Plus',
    year: 2019,
    registrationYear: 2019,
    kilometres: 48700,
    fuel: 'Diesel',
    transmission: 'Manual',
    body: 'SUV',
    colour: 'Brilliant Black',
    seating: 5,
    engine: '2.0L MultiJet',
    power: '173 bhp',
    mileage: '16.3 km/l',
    ownership: '1st Owner',
    location: 'Manali',
    insurance: 'Valid till May 2027',
    serviceHistory: 'Dealer service records',
    rcStatus: 'Verified',
    nocStatus: 'Clear',
    price: 1590000,
    status: 'Available',
    featured: false,
    description:
      'A rugged, well-specced Compass with a strong maintenance record and the kind of stance that ages well.',
    features: [
      '4x4',
      'Dual Pane Sunroof',
      'Leather Seats',
      'Uconnect',
      'Hill Descent Control',
    ],
    images: [
      img('1502877338535-766e1452684a'),
      img('1449965408869-eaa3f722e40d'),
      img('1549317661-bd32c8ce0db2'),
    ],
  },
]

export const featuredCars = vehicles.filter((v) => v.featured)

export const getVehicle = (slug: string) =>
  vehicles.find((v) => v.slug === slug)

export const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

export const getAvailableVehicles = () =>
  vehicles.filter((v) => v.status === 'Available')

export const getUniqueBrands = () =>
  Array.from(new Set(vehicles.map((v) => v.brand))).sort()

export const getUniqueLocations = () =>
  Array.from(new Set(vehicles.map((v) => v.location))).sort()