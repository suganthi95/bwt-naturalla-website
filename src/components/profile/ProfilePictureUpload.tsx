import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUpdateProfileImage } from "@/services/profile"; // your upload function
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import axios from "axios";

interface Props {
  dialogOpen: (val: boolean) => void;
}

interface FormData {
  profilePicture: File | null;
}

const ProfilePictureUpload = ({ dialogOpen }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const queryClinet = useQueryClient();
  const { mutate, isPending } = useUpdateProfileImage();

  const { handleSubmit, setValue } = useForm<FormData>();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile) {
      setValue("profilePicture", selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!data.profilePicture) {
      toast.warning("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.profilePicture);
    mutate(
      {
        token: token,
        formdata: formData,
      },
      {
        onSuccess: () => {
          toast.success("Profile picture updated!");
          dialogOpen(false)
          queryClinet.invalidateQueries({ queryKey: ["getprofile"] });
        },
        onError(error) {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {preview && (
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage src={preview} alt="Profile Picture" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm border rounded-lg cursor-pointer bg-gray-50"
      />

      <Button type="submit" className="w-full bg-primary text-white">
        {isPending ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};

export default ProfilePictureUpload;
