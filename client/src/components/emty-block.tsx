interface EmptyBlockProps {
  title: string;
  subTitle?: string;
}

const EmptyBlock = ({ title, subTitle }: EmptyBlockProps) => {
  return (
    <div className="lg:aspect-[6/2] aspect-video flex flex-col items-center justify-center text-center border-dashed border rounded-md">
      <h3 className="lg:text-xl md:text-lg text-base font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{subTitle}</p>
    </div>
  );
};

export default EmptyBlock;
