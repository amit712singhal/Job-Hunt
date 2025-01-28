import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = ( file ) =>
{
  if ( !file )
  {
    throw new Error( "File object is undefined or null" );
  }
  if ( !file.originalname )
  {
    throw new Error( "File object does not have an originalname property" );
  }

  const parser = new DataUriParser();
  const extName = path.extname( file.originalname ).toString();
  return parser.format( extName, file.buffer );
};

export default getDataUri;
