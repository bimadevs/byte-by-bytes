"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export interface QuestionProps {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export function Question({ id, question, options, correctAnswer }: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    
    const correct = selectedOption === correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 my-8 shadow-md transition-all duration-300 hover:shadow-lg dark:shadow-slate-900/10 dark:hover:shadow-slate-900/20">
      <h3 className="text-xl font-bold mb-4 text-foreground">{question}</h3>

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <div 
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={cn(
              "p-4 border rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group",
              !isSubmitted && "hover:border-primary/70 hover:shadow-sm",
              selectedOption === option && !isSubmitted 
                ? "border-primary bg-primary/10 shadow-sm" 
                : !isSubmitted ? "border-border" : "",
              isSubmitted && selectedOption === option && isCorrect && "border-green-500 bg-green-50 shadow-md shadow-green-500/10 dark:bg-green-950/40 dark:shadow-green-800/10",
              isSubmitted && selectedOption === option && !isCorrect && "border-red-500 bg-red-50 shadow-md shadow-red-500/10 dark:bg-red-950/40 dark:shadow-red-800/10",
              isSubmitted && option === correctAnswer && !isCorrect && "border-green-500 bg-green-50/50 shadow-md shadow-green-500/10 dark:bg-green-950/20 dark:shadow-green-800/10"
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn(
                "transition-all duration-300",
                isSubmitted && ((selectedOption === option && isCorrect) || (option === correctAnswer)) 
                  ? "text-green-700 dark:text-green-400 font-medium" 
                  : isSubmitted && selectedOption === option && !isCorrect 
                    ? "text-red-700 dark:text-red-400 font-medium" 
                    : ""
              )}>
                {option}
              </span>
              
              {isSubmitted && (
                <div className="flex-shrink-0 transition-opacity duration-300">
                  {(selectedOption === option && isCorrect) || (option === correctAnswer) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (selectedOption === option && !isCorrect) ? (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  ) : null}
                </div>
              )}
            </div>
            
            {/* Option background effect */}
            {!isSubmitted && (
              <div className="absolute inset-0 bg-primary/5 -z-10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            )}
          </div>
        ))}
      </div>

      {isSubmitted ? (
        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-xl flex items-center space-x-3 shadow-md transition-all duration-300",
            isCorrect 
              ? "bg-green-50 text-green-700 shadow-green-500/10 dark:bg-green-950/40 dark:text-green-300 dark:shadow-green-800/10" 
              : "bg-red-50 text-red-700 shadow-red-500/10 dark:bg-red-950/40 dark:text-red-300 dark:shadow-red-800/10"
          )}>
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {isCorrect 
                  ? "Benar! Jawaban Anda tepat." 
                  : `Maaf, jawaban Anda tidak tepat.`}
              </p>
              {!isCorrect && (
                <p className="mt-1 text-sm">
                  Jawaban yang benar adalah: <span className="font-medium">{correctAnswer}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={cn(
            "px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300",
            selectedOption 
              ? "hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30" 
              : "opacity-50 cursor-not-allowed bg-primary/80"
          )}
        >
          Periksa Jawaban
        </button>
      )}
    </div>
  );
} 