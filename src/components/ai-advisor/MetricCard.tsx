import Image from "next/image";

const MetricCard = ({
  title,
  count,
  image,
}: {
  title: string;
  count: number;
  image: string;
}) => {
  return (
    <div className="bg-white flex flex-col gap-y-2 rounded-lg p-3">
      <div className="flex gap-x-4 items-center">
        <div>
            {title}
        </div>
        <div>
            <Image src={image} width={30} height={30} alt="icon" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default MetricCard;
