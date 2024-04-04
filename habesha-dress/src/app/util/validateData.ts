interface ProductData {
  title: string;
  description: string;
  img: string;
  price: number;
  purchasedNo: number;
  rating: number;
  availableSizes: string[];
  availableColors: string[];
  category: string[];
}

const validateProductData = (data: ProductData) => {
  let errors: any = {};

  // Validate Title, Description, and Image
  if (!data.title.trim()) {
    errors = { ...errors, title: "Title is required." };
  }

  if (!data.description.trim()) {
    errors = { ...errors, description: "Description is required." };
  }

  if (!data.img.trim()) {
    errors = { ...errors, img: "Image URL is required." };
  }

  // Validate Price, PurchasedNo, and Rating
  if (isNaN(data.price) || data.price <= 0) {
    errors = { ...errors, price: "Price must be a valid positive number." };
  }

  if (isNaN(data.rating) || data.rating < 0 || data.rating > 5) {
    errors = {
      ...errors,

      rating: "Rating must be a valid number between 0 and 5.",
    };
  }

  // Validate Available Sizes, Colors, and Categories
  // if (!Array.isArray(data.availableSizes) || data.availableSizes.length === 0) {
  //   errors = {
  //     ...errors,

  //     availableSizes: "At least one available size is required.",
  //   };
  // }

  // if (
  //   !Array.isArray(data.availableColors) ||
  //   data.availableColors.length === 0
  // ) {
  //   errors = {
  //     ...errors,

  //     availableColors: "At least one available color is required.",
  //   };
  // }

  if (!Array.isArray(data.category) || data.category.length === 0) {
    errors = {
      ...errors,

      category: "At least one category is required.",
    };
  }

  return errors;
};

export default validateProductData;
