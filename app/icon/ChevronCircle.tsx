import Image from 'next/image';
import chevronCircled from '/public/docs/chevron-circled.svg';

interface ChevronCircleProps {
    className: string;
}

function ChevronCircle({ className }: ChevronCircleProps) {
    return (
    <Image src={chevronCircled} alt={''} width={50} height={50} className={className} />
  );
}

export default ChevronCircle;