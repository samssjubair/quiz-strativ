"use client"
// pages/admin.tsx

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { IQuestion } from "@/interfaces/global.interface";

const AdminPage = () => {
  const [questions, setQuestions] = useLocalStorage<IQuestion[]>(
    "adminQuestions",
    []
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState<string | null>(null);
  const [editQuestionText, setEditQuestionText] = useState("");


  useEffect(() => {
    setIsClient(true); 
  }, []);

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      const updatedQuestions: Question[] = [
        ...questions,
        { qid: Date.now().toString(), qname: newQuestion },
      ];
      setQuestions(updatedQuestions);
      setNewQuestion("");
    }
  };

  const deleteQuestion = (qid: string) => {
    const updatedQuestions: IQuestion[] = questions.filter(
      (question) => question.qid !== qid
    );
    setQuestions(updatedQuestions);
  };

  const editQuestion = (qid: string) => {
    const questionToEdit = questions.find((question) => question.qid === qid);
    if (questionToEdit) {
      setEditQuestionId(qid);
      setEditQuestionText(questionToEdit.qname);
    }
  };

  const saveEditedQuestion = () => {
    const updatedQuestions: IQuestion[] = questions.map((question) => {
      if (question.qid === editQuestionId) {
        return { ...question, qname: editQuestionText };
      }
      return question;
    });
    setQuestions(updatedQuestions);
    setEditQuestionId(null);
    setEditQuestionText("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter your question"
          className="border border-gray-400 p-2 mr-2"
        />
        <button
          onClick={addQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Question
        </button>
      </div>
      <div>
        {isClient &&
          questions.map((question: any) => (
            <div key={question.qid} className="mb-4">
              {editQuestionId === question.qid ? (
                <>
                  <input
                    type="text"
                    value={editQuestionText}
                    onChange={(e) => setEditQuestionText(e.target.value)}
                    className="border border-gray-400 p-2 mr-2"
                  />
                  <button
                    onClick={saveEditedQuestion}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{question.qname}</span>
                  <button
                    onClick={() => deleteQuestion(question.qid)}
                    className="ml-2"
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    onClick={() => editQuestion(question.qid)}
                    className="ml-2"
                  >
                    <RiEdit2Line />
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPage;
