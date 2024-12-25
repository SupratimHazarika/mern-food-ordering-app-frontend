import { restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurentRequest = async (restaurantFormData: FormData) : Promise<restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })
        if (!response.ok) {
            console.log("Unable to create restaurant")
        }
        return response.json(); 
    }

    const { mutateAsync: createRestaurant, isLoading, isSuccess, isError } = useMutation(createMyRestaurentRequest);

    if (isError) {
        toast.error('Unable to create restaurant');
    }

    if (isSuccess) {
        toast.success('Restaurant created')
    }

    return {
        createRestaurant,
        isLoading
    }
}

export const useGetMyRestaurent = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async (): Promise<restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            console.log("Unable to get restaurant")
        }

        return response.json(); 
    }
    const { data: currentRestaurant, isLoading, error } = useQuery('fetchCurrentRestaurant', getRestaurantRequest);

    if(error){
        toast.error('Unable to fetch restaurant')
    }

    return {
        currentRestaurant, isLoading
    }
    
}

export const useUpdateMyRestaurant = () => {

    const { getAccessTokenSilently } = useAuth0();

    const updateMyRestaurant = async (restaurantFormData: FormData) : Promise<restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })
        if (!response.ok) {
            console.log("Unable to update restaurant")
        }
        return response.json(); 
    }

    const {mutateAsync: updateRestaurant, isLoading, isError, isSuccess} = useMutation(updateMyRestaurant);

    if(isError){
        toast.error("Unable to update the restaurant");
    }

    if(isSuccess){
        toast.success('Restaurant updated');
    }

    return {
        updateRestaurant,
        isLoading
    }
}