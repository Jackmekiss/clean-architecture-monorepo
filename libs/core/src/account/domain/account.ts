import { Media } from '../../shared/domain/media';

export interface Account {
  id: string;
  name: string;
  avatar: Media;
  username: string;
  bio?: string;
  review?: AccountReviewInformation
  totalFollowers: number;
  totalFollowing: number;
}

export interface AccountReviewInformation {
  total: number;
  average: number;
}

export interface PhoneNumber {
  country: string;
  number: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
