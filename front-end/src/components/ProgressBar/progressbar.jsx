


export default function ProgressBar() { 
    const getStepColor = step => {
        switch (step) {
          case 1:
            return 'bg-slate-500/90';
          case 2:
            return 'bg-gray-200';
          case 3:
            return 'bg-orange-600';
          case 4:
            return 'bg-green-600';
          default:
            return 'bg-slate-500';
        }
      };

      const step = parseInt(4, 10);
      const stepColor = getStepColor(step);
    

  return (
    <div className='w-full flex flex-col justify-center items-center'>
    <div className=" bg-gray-300 w-96 rounded-full h-2.5 dark:bg-gray-700">
      <div className={`h-2.5 rounded-full progress-bar ${stepColor}`} style={{ width: `${(step / 4) * 100 - 15}%` }}></div>
    </div>
    <div className="w-[90%] flex justify-between items-center text-center mt-2">
      <span >General</span>
      <span >Outline</span>
      <span >Other</span>
      <span >Done</span>
    </div>
  </div>
  );
}
