export const makeImageData = (count: number = 120, size: number = 200) => {
  const items: { id: number; url: string }[] = [];
  for (let i = 1; i <= count; i++) {
    items.push({ id: i, url: `https://picsum.photos/id/${i}/${size}` });
  }
  return items;
};

export const urlForSize = (id: number, size: number) =>
  `https://picsum.photos/id/${id}/${size}`;