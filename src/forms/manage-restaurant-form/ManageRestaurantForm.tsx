import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSections";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }),
    city: z.string({
        required_error: "City name is required"
    }),
    country: z.string({
        required_error: "Country name is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number"
    }),
    estimatedDeliverTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number"
    }),
    cuisins: z.array(z.string()).nonempty({
        message: "Please select atleast one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(0, "name is required"),
        price: z.coerce.number().min(1, "price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required"}).optional(),
}).refine((data) => data.imageUrl || data.imageFile ,{
    message: "Either image URL or image file ust be provided",
    path: ['imageFile']
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    currentRestaurant?: restaurant
}

const ManageRestaurantForm = ({onSave, isLoading, currentRestaurant} : Props) => {

    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentRestaurant
    })

    useEffect(() => {
        if(!currentRestaurant){
            return;
        }
        const deliveryPriceFomatted = parseInt((currentRestaurant.deliveryPrice / 100).toFixed(2));
        const menuItemsFormatted = currentRestaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }))

        const updatedRestaurant = {
            ...currentRestaurant,
            deliveryPrice: deliveryPriceFomatted,
            menuItems: menuItemsFormatted,
        }

        form.reset(updatedRestaurant);
    },[currentRestaurant, form])

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);

        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100 ).toString());
        formData.append("estimatedDeliverTime", formDataJson.estimatedDeliverTime.toString());
        formDataJson.cuisins.map((cuisine, index) => {
            formData.append(`cuisins[${index}]`, cuisine)
        })
        formDataJson.menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name);
            formData.append(`menuItems[${index}][price]`, (item.price * 100).toString())
        })

        if(formDataJson.imageFile){
            formData.append("imageFile", formDataJson.imageFile);
        }

        onSave(formData);
    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm;