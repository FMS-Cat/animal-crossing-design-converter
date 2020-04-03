import { AnimalCrossingColor } from './AnimalCrossingColor';
import { EventEmittable } from './utils/EventEmittable';
import { Vector3 } from '@fms-cat/experimental';
import { applyMixins } from './utils/applyMixins';
import { kMeansVectors } from './kMeansVectors';

export class Designer {
  public static readonly WIDTH = 32;
  public static readonly HEIGHT = 32;
  public static readonly COLORS = 16;
  public static readonly TRANSPARENT_THRESHOLD = 128;

  public colors: AnimalCrossingColor[]
  = new Array( Designer.COLORS ).fill( new AnimalCrossingColor() );
  public matrix: number[] = new Array( Designer.WIDTH * Designer.HEIGHT ).fill( 0 );

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public constructor() {
    this.canvas = document.createElement( 'canvas' );
    this.canvas.width = Designer.WIDTH;
    this.canvas.height = Designer.HEIGHT;

    this.context = this.canvas.getContext( '2d' )!;
  }

  public loadImage( image: CanvasImageSource, enableTransparent: boolean, dither: boolean ): void {
    this.context.clearRect( 0, 0, Designer.WIDTH, Designer.HEIGHT );
    this.context.drawImage( image, 0, 0, Designer.WIDTH, Designer.HEIGHT );

    const imageData = this.context.getImageData( 0, 0, Designer.WIDTH, Designer.HEIGHT );

    const vecs: Vector3[] = [];
    const N = Designer.WIDTH * Designer.HEIGHT;
    for ( let i = 0; i < N; i ++ ) {
      // skip transparent pixels
      if ( enableTransparent && imageData.data[ i * 4 + 3 ] < Designer.TRANSPARENT_THRESHOLD ) {
        continue;
      }

      if ( dither ) {
        const ditherX = i % 2;
        const ditherY = Math.floor( i / Designer.WIDTH ) % 2;
        const ditherBias = 255 / 15 * ( ditherX + 2 * Math.abs( ditherX - ditherY ) ) / 3;

        vecs.push( new Vector3( [
          imageData.data[ i * 4 + 0 ] / 15 * 14 + ditherBias,
          imageData.data[ i * 4 + 1 ] / 15 * 14 + ditherBias,
          imageData.data[ i * 4 + 2 ] / 15 * 14 + ditherBias,
        ] ) );
      } else {
        vecs.push( new Vector3( [
          imageData.data[ i * 4 + 0 ],
          imageData.data[ i * 4 + 1 ],
          imageData.data[ i * 4 + 2 ],
        ] ) );
      }
    }

    const nColors = Designer.COLORS - ( enableTransparent ? 1 : 0 );
    const result = kMeansVectors( vecs, nColors );

    let head = 0;
    this.matrix = this.matrix.map( ( _, i ) => {
      if ( enableTransparent && imageData.data[ i * 4 + 3 ] < Designer.TRANSPARENT_THRESHOLD ) {
        return Designer.COLORS - 1;
      } else {
        return result.matrix[ head ++ ];
      }
    } );

    this.colors = result.clusters.map( ( color ) => AnimalCrossingColor.fromVector( color ) );
    if ( enableTransparent ) {
      this.colors.push( new AnimalCrossingColor( 0, 0, 0, true ) );
    }

    // put dups together
    for ( let i = 0; i < this.colors.length; i ++ ) {
      const color = this.colors[ i ];
      for ( let j = i + 1; j < this.colors.length; j ++ ) {
        const another = this.colors[ j ];
        if ( color.equals( another ) ) {
          this.matrix = this.matrix.map( ( v ) => v === j ? i : v );
        }
      }
    }

    this.__emit( 'changeMatrix', { matrix: this.matrix } );
    this.__emit( 'changeColors', { colors: this.colors } );
  }
}

export interface DesignerEvents {
  changeMatrix: { matrix: number[] };
  changeColors: { colors: AnimalCrossingColor[] };
}

export interface Designer extends EventEmittable<DesignerEvents> {}
applyMixins( Designer, [ EventEmittable ] );
