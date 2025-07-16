import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { div } from "framer-motion/client";
import { CreateUserNoteApi, EditUserNoteApi } from "../services/allApis";

const Dialog = ({
  isOpen,
  onClose,
  currentNote,
  isCreateClicked,
  setIsCreateClicked,
  setIsnoteUpdated
}) => {
  const [isEditing, setIsEditing] = useState(false);
  //   const [headerText, setHeaderText] = useState("");
  //   const [contentText, setContentText] = useState("");
  const [updatedNote, setUpdatedNote] = useState({
    noteid: "",
    title: "",
    content: "",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");
  const [currentTagInput, setCurrentTagInput] = useState("");

  console.log(currentNote);

  const getTokenHeader = () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return reqHeader;
  };
  const inputTagHandle = (e) => {
    setNewTag(e.target.value);
    setCurrentTagInput(e.target.value);
  };
  const addTag = () => {
    let ntags = updatedNote.tags;
    ntags.push(newTag);
    setUpdatedNote({ ...updatedNote, tags: ntags });
    setCurrentTagInput("");
  };

  const handleDeleteTag = (tag, tagArray) => {
    const filteredTagArray = tagArray.filter((x) => x != tag);
    setUpdatedNote({ ...updatedNote, tags: filteredTagArray });
  };
  const handleEdit = () => {
    const { _id, title, content, tags } = currentNote;
    setNewTag(tags);
    setUpdatedNote({ noteid: _id, title, content, tags });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedNote({ noteid: "", title: "", content: "", tags: [] });
    setIsCreateClicked(false)
    onClose();
  };

  const handleSave = async () => {
    const reqHeader = getTokenHeader();
    const reqBody = updatedNote;
    if (!isCreateClicked) {
        console.log("Inside save",reqBody)
      const result = await EditUserNoteApi(reqBody, reqHeader);
      if (result.status == 200) {
        setUpdatedNote({ noteid: "", title: "", content: "", tags: [] });
        setIsnoteUpdated(result.data);
        alert("Note Successfully updated");
      }
      setIsEditing(false);
      onClose();
    } else {
      
      if(!updatedNote.title) {
          alert("Please enter the title")
        }
        else if(!updatedNote.content){
           alert("Please enter the content")
        }
        else{
        const body = {title:updatedNote.title,content:updatedNote.content,tags:updatedNote.tags}
        const result = await CreateUserNoteApi(body,reqHeader)
        if(result.status==200){
            setIsnoteUpdated(result.data);
            alert("Note sucessfully created")
        }
        else{
            alert("Failed To create note")
        }
        setUpdatedNote({ noteid: "", title: "", content: "", tags: [] });
      console.log(reqBody);
      setIsCreateClicked(false)
       onClose();
        }
    
     
    }
  };

  useEffect(() => {
    console.log(isCreateClicked);
    if (isCreateClicked) {
      console.log("Inside Useeffect");
      setIsEditing(true);
    }
  }, [isCreateClicked]);

  return (
    <>
      {!isCreateClicked ? (
        <AnimatePresence>
            {console.log()}
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 w-96 max-w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    className="text-xl font-bold w-full mb-4 border border-gray-300 p-2 rounded"
                    value={
                      updatedNote.title.length > 0
                        ? updatedNote.title
                        : currentNote?.title
                    }
                    onChange={(e) =>
                      setUpdatedNote({ ...updatedNote, title: e.target.value })
                    }
                    placeholder={"Enter Title"}
                  />
                ) : (
                  <h2 className="text-xl font-bold mb-4">
                    {currentNote.title}
                  </h2>
                )}
                {/* {console.log(contentText)} */}
                {isEditing ? (
                  <textarea
                    className="w-full h-24 border border-gray-300 p-2 rounded mb-4"
                    value={
                      updatedNote.content.length > 0
                        ? updatedNote.content
                        : currentNote.content
                    }
                    onChange={(e) =>
                      setUpdatedNote({
                        ...updatedNote,
                        content: e.target.value,
                      })
                    }
                    placeholder={"Content Here"}
                  />
                ) : (
                  <p className="mb-4 text-gray-700">{currentNote.content}</p>
                )}

                {isEditing ? (
                  <>
                    <div className="flex flex-wrap gap-2 ">
                      {updatedNote.tags.length > 0
                        ? updatedNote.tags.map((tag) => (
                            <div className="rounded px-2 py-1 border-1 border-black dark:border-white w-auto">
                              {tag}{" "}
                              <i
                                className="fa-solid fa-xmark"
                                onClick={() =>
                                  handleDeleteTag(tag, updatedNote.tags)
                                }
                              ></i>
                            </div>
                          ))
                        : currentNote.tags.map((tag) => (
                            <div className="rounded px-2 py-1 border-1 border-black dark:border-white w-auto text-xs">
                              {tag}{" "}
                              <i
                                className="fa-solid fa-xmark"
                                onClick={(tag) => handleDeleteTag(tag)}
                              ></i>
                            </div>
                          ))}
                    </div>
                    <div className="flex space-between gap-3 mt-3">
                      <input
                        type="text"
                        className="border-1 border-black rounded-sm p-3 w-[50%] flex-grow"
                        placeholder="Add tag"
                        value={currentTagInput}
                        onChange={(e) => inputTagHandle(e)}
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 w-[25%] rounded hover:bg-blue-600 "
                        onClick={addTag}
                      >
                        Add
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {currentNote.tags.map((tag) => (
                      <div className="rounded px-2 py-1 border-1 border-black dark:border-white w-auto text-xs">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-4 mt-4">
                  {console.log(updatedNote)}
                  {!isEditing && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  )}
                  {isEditing && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 w-96 max-w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {isEditing && (
                  <input
                    type="text"
                    className="text-xl font-bold w-full mb-4 border border-gray-300 p-2 rounded"
                    value={updatedNote.title}
                    onChange={(e) =>
                      setUpdatedNote({ ...updatedNote, title: e.target.value })
                    }
                    placeholder={"Enter Title"}
                  />
                ) 
                }
                {/* {console.log(contentText)} */}
                {isEditing && (
                  <textarea
                    className="w-full h-24 border border-gray-300 p-2 rounded mb-4"
                    value={updatedNote.content}
                    onChange={(e) =>
                      setUpdatedNote({
                        ...updatedNote,
                        content: e.target.value,
                      })
                    }
                    placeholder={"Content Here"}
                  />
                ) }

                {isEditing && (
                  <>
                    <div className="flex flex-wrap gap-2 ">
                      {updatedNote.tags.map((tag) => (
                        <div className="rounded px-2 py-1 border-1 border-black dark:border-white w-auto">
                          {tag}{" "}
                          <i
                            className="fa-solid fa-xmark"
                            onClick={() =>
                              handleDeleteTag(tag, updatedNote.tags)
                            }
                          ></i>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-between gap-3 mt-3">
                      <input
                        type="text"
                        className="border-1 border-black rounded-sm p-3 w-[50%] flex-grow"
                        placeholder="Add tag"
                        value={currentTagInput}
                        onChange={(e) => inputTagHandle(e)}
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 w-[25%] rounded hover:bg-blue-600 "
                        onClick={addTag}
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-4 mt-4">
                  {console.log(updatedNote)}
                  {/* {!isEditing && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  )} */}
                  {isEditing && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
export default Dialog;
