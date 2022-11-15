import sprite from './images/sprite.svg';

export interface IconProps {
  id: string;
  width?: string;
  height?: string;
  color?: string;
}

export function Icon({
  id,
  width = '20px',
  height = '20px',
  color,
}: IconProps) {
  return (
    <svg width={width} height={height}>
      <use href={sprite + id} width={width} height={height} fill={color} />
    </svg>
  );
}

export default Icon;
