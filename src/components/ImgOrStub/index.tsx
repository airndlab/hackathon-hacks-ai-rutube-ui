import isEmpty from 'lodash/isEmpty';
import Avatar from 'react-avatar';

type Props = {
  alt: string;
  imgSrc?: string | undefined;
  className?: string;
}

function ImgOrStub ({ alt, imgSrc, className }: Props) {
  return isEmpty(imgSrc)
    ? (
      <div className={`flex items-center justify-around ${className ?? ''}`}>
        <Avatar
          name={alt ?? '▶'}
          maxInitials={2}
          size="100%"
        />
      </div>
    )
    : (
      <img
        alt={alt}
        src={imgSrc}
        className={className}
      />
    );
}

export default ImgOrStub;
