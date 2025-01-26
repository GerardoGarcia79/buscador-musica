// Function to update column count based on screen width
export const updateColumns = (
  setColumns: React.Dispatch<React.SetStateAction<number>>,
  setSkeletons: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 425) {
    setColumns(1);
    setSkeletons([1]);
  } // Mobile
  if (screenWidth <= 600) {
    setColumns(2);
    setSkeletons([1, 2]);
  } // Mobile large
  else if (screenWidth <= 768) {
    setColumns(4);
    setSkeletons([1, 2, 3, 4]);
  } // Tablet
  else if (screenWidth <= 1024) {
    setColumns(6);
    setSkeletons([1, 2, 3, 4, 5, 6]);
  } // Desktop
  else {
    setColumns(8);
    setSkeletons([1, 2, 3, 4, 5, 6, 7, 8]);
  } // Large Screens
};
