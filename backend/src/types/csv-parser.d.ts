declare module 'csv-parser' {
    import { Transform } from 'stream';
    
    interface Options {
        separator?: string;
        headers?: string[] | boolean;
        skipLines?: number;
    }

    function csvParser(options?: Options): Transform;
    
    export = csvParser;
}