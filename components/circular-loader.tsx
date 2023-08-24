import CircularProgress from '@mui/material/CircularProgress';

const CircularLoader = () => {
  return (
    <div className="flex flex-col items-center">
      <CircularProgress className="mb-4" />
      <p>loading ...</p>
    </div>
  );
};

export default CircularLoader;
