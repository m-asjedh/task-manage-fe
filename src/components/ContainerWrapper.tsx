interface ContainerWrapperProps {
  children: React.ReactNode;
}

export const ContainerWrapper = ({ children }: ContainerWrapperProps) => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl  px-2.5 md:px-20">
      {children}
    </div>
  );
};
