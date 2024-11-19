export class AzureDevOpsProject {
  id: string;
  name: string;
  platformId: string;
  description: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
