/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCaseStudy } from '../store/caseStudies';
import { getTableData } from '../serverActions/GetTableData';
import toast from 'react-hot-toast';

// Create the context
interface ConnectDbContextProps {
  setInvalidateCaseStudies: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectDbContext = createContext<ConnectDbContextProps | undefined>(
  undefined
);

// ConnectDb as a provider for invalidation
const ConnectDb = ({ children }: { children: ReactNode }) => {
  // Invalidation states for each store slice
  const [invalidateCaseStudies, setInvalidateCaseStudies] = useState(true);
  // Store actions
  const setCaseStudies = useCaseStudy((state) => state.setCaseStudies);

  useEffect(() => {
    if (invalidateCaseStudies) {
      const fetchCaseStudies = async () => {
        try {
          const caseStudies = await getTableData('case_studies');
          setCaseStudies(caseStudies || []);
          setInvalidateCaseStudies(false); // Reset invalidate state
        } catch (error: any) {
          toast.error(error.message);
        }
      };
      fetchCaseStudies();
    }
  }, [invalidateCaseStudies, setCaseStudies]);

  // Optionally provide the invalidate functions to children
  const contextValue = {
    setInvalidateCaseStudies,
  };

  return (
    <ConnectDbContext.Provider value={contextValue}>
      {children}
    </ConnectDbContext.Provider>
  );
};

// Create a custom hook to easily access the context
export const useConnectDb = () => {
  const context = useContext(ConnectDbContext);
  if (!context) {
    toast.error('useConnectDb must be used within a ConnectDbProvider');
    throw new Error('useConnectDb must be used within a ConnectDbProvider');
  }
  return context;
};

export default ConnectDb;
