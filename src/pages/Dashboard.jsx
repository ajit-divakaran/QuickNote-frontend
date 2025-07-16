import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import CheckDialog from "../components/CheckDialog";
import { DeleteUserNoteApi, GetUserNotesApi } from "../services/allApis";
// import { div } from "framer-motion/client";

const Dashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [userNotes, setUserNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState();
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [isnoteUpdated, setIsnoteUpdated] = useState();
  const [delnoteId, setDelnoteId] = useState("");
  const navigate = useNavigate();

  const getTokenHeader = () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return reqHeader;
  };
  const getUserNotes = async () => {
    const reqHeader = getTokenHeader();
    const result = await GetUserNotesApi(reqHeader);
    if (result.status == 200) {
      console.log(result.data);
      setUserNotes(result.data);
    } else {
      alert("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const reqHeader = getTokenHeader();
    const result = await DeleteUserNoteApi(delnoteId, reqHeader);
    console.log("Note deleted");
    if (result.status == 200) {
      setIsnoteUpdated(result.data);
    } else {
      alert("Failed to delete note");
    }

    setDeleteDialogOpen(false);
  };

  const handleViewNote = (note) => {
    // const clicknote = userNotes.filter(x=>x._id==noteId)
    // console.log(clicknote)
    console.log(note);
    setCurrentNote(note);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setDialogOpen(true);
    setIsCreateClicked(true);
  };

  const storeDeleteNoteId = (noteId) => {
    setDeleteDialogOpen(true);
    setDelnoteId(noteId);
  };
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/error");
    } else {
      setName(JSON.parse(sessionStorage.getItem("existingUser")).username);
      getUserNotes();
      console.log("In dashboard");
    }
  }, [isnoteUpdated]);
  return (
    <div className="h-[100%] pt-[3rem] px-[1rem] pb-[3.2rem] ">
      <h1 className="text-[45px]">Welcome {name.toUpperCase()}</h1>
      <button
        className="bg-violet-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 scale-100 hover:scale-125 hover:bg-indigo-500, rounded-full py-2 px-3 fixed right-10 bottom-8"
        onClick={handleAdd}
      >
        <i className="fa-solid fa-plus mr-2"></i>Add Note
      </button>
      <div className="grid grid-cols-1 auto-rows-minmax-300px-auto sm:grid-cols-3 lg:grid-cols-4 gap-y-5 sm:gap-x-4 place-items-center mt-5">
        {userNotes?.map((x, id) => (
          // relative group
          <div
            key={id}
            className="card min-w-full min-h-full p-8 rounded-lg border-1 border-gray-600 dark:border-gray-200 "
          >
            <h1 className="font-semibold text-2xl">{x.title}</h1>
            <hr className="mt-1" />
            <p className="mt-5 ">{x.content}</p>

            <div className="flex flex-wrap gap-2 mt-[3.5rem] items-center">
              <p>tags:</p>
              {x.tags.map((tag, tid) => (
                <div
                  key={tid}
                  className="rounded-lg px-2 py-1 border-1 border-black dark:border-white w-auto text-xs text-black bg-gray-200 dark:bg-gray-600 dark:text-white"
                >
                  {tag}
                </div>
              ))}
            </div>
            {/* absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out */}

            <div className="w-full mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-blue-600"
                  onClick={() => handleViewNote(x)}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-blue-600"
                  onClick={() => storeDeleteNoteId(x._id)}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  className="  bg-green-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-green-600  "
                  onClick={() => handleViewNote(x)}
                >
                  View Note
                </button>
              </div>
            </div>

            <CheckDialog
              isDeleteOpen={deleteDialogOpen}
              onDeleteClose={() => setDeleteDialogOpen(false)}
              onDelete={handleDelete}
            />

            <Dialog
              isOpen={dialogOpen}
              onClose={() => setDialogOpen(false)}
              currentNote={currentNote}
              isCreateClicked={isCreateClicked}
              setIsCreateClicked={setIsCreateClicked}
              setIsnoteUpdated={setIsnoteUpdated}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
