import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { errorToast, successToast } from "../utils/toasts";

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

  // TODO: Mutation in separate folder
  const mutation = useMutation({
    mutationFn: async (channel: Channel) => {
      const response = await fetch("http://127.0.0.1:8000/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channel),
      });

      if (!response.ok) {
        const { error }: { error: string } = await response.json();
        throw new Error(error);
      }
      const data: Channel = await response.json();

      return data;
    },
    onError: (error) => {
      errorToast(error.message);
    },
    onSuccess: () => {
      refetchChannels();
      successToast("Channel added");
      reset();
    },
  });

  const onSubmit: SubmitHandler<Channel> = async (data) => {
    mutation.mutate(data);
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
      {errors.name && (
        <span className="text-sm text-error">Name field is required</span>
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
      {errors.clientsCount && (
        <span className="text-error text-sm">
          Clients count field is required and must be greater or equal 0
        </span>
      )}
      <input
        disabled={mutation.isPending}
        type="submit"
        className="btn btn-primary"
        value="Add New Channel"
      ></input>
    </form>
  );
};

export default AddChanelForm;
