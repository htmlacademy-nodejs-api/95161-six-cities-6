import {City} from './city-type.enum';
import {Accommodation} from './accommodation-type.enum.js';
import {Amenity} from './amenity-type.enum.js';
import {Coordinate} from './coordinate.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string [];
  isPremium: boolean;
  isFavorite: boolean;
  rank: number;
  accomodation: Accommodation;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  amenities: Amenity [];
  author: string;
  commentsNum: number;
  coordinate: Coordinate;
}

