import { icons } from 'lucide-react';

interface IconProps {
  size?: number;
  name: string;
  color?: string;
}

const Icon = ({ name, color, size }: IconProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
