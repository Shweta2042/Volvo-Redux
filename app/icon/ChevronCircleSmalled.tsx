import Image from 'next/image';
import chevronSmall from '/public/docs/chevron-small.svg';

function ChevronCircleSmall() {
    return (
    <Image src={chevronSmall} alt={''} width={10} height={10} />
  );
}

export default ChevronCircleSmall;