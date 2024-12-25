import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { control, watch } = useFormContext();

    const existingImgUrl = watch("imageUrl");

    return (
        <div className="space-y-2">
            <h2 className="font-2xl font-bold">Image</h2>
            <FormDescription>
                Upload image for your restaurant which will be displayed. Re-uploading
                the image will overwrite the previous image.
            </FormDescription>

            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImgUrl && (
                    <AspectRatio ratio={16/9}>
                        <img src={existingImgUrl} className="rounded-md object-cover h-full w-full"/>
                    </AspectRatio>
                )}
                <FormField control={control} name="imageFile" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                className="bg-white"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={(event) =>
                                    field.onChange(event.target.files ? event.target.files[0] : null)
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    )
}

export default ImageSection;