import { Progress } from 'antd';

import { StyledProgressBar } from './styles';

/* eslint-disable-next-line */
export interface ProgressBarProps {
  percent: number;
  strokeColor?: string;
  trailColor?: string;
}

export function ProgressBar({
  percent,
  strokeColor,
  trailColor,
}: ProgressBarProps) {
  return (
    <StyledProgressBar>
      <Progress
        strokeLinecap="butt"
        percent={percent}
        showInfo={false}
        strokeColor={strokeColor}
        trailColor={trailColor}
      />
    </StyledProgressBar>
  );
}

export default ProgressBar;
