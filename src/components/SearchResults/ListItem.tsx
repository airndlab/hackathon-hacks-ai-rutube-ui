import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchResult } from '@/types/SearchResult';
import ImgOrStub from '@/components/ImgOrStub';
import isEmpty from 'lodash/isEmpty';

type Props = {
  video: SearchResult;
}

function ListItem ({ video }: Props) {
  const [thumbnail, setThumbnail] = useState<string | undefined>(video.img);

  useEffect(() => {
    setThumbnail(video.img);
  }, [video.img]);

  useEffect(() => {
    if (!isEmpty(video.id)) {
      axios.get(`https://rutube.ru/pangolin/api/web/video/${video.id}`).then((response) => {
        const videoInfo = response?.data?.result?.video;
        if (!isEmpty(videoInfo?.thumbnail_url)) {
          setThumbnail(videoInfo?.thumbnail_url);
        }
      });
    }
  }, [video.id]);

  return (
    <a
      href={video.link ?? ''}
      target="_blank"
      className="h-full flex flex-row rounded-xl gap-4 p-0 w-full items-start justify-between"
    >
      <ImgOrStub
        imgSrc={thumbnail}
        alt={video.title}
        className="w-1/2 h-auto aspect-video"
      />
      <div className="w-1/2 text-left h-full flex flex-col relative">
        <p className="font-medium break-all text-sm md:text-lg line-clamp-1 sm:line-clamp-2 md:line-clamp-3
                text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-sky-500"
        >
          {video.title}
        </p>
        <p className="break-words text-sm md:text-md text-gray-400 dark:text-white">
          {video.viewCountText ?? ''}{video.publishedDateText ? ` • ${video.publishedDateText}` : ''}
        </p>
        {!isEmpty(video.lengthText) &&
          <p
            className="text-xs text-white absolute bottom-[35px] -left-[75px] bg-gray-900/80 rounded-xl px-2 py-1">
            {video.lengthText}
          </p>
        }
      </div>
    </a>
  );
}

export default ListItem;
