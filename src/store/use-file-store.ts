import ImageContent from '@/types/gemini.type';
import { create } from 'zustand';

export type FilesState = {
  files: File[] | null;
  encodedFiles: ImageContent[];
};

export type FilesActions = {
  setImageFiles: (files: NonNullable<FilesState['files']>) => void;
  setEncodedFiles: (encodedFiles: ImageContent[]) => void;
};

type FilesStore = FilesState & FilesActions;

const initialEncodedFiles = [
  {
    inlineData: {
      data: '',
      mimeType: ''
    }
  }
];

const initialFiles = {
  files: null,
  encodedFiles: initialEncodedFiles
};

const useFilesStore = create<FilesStore>()((set) => ({
  ...initialFiles,
  setImageFiles: (files) => set((state) => ({ ...state, files })),
  setEncodedFiles: (encodedFiles) => set((state) => ({ ...state, encodedFiles }))
}));

export default useFilesStore;
