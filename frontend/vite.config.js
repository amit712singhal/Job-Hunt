import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

// Manually load the .env file from the parent directory
dotenv.config( { path: path.resolve( __dirname, '../.env' ) } );

export default defineConfig( {
  plugins: [ react() ],
  resolve: {
    alias: {
      "@": path.resolve( __dirname, "./src" ),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Optional, if you want to increase the chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks ( id )
        {
          if ( id.includes( 'node_modules' ) )
          {
            return 'vendor'; // Move all dependencies from node_modules into a vendor chunk
          }
        }
      }
    }
  }
} );
