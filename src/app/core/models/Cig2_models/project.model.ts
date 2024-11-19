export class Project {
    id: string;
    name: string;
    description: string;
    gitUrl: string;
    token: string;
    gitUsername: string;
    gitRepo: string;
    projectKey : string;
    sonarToken: string;

  
    constructor(id: string, name: string, description: string, gitUrl: string, token: string, gitUsername: string, gitRepo: string, projectKey:string, sonarToken: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.gitUrl = gitUrl;
      this.token = token;
      this.gitUsername = gitUsername;
      this.gitRepo = gitRepo;
      this.projectKey = projectKey;
      this.sonarToken = sonarToken;
    }
  }
  