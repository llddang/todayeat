import { create } from 'zustand';

export type FilesState = {
  files: File[] | null;
};

export type FilesActions = {
  setImageFiles: (files: NonNullable<FilesState['files']>) => void;
};

type FilesStore = FilesState & FilesActions;

const initialFiles = null;

const useFilesStore = create<FilesStore>()((set) => ({
  files: initialFiles,
  setImageFiles: (files) => set((state) => ({ ...state, files }))
}));

export default useFilesStore;
