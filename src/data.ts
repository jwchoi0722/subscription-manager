export type Subscription = {
  id: number
  service: string
  servicePlan: string
  name: string
  status: SubscriptionStatus
  start: Date
  end: Date
  durationLength: number
  durationUnit: TimeUnit
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
  homeUrl?: string,
  logoUrl?: string,
  accountUrl?: string,
  color?: string
}

export const TimeUnit = {
  Year: "YEAR",
  Month: "MONTH",
  Week: "WEEK",
  Day: "DAY",
  Hour: "HOUR"
} as const;
export type TimeUnit = (typeof TimeUnit)[keyof typeof TimeUnit];

export const SubscriptionStatus = {
  Pending: "Pending",
  Subscribed: "Subscribed",
  Expired: "Expired",
  Changed: "Changed"
}
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

const testSubscriptions: Subscription[] = [
  {
    id: 1004,
    service: "Netflix",
    servicePlan: "Standard",
    name: "Netflix (Standard)",
    status: SubscriptionStatus.Pending,
    start: new Date("2026-01-04 00:00:00"),
    end: new Date("2026-02-04 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Month,
    priceAmount: 14.93,
    priceCurrency: "CAD",
    totalAmount: 16.72,
    isAutoRenew: true,
    isChanged: false,
    category: "Movies/TV",
  },
  {
    id: 1003,
    service: "Netflix",
    servicePlan: "Standard",
    name: "Netflix (Standard)",
    status: SubscriptionStatus.Subscribed,
    start: new Date("2025-12-04 00:00:00"),
    end: new Date("2026-01-04 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Month,
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
    status: SubscriptionStatus.Expired,
    start: new Date("2025-11-23 00:00:00"),
    end: new Date("2025-12-04 00:00:00"),
    durationLength: 2,
    durationUnit: TimeUnit.Month,
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
    status: SubscriptionStatus.Expired,
    start: new Date("2025-10-23 00:00:00"),
    end: new Date("2025-11-23 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Month,
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
    status: SubscriptionStatus.Subscribed,
    start: new Date("2025-12-02 00:00:00"),
    end: new Date("2026-01-02 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Month,
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
    status: SubscriptionStatus.Expired,
    start: new Date("2025-11-02 00:00:00"),
    end: new Date("2026-11-02 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Year,
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
    status: SubscriptionStatus.Subscribed,
    start: new Date("2026-01-02 00:00:00"),
    end: new Date("2026-01-09 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Week,
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
    status: SubscriptionStatus.Subscribed,
    start: new Date("2025-12-31 00:00:00"),
    end: new Date("2026-01-31 00:00:00"),
    durationLength: 1,
    durationUnit: TimeUnit.Month,
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
    accountUrl: "https://www.netflix.com/account",
    color: "#d80005"
  },
  {
    id: 2,
    name: "Disney Plus",
    homeUrl: "https://www.disneyplus.com",
    logoUrl: "",
    accountUrl: "https://www.disneyplus.com/commerce/account",
    color: "#005567"
  },
  {
    id: 3,
    name: "Crunchyroll",
    homeUrl: "https://www.crunchyroll.com",
    logoUrl: "",
    accountUrl: "https://www.crunchyroll.com/account/membership",
    color: "#f65a05"
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
    accountUrl: "https://accounts.spotify.com",
    color: "#20d05d"
  }
]

const SUBSCRIPTIONS_STORAGE_KEY = "subscriptions";
const SERVICES_STORAGE_KEY = "services";

export function getSubscriptions(): Subscription[] {
  if (localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY) === null) {
    localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(testSubscriptions));
  }

  const subscriptionObjs: any[] = JSON.parse(localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY) as string);
  const subscriptions: Subscription[] = subscriptionObjs.map((obj) => {
    let sub: Subscription = obj as Subscription;
    sub.start = new Date(obj.start);
    sub.end = new Date(obj.end);
    return sub;
  });

  return subscriptions;
}

export function getSubscriptionsByService(service: string): Subscription[] {
  return getSubscriptions().filter((sub) => sub.service === service);
}

export function addSubscription(subscription: Subscription): void {
  localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify([...getSubscriptions(), subscription]));
}

export function updateSubscription(id: number, subscription: Subscription): void {
  localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(getSubscriptions().map((entry) => entry.id === id ? subscription : entry)));
}

export function deleteSubscription(id: number): void {
  localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(getSubscriptions().filter((entry) => entry.id !== id)));
}

export function getServices(): Service[] {
  if (localStorage.getItem(SERVICES_STORAGE_KEY) === null) {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(testServices));
  }

  const serviceObjs: any[] = JSON.parse(localStorage.getItem(SERVICES_STORAGE_KEY) as string);
  const services: Service[] = serviceObjs.map((obj) => {
    return obj as Service;
  });

  return services;
}

export function getService(id: number): Service | undefined {
  return getServices().find((service) => service.id === id);
}

export function addService(service: Service): void {
  localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify([...getServices(), service]));
}

export function updateService(id: number, service: Service): void {
  localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(getServices().map((entry) => entry.id === id ? service : entry)));
}
