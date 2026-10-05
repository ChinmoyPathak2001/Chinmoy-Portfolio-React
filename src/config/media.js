// Local assets work immediately. Cloudinary is optional: configure .env.local
// and add only assets you have uploaded to your own Cloudinary account below.
export const cloudinaryPublicIds = {
  // 'hero.webp': 'portfolio/hero',
  // 'project-obys.webp': 'portfolio/project-obys',
};
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
export function imageUrl(file, width = 1440) {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
  const publicId = cloudinaryPublicIds[file];
  if (!cloud || !publicId) return assetUrl(`images/${file}`);
  const id = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${encodeURIComponent(cloud)}/image/upload/f_auto,q_auto,w_${width},c_limit/${id}`;
}
