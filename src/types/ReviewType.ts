export enum ReviewType {
  ReviewsAsInvestor = "reviewsAsInvestor",
  ReviewsAsBorker = "reviewsAsBorker",
  ReviewsAsInnovator = "reviewsAsInnovator",
}

export interface Review {
  _id?: string;
  dealSuccessFul: boolean;
  comments: string;
  behaviour: number;
  priceNegotiation: number;
  responsiveness: number;
  communication: number;
  technicalSkills: number;
  userId: string;
}
