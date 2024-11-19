export interface VoteModel {
  id?: string;
  sessionId: string;
  issueId: string;
  vote: string;
  userId: string;
  userName: string;
}
