import { Vector3 } from '@fms-cat/experimental';

export class AnimalCrossingColor {
  public h: number; // 30
  public s: number; // 15
  public v: number; // 15
  public isTransparent: boolean;

  public constructor( h?: number, s?: number, v?: number, isTransparent?: boolean ) {
    this.h = h || 0;
    this.s = s || 0;
    this.v = v || 0;
    this.isTransparent = isTransparent || false;
  }

  public equals( a: AnimalCrossingColor ): boolean {
    return (
      this.h === a.h &&
      this.s === a.s &&
      this.v === a.v &&
      this.isTransparent === a.isTransparent
    );
  }

  /**
   * Ref: https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
   */
  public toNormalizedRGB(): [ number, number, number ] {
    const c = ( this.s / 14.0 * this.v / 14.0 );
    const ht = this.h / 5.0;
    const x = c * ( 1.0 - Math.abs( ( ht % 2.0 ) - 1.0 ) );
    const b = this.v / 14.0 - c;

    if ( ht < 1.0 ) {
      return [ b + c, b + x, b + 0 ];
    } else if ( ht < 2.0 ) {
      return [ b + x, b + c, b + 0 ];
    } else if ( ht < 3.0 ) {
      return [ b + 0, b + c, b + x ];
    } else if ( ht < 4.0 ) {
      return [ b + 0, b + x, b + c ];
    } else if ( ht < 5.0 ) {
      return [ b + x, b + 0, b + c ];
    } else {
      return [ b + c, b + 0, b + x ];
    }
  }

  public toCSSColor(): string {
    const [ r, g, b ] = this.toNormalizedRGB();
    return `rgb( ${ Math.round( r * 255 ) }, ${ Math.round( g * 255 ) }, ${ Math.round( b * 255 ) } )`;
  }

  public toVector(): Vector3 {
    return new Vector3( this.toNormalizedRGB() );
  }

  public static fromVector( vec: Vector3 ): AnimalCrossingColor {
    const [ r, g, b ] = vec.scale( 1.0 / 255.0 ).elements;
    const min = Math.min( r, Math.min( g, b ) );
    const max = Math.max( r, Math.max( g, b ) );

    const h = Math.round( (
      min === b
        ? ( ( g - r ) / ( max - min ) + 1.0 )
        : min === r
          ? ( ( b - g ) / ( max - min ) + 3.0 )
          : ( ( r - b ) / ( max - min ) + 5.0 )
    ) * 5.0 ) % 30;

    return new AnimalCrossingColor(
      h,
      Math.floor( ( max - min ) / max * 15.0 ),
      Math.floor( max * 15.0 )
    );
  }
}
