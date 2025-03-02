import { ReactNode } from "react";

interface GradientTagProps {
  gradientEndColor: string;
  show: boolean;
  gradientStartColor: string;
  children: ReactNode;
}
export function GradientTag(props: GradientTagProps) {
  return (
    <div
      className={`${props.gradientEndColor}  ${props.gradientStartColor} ${
        props.show ? "opacity-100" : "opacity-0"
      } w-3/4 rounded-full p-1 bg-gradient-to-l  mt-40 text-white font-bold text-center justify-center content-center text-[0.75rem] md:text-sm lg:text-lg`}
    >
      {props.children}
    </div>
  );
}
export default GradientTag;
