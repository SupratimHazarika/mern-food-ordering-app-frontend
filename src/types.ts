export type User = {
    _id: string,
    email: string,
    name: string,
    addressLine1: string,
    city: string,
    country: string,
}

export type MenuItems = {
    _id: string,
    name: string,
    price: number,
}

export type restaurant = {
    _id: string,
    user: string,
    restaurantName: string,
    city: string,
    country: string,
    deliveryPrice: number,
    cuisins: string[],
    menuItems: MenuItems[],
    imageUrl: string,
    lastUpdated: string,
}