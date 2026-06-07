export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  priceLabel: string;
  class: string;
  seatsLeft: number;
}

export interface TrainResult {
  id: string;
  trainNo: string;
  trainName: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  days: string[];
  classes: { name: string; available: number; price: number; }[];
  status: "available" | "waitlist" | "rac";
}

export const popularFlights: FlightResult[] = [
  { id: "f1", airline: "Air India", airlineLogo: "✈️", from: "New Delhi", fromCode: "DEL", to: "Prayagraj", toCode: "IXD", departure: "06:00", arrival: "07:30", duration: "1h 30m", stops: 0, price: 4500, priceLabel: "₹4,500", class: "Economy", seatsLeft: 12 },
  { id: "f2", airline: "IndiGo", airlineLogo: "✈️", from: "Mumbai", fromCode: "BOM", to: "Prayagraj", toCode: "IXD", departure: "08:15", arrival: "10:30", duration: "2h 15m", stops: 0, price: 5800, priceLabel: "₹5,800", class: "Economy", seatsLeft: 8 },
  { id: "f3", airline: "SpiceJet", airlineLogo: "✈️", from: "Bengaluru", fromCode: "BLR", to: "Prayagraj", toCode: "IXD", departure: "09:00", arrival: "11:45", duration: "2h 45m", stops: 1, price: 6200, priceLabel: "₹6,200", class: "Economy", seatsLeft: 5 },
  { id: "f4", airline: "Vistara", airlineLogo: "✈️", from: "Kolkata", fromCode: "CCU", to: "Prayagraj", toCode: "IXD", departure: "07:30", arrival: "09:00", duration: "1h 30m", stops: 0, price: 4800, priceLabel: "₹4,800", class: "Economy", seatsLeft: 15 },
  { id: "f5", airline: "Air India", airlineLogo: "✈️", from: "Chennai", fromCode: "MAA", to: "Prayagraj", toCode: "IXD", departure: "10:00", arrival: "13:00", duration: "3h 00m", stops: 1, price: 7500, priceLabel: "₹7,500", class: "Economy", seatsLeft: 3 },
  { id: "f6", airline: "IndiGo", airlineLogo: "✈️", from: "Hyderabad", fromCode: "HYD", to: "Prayagraj", toCode: "IXD", departure: "11:30", arrival: "14:00", duration: "2h 30m", stops: 1, price: 5500, priceLabel: "₹5,500", class: "Economy", seatsLeft: 10 },
];

export const popularTrains: TrainResult[] = [
  {
    id: "t1", trainNo: "12417", trainName: "Prayagraj Express",
    from: "New Delhi", fromCode: "NDLS", to: "Prayagraj Jn", toCode: "PRYJ",
    departure: "21:30", arrival: "05:55", duration: "8h 25m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "3A", available: 45, price: 850 },
      { name: "2A", available: 12, price: 1250 },
      { name: "SL", available: 120, price: 350 },
    ],
    status: "available",
  },
  {
    id: "t2", trainNo: "12275", trainName: "Allahabad Duronto",
    from: "New Delhi", fromCode: "NDLS", to: "Prayagraj Jn", toCode: "PRYJ",
    departure: "23:00", arrival: "06:00", duration: "7h 00m",
    days: ["Mon", "Thu", "Sat"],
    classes: [
      { name: "3A", available: 8, price: 1100 },
      { name: "2A", available: 4, price: 1650 },
      { name: "1A", available: 2, price: 2800 },
    ],
    status: "available",
  },
  {
    id: "t3", trainNo: "15017", trainName: "Gorakhpur Express",
    from: "Mumbai CST", fromCode: "CSMT", to: "Prayagraj Jn", toCode: "PRYJ",
    departure: "00:10", arrival: "22:30", duration: "22h 20m",
    days: ["Tue", "Fri"],
    classes: [
      { name: "3A", available: 30, price: 1450 },
      { name: "2A", available: 10, price: 2100 },
      { name: "SL", available: 85, price: 550 },
    ],
    status: "available",
  },
  {
    id: "t4", trainNo: "12311", trainName: "Kalka Mail",
    from: "Howrah", fromCode: "HWH", to: "Prayagraj Jn", toCode: "PRYJ",
    departure: "19:40", arrival: "05:10", duration: "9h 30m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "3A", available: 55, price: 950 },
      { name: "2A", available: 18, price: 1400 },
      { name: "SL", available: 150, price: 400 },
    ],
    status: "available",
  },
  {
    id: "t5", trainNo: "14209", trainName: "Prayag Raj Express",
    from: "Lucknow", fromCode: "LKO", to: "Prayagraj Jn", toCode: "PRYJ",
    departure: "06:00", arrival: "10:00", duration: "4h 00m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "3A", available: 60, price: 450 },
      { name: "CC", available: 40, price: 550 },
      { name: "SL", available: 200, price: 180 },
    ],
    status: "available",
  },
];

export const majorCities = [
  "New Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "Hyderabad",
  "Lucknow", "Varanasi", "Patna", "Jaipur", "Ahmedabad", "Pune",
  "Chandigarh", "Bhopal", "Indore", "Nagpur", "Ranchi", "Bhubaneswar",
];
