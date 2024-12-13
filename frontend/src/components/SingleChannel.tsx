import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../utils/toasts";
import { updateData } from "../api/updateData";
import { deleteData } from "../api/deleteData";

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
    mutationFn: () =>
      updateData<Channel>(`${import.meta.env.VITE_API_URL}/channels/${id}`, {
        name: getValues("newName"),
        clientsCount: getValues("newClientsCount"),
      }),

    onSuccess: () => {
      successToast("Channel updated");
      refetchChannels();
      setIsEditing(false);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteData(`${import.meta.env.VITE_API_URL}/channels/${id}`),
    onSuccess: () => {
      successToast("Channel deleted");
      refetchChannels();
    },
    onError: () => {
      errorToast("Failed to delete channel");
    },
  });

  const handleSaveEditedChannel = () => {
    const name = getValues("newName");
    const clientsCount = getValues("newClientsCount");

    if (name.trim() === "") {
      return errorToast("Valid name field is required");
    }

    if (name.trim().length > 30) {
      return errorToast("Name field is too long (30 symbols max)");
    }

    if (clientsCount < 0) {
      return errorToast("Valid clients count field is required");
    }

    updateMutation.mutate();
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
      <tr className="hover">
        <td>
          <input
            type="text"
            defaultValue={name}
            {...register("newName", {
              required: true,
              maxLength: 30,
              setValueAs: (v) => v.trim(),
            })}
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
              disabled={updateMutation.isPending || deleteMutation.isPending}
              type="button"
              onClick={handleSaveEditedChannel}
              className="btn btn-xs btn-success text-white"
            >
              Save
            </button>
            <button
              disabled={updateMutation.isPending || deleteMutation.isPending}
              type="button"
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
    <tr className="hover">
      <td>{name}</td>
      <td>{clientsCount}</td>
      <td>
        <div className="flex gap-2 justify-center items-center">
          <button
            disabled={updateMutation.isPending || deleteMutation.isPending}
            onClick={() => setIsEditing(true)}
            className="btn btn-xs btn-secondary"
          >
            Edit
          </button>
          <button
            disabled={updateMutation.isPending || deleteMutation.isPending}
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
