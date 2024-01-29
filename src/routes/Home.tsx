import { FC, useState } from "react";
import { exit } from "@tauri-apps/api/process";

// react router for navigation.push
import { useNavigate } from "react-router-dom";
import ProjectModal from "../components/project/ProjectModal";
import { Icons } from "../components/Icons";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const closeApplication = async () => {
    await exit(1);
  };

  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <>
      {toggleModal && (
        <ProjectModal
          onClose={() => {
            setToggleModal((prev) => !prev);
          }}
        />
      )}
      <div className="bg-slate-900 h-screen flex justify-center items-center text-white">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-6xl ">Graphio</h1>
          <p className="text-center w-4/5">
            A graph visualization tool for students by students. Graphio lets
            you create graphs and visualize them in a simple and intuitive way.
          </p>
          <div className=" px-10 py-2 flex gap-4">
            <button
              onClick={() => {
                setToggleModal((prev) => !prev);
              }}
              className="bg-white text-slate-900 py-2 px-5 rounded-md hover:bg-blue-300 flex justify-center items-center"
            >
              <Icons.plus className="w-5 h-5" /> <div>New project</div>
            </button>
            <button
              onClick={() => {
                navigate("/projects");
              }}
              className="bg-white text-slate-900 py-2 px-5 rounded-md hover:bg-blue-300 flex justify-center items-center"
            >
              <Icons.folder className="w-5 h-5" /> <div>View projects</div>
            </button>
            <button
              onClick={() => {
                closeApplication();
              }}
              className="bg-white text-slate-900 py-2 px-5 rounded-md hover:bg-red-500 hover:text-white flex items-center"
            >
              <Icons.exit className="w-5 h-5" />
              <div>Exit</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
