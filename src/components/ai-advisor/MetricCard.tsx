import Image from "next/image";

const MetricCard = ({
  title,
  count,
  image,
}: {
  title: string;
  count: number | string;
  image: string;
}) => {
  return (
    <div className="bg-white flex flex-col gap-y-2 rounded-lg p-3">
      <div className="flex gap-x-4 items-center">
        <div className="">
            {title}
        </div>
        <div>
            <Image src={image} width={30} height={30} alt="icon" />
        </div>
      </div>
      <div>
        <p className="text-xl font-medium">{count}</p>
      </div>
    </div>
  );
};

export default MetricCard;
