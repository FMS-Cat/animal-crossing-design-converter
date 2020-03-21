import { Vector3 } from '@fms-cat/experimental'
import { AnimalCrossingColor } from './AnimalCrossingColor';

export class DesignerConverter {
  public static readonly WIDTH = 32;
  public static readonly HEIGHT = 32;
  public static readonly COLORS = 16;
  public static readonly TRANSPARENT_THRESHOLD = 128;

  public colors: AnimalCrossingColor[];
  public matrix: number[];

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public constructor() {
    this.canvas = document.createElement( 'canvas' );
    this.canvas.width = DesignerConverter.WIDTH;
    this.canvas.height = DesignerConverter.HEIGHT;

    this.context = this.canvas.getContext( '2d' )!;
  }

  public loadImage( image: CanvasImageSource, enableTransparent: boolean ): void {
    this.context.drawImage( image, 0, 0, DesignerConverter.WIDTH, DesignerConverter.HEIGHT );

    const imageData = this.context.getImageData( 0, 0, DesignerConverter.WIDTH, DesignerConverter.HEIGHT );

    const vecs: Vector3[] = [];
    const N = DesignerConverter.WIDTH * DesignerConverter.HEIGHT;
    for ( let i = 0; i < N; i ++ ) {
      // skip transparent pixels
      if ( imageData[ i * 4 + 3 ] < DesignerConverter.TRANSPARENT_THRESHOLD ) { continue; }

      vecs.push( new Vector3( [
        imageData[ i * 4 + 0 ],
        imageData[ i * 4 + 1 ],
        imageData[ i * 4 + 2 ],
      ] ) );
    }
  }
}
