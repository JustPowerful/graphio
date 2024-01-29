import { FC, LegacyRef, Ref, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icons } from "../../components/Icons";

import Graph from "../../lib/Graph";

interface ProjectProps {}

const Project: FC<ProjectProps> = ({}) => {
  const { title } = useParams();
  const navigate = useNavigate();
  const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  //   useEffect(() => {}, []);
  const [toggleExit, setToggleExit] = useState(false);

  useEffect(() => {
    const graph = new Graph(8);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(7, 3);
    graph.visualizeGraph(ref.current!);
  }, []);

  return (
    <div className=" bg-slate-900 w-full h-screen p-5">
      {toggleExit && (
        <div className="z-50 fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md p-4 relative">
            <button
              onClick={() => {
                setToggleExit((prev) => !prev);
              }}
              className="absolute -top-2 -right-2 shadow-md rounded-md shadow-slate-800 bg-white p-2 hover:bg-red-600 hover:text-white"
            >
              <Icons.close className="w-5 h-5" />
            </button>
            <p className="mb-1">Are you sure you want to exit?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="bg-zinc-700 text-white p-2 rounded-md"
              >
                Exit without save
              </button>
              <button className="bg-slate-900 text-white p-2 rounded-md">
                Save & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setToggleExit((prev) => !prev);
        }}
        className="bg-white hover:bg-red-500 hover:text-white px-4 py-1 rounded-md"
      >
        Exit
      </button>

      <h1 className="text-white font-semibold text-4xl">{title}</h1>
      <div ref={ref} className="h-screen"></div>
    </div>
  );
};

export default Project;
