export async function stringToArrayBuffer( string ): Promise<ArrayBuffer> {
  const blob = new Blob( [ string ] );
  const url = URL.createObjectURL( blob );
  return await fetch( url ).then( ( res ) => res.arrayBuffer() );
}
