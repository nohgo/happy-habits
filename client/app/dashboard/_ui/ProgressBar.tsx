interface IProgressBar {
  percentFilled: number;
  progressText: string;
  onClick: Function;
}

export default function ProgressBar({
  percentFilled,
  progressText,
  onClick,
}: IProgressBar) {
  const progressBarStyle = {
    width: `${percentFilled * 100}%`,
  };

  const onPress = () => {
    onClick().then(location.reload());
  };
  return percentFilled >= 1 ? (
    <button
      className="h-12 rounded-2xl border border-accent-border bg-accent-main text-2xl transition hover:brightness-90"
      onClick={onPress}
    >
      Increment
    </button>
  ) : (
    <div className="relative h-12 overflow-hidden rounded-2xl border border-grayscale-500 bg-grayscale-300">
      <div className="absolute left-0 right-0 top-1/4 mx-auto w-fit">
        {progressText}
      </div>
      <div
        className="h-full rounded-r-2xl bg-accent-main outline-accent-border"
        style={progressBarStyle}
      ></div>
    </div>
  );
}
