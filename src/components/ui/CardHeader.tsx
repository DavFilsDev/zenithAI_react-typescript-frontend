interface CardHeaderProps {
  phrase: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ phrase }) => {
  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold tracking-wide">
        Zenith<span className="text-[rgb(var(--color-primary))]">AI</span>
      </h1>
      <p className="text-lg mt-1 text-gray-500 dark:text-gray-400">
        {phrase}
      </p>
    </div>
  );
};