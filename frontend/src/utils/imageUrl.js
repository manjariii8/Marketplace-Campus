const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

export const getImageUrl = (imageUrl) => {

  if (!imageUrl) {
    return null;
  }

  // Already a complete URL
  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  // Remove /api from backend URL
  const backendUrl = API_BASE_URL.replace(
    /\/api\/?$/,
    ""
  );

  if (imageUrl.startsWith("/")) {
    return `${backendUrl}${imageUrl}`;
  }

  return `${backendUrl}/${imageUrl}`;
};