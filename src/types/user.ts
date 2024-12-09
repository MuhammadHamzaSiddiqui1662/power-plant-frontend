import { Review } from "./ReviewType";

export enum UserStatus {
  Active = "Active",
  Pending = "Pending",
}

export enum UserType {
  Innovator,
  Innvestor,
  Broker,
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  about: string;
  imageUrl: string;
  identityUrl: string;
  address: string;
  status: UserStatus;
  subscriber: boolean;
  otp: string;
  otpExpiry: Date;
  online: boolean;
  lastSeen: Date;
  type?: UserType;
  brokerStatus: string;
  reviewsAsInvestor: Review[];
  reviewsAsBorker: Review[];
  reviewsAsInnovator: Review[];
  totalBrokersHired: string;
  dealsInProgress: string;
  successfulDeals: string;
  interests: string[];
  brokerIdentityUrl: string;
  notificationsAllowed: boolean;
}
