export enum IpStatus {
  Published = "Published",
  AppliedForPatent = "Applied For Patent",
  InActive = "In Active",
  Draft = "Draft",
  Pending = "Pending",
}

interface ISection {
  title: string;
  content: string;
}

export interface IP {
  _id?: string;
  name: string;
  description: string;
  abstract: string;
  price: number;
  status: IpStatus;
  categories: string[];
  publishedDate: Date;
  patentNumber: string;
  trademark: string;
  copyright: string;
  mainImg: string;
  images: string[];
  sections: ISection[];
  userId: string;
  lastMadeActive?: Date;
  patentDocument?: string;
}
