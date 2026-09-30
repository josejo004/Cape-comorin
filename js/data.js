/* =====================================================
   CAPE COMORIN — sample/editable data
   In production this data should come from the admin
   panel's database rather than being hard-coded here.
   ===================================================== */

const CC_BIKES = [
{
  slug: "honda-activa",
  name: "Honda Activa",
  category: "Scooter",
  brand: "Honda",
  cc: 110,
  mileage: "45 km/l",
  transmission: "Automatic",
  fuel: "Petrol",
  seats: 2,
  pricePerHour: 60,
  pricePerDay: 450,
  deposit: 1500,
  available: true,
  discount: null,
  desc: "Light, easy to ride and perfect for couples exploring the beach roads and town at a relaxed pace.",

  image: "image/activa.jpg",

  gallery: [
    "image/activa.jpg",
    "image/activa.jpg"
  ]
},
	
  {
    slug: "tvs-jupiter",
    name: "TVS Jupiter",
    category: "Scooter",
    brand: "TVS",
    cc: 110,
    mileage: "42 km/l",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    pricePerHour: 55,
    pricePerDay: 400,
    deposit: 1500,
    available: true,
    discount: "10% OFF",
    desc: "A comfortable everyday scooter with plenty of underseat storage for a day of sightseeing.",
    image: "image/juipter.png",
    gallery: "image/juipter.png"
  },
  {
    slug: "dio",
    name: "dio",
    category: "Scooter",
    brand: "dio",
    cc: 350,
    mileage: "35 km/l",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    pricePerHour: 120,
    pricePerDay: 1100,
    deposit: 3000,
    available: true,
    discount: null,
    desc: "The classic thumper for long coastal rides — confident on the open road with a commanding riding position.",
    image: "image/dio.png",
    gallery: ["image/dio.png"]
  },
  {
    slug: "Fascino",
    name: "Fascino",
    category: "scooter",
    brand: "Yamaha",
    cc: 149,
    mileage: "44 km/l",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    pricePerHour: 80,
    pricePerDay: 650,
    deposit: 2000,
    available: true,
    discount: null,
    desc: "Sporty and nimble — a great pick for solo riders who want a bit more punch on the highway stretches.",
    image: "image/fasino.jpg",
    gallery: "image/fasino.jpg"
  },
  {
    slug: "TVS Zest",
    name: "TVS Zest",
    category: "Scooter",
    brand: "TVS",
    cc: 125,
    mileage: "48 km/l",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    pricePerHour: 65,
    pricePerDay: 500,
    deposit: 1500,
    available: false,
    discount: null,
    desc: "A punchier 125cc scooter for riders who want extra pickup without stepping up to a geared bike.",
    image: "image/tvs zest.jpg",
    gallery: ["image/tvs zest.jpg"]
  },
  {
    slug: "TVS Ntorq",
    name: "TVS Ntorq",
    category: "Scooter",
    brand: "TVS",
    cc: 411,
    mileage: "30 km/l",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    pricePerHour: 140,
    pricePerDay: 1300,
    deposit: 3500,
    available: true,
    discount: "Weekend Special",
    desc: "Built for longer day-trips beyond the coast — upright ergonomics and a relaxed, planted ride.",
    image: "image/yltvs.jpg",
    gallery: ["image/yltvs.jpg"]
  }
];

const CC_PLACES = [
  {
    slug: "vivekananda-rock-memorial",
    name: "Vivekananda Rock Memorial",
    distance: "1.5 km",
    time: "6 min ride",
    desc: "A memorial set on a rock island where the three seas meet, reached by a short ferry ride from the shore.",
    image: "image/vivki.png"
  },
  {
    slug: "thiruvalluvar-statue",
    name: "Thiruvalluvar Statue",
    distance: "1.5 km",
    time: "6 min ride",
    desc: "A towering stone statue of the Tamil poet-philosopher, standing beside the Vivekananda memorial.",
    image: "image/vivki.png"
  },
  {
    slug: "kanyakumari-beach",
    name: "Kanyakumari Beach",
    distance: "0.5 km",
    time: "2 min ride",
    desc: "Coloured sands and a wide open shoreline where the Arabian Sea, Bay of Bengal and Indian Ocean converge.",
    image: "image/kk-beatch.png"
  },
  {
    slug: "sunset-point",
    name: "Sunset Point",
    distance: "1 km",
    time: "4 min ride",
    desc: "The best-known viewpoint for watching the sun dip into the sea at the southern tip of the mainland.",
    image: "image/sunset.png"
  },
  {
    slug: "padmanabhapuram-palace",
    name: "Padmanabhapuram Palace",
    distance: "34 km",
    time: "55 min ride",
    desc: "A well-preserved wooden palace complex that was once the seat of the Travancore kings.",
    image: "image/patha.png"
  },
  {
    slug: "suchindram-temple",
    name: "Suchindram Temple",
    distance: "12 km",
    time: "22 min ride",
    desc: "An ancient temple known for its musical stone pillars and intricate sculpture work.",
    image: "image/suicithoram.png"
  },
  {
    slug: "vattakottai-fort",
    name: "Vattakottai Fort",
    distance: "6 km",
    time: "13 min ride",
    desc: "A coastal granite fort with sweeping sea views, a short and scenic ride from town.",
    image: "image/vaatakotai.png"
  },
  {
    slug: "mathur-aqueduct",
    name: "Mathur Aqueduct",
    distance: "45 km",
    time: "70 min ride",
    desc: "One of Asia's tallest aqueducts, worth the longer ride for the view from the top.",
    image: "image/mathoor.png"
  }
];

