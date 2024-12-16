import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { errorToast, successToast } from "../utils/toasts";
import { handleApi } from "../api/handleApi";

interface Props {
  refetchChannels: () => void;
}

const AddChanelForm = ({ refetchChannels }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Channel>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Channel) =>
      handleApi<Channel>(
        `${import.meta.env.VITE_API_URL}/channels`,
        "POST",
        data
      ),
    onError: (error) => {
      errorToast(error.message);
    },
    onSuccess: (data) => {
      refetchChannels();
      successToast(data.message);
      reset();
    },
  });

  const onSubmit: SubmitHandler<Channel> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:order-1 flex flex-col justify-center gap-2 my-4 max-w-80 mx-auto"
    >
      <label className="input input-bordered flex items-center gap-2">
        Name:
        <input
          {...register("name", {
            required: "Name field is required",
            maxLength: {
              value: 30,
              message: "Name field must be less than 30 characters",
            },
            setValueAs: (v) => v.trim(),
          })}
          type="text"
          className="grow"
          placeholder="e.g. Channel 1"
        />
      </label>
      {errors.name && (
        <span className="text-error text-sm">{errors.name.message}</span>
      )}

      <label className="input input-bordered flex items-center gap-2">
        Clients count:
        <input
          {...register("clientsCount", {
            required: "Clients count field is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Clients count field must be greater or equal 0",
            },
          })}
          type="number"
          className="grow"
          placeholder="e.g. 5"
        />
      </label>
      {errors.clientsCount && (
        <span className="text-error text-sm">
          {errors.clientsCount.message}
        </span>
      )}

      <input
        disabled={isPending}
        type="submit"
        className="btn btn-primary"
        value="Add New Channel"
      />
    </form>
  );
};

export default AddChanelForm;
