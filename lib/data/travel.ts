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
  { id: "f1", airline: "Air India", airlineLogo: "✈️", from: "New Delhi", fromCode: "DEL", to: "Ujjain (Indore)", toCode: "IDR", departure: "06:00", arrival: "07:30", duration: "1h 30m", stops: 0, price: 4500, priceLabel: "₹4,500", class: "Economy", seatsLeft: 12 },
  { id: "f2", airline: "IndiGo", airlineLogo: "✈️", from: "Mumbai", fromCode: "BOM", to: "Ujjain (Indore)", toCode: "IDR", departure: "08:15", arrival: "10:30", duration: "2h 15m", stops: 0, price: 5800, priceLabel: "₹5,800", class: "Economy", seatsLeft: 8 },
  { id: "f3", airline: "SpiceJet", airlineLogo: "✈️", from: "Bengaluru", fromCode: "BLR", to: "Ujjain (Indore)", toCode: "IDR", departure: "09:00", arrival: "11:45", duration: "2h 45m", stops: 1, price: 6200, priceLabel: "₹6,200", class: "Economy", seatsLeft: 5 },
  { id: "f4", airline: "Vistara", airlineLogo: "✈️", from: "Kolkata", fromCode: "CCU", to: "Ujjain (Indore)", toCode: "IDR", departure: "07:30", arrival: "09:00", duration: "1h 30m", stops: 0, price: 4800, priceLabel: "₹4,800", class: "Economy", seatsLeft: 15 },
  { id: "f5", airline: "Air India", airlineLogo: "✈️", from: "Chennai", fromCode: "MAA", to: "Ujjain (Indore)", toCode: "IDR", departure: "10:00", arrival: "13:00", duration: "3h 00m", stops: 1, price: 7500, priceLabel: "₹7,500", class: "Economy", seatsLeft: 3 },
  { id: "f6", airline: "IndiGo", airlineLogo: "✈️", from: "Hyderabad", fromCode: "HYD", to: "Ujjain (Indore)", toCode: "IDR", departure: "11:30", arrival: "14:00", duration: "2h 30m", stops: 1, price: 5500, priceLabel: "₹5,500", class: "Economy", seatsLeft: 10 },
];

export const popularTrains: TrainResult[] = [
  {
    id: "t1", trainNo: "12417", trainName: "Ujjain Express",
    from: "New Delhi", fromCode: "NDLS", to: "Ujjain Jn", toCode: "UJN",
    departure: "22:10", arrival: "07:15", duration: "9h 05m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "1A", available: 0, price: 2500 },
      { name: "2A", available: 12, price: 1500 },
      { name: "3A", available: 45, price: 1000 },
      { name: "SL", available: 0, price: 400 }
    ],
    status: "available",
  },
  {
    id: "t2", trainNo: "22438", trainName: "Vande Bharat Exp",
    from: "New Delhi", fromCode: "NDLS", to: "Ujjain Jn", toCode: "UJN",
    departure: "06:00", arrival: "14:00", duration: "8h 00m",
    days: ["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "EC", available: 5, price: 2800 },
      { name: "CC", available: 0, price: 1400 }
    ],
    status: "available",
  },
  {
    id: "t3", trainNo: "12141", trainName: "LTT UJN SF Exp",
    from: "Mumbai CST", fromCode: "CSMT", to: "Ujjain Jn", toCode: "UJN",
    departure: "23:35", arrival: "21:30", duration: "21h 55m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "2A", available: 0, price: 2100 },
      { name: "3A", available: 8, price: 1400 },
      { name: "SL", available: 0, price: 550 }
    ],
    status: "available",
  },
  {
    id: "t4", trainNo: "12321", trainName: "Howrah UJN Exp",
    from: "Howrah", fromCode: "HWH", to: "Ujjain Jn", toCode: "UJN",
    departure: "23:55", arrival: "15:00", duration: "15h 05m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: [
      { name: "2A", available: 2, price: 1800 },
      { name: "3A", available: 0, price: 1200 },
      { name: "SL", available: 0, price: 450 }
    ],
    status: "available",
  },
  {
    id: "t5", trainNo: "14209", trainName: "Intercity Exp",
    from: "Lucknow", fromCode: "LKO", to: "Ujjain Jn", toCode: "UJN",
    departure: "07:30", arrival: "11:45", duration: "4h 15m",
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
  { code: "NDLS", name: "New Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "CCU", name: "Kolkata" },
  { code: "MAA", name: "Chennai" },
  { code: "BLR", name: "Bengaluru" },
  { code: "HYD", name: "Hyderabad" },
  { code: "LKO", name: "Lucknow" },
  { code: "BSB", name: "Varanasi" },
  { code: "PNBE", name: "Patna" },
  { code: "JP", name: "Jaipur" },
  { code: "AMD", name: "Ahmedabad" },
  { code: "PUNE", name: "Pune" },
  { code: "SBC", name: "Bangalore City" },
  { code: "CNB", name: "Kanpur" },
  { code: "NAG", name: "Nagpur" },
  { code: "IND", name: "Indore" },
  { code: "BPL", name: "Bhopal" },
  { code: "GWL", name: "Gwalior" },
  { code: "JBP", name: "Jabalpur" },
  { code: "PRYJ", name: "Prayagraj" },
  { code: "AGC", name: "Agra" },
  { code: "ASR", name: "Amritsar" },
  { code: "CDG", name: "Chandigarh" },
  { code: "SUR", name: "Surat" },
  { code: "BRC", name: "Vadodara" },
  { code: "RJT", name: "Rajkot" },
  { code: "JAT", name: "Jammu" },
  { code: "GHY", name: "Guwahati" },
  { code: "BBS", name: "Bhubaneswar" },
  { code: "RPR", name: "Raipur" },
  { code: "RNC", name: "Ranchi" },
  { code: "VGA", name: "Vijayawada" },
  { code: "VSKP", name: "Visakhapatnam" },
  { code: "TCR", name: "Thrissur" },
  { code: "TVC", name: "Thiruvananthapuram" },
  { code: "ERS", name: "Ernakulam" },
  { code: "CBE", name: "Coimbatore" },
  { code: "MDU", name: "Madurai" },
  { code: "TPJ", name: "Tiruchirappalli" },
  { code: "GAYA", name: "Gaya" },
  { code: "MGS", name: "Mughalsarai" },
  { code: "GKP", name: "Gorakhpur" },
  { code: "AY", name: "Ayodhya" },
  { code: "HW", name: "Haridwar" },
  { code: "DDN", name: "Dehradun" },
  { code: "SML", name: "Shimla" },
  { code: "UJN", name: "Ujjain" },
];
