export interface Props {
  open: boolean;
  setOpen: (op: boolean) => void;
  freelancerId?: number;
  rate?: number;
}

export interface FreelancerId {
  id: number;
}
