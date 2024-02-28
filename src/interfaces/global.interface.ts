export interface IQuestion {
  qid: string;
  qname: string;
}

export interface IAnswer {
  answerId: string;
  qid: string;
  answer: string;
  answeredBy: string;
  editHistory: { date: string; answer: string }[];
}
