interface ContainerProps {
  children: any;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="grid place-items-center py-12">{children}</div>;
};

export default Container;
