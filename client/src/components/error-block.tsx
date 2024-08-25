const ErrorBlock = () => {
  return (
    <div className="lg:aspect-[6/2] aspect-video flex flex-col items-center justify-center text-center border-dashed border-destructive border rounded-md">
      <h3 className="lg:text-2xl md:text-xl text-lg font-bold text-destructive">
        Uh oh!
      </h3>
      <p className="text-base text-destructive">Something went wrong!</p>
    </div>
  );
};

export default ErrorBlock;
