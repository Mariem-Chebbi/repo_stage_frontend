export interface Pipeline {
  id?: string;
  name: string;
  stageIds: string[];
  jenkinsJobUrl?: string;
  projectId?: string;
}
