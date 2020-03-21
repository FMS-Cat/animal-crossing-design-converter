export class Groups<TKey, TValue> {
  private __map: Map<TKey, Set<TValue>> = new Map();

  public delete( key: TKey, value: TValue ): void {
    const set = this.__map.get( key );
    if ( set ) {
      set.delete( value );
      if ( set.size === 0 ) {
        this.__map.delete( key );
      }
    }
  }

  public add( key: TKey, value: TValue ): void {
    let set = this.__map.get( key );
    if ( !set ) {
      set = new Set<TValue>();
      this.__map.set( key, set );
    }
    set.add( value );
  }

  public get( key: TKey ): Set<TValue> | undefined {
    return this.__map.get( key );
  }

  public entries(): IterableIterator<[ TKey, Set<TValue> ]> {
    return this.__map.entries();
  }
}
