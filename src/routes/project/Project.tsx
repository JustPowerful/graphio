import { FC, LegacyRef, Ref, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icons } from "../../components/Icons";

import Graph from "../../lib/Graph";
import Input from "../../components/form/Input";

interface ProjectProps {}

const Project: FC<ProjectProps> = ({}) => {
  const { title } = useParams();
  const navigate = useNavigate();
  const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  //   useEffect(() => {}, []);
  const [toggleExit, setToggleExit] = useState(false);
  const [numberOfNodes, setNumberOfNodes] = useState(0);
  const [toggleNumberOfNodes, setToggleNumberOfNodes] = useState(true);

  useEffect(() => {
    const graph = new Graph(numberOfNodes);
    graph.visualizeGraph(ref.current!);
  }, [numberOfNodes]);

  return (
    <div className=" bg-slate-900 w-full h-screen p-5">
      {toggleNumberOfNodes && (
        <div className="z-40 fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md p-4 relative">
            {/* Input of number of nodes */}
            <Input
              label="Number of nodes"
              placeholder="Number of nodes"
              type="number"
              value={numberOfNodes.toString()}
              onChange={(event) => {
                // check if the input is a number
                const regex = /^[0-9]*$/;
                if (regex.test(event.target.value) && event.target.value) {
                  setNumberOfNodes(parseInt(event.target.value));
                }
              }}
            />
            <button
              disabled={numberOfNodes === 0}
              onClick={() => {
                setToggleNumberOfNodes((prev) => !prev);
              }}
              className={`bg-slate-900 text-white p-2 mt-1 w-full rounded-md ${
                numberOfNodes === 0 && "cursor-not-allowed bg-zinc-600"
              }`}
            >
              Create Graph
            </button>
          </div>
        </div>
      )}

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

      <div className="fixed top-5 left-5 z-40">
        <button
          onClick={() => {
            setToggleExit((prev) => !prev);
          }}
          className="bg-white hover:bg-red-500 hover:text-white px-4 py-1 rounded-md"
        >
          Exit
        </button>

        <h1 className="text-white font-semibold text-4xl">{title}</h1>
      </div>

      <div className="fixed bottom-4 right-4 bg-white p-2 rounded-md">
        <button className="w-10 h-10 flex justify-center items-center bg-slate-900 text-white rounded-md">
          <Icons.plus />
        </button>
      </div>
      <div ref={ref} className="h-screen"></div>
    </div>
  );
};

export default Project;
