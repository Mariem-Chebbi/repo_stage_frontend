export class  IssuesRequest {
  id: string;
  description: string;
  platformId: string;
  issueKey?: string;
  name?: string;
  hasVoted: boolean = false;
  isVoting: boolean = false;
  lastVoteValue?: string;
}
