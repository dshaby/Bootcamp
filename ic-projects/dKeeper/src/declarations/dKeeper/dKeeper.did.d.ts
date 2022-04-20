import type { Principal } from '@dfinity/principal';
export interface Note { 'id' : string, 'title' : string, 'content' : string }
export interface _SERVICE {
  'createNote' : (arg_0: string, arg_1: string, arg_2: string) => Promise<
      undefined
    >,
  'readNotes' : () => Promise<Array<Note>>,
  'removeNote' : (arg_0: bigint) => Promise<undefined>,
}
