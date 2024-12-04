export interface ModuleInformation {
  id: number | null;
  name: string;
  inputSchema: string; // It can be a parsed object, but in your example, it's a string
  outputSchema: string; // It can be a parsed object, but in your example, it's a string
  formula: string;
  api: string | null;
  description: string;
  tags: string;
  category: string;
  image: string | null;
  screenshots: string[];
  rating: number | null;
  created_by: number | null;
  version: number | null;
}

export interface ResponseModule {
  id: number | null;
  input: string;
  output: string;
  module: ModuleInformation;
}

export interface Response<T> {
  message: string;
  status: boolean;
  data: T;
}

export interface ModuleCategory {
  value: string;
  label: string;
}
