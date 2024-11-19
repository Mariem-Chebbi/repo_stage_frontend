import {VoteModel} from './VoteModel';

export class IssuesModel {
  id: string;
  description: string;
  file: string;
  platformId: string;
  issueDescription: string;
  issueNumber: string;
  hasVoted: boolean = false;
  isVoting: boolean = false;
  lastVoteValue?: string;
}

