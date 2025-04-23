"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Question, QuestionProps } from "./Question";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";

export interface QuizProps {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  showResults?: boolean;
}

export interface QuizQuestion extends Omit<QuestionProps, "id"> {
  id: string;
}

export function Quiz({ id, title, description, questions, showResults = true }: QuizProps) {
  const { authState } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [showingResults, setShowingResults] = useState(false);
  
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCompleted = Object.keys(answers).length === questions.length;
  
  const handleAnswer = (questionId: string, answer: string | null) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      if (showResults) {
        setShowingResults(true);
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowingResults(false);
  };
  
  const calculateScore = () => {
    let correctCount = 0;
    
    for (const question of questions) {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    }
    
    return {
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };

  // Cek jika user belum login
  if (!authState.user) {
    return (
      <div className="bg-card border rounded-lg p-6 my-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-4 text-center dark:bg-yellow-900/20 dark:border-yellow-800">
          <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-300 mb-2">Login Diperlukan</h3>
          <p className="text-yellow-700 dark:text-yellow-400 mb-4">
            Silakan login terlebih dahulu untuk mengakses quiz ini dan melacak progres belajar Anda.
          </p>
          <Link href="/auth/login" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Login Sekarang
          </Link>
        </div>
        
        <div className="mt-4 border-t pt-4 text-sm text-slate-500 dark:text-slate-400">
          <p>Quiz ini berisi {questions.length} pertanyaan tentang materi yang telah dipelajari.</p>
        </div>
      </div>
    );
  }
  
  if (showingResults) {
    const { score, total, percentage } = calculateScore();
    
    return (
      <div className="bg-card border rounded-lg p-6 my-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{title} - Hasil</h2>
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        
        <div className="text-center py-8">
          <div className="text-5xl font-bold mb-2">{percentage}%</div>
          <p className="text-lg mb-4">
            Skor Anda: {score} dari {total} pertanyaan benar
          </p>
          
          <div className={cn(
            "p-4 rounded-md mb-6",
            percentage >= 80 ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : 
            percentage >= 60 ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" : 
            "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
          )}>
            {percentage >= 80 ? "Bagus sekali! Anda menguasai materi dengan baik." :
             percentage >= 60 ? "Cukup baik! Anda memahami sebagian besar materi." :
             "Perlu belajar lagi. Anda belum menguasai materi dengan baik."}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Ringkasan Jawaban:</h3>
            {questions.map((question, i) => (
              <div key={question.id} className={cn(
                "p-4 border rounded-md text-left",
                answers[question.id] === question.correctAnswer ? 
                  "border-green-500 bg-green-50/40 dark:bg-green-950/40" : 
                  "border-red-500 bg-red-50/40 dark:bg-red-950/40"
              )}>
                <p className="font-medium">{i+1}. {question.question}</p>
                <p className="mt-2">
                  Jawaban Anda: <span className={answers[question.id] === question.correctAnswer ? 
                    "text-green-600 dark:text-green-400 font-medium" : 
                    "text-red-600 dark:text-red-400 font-medium"}>
                    {answers[question.id] || "Tidak menjawab"}
                  </span>
                </p>
                {answers[question.id] !== question.correctAnswer && (
                  <p className="mt-1">
                    Jawaban benar: <span className="text-green-600 dark:text-green-400 font-medium">
                      {question.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={handleRestart}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Mulai Ulang Quiz
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-card border rounded-lg p-6 my-8 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          Pertanyaan {currentIndex + 1} dari {questions.length}
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-3 h-3 rounded-full",
                i === currentIndex ? "bg-primary" :
                answers[questions[i].id] !== undefined ? "bg-primary/50" :
                "bg-gray-200 dark:bg-gray-700"
              )}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <QuizQuestion 
          key={currentQuestion.id}
          questionId={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={answers[currentQuestion.id] || null}
          onSelectOption={(option) => handleAnswer(currentQuestion.id, option)}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={cn(
            "px-4 py-2 rounded-md",
            currentIndex === 0 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          )}
        >
          Sebelumnya
        </button>
        
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion.id] === undefined}
          className={cn(
            "px-4 py-2 bg-primary text-primary-foreground rounded-md",
            answers[currentQuestion.id] === undefined 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-primary/90"
          )}
        >
          {isLastQuestion ? (showResults ? "Lihat Hasil" : "Selesai") : "Selanjutnya"}
        </button>
      </div>
    </div>
  );
}

interface QuizQuestionProps {
  questionId: string;
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
}

function QuizQuestion({ questionId, question, options, selectedOption, onSelectOption }: QuizQuestionProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <div 
            key={option}
            onClick={() => onSelectOption(option)}
            className={cn(
              "p-4 border rounded-md cursor-pointer transition-colors",
              selectedOption === option 
                ? "border-primary bg-primary/10" 
                : "border-border hover:bg-accent"
            )}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
} 