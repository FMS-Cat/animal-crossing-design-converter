import { Vector3 } from '@fms-cat/experimental';

const ITER = 16;

interface Entry {
  vec: Vector3;
  iCluster: number;
}

interface Result {
  matrix: number[];
  clusters: Vector3[];
}

function closest( v: Vector3, array: Vector3[] ): number {
  let iClosest = 0;
  let vClosest = v.sub( array[ 0 ] ).length;

  array.forEach( ( va, i ) => {
    const vCluster = v.sub( va ).length;
    if ( vCluster < vClosest ) {
      iClosest = i;
      vClosest = vCluster;
    }
  } );

  return iClosest;
}

export function kMeansVectors(
  vectors: Vector3[],
  clusters: number
): Result {
  let clusterVectors: Vector3[] = new Array( clusters ).fill( new Vector3() );

  // distribute clusters
  const entries: Entry[] = vectors.map( ( vec ) => ( {
    vec,
    iCluster: Math.floor( Math.random() * clusters )
  } ) );

  for ( let iIter = 0; iIter < ITER; iIter ++ ) {
    // calculate centers of each clusters
    const clusterSums: Vector3[] = new Array( clusters ).fill( new Vector3() );
    const clusterCounts: number[] = new Array( clusters ).fill( 0 );
    entries.forEach( ( entry ) => {
      clusterSums[ entry.iCluster ] = clusterSums[ entry.iCluster ].add( entry.vec );
      clusterCounts[ entry.iCluster ] ++;
    } );

    clusterVectors = clusterSums.map( ( sum, i ) => (
      clusterCounts[ i ] === 0
        ? new Vector3( [ Math.random() * 255.0, Math.random() * 255.0, Math.random() * 255.0 ] )
        : sum.scale( 1.0 / clusterCounts[ i ] )
    ) );

    // redistribute clusters
    entries.forEach( ( entry ) => {
      entry.iCluster = closest( entry.vec, clusterVectors );
    } );
  }

  return {
    matrix: entries.map( ( entry ) => entry.iCluster ),
    clusters: clusterVectors
  };
}
