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
    getValues,
  } = useForm<Channel>();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const body = {
        name: getValues("name"),
        clientsCount: getValues("clientsCount"),
      };

      return handleApi<Channel>(
        `${import.meta.env.VITE_API_URL}/channels`,
        "POST",
        body
      );
    },
    onError: (error) => {
      errorToast(error.message);
    },
    onSuccess: (data) => {
      refetchChannels();
      successToast(data.message);
      reset();
    },
  });

  const onSubmit: SubmitHandler<Channel> = async () => {
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="order-1 flex flex-col justify-center gap-2 my-4 max-w-80 mx-auto"
    >
      <label className="input input-bordered flex items-center gap-2">
        Name:
        <input
          {...register("name", {
            required: true,
            maxLength: 30,
            setValueAs: (v) => v.trim(),
          })}
          name="name"
          type="text"
          className="grow"
          placeholder="e.g. Channel 1"
        />
      </label>
      {errors.name?.type === "required" && (
        <span className="text-error text-sm">Name field is required</span>
      )}
      {errors.name?.type === "maxLength" && (
        <span className="text-error text-sm">
          Name field must be less than 30 characters
        </span>
      )}
      <label className="input input-bordered flex items-center gap-2">
        Clients count:
        <input
          {...register("clientsCount", {
            required: true,
            valueAsNumber: true,
            min: 0,
          })}
          type="number"
          name="clientsCount"
          className="grow"
          placeholder="e.g. 5"
        />
      </label>
      {errors.clientsCount?.type === "required" && (
        <span className="text-error text-sm">
          Clients count field is required
        </span>
      )}
      {errors.clientsCount?.type === "min" && (
        <span className="text-error text-sm">
          Clients count field must be greater or equal 0
        </span>
      )}
      <input
        disabled={isPending}
        type="submit"
        className="btn btn-primary"
        value="Add New Channel"
      ></input>
    </form>
  );
};

export default AddChanelForm;
