export const loadUserFavoritesFromLocalStorage = (): any => {
  // try {
  const favJson: any = localStorage.getItem("favorites");
  if (favJson) {
    return JSON.parse(favJson);
  } else {
    return [];
  }
  // } catch (error) {
  //   console.log(error);
  // }
};
