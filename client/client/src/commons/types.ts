export interface IUserRegister {
  displayName: string;
  username: string;
  password: string;
}

export interface IResponse {
  status?: number;
  success?: boolean;
  message?: string;
  data?: object
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface Authorities {
  authority: string;
}

export interface AuthenticatedUser {
  displayName: string;
  username: string;
  authorities: Authorities[];
}

export interface AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  urlImagem: string;
  category: ICategory;
}

export interface FilterOption {
  label: string;
  count: number;
  checked: boolean;
}

export interface FilterGroup {
  id: string;
  title: string;
  open: boolean;
  options: FilterOption[];
}

export interface FilterSidebarProps {
  filters: FilterGroup[];
  onFilterChange: (groupId: string, optionLabel: string) => void;
  onToggleGroup: (groupId: string) => void;
  categories: ICategory[];
  selectedCategory: string;
  onCategoryChange: (categoryName: string) => void;
}

export interface ListingProductCardProps {
  product: IProduct;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  items: ICartItem[];
  total: number;
}

export interface IOrderResponse {
  success: boolean;
  message: string;
  data?: IOrder;
}
