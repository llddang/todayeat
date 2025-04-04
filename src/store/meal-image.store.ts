import ImageContent from '@/types/gemini.type';
import { create } from 'zustand';

type FilesStore = {
  files: File[] | null;
  encodedFiles: ImageContent[];
  setImageFiles: (files: NonNullable<FilesStore['files']>) => void;
  setEncodedFiles: (encodedFiles: ImageContent[]) => void;
};

const initialValue = {
  files: null,
  encodedFiles: [
    {
      inlineData: {
        data: '',
        mimeType: ''
      }
    }
  ]
};

const useFilesStore = create<FilesStore>()((set) => ({
  ...initialValue,
  setImageFiles: (files) => set((state) => ({ ...state, files })),
  setEncodedFiles: (encodedFiles) => set((state) => ({ ...state, encodedFiles }))
}));

export default useFilesStore;
