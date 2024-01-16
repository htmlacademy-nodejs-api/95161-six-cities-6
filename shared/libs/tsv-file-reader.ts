import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {Offer} from '../types/offer.type.js';
import {City} from '../types/city-type.enum.js';
import {Accommodation} from '../types/accommodation-type.enum.js';
import {Amenity} from '../types/amenity-type.enum.js';
import {Coordinate} from '../types/coordinate.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    const rows = this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0);

    const data = rows.map((line) => line.split('    '));

    const getCoordinate = (coordinateStr: string): Coordinate => {
      const coordinatesPairs = coordinateStr.split(','); // [long:1, attt:2]
      return {latitude: coordinatesPairs[0].split(':')[1],longitude: coordinatesPairs[1].split(':')[1]};
    };

    return data.map(([title, description, postDate, city, preview, photos, isPremium, isFavorite, rank, accomodation,
      roomsNumber, guestsNumber, price, amenities, author, commentsNum, coordinate]) => ({
      title,
      description,
      postDate: new Date(postDate),
      city: city as City,
      preview,
      photos: photos.split(','),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rank: +rank,
      accomodation: accomodation as Accommodation,
      roomsNumber: +roomsNumber,
      guestsNumber: +guestsNumber,
      price: +price,
      amenities: amenities.split(',') as Amenity[],
      author,
      commentsNum: +commentsNum,
      coordinate: getCoordinate(coordinate),
    }));
  }
}
