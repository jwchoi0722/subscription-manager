export type Subscription = {
  id: number
  service: string
  servicePlan: string
  name: string
  start: Date
  end: Date
  priceAmount: number
  priceCurrency: string
  totalAmount: number
  isAutoRenew: boolean
  isChanged: boolean
  category?: string
}

export type Service = {
  id: number,
  name: string,
  homeUrl: string,
  logoUrl: string,
  accountUrl: string
}

const testSubscriptions: Subscription[] = [
  {
    id: 1003,
    service: "Netflix",
    servicePlan: "Standard",
    name: "Netflix (Standard)",
    start: new Date("2025-12-04 00:00:00"),
    end: new Date("2026-01-04 00:00:00"),
    priceAmount: 14.93,
    priceCurrency: "CAD",
    totalAmount: 16.72,
    isAutoRenew: true,
    isChanged: false,
    category: "Movies/TV",
  },
  {
    id: 1002,
    service: "Netflix",
    servicePlan: "Standard with ads",
    name: "Netflix (Standard with ads)",
    start: new Date("2025-11-23 00:00:00"),
    end: new Date("2025-12-04 00:00:00"),
    priceAmount: 7.99,
    priceCurrency: "CAD",
    totalAmount: 8.95,
    isAutoRenew: true,
    isChanged: true,
    category: "Movies/TV",
  },
  {
    id: 1001,
    service: "Netflix",
    servicePlan: "Standard with ads",
    name: "Netflix (Standard with ads)",
    start: new Date("2025-10-23 00:00:00"),
    end: new Date("2025-11-23 00:00:00"),
    priceAmount: 7.99,
    priceCurrency: "CAD",
    totalAmount: 8.95,
    isAutoRenew: true,
    isChanged: false,
    category: "Movies/TV",
  },
  {
    id: 2001,
    service: "Disney Plus",
    servicePlan: "Premium",
    name: "Disney+ (Premium)",
    start: new Date("2025-12-02 00:00:00"),
    end: new Date("2026-01-02 00:00:00"),
    priceAmount: 16.99,
    priceCurrency: "CAD",
    totalAmount: 18.98,
    isAutoRenew: false,
    isChanged: false,
  },
  {
    id: 3001,
    service: "Crunchyroll",
    servicePlan: "Fan",
    name: "Crunchyroll (Fan)",
    start: new Date("2025-11-02 00:00:00"),
    end: new Date("2026-11-02 00:00:00"),
    priceAmount: 82.99,
    priceCurrency: "CAD",
    totalAmount: 93.74,
    isAutoRenew: false,
    isChanged: false,
  },
  {
    id: 4001,
    service: "HIDIVE",
    servicePlan: "Free Trial",
    name: "HIDIVE (Free Trial)",
    start: new Date("2026-01-02 00:00:00"),
    end: new Date("2026-01-09 00:00:00"),
    priceAmount: 0.00,
    priceCurrency: "CAD",
    totalAmount: 0.00,
    isAutoRenew: true,
    isChanged: false,
    category: "Anime",
  },
  {
    id: 5001,
    service: "Spotify",
    servicePlan: "Duo",
    name: "Spotify (Duo)",
    start: new Date("2025-12-31 00:00:00"),
    end: new Date("2026-01-31 00:00:00"),
    priceAmount: 15.89,
    priceCurrency: "CAD",
    totalAmount: 17.89,
    isAutoRenew: true,
    isChanged: false,
    category: "Music",
  },
];

const testServices: Service[] = [
  {
    id: 1,
    name: "Netflix",
    homeUrl: "https://www.netflix.com",
    logoUrl: "",
    accountUrl: "https://www.netflix.com/account"
  },
  {
    id: 2,
    name: "Disney Plus",
    homeUrl: "https://www.disneyplus.com",
    logoUrl: "",
    accountUrl: "https://www.disneyplus.com/commerce/account"
  },
  {
    id: 3,
    name: "Crunchyroll",
    homeUrl: "https://www.crunchyroll.com",
    logoUrl: "",
    accountUrl: "https://www.crunchyroll.com/account/membership"
  },
  {
    id: 4,
    name: "HIDIVE",
    homeUrl: "https://www.hidive.com",
    logoUrl: "",
    accountUrl: "https://www.hidive.com/account?section=subscriptions"
  },
  {
    id: 5,
    name: "Spotify",
    homeUrl: "https://open.spotify.com",
    logoUrl: "",
    accountUrl: "https://accounts.spotify.com"
  }
]

const STORAGE_KEY = "subscriptions";

export function getSubscriptions(): Subscription[] {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testSubscriptions));
  }

  const subscriptionObjs: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
  const subscriptions: Subscription[] = subscriptionObjs.map((obj) => {
    let sub: Subscription = obj as Subscription;
    sub.start = new Date(obj.start);
    sub.end = new Date(obj.end);
    return sub;
  });

  return subscriptions;
}

export function addSubscription(subscription: Subscription): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...getSubscriptions(), subscription]));
}

export function updateSubscription(id: number, subscription: Subscription): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getSubscriptions().map((entry) => entry.id === id ? subscription : entry)));
}

export function deleteSubscription(id: number): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getSubscriptions().filter((entry) => entry.id !== id)));
}

export function getServices(): Service[] {
  return testServices;
}
