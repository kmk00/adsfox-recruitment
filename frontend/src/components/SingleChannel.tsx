import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  refetchChannels: () => void;
  id: number;
  name: string;
  clientsCount: number;
}

type Inputs = {
  newName: string;
  newClientsCount: number;
};

const SingleChannel = ({ refetchChannels, id, name, clientsCount }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Inputs>();

  const updateMutation = useMutation({
    mutationFn: async (channel: Inputs) => {
      const response = await fetch(`http://127.0.0.1:8000/api/channels/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: channel.newName,
          clientsCount: channel.newClientsCount,
        }),
      });
      const data: Channel = await response.json();
      return data;
    },
    onSuccess: () => {
      refetchChannels();
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/channels/${id}`, {
        method: "DELETE",
      });
      const data: Channel = await response.json();
      return data;
    },
    onSuccess: () => {
      refetchChannels();
    },
  });

  const handleSaveEditedChannel = () => {
    updateMutation.mutate({
      newName: getValues("newName"),
      newClientsCount: getValues("newClientsCount"),
    });
  };

  const handleDeleteChannel = () => {
    deleteMutation.mutate();
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            type="text"
            defaultValue={name}
            {...register("newName", { required: true, maxLength: 30 })}
            className="input text-center input-bordered w-full max-w-xs"
          />
          {errors.newName && (
            <span className="text-sm text-error">Name field is required</span>
          )}
        </td>
        <td>
          <input
            type="number"
            defaultValue={clientsCount}
            {...register("newClientsCount", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
            className="input text-center input-bordered w-full max-w-xs"
          />
          {errors.newClientsCount && (
            <span className="text-error text-sm">
              Clients count field is required and must be greater or equal 0
            </span>
          )}
        </td>
        <td>
          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={handleSaveEditedChannel}
              className="btn btn-xs btn-success text-white"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn btn-xs btn-error text-white"
            >
              Cancel
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
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-xs btn-secondary"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteChannel}
            className="btn btn-xs btn-error text-white"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SingleChannel;
