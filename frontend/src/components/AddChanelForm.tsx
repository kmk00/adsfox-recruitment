import { useForm, SubmitHandler } from "react-hook-form";

interface Props {}

const AddChanelForm = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Channel>();

  const onSubmit: SubmitHandler<Channel> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 my-4 max-w-80 mx-auto"
    >
      <label className="input input-bordered flex items-center gap-2">
        Name:
        <input
          {...register("name", { required: true, maxLength: 30 })}
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
      <input type="submit" className="btn btn-primary"></input>
    </form>
  );
};

export default AddChanelForm;