const CC_BLOG = [
  {
    slug: "best-places-to-visit-in-kanyakumari",
    title: "Best Places to Visit in Kanyakumari",
    category: "Tourist Places",
    date: "2026-08-14",
    excerpt: "From the Rock Memorial to hidden coastal viewpoints — a shortlist of stops worth building a route around.",
    image: "image/mathoor.png",
    body: "Kanyakumari rewards travellers who are willing to ride a little further than the main viewpoint. Start early at the Rock Memorial before the crowds arrive, then work your way along the coast road toward Sunset Point. Vattakottai Fort makes a good mid-morning stop, and if you have a full day, the ride out to Padmanabhapuram Palace is worth the extra distance. Keep your tank topped up before heading inland, as fuel stops thin out past the town limits."
  },
  {
    slug: "best-time-to-explore-kanyakumari",
    title: "Best Time to Explore Kanyakumari",
    category: "Travel Tips",
    date: "2026-08-02",
    excerpt: "Weather, crowds and light — when to plan your ride for the most comfortable and photogenic trip.",
    image: "image/kk-beatch.png",
    body: "The cooler months between November and February are the most comfortable for riding, with clear skies for both sunrise and sunset. If you're travelling in summer, plan your longer rides for early morning or late afternoon and keep the midday hours for indoor stops like the palace or temple visits. Monsoon season brings dramatic skies but slicker roads, so reduce your speed on the coastal stretches."
  },
  {
    slug: "complete-kanyakumari-bike-rental-guide",
    title: "Complete Kanyakumari Bike Rental Guide",
    category: "Bike Rental",
    date: "2026-07-20",
    excerpt: "Documents, deposits and what to check before you ride off — everything first-time renters ask us.",
    image: "image/rendal-hero-5.png",
    body: "Renting a bike in Kanyakumari is straightforward: bring a valid driving licence and a government photo ID, choose a rental duration, and pay the security deposit. Walk around the bike with our team before you ride off and note any existing scratches. Helmets are provided for every booking, and we recommend confirming the drop-off location in advance if it's different from where you picked up."
  },
  {
    slug: "top-places-near-kanyakumari-by-bike",
    title: "Top Places to Visit Near Kanyakumari by Bike",
    category: "Road Trips",
    date: "2026-07-05",
    excerpt: "Beyond the town centre: aqueducts, palaces and temples that make for a full day out on two wheels.",
    image: "image/kk-beatch.png",
    body: "If you have a full day and a geared bike, the loop out to Mathur Aqueduct and back via Suchindram Temple makes an excellent road trip. Leave by 7am, carry water, and plan a lunch stop in town on the way back. The roads inland are quieter than the coast road, which makes for a relaxed and steady ride."
  },
  {
    slug: "sunrise-and-sunset-points-in-kanyakumari",
    title: "Sunrise and Sunset Points in Kanyakumari",
    category: "Tourist Places",
    date: "2026-06-18",
    excerpt: "Kanyakumari is one of the few places in India where you can catch both sunrise and sunset over water.",
    image: "image/sunset.png",
    body: "Arrive at the shoreline near the memorial jetty at least twenty minutes before sunrise to get a good spot. For sunset, ride the short distance to Sunset Point, which faces the open sea directly. Both spots get busy on weekends, so a bike gives you the flexibility to try a quieter stretch of coast instead."
  },
  {
    slug: "one-day-kanyakumari-bike-trip-guide",
    title: "One-Day Kanyakumari Bike Trip Guide",
    category: "Road Trips",
    date: "2026-06-01",
    excerpt: "A simple, ride-tested itinerary for travellers with just one day to see the southern tip of India.",
    image: "image/vaatakotai.png",
    body: "Pick up your bike early and start at the beach before it gets crowded. Head to the Rock Memorial and Thiruvalluvar Statue by mid-morning, break for lunch in town, then ride out to Vattakottai Fort in the afternoon. Close the day at Sunset Point. It's an easy loop that covers the essentials without feeling rushed."
  }
];

const CC_REVIEWS = [
  { name: "Arjun Menon", location: "Bengaluru", rating: 5, text: "Picked up a scooter within ten minutes of landing. Clean bike, fair price, and the team marked out the coast road for us.", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" },
  { name: "Divya Krishnan", location: "Chennai", rating: 5, text: "Rented the Activa for two days for the family trip. No hidden charges, and drop-off was quick even on a Sunday evening.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  { name: "Rahul Iyer", location: "Coimbatore", rating: 4, text: "Took the Himalayan out for the Mathur Aqueduct loop. Bike was in great shape, would book again for a longer trip.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { name: "Sara Thomas", location: "Kochi", rating: 5, text: "WhatsApp booking was so easy — sent our dates, got a confirmation in minutes, bike was waiting at the hotel.", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop" },
  { name: "Vignesh R", location: "Madurai", rating: 5, text: "Good rates for a full day rental and the deposit was refunded on the spot after the bike check.", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&auto=format&fit=crop" },
  { name: "Priya Nair", location: "Trivandrum", rating: 4, text: "Friendly staff, gave us a paper map with all the viewpoints marked. Small scratch on the bike was already noted before we left.", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop" }
];

const CC_BUSINESS = {
  name: "Cape Comorin",
  tagline: "Bike Rental & Tours",
  phone: "9500651544",
  phoneDisplay: "+91 95006 51544",
  whatsappMessage: "Hello Cape Comorin, I would like to enquire about bike rental.",
  email: "ride@capecomorinbikes.example",
  address: "Beach Road, Kanyakumari, Tamil Nadu 629702",
  facebook: "#",
  instagram: "#"
};
