export interface Props {
  hourly_rate?: number;
  id?: number;
  description?: string;
  open: boolean;
  setOpen: (op: boolean) => void;
}

export interface FreelancerId {
  id: number;
}
