import {CSSProperties, useEffect, useState} from 'react';
import {useRouter} from 'next/router';

const LOADER_THRESHOLD: number = 250;
const SPINNER_BLOCKS_SIZE: number = 42;
const style: CSSProperties | undefined = {
  shapeRendering: 'auto',
};
const ANIMATE_COLORS_VALUE: string = 'rgb(55,48,163);rgb(156,113,165);rgb(105,68,123)';

function NavigationBackdrop() {
  const [isPageLoading, setPageLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const start = () => {
      timer = setTimeout(() => setPageLoading(true), LOADER_THRESHOLD);
    };

    const end = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router.events]);

  return (
    <div
      className={`w-full pointer-events-all h-full absolute z-50 shadow-xl bg-slate-500/30 ${
        isPageLoading ? 'flex' : 'hidden'
      }`}
    >
      <svg
        width={`${SPINNER_BLOCKS_SIZE}px`}
        height={`${SPINNER_BLOCKS_SIZE}px`}
        viewBox={`0 0 ${SPINNER_BLOCKS_SIZE / 2} ${SPINNER_BLOCKS_SIZE / 2}`}
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
        className="bg-default m-auto block"
        style={style}
      >
        <rect
          x={`${SPINNER_BLOCKS_SIZE / 10 - 1}`}
          y={`${SPINNER_BLOCKS_SIZE / 10 - 1}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0s" calcMode="discrete" />
        </rect>
        <rect
          x={`${SPINNER_BLOCKS_SIZE / 5}`}
          y={`${SPINNER_BLOCKS_SIZE / 10 - 1}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.125s" calcMode="discrete" />
        </rect>
        <rect
          x={`${(SPINNER_BLOCKS_SIZE / 10) * 3 + 1}`}
          y={`${SPINNER_BLOCKS_SIZE / 10 - 1}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.25s" calcMode="discrete" />
        </rect>
        <rect
          x={`${SPINNER_BLOCKS_SIZE / 10 - 1}`}
          y={`${SPINNER_BLOCKS_SIZE / 5}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.875s" calcMode="discrete" />
        </rect>
        <rect
          x={`${(SPINNER_BLOCKS_SIZE / 10) * 3 + 1}`}
          y={`${SPINNER_BLOCKS_SIZE / 5}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.375s" calcMode="discrete" />
        </rect>
        <rect
          x={`${SPINNER_BLOCKS_SIZE / 10 - 1}`}
          y={`${(SPINNER_BLOCKS_SIZE / 10) * 3 + 1}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.75s" calcMode="discrete" />
        </rect>
        <rect
          x={`${SPINNER_BLOCKS_SIZE / 5}`}
          y={`${(SPINNER_BLOCKS_SIZE / 10) * 3 + 1}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.625s" calcMode="discrete" />
        </rect>
        <rect
          x={`${(SPINNER_BLOCKS_SIZE / 10) * 3 + 1}`}
          y={`${(SPINNER_BLOCKS_SIZE / 10) * 3 + 1}`}
          width={`${SPINNER_BLOCKS_SIZE / 10}`}
          height={`${SPINNER_BLOCKS_SIZE / 10}`}
          fill="var(--color-primary-light)"
        >
          <animate attributeName="fill"
                   values={ANIMATE_COLORS_VALUE}
                   keyTimes="0;0.125;1" dur="1s"
                   repeatCount="indefinite" begin="0.5s" calcMode="discrete" />
        </rect>
      </svg>
    </div>
  );
}

export default NavigationBackdrop;
