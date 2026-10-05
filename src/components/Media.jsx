import { assetUrl, imageUrl } from "../config/media";
export default function Media({ file, width, ...props }) {
  return (
    <img
      {...props}
      width={width}
      src={imageUrl(file)}
      onError={(event) => {
        const local = new URL(assetUrl(`images/${file}`), location.href).href;
        if (event.currentTarget.src !== local) event.currentTarget.src = local;
      }}
    />
  );
}
