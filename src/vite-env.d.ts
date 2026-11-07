/// <reference types="vite/client" />

declare module "next/image" {
  import React from "react";
  interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  }
  const Image: React.ComponentType<ImageProps>;
  export default Image;
}
