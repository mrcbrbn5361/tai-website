import React from "react";

interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function NextImage({
  fill,
  priority,
  sizes,
  className = "",
  style,
  alt = "",
  src,
  ...props
}: NextImageProps) {
  const fillStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: "cover",
        ...style
      }
    : style || {};

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={fillStyle}
      loading={priority ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
