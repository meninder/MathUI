import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter your answer"
          className="flex-1 glass rounded-lg px-4 py-2 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !value.trim()}
          className={cn(
            "btn-elegant flex items-center gap-2 px-4 py-2",
            (isSubmitting || !value.trim()) ?
              "opacity-50 cursor-not-allowed hover:scale-100" :
              "opacity-100 cursor-pointer hover:scale-105"
          )}
        >
          <span className="hidden sm:inline">Submit</span>
          <CheckCircle className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default AnswerInput;
