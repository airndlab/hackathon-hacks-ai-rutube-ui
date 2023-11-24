import { FoundChannel } from '@/types/FoundChannel';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

type Props = {
  channels?: FoundChannel[] | undefined;
}

function FoundChannels ({ channels }: Props) {
  return isEmpty(channels)
    ? null
    : (
      <div className="w-full flex flex-col gap-y-2 border-b">
        {map(channels, (channel: FoundChannel, idx: number) => (
          <a
            key={`${idx}_${channel.title}`}
            target="_blank"
            href={channel.link}
            className="flex items-center p-2 gap-4 cursor-pointer"
          >
            <div className="w-1/2 h-full flex">
              <img
                alt={channel.title}
                src={channel.img}
                className="w-24 h-24 rounded-full m-auto"
              />
            </div>
            <div className="w-1/2">
              <p className="font-medium break-all text-sm md:text-lg line-clamp-1 sm:line-clamp-2 md:line-clamp-3
                text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-sky-500"
              >
                {channel.title}
              </p>
              <p className="break-words text-sm md:text-md text-gray-400 dark:text-white">
                {channel.canonicalBaseUrl}
              </p>
            </div>
          </a>
        ))}
      </div>
    );
}

export default FoundChannels;
