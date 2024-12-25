import { useCreateMyRestaurant, useGetMyRestaurent, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useEffect } from "react";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { currentRestaurant, isLoading: isGetRestaurentLoading } = useGetMyRestaurent();
    const { updateRestaurant, isLoading: isUpdateRestaurantLoading } = useUpdateMyRestaurant();

    useEffect(() => {
        console.log(currentRestaurant, 'currentRestaurant');
    }, [])

    if (isGetRestaurentLoading) {
        return (
            <div>...Loading</div>
        )
    }

    const isEditing = !!currentRestaurant;

    return (
        <ManageRestaurantForm
            currentRestaurant={currentRestaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateRestaurantLoading}  
        />
    )
}

export default ManageRestaurantPage;