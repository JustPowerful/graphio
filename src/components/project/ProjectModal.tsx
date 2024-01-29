import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../form/Input";

interface ProjectModalProps {
  onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // check if the project only contains alphanumeric characters and does not contain spaces
    // and accept underscores
    const regex = /^[a-zA-Z0-9_]*$/;
    if (title.length > 0 && !regex.test(title)) {
      setErrorMessage(
        "Project title should only contain alphanumeric characters"
      );
    } else {
      setErrorMessage("");
    }
  }, [title]);

  const handleCreateProject = () => {
    const url = `/project/${title}`;
    navigate(url, { replace: true });
  };

  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-full max-w-[400px]">
        {/* <form> */}
        <Input
          label="Project title"
          placeholder="Project title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          error={errorMessage}
        />
        <div className="flex justify-end gap-4 pt-2">
          {/* {errorMessage || !title ? (
            <button
              disabled={errorMessage.length > 0 || title.length === 0}
              className="p-2 bg-zinc-800 text-white rounded-md cursor-not-allowed"
            >
              Create
            </button>
          ) : (
            <Link
              className={`p-2  text-white rounded-md ${
                errorMessage.length > 0 || title.length === 0
                  ? "bg-zinc-600"
                  : "bg-slate-900"
              }`}
              to={`/project/${title}`}
            >
              Create
            </Link>
          )} */}
          <button
            disabled={errorMessage.length > 0 || title.length === 0}
            onClick={handleCreateProject}
            className={`p-2  text-white rounded-md ${
              errorMessage.length > 0 || title.length === 0
                ? "bg-zinc-600"
                : "bg-slate-900"
            }`}
          >
            Create
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              onClose();
            }}
            className="p-2 bg-zinc-800 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default ProjectModal;
