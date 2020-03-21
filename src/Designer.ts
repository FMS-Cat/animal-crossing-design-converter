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

  public loadImage( image: CanvasImageSource, enableTransparent: boolean ): void {
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

      vecs.push( new Vector3( [
        imageData.data[ i * 4 + 0 ],
        imageData.data[ i * 4 + 1 ],
        imageData.data[ i * 4 + 2 ],
      ] ) );
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
