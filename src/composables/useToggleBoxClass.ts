export const useToggleBoxClass = (status: boolean): string => {
   return status === true
      ? 'border-transparent ring-2 ring-primary'
      : 'border-gray-300';
};
