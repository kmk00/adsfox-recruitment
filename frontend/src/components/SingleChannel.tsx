import { useState } from "react";
import { useForm } from "react-hook-form";

const SingleChannel = ({ name, clientsCount, id }: ChannelInfo) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<Channel>();

  const saveEditedChannel = () => {
    setIsEditing(false);
  };

  const deleteChannel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            type="text"
            defaultValue={name}
            {...register("name", { required: true, maxLength: 30 })}
            className="input text-center input-bordered w-full max-w-xs"
          />
          {errors.name && (
            <span className="text-sm text-error">Name field is required</span>
          )}
        </td>
        <td>
          <input
            type="number"
            defaultValue={clientsCount}
            {...register("clientsCount", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
            className="input text-center input-bordered w-full max-w-xs"
          />
          {errors.clientsCount && (
            <span className="text-error text-sm">
              Clients count field is required and must be greater or equal 0
            </span>
          )}
        </td>
        <td>
          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={saveEditedChannel}
              className="btn btn-xs btn-success text-white"
            >
              save
            </button>
            <button
              onClick={deleteChannel}
              className="btn btn-xs btn-error text-white"
            >
              delete
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{clientsCount}</td>
      <td>
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-xs btn-secondary"
        >
          edit
        </button>
      </td>
    </tr>
  );
};

export default SingleChannel;
