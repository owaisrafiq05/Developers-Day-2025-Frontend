/* eslint-disable @typescript-eslint/no-explicit-any */

interface LightProps
{
    color: string,
    width?: string,
    height?: string,
    className?: string,
    blurRadius: number,
    children?: any
}

const Light = (props: LightProps) => {
  return (
    <div className={`h-[${props.height}px] w-[${props.width}px] ${props.className} z-10 overflow-hidden absolute`} id="light" style={{
        backgroundColor: props.color,
        filter: `blur(${props.blurRadius}px)`,
    }}>
        {props.children}
    </div>
  );
};

const AnimatedLight = (props: LightProps) => {
    return <Light {...props} className={`${props.className} fadeIn`}/>
}

export default Light;
export {
  AnimatedLight
}