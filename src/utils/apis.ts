export async function getTourMajorRegion() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/major-region`
  );

  const data = await response.json();

  return data;
}
