"use client"
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAnswer, IQuestion } from "@/interfaces/global.interface";
import { QuestionList } from "@/components/AdminPage/QuestionList";
import { QuestionForm } from "@/components/AdminPage/QuestionForm";
import { showToast } from "@/utils/showToast";


const AdminPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // State to track if component is rendered on the client
  const [questions, setQuestions] = useLocalStorage<IQuestion[]>(
    "adminQuestions",
    []
  );

  const [answers, setAnswers] = useLocalStorage<IAnswer[]>("userAnswers", []);
  
  useEffect(() => {
    setIsClient(true); // Set isClient to true when component is mounted
  }, []); // Empty dependency array to ensure this effect runs only once

  const deleteQuestion = (qid: string) => {
    showToast("Question deleted", "success");
    const updatedQuestions = questions.filter(
      (question) => question.qid !== qid
    );
    setQuestions(updatedQuestions);
  };

  const editQuestion = (qid: string, newQuestionText: string) => {
    const updatedQuestions = questions.map((question) => {
      if (question.qid === qid) {
        return { ...question, qname: newQuestionText };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  if (!isClient) return null; // If not rendered on client, return null to avoid rendering on server

  return (
    <div className="p-4">
      <h1 className="text-xl text-center text-white uppercase  font-bold mt-6 mb-8">Admin Panel</h1>
      <div className="w-full md:w-1/2 mx-auto">
        <QuestionForm
          onSubmit={(newQuestion) =>
            setQuestions([
              ...questions,
              { qid: Date.now().toString(), qname: newQuestion },
            ])
          }
        />
        <QuestionList
          questions={questions}
          answers={answers}
          onDelete={deleteQuestion}
          onEdit={editQuestion}
        />
      </div>
    </div>
  );
};

export default AdminPage;
