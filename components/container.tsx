interface IPageContainerProps {
  children: React.ReactNode
}

const PageContainer = ({children}: IPageContainerProps) => {
  return (
    <div className='w-screen flex h-4/5 flex-col items-center justify-between px-24 py-8'>
      {children}
    </div>
  )
}

export default PageContainer;
