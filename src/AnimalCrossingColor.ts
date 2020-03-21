export class AnimalCrossingColor {
  public h: number; // 30
  public s: number; // 15
  public v: number; // 15
  public isTransparent: boolean;

  /**
   * Ref: https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
   */
  public toNormalizedRGB(): [ number, number, number ] {
    const c = this.s;
    const ht = this.h / 5.0;
    const x = c * ( 1.0 - Math.abs( ( ht % 2.0 ) - 1.0 ) );

    if ( ht < 1.0 ) {
      return [ c, x, 0 ];
    } else if ( ht < 2.0 ) {
      return [ x, c, 0 ];
    } else if ( ht < 3.0 ) {
      return [ 0, c, x ];
    } else if ( ht < 4.0 ) {
      return [ 0, x, c ];
    } else if ( ht < 5.0 ) {
      return [ x, 0, c ];
    } else {
      return [ c, 0, x ];
    }
  }

  public toCSSColor(): string {
    const [ r, g, b ] = this.toNormalizedRGB();
    return `rgb( ${ Math.floor( r * 255 ) }, ${ Math.floor( g * 255 ) }, ${ Math.floor( b * 255 ) } )`;
  }
}
